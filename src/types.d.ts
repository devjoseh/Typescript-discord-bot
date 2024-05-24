import { Client, CommandInteraction, AutocompleteInteraction } from 'discord.js';

export interface SlashCommand {
    name: string;
    cooldown?: number;
    userRoles?: string[];
    userPerms?: string[];
    botPerms?: string[];
    run: (client: Client, interaction: CommandInteraction) => Promise<void>;
    autocomplete?: (interaction: AutocompleteInteraction, choices: any[]) => Promise<void>;
}
