import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import AppError from "../../../error/AppError";
import sendResponse from "../../../utils/sendResponse";
import { CategoryPublicService } from "./category.public.service";



const getAllPublicCategory = catchAsync(async (req, res) => {
    const query = req.query
    if (!query) throw new AppError(httpStatus.NOT_FOUND, "Category not Found")
    const result = await CategoryPublicService.getAllPublicCategoryIntoDB(query)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "create Category success",
        data: result
    })


})

const getSlugPubliCategory = catchAsync(async (req, res) => {
    const {slug} = req.params;
    const result = await CategoryPublicService.slugPublicCategoryIntoDB(slug)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Category created successfully",
        data: result
    })

})



export const categoryPublicController = { getAllPublicCategory,getSlugPubliCategory }
