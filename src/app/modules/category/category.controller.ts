import httpStatus from "http-status";
import AppError from "../../error/AppError";
import catchAsync from "../../utils/catchAsync";
import { CategoryService } from "./category.service";
import sendResponse from "../../utils/sendResponse";


const createCategory = catchAsync(async (req, res) => {
    const data = req.body;
    const user = req.user
    if (!data || !user) throw new AppError(httpStatus.NOT_FOUND, "Category not Found")
    const result = await CategoryService.createCategoryIntoDB(data, user)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "create Category success",
        data: result
    })

})
const singleCategory = catchAsync(async (req, res) => {
    const { categoryId } = req.params;
    const user = req.user
    if (!categoryId || !user) throw new AppError(httpStatus.NOT_FOUND, "Category not Found")
    const result = await CategoryService.singleCategoryIntoDB(categoryId, user)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "create Category success",
        data: result
    })
})
const updateCategory = catchAsync(async (req, res) => {
    const { categoryId } = req.params;
    const data = req.body;
    const user = req.user
    if (!categoryId || !user || !data) throw new AppError(httpStatus.NOT_FOUND, "Category not Found")
    const result = await CategoryService.updateCategoryIntoDB(categoryId, data, user)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "create Category success",
        data: result
    })

})
const deleteCategory = catchAsync(async (req, res) => {
    const { categoryId } = req.params;
    const user = req.user
    if (!categoryId || !user) throw new AppError(httpStatus.NOT_FOUND, "Category not Found")
    const result = await CategoryService.deleteCategoryIntoDB(categoryId, user)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "create Category success",
        data: result
    })

})
const getCategory = catchAsync(async (req, res) => {
    const user = req.user
    const query = req.query
    if (!user || !query) throw new AppError(httpStatus.NOT_FOUND, "Category not Found")
    const result = await CategoryService.getAllCategoryIntoDB(query, user)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "create Category success",
        data: result
    })


})


export const categoryController = { createCategory, singleCategory, updateCategory, deleteCategory, getCategory }
