import './db.js';
import HashPass from '../utils/HashPass.js';
import { Schema, model } from 'mongoose';
const users = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        minLength: 2,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLength: 2,
        unique: true,
    },
    pass: {
        type: String,
        required: true,
    },
    isEmailVerify: {
        type: Boolean,
        required: true,
        default: false,
    },
    token: {
        type: String,
    },
    verify: {
        token: {
            type: String,
        },
        passwordtoken: {
            type: String,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

users.pre("save", function (next) {
    if (!this.isModified("pass")) {
        var hash = HashPass(pass);
        this.pass = hash;
        next();
    }

    this.pass = HashPass(this.pass);
    next();
});
export default model("users", users);
