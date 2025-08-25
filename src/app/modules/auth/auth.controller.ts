import { AuthService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import httpStatus from 'http-status'
import { uploadToCloudinary } from "../../config/cloudinary";

const userCreaetAccount = catchAsync(async (req, res) => {
    let data = req.body;
    if (!data) throw new Error("Invalid Body Information")
    const file = req.file as Express.Multer.File;
    if (file) {
        const locaFilePath = file.path
        const result = await uploadToCloudinary(locaFilePath, 'profile')
        if (!result) throw new Error("Invalid Image Hosint Information")
        data.profileImage = result
    }
    const result = await AuthService.createUserIntoDB(data)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "create user success",
        data: result
    })

})

const userLogin = catchAsync(async (req, res) => {
    const data = req.body;
    if (!data) throw new Error("Invalid Body Information")
    const result = await AuthService.loginUserIntoDB(data)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Login successful",
        data: result
    })
})
export const authController = { userCreaetAccount, userLogin }