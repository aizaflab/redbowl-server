import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from 'bcrypt'
import config from "../../config";
const userSchema = new Schema<TUser>({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        select: 0,
    },
    profileImage: {
        type: String,
    },
    role: {
        type: String,
        require: true,
        enum: ['admin', 'user', 'owner'], 
        default: 'admin',
    },
    isBlocked: {
        type: Boolean,
        require: false,
        default: false
    }
}, { timestamps: true });

// create hes password
userSchema.pre('save', async function (next) {
    const user = this;
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcryptSalt)
    )
    next()
})

// create hes password

export const UserModel = model<TUser>('User', userSchema)