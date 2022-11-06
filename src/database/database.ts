import { Snowflake } from "discord.js"
import { connect } from "mongoose"
import { exit } from "process"
import whitelistModel, { WhitelistPlayer } from "./whitelist.model"

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

export const getPlayerCount = async () => {
    return await whitelistModel.count()
}

export const getPlayerById = async (id: Snowflake): Promise<WhitelistPlayer | null> => {
    return await whitelistModel.findOne({ id })
}

export const getPlayerByUUID = async (uuid: string): Promise<WhitelistPlayer | null> => {
    return await whitelistModel.findOne({ uuid })
}

export const createPlayer = async (id: Snowflake, uuid: string): Promise<WhitelistPlayer> => {
    return await whitelistModel.create({ id, uuid, registeredAt: new Date() })
}

export const deletePlayerById = async (id: Snowflake) => {
    await whitelistModel.deleteOne({ id })
}

export const deletePlayer = async (id: Snowflake, uuid: string) => {
    await whitelistModel.deleteOne({ id })
}