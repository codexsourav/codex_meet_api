import './db.js';
import { Schema, model } from 'mongoose';
const users = new Schema({
    meetId: {
        type: String,
        required: true,
    },
    creatorId: {
        type: String,
        required: true,
    },
    creatorEmail: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

export default model("meets", users);
