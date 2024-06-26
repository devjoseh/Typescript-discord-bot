import * as fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import config from '../configs/config'

import {
	type RESTPostAPIApplicationCommandsJSONBody,
	type RESTPostAPIApplicationGuildCommandsJSONBody,
	type RESTPutAPIApplicationCommandsJSONBody,
	type RESTPutAPIApplicationGuildCommandsJSONBody,
} from 'discord.js';

import { PermissionsBitField } from 'discord.js'
import { Routes } from 'discord-api-types/v10'
import { REST } from '@discordjs/rest'

import Table from 'cli-table3'
let table = new Table({
    head: ["Pasta", "Comando", "Status"]
})

const rest = new REST({ version: '10'}).setToken(config.token)

export = async (client:any): Promise<void> => {
    const slashCommands:RESTPostAPIApplicationCommandsJSONBody[] | RESTPostAPIApplicationGuildCommandsJSONBody[] = [];

    let quantityLoaded:number = 0

    const slashCommandsDir = path.join(__dirname, '..', 'slashCommands');

    fs.readdirSync(slashCommandsDir).forEach(async dir => {
        const dirPath = path.join(slashCommandsDir, dir);
        const files = fs.readdirSync(dirPath).filter(file => file.endsWith('.js'));

        for (const file of files) {
            const filePath = path.join(dirPath, file);
            const slashCommand = require(filePath);

            slashCommands.push({
                name: slashCommand.name,
                description: slashCommand.description,
                type: slashCommand.type,
                options: slashCommand.options ? slashCommand.options : null,
                default_permission: slashCommand.default_permission ? slashCommand.default_permission : null,
                default_member_permissions: slashCommand.default_member_permissions ? PermissionsBitField.resolve(slashCommand.default_member_permissions).toString() : null
            })

            quantityLoaded++

            if(slashCommand.name) {
                client.slashCommands.set(slashCommand.name, slashCommand)
                // table.push([dir, file.split(".js")[0], '✅'])
                table.push([dir, file.split(".js")[0], 'Y'])
            } else {
                // table.push([dir, file.split(".js")[0], '❌'])
                table.push([dir, file.split(".js")[0], 'X'])
            }
        }
    });

    (async () => {

        let data: RESTPutAPIApplicationCommandsJSONBody[] | RESTPutAPIApplicationGuildCommandsJSONBody[] = [];

        try {
            if(config.guild_id) {
                data = await rest.put(Routes.applicationGuildCommands(config.client_id, config.guild_id), {body: slashCommands}) as RESTPutAPIApplicationGuildCommandsJSONBody[];
            } else {
                data = await rest.put(Routes.applicationCommands(config.client_id), { body: slashCommands }) as RESTPutAPIApplicationCommandsJSONBody[];
            }

            console.log(chalk.yellowBright(table.toString()));
            console.log(chalk.yellowBright(`Foram carregados ${data.length} Slash Commands ${config.guild_id ? `no servidor ${config.guild_id}` : `globalmente`} `));
        } catch (error) {
            console.log(chalk.redBright(`${error}`))
        }
    })();
}