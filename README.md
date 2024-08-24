# 📣 Importante

### Este é um bot simples feito usando apenas TypeScript, ótimo para iniciar um projeto para um servidor do discord.

## 🧑  Autor

Quer me mandar uma mensagem ou dar uma espiada nas minhas redes sociais?

[![instagram](https://img.shields.io/badge/instagram-A425E4?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/dev_joseh/) [![youtube](https://img.shields.io/badge/youtube-red?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/channel/UCHxmaCQRQcJ1Y1fWDvGPktQ) [![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/josé-hernanes-b4b155249/) 

## 🔧 Funções

- Cooldown em comandos;
- Permitir o uso de um comando apenas para um cargo específico;
- Permitir o uso de um comando apenas para permissões específicas;
- Descrição de comandos;
- Adicionar opcoes em comandos;
- E muito mais!

## 💻 Pré-requisitos

Antes de instalar, verifique se sua máquina atende aos seguintes requisitos:

* [Nodejs](https://nodejs.org/en/) v16.9.0 ou superior
* [Discord.js](https://github.com/discordjs/discord.js/) v14.x.x ou superior

# 🔧 Configurando o BOT

1. Baixe o repositório aqui no Github ou clone pelo terminal

```bash
git clone https://github.com/devjoseh/Typescript-discord-bot.git
```

2. Vá para a raiz do projeto e renomeie o arquivo `.env.example` para `.env`

3. Coloque todas as informações necessárias

```bash
TOKEN=
# Token do bot

GUILD_ID=
# ID do servidor principal

CLIENT_ID=
# ID do bot

OWNER_ID=
# ID(s) do(s) dono(s) do bot. Exemplo: OWNER_ID=434791887241740288 852657010273288193

TIMEZONE=America/Sao_Paulo
# Fuso horário do bot
```

> [!NOTE]
> Caso deseje usar o bot em mais de um servidor, deixe `GUILD_ID=` em branco. <br>
> Mas, atenção: qualquer atualização nos comandos, podem demorar de minutos até horas para serem atualizados nos servidores. <br>
> Para configurar os comandos em apenas um servidor, configure como `GUILD_ID=IdDoServidor`. <br>

4. Instalando as dependencias

```bash
npm install
```

5. Compilando o bot

```bash
npm run deploy
```

6. Iniciando o bot

```bash
npm run start
```

> [!NOTE]
> Caso tenha terminado de configurar tudo, você também pode iniciar o bot pelo arquivo `start.bat` <br>

## 👨‍💻 Comandos do Terminal

Comando | Ação
| - | - |
`npm run start:prod` | Inicia o bot sem realizar nenhuma alteração
`npm run start:clean` | Apaga todos os arquivos anteriores, compila os novos arquivos e inicia o bot
`npm run start` | Compila os arquivos modificados e inicia o bot
`npm run build` | Compila os arquivos modificados
`npm run clean` | Deleta todos os arquivos da pasta dist
`npm run watch` | Inicia a compilação do bot em modo observação

## 🤖 Comandos

Nome | Descrição
| - | - |
[/teste](src/slashCommands/geral/teste.ts) | Comando com algumas funções de exemplo

## 💡 Estrutura dos Comandos

Abra o arquivo [command.ts.example](command.ts.example) para ter acesso a uma estrutura de exemplo para criação de comandos <br>
Você pode alterar o comando da forma que quiser <br>

## ⛔ Dúvidas / Sugestões / Problemas

Caso tenha alguma dúvida, sugestão ou tenha encontrado algum problema, por favor abra um **[issue](https://github.com/devjoseh/Typescript-discord-bot/issues/new)** e aguarde por uma resposta.

## 🙌 Contribuições

Contribuições são muito bem vindas! Abra um em **[pull request](https://github.com/devjoseh/Typescript-discord-bot/pulls)**.

## 📝 Licença

Este projeto está licenciado. Veja mais [detalhes](LICENSE)