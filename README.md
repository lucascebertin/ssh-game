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
WIP


## O que preciso instalar?
  * Docker
    Estes desafios estão FORTEMENTE acoplados a Docker e Docker Compose.
    O desafio 2 considera que existe Docker localmente para que possa iniciar sessões com experiência de SSH mas conectando-se ao tty e stdin dos containers executados.
  * Nodejs 12.x
  * SSH client

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
* [nivel 1](http://localhost:4444)
* [nivel 2](tcp://localhost:2222)


## Informações complementares
Para rodar estes desafios, será necessário ter ngrok instalado e, após isto, remapear, no `docker-compose.yml`, portas de nível root (80 e 22).
Portas altas foram usadas para não ser necessário qualquer privilégio administrativo enquanto desenvolvimento.
A experiência completa se baseia em parecer com um roteador de verdade, portanto, é necessário utilizar portas que sejam também usadas por tal.
