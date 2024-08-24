import { EmbedBuilder, Collection, PermissionsBitField, GuildMember, ColorResolvable, Events } from 'discord.js';
import { parseMs } from './parsems'
import settings from '../../configs/settings';
import client from '../../index'

const cooldown = new Collection<string, number>();

function checkPermissions(member: GuildMember, requiredRoles: string[]): boolean {
    return member.roles.cache.some(role => requiredRoles.includes(role.id));
}

client.on(Events.InteractionCreate, async (interaction:any) => {
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
            cooldown.set(`slash-${slashCommand.name}${interaction.user.id}`, Date.now() + (slashCommand.cooldown * 1000));
            setTimeout(() => {
                cooldown.delete(`slash-${slashCommand.name}${interaction.user.id}`);
            }, slashCommand.cooldown * 1000);
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

            try {
                await slashCommand.run(client, interaction);
            } catch (error) {
                console.error(error);
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ content: `⚠️ Ocorreu um erro ao tentar executar este comando. \nMais informações no console.`, ephemeral: true });
                } else {
                    await interaction.reply({ content: `⚠️ Ocorreu um erro ao tentar executar este comando. \nMais informações no console.`, ephemeral: true });
                }
            } 
        }
    } catch (error) {
        console.log(error);
    }
});
