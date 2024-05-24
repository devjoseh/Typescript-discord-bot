// settings.ts

interface Cooldowns {
    message: string;
}

interface ErrorMessage {
    titulo: string;
}

interface Settings {
    color: string;
    titulo: string;
    footer: string;
    prefix: string;
    cooldowns: Cooldowns;
    erromsg: ErrorMessage;
}

const settings: Settings = {
    color: "#2B2D31",
    titulo: "Nest Store 👑",
    footer: "Copyright © 2022-2024, Nest Store. Todos os direitos reservados.",
    prefix: "!",
    
    cooldowns: {
        message: "Aguarde: `<duration>` para executar o comando novamente!"
    },

    erromsg: {
        titulo: "🤔 Encontrei um problema!"
    }
};

export default settings;