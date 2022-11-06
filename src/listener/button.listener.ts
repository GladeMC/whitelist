import { Client, Colors, EmbedBuilder } from "discord.js";
import { deletePlayer } from "../database/database";

export const registerButtonListeners = (client: Client) => {

    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isButton()) return
        const [id, uuid] = interaction.customId.split(":")
        await deletePlayer(id, uuid)

        await interaction.message.edit({
            embeds: [new EmbedBuilder(interaction.message.embeds[0].data).setTitle("(Entfernt) Neuer Spieler").setColor(Colors.Red)],
            components: []
        })
    })

}