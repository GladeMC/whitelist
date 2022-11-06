import * as mongoose from "mongoose";
import { Document, Schema } from "mongoose";

export interface Player extends Document {
    id: string,
    registeredAt: Date,
    uuid: string
}

const PlayerSchema: Schema = new Schema({
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

export default mongoose.model<Player>("whitelist_players", PlayerSchema, "whitelist_players")