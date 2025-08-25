import AppError from "../../error/AppError"
import httpStatus from 'http-status'
import { TUser } from "./user.interface"
import { UserModel } from "./user.model";
import { JwtPayload } from "jsonwebtoken";


const profileUserIntoDB = async (_id: string) => {
    const result = await UserModel.findById(_id);
    if (!result) throw new AppError(httpStatus.NOT_FOUND, "Invalid User Infomation")
    return result;
}
const updateUserIntoDB = async (payload: Partial<TUser>, Id: string) => {
    const result = await UserModel.findOneAndUpdate({ _id: Id }, payload, { new: true });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, "Invalid User Infomation")
    return result;
}
const userProfileUpdateIntoDB = async (payload: Partial<TUser>, user: JwtPayload) => {
    const { _id } = user
    const result = await UserModel.findOneAndUpdate({_id:_id}, payload, { new: true });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, "Invalid User Infomation")
    return result;
}


export const UserService = {
    updateUserIntoDB,
    profileUserIntoDB,
    userProfileUpdateIntoDB
}