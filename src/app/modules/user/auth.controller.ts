import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";
import { uploadToCloudinary } from "../../config/cloudinary";
import AppError from "../../error/AppError";
;


const userProfile = catchAsync(async (req, res) => {
    const { _id } = req?.user;
    if (!_id) throw new Error("Invalid _id Information")
    const result = await UserService.profileUserIntoDB(_id)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Blog created successfully",
        data: result
    })

})

const userProfileUpdate = catchAsync(async (req, res) => {
    const data = req.body;
    const user = req.user
    const file = req.file as Express.Multer.File;
    if (file) {
        const locaFilePath = file.path
        const result = await uploadToCloudinary(locaFilePath, 'profile')
        if (!result) throw new AppError(httpStatus.NOT_FOUND, "Invalid Image Hosint Information")
        data.profileImage = result
    }
    const result = await UserService.userProfileUpdateIntoDB(data, user)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "User Update successfully",
        data: result
    })
})

const userUpdate = catchAsync(async (req, res) => {
    const data = req.body;
    const { Id } = req.params;
    if (!data || !Id) throw new Error("Invalid Body Information")
    const result = await UserService.updateUserIntoDB(data, Id)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "User Update successfully",
        data: result
    })

})

export const userController = { userUpdate, userProfile,userProfileUpdate }