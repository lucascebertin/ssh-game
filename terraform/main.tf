provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "main" {
  name     = "${var.prefix}-resources"
  location = var.location
}

resource "azurerm_virtual_network" "main" {
  name                = "${var.prefix}-network"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
}

resource "azurerm_subnet" "internal" {
  name                 = "internal"
  resource_group_name  = azurerm_resource_group.main.name
  virtual_network_name = azurerm_virtual_network.main.name
  address_prefixes     = ["10.0.2.0/24"]
}

resource "azurerm_public_ip" "main" {
  name                    = "${var.prefix}-pip"
  location                = azurerm_resource_group.main.location
  resource_group_name     = azurerm_resource_group.main.name
  allocation_method       = "Dynamic"
  idle_timeout_in_minutes = 30
}

resource "azurerm_network_interface" "main" {
  name                = "${var.prefix}-nic"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name

  ip_configuration {
    name                          = "ipconfig"
    subnet_id                     = azurerm_subnet.internal.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = azurerm_public_ip.main.id
  }
}

resource "azurerm_linux_virtual_machine" "main" {
  name                            = "${var.prefix}-vm"
  resource_group_name             = azurerm_resource_group.main.name
  location                        = azurerm_resource_group.main.location
  size                            = "Standard_B4ms"
  admin_username                  = "adminuser"
  network_interface_ids = [
    azurerm_network_interface.main.id,
  ]

  admin_ssh_key {
    username = "adminuser"
    public_key = file("~/.ssh/id_rsa.pub")
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "UbuntuServer"
    sku       = "16.04-LTS"
    version   = "latest"
  }

  os_disk {
    storage_account_type = "Standard_LRS"
    caching              = "ReadWrite"
  }
}

# alocações dinâmicas de IP só acontecem após máquina ligada, então, não tem como colocar dentro do provisionamento da VM, falha logo que executa
resource "null_resource" "main" {
  provisioner "file" {
    source      = "~/.ssh/id_rsa"
    destination = "/home/adminuser/.ssh/id_rsa"

    connection {
      type        = "ssh"
      user        = "adminuser"
      private_key = file("~/.ssh/id_rsa")
      host        = data.azurerm_public_ip.main.ip_address
    }
  }

  provisioner "remote-exec" {
    inline = [
      "sudo apt-get update",
      "sudo apt-get -y install apt-transport-https ca-certificates curl gnupg-agent software-properties-common",
      "curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -",
      "sudo add-apt-repository \"deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs)  stable\"",
      "sudo apt-get update",
      "sudo apt-get -y install docker-ce docker-ce-cli containerd.io",
      "sudo groupadd docker",
      "sudo usermod -aG docker $USER",
      "sudo ssh-keygen -F github.com || sudo ssh-keyscan github.com >> ~/.ssh/known_hosts",
      "sudo curl -L https://github.com/docker/compose/releases/download/1.27.4/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose",
      "sudo chmod +x /usr/local/bin/docker-compose",
      "mkdir ~/app && cd ~/app", 
      "git clone https://github.com/lucascebertin/ssh-game.git && cd ssh-game",
      "sudo docker-compose -f docker-compose.prod.yml build",
      "sudo iptables -A INPUT -m state --state NEW -m tcp -p tcp --dport 2222 -j ACCEPT",
      "sudo iptables -A INPUT -m state --state NEW -m tcp -p tcp --dport 22 -j ACCEPT",
      "sudo iptables -A INPUT -m state --state NEW -m tcp -p tcp --dport 80 -j ACCEPT",
      "sudo sed -i '/^Port/s/22/2222/' /etc/ssh/sshd_config",
      "sudo service sshd restart",
      "sudo docker-compose -f docker-compose.prod.yml --compatibility up -d"
    ]

    connection {
      type        = "ssh"
      user        = "adminuser"
      private_key = file("~/.ssh/id_rsa")
      host        = data.azurerm_public_ip.main.ip_address
    }
  }
}

data "azurerm_public_ip" "main" {
  name                = azurerm_public_ip.main.name
  resource_group_name = azurerm_resource_group.main.name

  depends_on = [
    azurerm_linux_virtual_machine.main
  ]
}

output "public_ip_address" {
  value = data.azurerm_public_ip.main.ip_address
}
