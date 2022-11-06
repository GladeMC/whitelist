import { Snowflake } from "discord.js"
import { connect } from "mongoose"
import { exit } from "process"
import playerModel, { Player } from "./player.model"

export const connectToMongoDB = async () => {
    console.log("Trying to connect to MongoDB")
    try {
        await connect(process.env.MONGO_URI!!)
        console.log("Connected to mongodb")
    } catch (err) {
        console.error("Failed To Connect to MongoDB", err)
        exit(-1)
    }
}

export const getPlayerById = async (id: Snowflake): Promise<Player | null> => {
    return await playerModel.findOne({ id })
}

export const getPlayerByUUID = async (uuid: string): Promise<Player | null> => {
    return await playerModel.findOne({ uuid })
}

export const createPlayer = async (id: Snowflake, uuid: string): Promise<Player> => {
    return await playerModel.create({ id, uuid, registeredAt: new Date() })
}

export const deletePlayer = async (id: Snowflake, uuid: string) => {
    await playerModel.deleteOne({ id, uuid })
}