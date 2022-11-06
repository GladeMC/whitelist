import { EmbedBuilder } from "@discordjs/builders";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, Colors, Embed, Message, TextChannel, User } from "discord.js";
import { deletePlayer, deletePlayerById, getPlayerById, getPlayerCount } from "../database/database";

export const registerLeaveListeners = (client: Client) => {
    client.on("guildMemberRemove", async (member) => {
        const player = await getPlayerById(member.id)
        if (!player) return
        await deletePlayerById(member.id)

        const logChannel = client.channels.cache.get(process.env.LOG_CHANNEL_ID!!)!! as TextChannel
        await logChannel.send({
            embeds: [new EmbedBuilder()
                .setTitle("Spieler entfernt")
                .setDescription(`${member.toString()} hat den Server verlassen.`)
                .addFields(
                    {
                        name: "UUID",
                        value: player.uuid,
                    },
                    {
                        name: "Discord",
                        value: member.toString()
                    },
                    {
                        name: "Spieleranzahl",
                        value: (await getPlayerCount()).toString()
                    })
                .setThumbnail(`https://crafatar.com/avatars/${player.uuid}`)
                .setColor(Colors.Red)]
        })
    })
}