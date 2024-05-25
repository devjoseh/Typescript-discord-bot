import { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, CommandInteraction, ColorResolvable } from 'discord.js'

import ss from '../../configs/settings'

const staffRoles:string[] = ["1216513737842757842"]

module.exports = {
    name: "ping",
    description: "Teste do cmd",
    type: ApplicationCommandType.ChatInput,
    default_member_permissions: 'ManageMessages',
    userRoles: staffRoles,
    cooldown: 5,

    options: [
        {
            name: 'cor',
            description: `Escolha uma cor`,
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: `Vermelho`,
                    value: `vermelho`,
                },
                {
                    name: `Preto`,
                    value: `preto`,
                },
                {
                    name: `Verde`,
                    value: `verde`,
                },
            ],
        },
        {
            name: 'numero',
            description: "Informe um numero",
            type: ApplicationCommandOptionType.Number,
            required: true,
        },
        {
            name: 'user',
            description: "Mencione alguém",
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: 'canal',
            description: "Informe um canal",
            type: ApplicationCommandOptionType.Channel,
            required: true,
        },

    ],

    run: async (client: any, interaction: any) => {
        const cor = interaction.options.getString('cor')
        const numero = interaction.options.getNumber('numero')
        const user = interaction.options.getMember('user')
        const canal = interaction.options.getChannel('canal')
        
        interaction.reply({ content: `Cor selecionada: ${cor}\nNumero informado: ${numero}\nUsuario: ${user}\nCanal: ${canal}`, ephemeral: true})

        let embed = new EmbedBuilder()
        .setColor(ss.color as ColorResolvable)
        .setDescription(`Cor selecionada: ${cor}\nNumero informado: ${numero}\nUsuario: ${user}\nCanal: ${canal}`)
        .setTimestamp()
        .setTitle("Embed exemplo")
        return interaction.channel.send({ embeds: [embed]})
    }
}