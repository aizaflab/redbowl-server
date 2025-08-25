import jwt from "jsonwebtoken"
import AppError from "../../error/AppError"
import { TUser } from "../user/user.interface"
import { UserModel } from "../user/user.model"
import { TLogin } from "./auth.interface"
import bcrypt from 'bcrypt'
import httpStatus from 'http-status'
import config from "../../config"
const JWT_SECRET = config.jwtSecret as string

const createUserIntoDB = async (payload: TUser) => {
    const result = new UserModel(payload)
    if (!result) throw new AppError(httpStatus.NOT_FOUND, "Invalid User Infomation")
    await result.save()
    return result;
}
const loginUserIntoDB = async (payload: TLogin) => {
    const { email, password } = payload;
    if (!email || !password) throw new AppError(httpStatus.NOT_FOUND, "Invalid email and password !")
    const user = await UserModel.findOne({ email: email }).select('+password')
    if (!user) throw new AppError(httpStatus.NOT_FOUND, `Invalid ${email} no record create !`)
    const isDeleted = user?.isBlocked;

    if (isDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
    }

    // Compare provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user?.password);
    if (!isPasswordValid) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid password!');
    }
    const token = jwt.sign(
        {
            _id:user?._id,
            email:user?.email,
            role:user?.role,
            isBlocked:user?.isBlocked,
        },
        JWT_SECRET,
        { expiresIn: "10d" }
    );
    const auth ={token,user}
    return auth;
}


export const AuthService = {
    createUserIntoDB, loginUserIntoDB
}