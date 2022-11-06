import * as mongoose from "mongoose";
import { Document, Schema } from "mongoose";

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

export default mongoose.model<WhitelistPlayer>("whitelist", WhitelistSchema, "whitelist")