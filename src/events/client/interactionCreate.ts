import { EmbedBuilder, Collection, PermissionsBitField, GuildMember, ColorResolvable } from 'discord.js';
import { parseMs } from './parsems'
import settings from '../../configs/settings';
//import { SlashCommand } from '../../types'; // Defina os tipos de comandos de barra personalizados
import client from '../../index'

const cooldown = new Collection<string, number>();

function checkPermissions(member: GuildMember, requiredRoles: string[]): boolean {
    return member.roles.cache.some(role => requiredRoles.includes(role.id));
}

client.on('interactionCreate', async (interaction:any) => {
    try {
        const slashCommand = client.slashCommands.get(interaction.commandName);

        if (interaction.type === 4 && slashCommand?.autocomplete) {
            const choices: any[] = [];
            await slashCommand.autocomplete(interaction, choices);
        }

        if(!interaction.isCommand()) return;
        
        if (slashCommand.cooldown) {
            if (cooldown.has(`slash-${slashCommand.name}${interaction.user.id}`)) {
                let cooldownTime = cooldown.get(`slash-${slashCommand.name}${interaction.user.id}`)! - Date.now()
                return interaction.reply({
                    //content: settings.cooldowns.message.replace('<duration>', ms(cooldown.get(`slash-${slashCommand.name}${interaction.user.id}`)! - Date.now())),
                    content: settings.cooldowns.message.replace('<duration>', parseMs(cooldownTime)),
                    ephemeral: true,
                });
            }

            if (slashCommand.userRoles && !checkPermissions(interaction.member as GuildMember, slashCommand.userRoles)) {
                const userRolesError = new EmbedBuilder()
                    .setTitle(settings.erromsg.titulo)
                    .setDescription(`${interaction.user} Você não possui o cargo necessário para executar este comando!`)
                    .setColor(settings.color as ColorResolvable)
                    .setFooter({ text: settings.footer })
                    .setTimestamp();
                return interaction.reply({ embeds: [userRolesError], ephemeral: true });
            }

            if (slashCommand.userPerms || slashCommand.botPerms) {
                if (!(interaction.memberPermissions?.has(PermissionsBitField.resolve(slashCommand.userPerms || [])))) {
                    const userPerms = new EmbedBuilder()
                        .setTitle(settings.erromsg.titulo)
                        .setDescription(`${interaction.user} Você não possui a permissão de **__${slashCommand.userPerms}__** para executar este comando!`)
                        .setColor(settings.color as ColorResolvable)
                        .setFooter({ text: settings.footer })
                        .setTimestamp();
                    return interaction.reply({ embeds: [userPerms], ephemeral: true });
                }
                if (!(interaction.guild?.members.cache.get(client.user.id)?.permissions.has(PermissionsBitField.resolve(slashCommand.botPerms || [])))) {
                    const botPerms = new EmbedBuilder()
                        .setTitle(settings.erromsg.titulo)
                        .setDescription(`${interaction.user} Eu não possuo a permissão de **__${slashCommand.botPerms}__** para executar este comando!`)
                        .setColor(settings.color as ColorResolvable)
                        .setFooter({ text: settings.footer })
                        .setTimestamp();
                    return interaction.reply({ embeds: [botPerms], ephemeral: true });
                }
            }

            await slashCommand.run(client, interaction);
            cooldown.set(`slash-${slashCommand.name}${interaction.user.id}`, Date.now() + slashCommand.cooldown);
            setTimeout(() => {
                cooldown.delete(`slash-${slashCommand.name}${interaction.user.id}`);
            }, slashCommand.cooldown);
        } else {
            if (slashCommand.userRoles && !checkPermissions(interaction.member as GuildMember, slashCommand.userRoles)) {
                const userRolesError = new EmbedBuilder()
                    .setTitle(settings.erromsg.titulo)
                    .setDescription(`${interaction.user} Você não possui o cargo necessário para executar este comando!`)
                    .setColor(settings.color as ColorResolvable)
                    .setFooter({ text: settings.footer })
                    .setTimestamp();
                return interaction.reply({ embeds: [userRolesError], ephemeral: true });
            }

            if (slashCommand.userPerms || slashCommand.botPerms) {
                if (!(interaction.memberPermissions?.has(PermissionsBitField.resolve(slashCommand.userPerms || [])))) {
                    const userPerms = new EmbedBuilder()
                        .setTitle(settings.erromsg.titulo)
                        .setDescription(`${interaction.user} Você não possui a permissão de **__${slashCommand.userPerms}__** para executar este comando!`)
                        .setColor(settings.color as ColorResolvable)
                        .setFooter({ text: settings.footer })
                        .setTimestamp();
                    return interaction.reply({ embeds: [userPerms], ephemeral: true });
                }
                if (!(interaction.guild?.members.cache.get(client.user.id)?.permissions.has(PermissionsBitField.resolve(slashCommand.botPerms || [])))) {
                    const botPerms = new EmbedBuilder()
                        .setTitle(settings.erromsg.titulo)
                        .setDescription(`${interaction.user} Eu não possuo a permissão de **__${slashCommand.botPerms}__** para executar este comando!`)
                        .setColor(settings.color as ColorResolvable)
                        .setFooter({ text: settings.footer })
                        .setTimestamp();
                    return interaction.reply({ embeds: [botPerms], ephemeral: true });
                }
            }

            await slashCommand.run(client, interaction);
        }
    } catch (error) {
        console.log(error);
    }
});
