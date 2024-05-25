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

## 🚀 Configurando

1. Baixe o repositório aqui no Github ou clone pelo terminal

```bash
git clone https://github.com/devjoseh/Typescript-discord-bot.git
```

2. Vá para src > configs > e renomeie o arquivo `config.ts.example` para `config.ts` 

3. Abra seu arquivo `configs.ts` e preencha os campos abaixo

```bash
const config: Config = {
    token: "",
    # O token do seu bot

    guild_id: "",
    # ID do servidor principal do bot
    client_id: "",
    # ID do bot
    owner_id: ""
    # ID do dono do bot
}
```

> [!NOTE]
> Se você configurar o `guild_id` como: `guild_id: null` os comandos serão registrados globalmente.
> Para configurar os comandos em apenas um servidor, configure como `guild_id: "ID DO SERVIDOR"`

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

## 👨‍💻 Comandos do Terminal

Comando | Ação
| - | - |
`npm run start` | Inicia o bot
`npm run clean` | Deleta todos os arquivos da pasta dist
`npm run watch` | Inicia a compilação do bot em modo observação
`npm run deploy`| Compila todos os arquivos TypeScript

## 🤖 Comandos

Nome | Descrição
| - | - |
[/ping](src/slashCommands/geral/ping.ts) | Responde qual é o tempo de resposta do bot

## 💡 Estrutura dos Comandos

Abra o arquivo command.ts.example para ter acesso a uma estrutura de exemplo para criação de comandos <br>
Você pode alterar o comando da forma que quiser <br>

## ⛔ Dúvidas / Sugestões / Problemas

Caso tenha alguma dúvida, sugestão ou tenha encontrado algum problema, por favor abra um **[issue](https://github.com/devjoseh/Typescript-discord-bot/issues/new)** e aguarde por uma resposta.

## 🙌 Contribuições

Contribuições são muito bem vindas! Abra um em **[pull request](https://github.com/devjoseh/Typescript-discord-bot/pulls)**.

## 📝 Licença

Este projeto está licenciado. Veja mais [detalhes](LICENSE)