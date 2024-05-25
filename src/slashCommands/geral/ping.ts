import { EmbedBuilder, ApplicationCommandType, CommandInteraction, ColorResolvable } from 'discord.js'

import ss from '../../configs/settings'

module.exports = {
    name: "ping",
    description: "Teste do cmd",
    type: ApplicationCommandType.ChatInput,
    default_member_permissions: 'ManageMessages',
    cooldown: 2,

    run: async (client: any, interaction: CommandInteraction) => {
        try {
            let embed = new EmbedBuilder()
            .setTitle(ss.titulo)
            .setColor(ss.color as ColorResolvable)
            .setFooter({ text: ss.footer, iconURL: `${client.user.displayAvatarURL({dynamic: true})}`})
            .setDescription(`⚡ A Latência do BOT é de: \`${Math.round(client.ws.ping)}ms\``)
            return interaction.reply({ embeds: [embed]})
        } catch (error) {
            console.log(error)
        }
    }
}