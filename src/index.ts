import { Client, GatewayIntentBits } from "discord.js"
import { config } from "dotenv"
import { connectToMongoDB } from "./database/database"
import { registerButtonListeners } from "./listener/button.listener"
import { registerLeaveListeners } from "./listener/leave.listener"
import { registerMessageListeners } from "./listener/message.listener"


async function start() {
    await connectToMongoDB()

    const client = new Client({
        intents: [GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent]
    })

    client.on("ready", () => { console.log("Ready!") })

    registerMessageListeners(client)
    registerButtonListeners(client)
    registerLeaveListeners(client)

    await client.login(process.env.DISCORD_TOKEN!!)
}


config()
start()