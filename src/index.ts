import { Client, Collection, GatewayIntentBits, Partials } from "discord.js";
import dotenv from 'dotenv'
import chalk from 'chalk'
import * as path from 'path'
import * as fs from 'fs'

console.log(chalk.yellow(`███╗   ██╗███████╗███████╗████████╗    ███████╗████████╗ ██████╗ ██████╗ ███████╗`))
console.log(chalk.yellow(`████╗  ██║██╔════╝██╔════╝╚══██╔══╝    ██╔════╝╚══██╔══╝██╔═══██╗██╔══██╗██╔════╝`))
console.log(chalk.yellow(`██╔██╗ ██║█████╗  ███████╗   ██║       ███████╗   ██║   ██║   ██║██████╔╝█████╗ `))
console.log(chalk.yellow(`██║╚██╗██║██╔══╝  ╚════██║   ██║       ╚════██║   ██║   ██║   ██║██╔══██╗██╔══╝  `))
console.log(chalk.yellow(`██║ ╚████║███████╗███████║   ██║       ███████║   ██║   ╚██████╔╝██║  ██║███████╗`))
console.log(chalk.yellow(`╚═╝  ╚═══╝╚══════╝╚══════╝   ╚═╝       ╚══════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚══════╝`))

const client: any = new Client({
    intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.MessageContent ],
    shards: "auto",
    partials: [ Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.GuildScheduledEvent, Partials.User, Partials.ThreadMember ]
});

dotenv.config();

client.slashCommands = new Collection()
export default client;

client.setMaxListeners(0);

const slashCommandsPath = path.join(__dirname, 'slashCommands');
client.categories = fs.readdirSync(slashCommandsPath);
["events", "slashCommand"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.login(process.env.TOKEN);