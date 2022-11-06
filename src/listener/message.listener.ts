import { EmbedBuilder } from "@discordjs/builders";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, Colors, Embed, Message, TextChannel, User } from "discord.js";
import { createPlayer, getPlayerById, getPlayerCount } from "../database/database";
import { fetchUUID } from "../util/mojang";

export const registerMessageListeners = (client: Client) => {

    const fail = async (message: Message, reason: string) => {
        await message.delete()
        message.channel.send({
            content: `<@${message.author.id}>`,
            embeds: [new EmbedBuilder()
                .setTitle("Ungültiger Nutzername")
                .setDescription(`❌ ${reason}`)
                .setColor(Colors.Red)]
        }).then(message => setTimeout(() => {
            message.delete()
        }, 5000))
    }

    const sendLogMessage = async (uuid: string, name: string, user: User) => {
        const logChannel = client.channels.cache.get(process.env.LOG_CHANNEL_ID!!)!! as TextChannel
        logChannel.send({
            embeds: [new EmbedBuilder()
                .setTitle("Neuer Spieler")
                .setDescription("Der Spieler `" + name + "` hat sich registriert.")
                .addFields(
                    {
                        name: "UUID",
                        value: uuid,
                    },
                    {
                        name: "Discord",
                        value: user.toString()
                    },
                    {
                        name: "Spieleranzahl",
                        value: (await getPlayerCount()).toString()
                    })
                .setThumbnail(`https://crafatar.com/avatars/${uuid}`)
                .setColor(Colors.Green)],
            components: [
                new ActionRowBuilder<ButtonBuilder>().addComponents([
                    new ButtonBuilder()
                        .setLabel("Entfernen")
                        .setStyle(ButtonStyle.Danger)
                        .setCustomId(`${user.id}:${uuid}`)])
            ]
        })
    }

    client.on("messageCreate", async (message) => {
        if (message.author.bot || !message.guild) return
        if (message.channel.id != process.env.WHITELIST_CHANNEL_ID) return
        if (message.content.includes(" ")) return fail(message, "Der Nutzername darf keine Leerzeichen enthalten.")
        const uuid = await fetchUUID(message.content)

        if (!uuid) return fail(message, "Dieser Nutzername existiert nicht.")

        if (await getPlayerById(message.author.id)) return fail(message, "Du hast dich bereits registriert.")

        try {
            await createPlayer(message.author.id, uuid)
        } catch (err) {
            return await fail(message, "Ein Spieler mit diesem Nutzernamen ist bereits registriert.")
        }

        await message.channel.send({
            content: `<@${message.author.id}>`,
            embeds: [new EmbedBuilder()
                .setTitle("Registrierung erfolgreich")
                .setDescription("✅ Du wurdest erfolgreich zur Whitelist hinzugefügt.")
                .setThumbnail(`https://crafatar.com/avatars/${uuid}`)
                .setColor(Colors.Green)]
        })
        await sendLogMessage(uuid, message.content, message.author)
    })
}