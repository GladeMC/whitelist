import { config } from "dotenv";
import * as mongoose from "mongoose";
import { Document, Schema } from "mongoose";

config() //Because this file runs before the index file runs 

export interface WhitelistPlayer extends Document {
    id: string,
    registeredAt: Date,
    uuid: string
}

const WhitelistSchema: Schema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    registeredAt: {
        type: Date,
        required: true
    },
    uuid: {
        type: String,
        required: true,
        unique: true
    }
});

export default mongoose.model<WhitelistPlayer>(
    process.env.WHITELIST_COLLECTION_NAME!!,
    WhitelistSchema,
    process.env.WHITELIST_COLLECTION_NAME!!)