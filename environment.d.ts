declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TOKEN: string;

            GUILD_ID: string;
            CLIENT_ID: string;
            OWNER_ID: string;

            TIMEZONE: string;
        }
    }
}

export {};  