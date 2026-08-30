import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import  { Schema, model } from "mongoose";
import config from '../config/config.js';

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    refreshToken: {
        type: String,
        default: null
    }
}, { timestamps: true })

userSchema.pre("save", async function () {
    if(!this.isModified("password")) {
        return;
    }
    this.password = await bcrypt.hash(this.password, 10)
})
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        config.REFRESH_TOKEN,
        {
            expiresIn: config.JWT_REFRESH_EXPIRY
        }
    )
}
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
    {
        _id: this._id,
    }, 
    config.ACCESS_TOKEN, 
    {
        expiresIn: config.JWT_ACCESS_EXPIRY
    })
}
const User = model("user", userSchema);
export default User