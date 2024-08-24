import * as fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import logger from '../services/logger'

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

const rest = new REST({ version: '10'}).setToken(process.env.TOKEN)

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
                table.push([dir, file.split(".js")[0], 'OK'])
            } else {
                // table.push([dir, file.split(".js")[0], '❌'])
                table.push([dir, file.split(".js")[0], 'ERRO'])
            }
        }
    });

    (async () => {

        let data: RESTPutAPIApplicationCommandsJSONBody[] | RESTPutAPIApplicationGuildCommandsJSONBody[] = [];

        try {
            if(process.env.GUILD_ID) {
                data = await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), {body: slashCommands}) as RESTPutAPIApplicationGuildCommandsJSONBody[];
            } else {
                data = await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: slashCommands }) as RESTPutAPIApplicationCommandsJSONBody[];
            }

            console.log(chalk.yellowBright(table.toString()));

            logger.info(`Foram carregados ${data.length} Slash Commands ${process.env.GUILD_ID ? `no servidor ${process.env.GUILD_ID}` : `globalmente`}`);
        } catch (error) {
            console.log(chalk.redBright(`${error}`));
        }
    })();
}