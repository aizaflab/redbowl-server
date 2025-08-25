import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BlogService } from "./blog.service";
import AppError from "../../error/AppError";
import { uploadToCloudinary } from "../../config/cloudinary";
import parseNestedJson from "../../utils/parseNestedJson";



const blogCreate = catchAsync(async (req, res) => {
    const data = parseNestedJson(req.body);
    const user = req.user;
    const file = req.file as Express.Multer.File;
    if (!data || !data?.category) throw new AppError(httpStatus.NOT_FOUND, "Invalid Body Information")

    if (file) {
        const locaFilePath = file.path
        const result = await uploadToCloudinary(locaFilePath, 'blog')
        if (!result) throw new AppError(httpStatus.NOT_FOUND, "Invalid Image Hosint Information")
        data.banner = {
            title: data.banner?.title,
            image: result
        }
    }
    const result = await BlogService.createBlogIntoDB(data, user)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Blog created successfully",
        data: result
    })

})
const getallBlog = catchAsync(async (req, res) => {
    const query = req.query;
    const user = req.user
    if (!user) throw new Error("Invalid Body Information")
    const result = await BlogService.getAllBlogIntoDB(query, user)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Blog created successfully",
        data: result
    })

})
const getSingleBlog = catchAsync(async (req, res) => {
    const { Id } = req.params;
    if (!Id) throw new AppError(httpStatus.NOT_FOUND, "Invalid Id!")
    const result = await BlogService.getsingleBlogIntoDB(Id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Blog created successfully",
        data: result
    })

})
const blogUpdate = catchAsync(async (req, res) => {
    const data = parseNestedJson(req.body);
    const user = req.user;
    const file = req.file as Express.Multer.File;
    const { Id } = req.params;
    if (!data || !Id) throw new Error("Invalid Body Information")
    if (file) {
        const locaFilePath = file.path
        const result = await uploadToCloudinary(locaFilePath, 'blog')
        if (!result) throw new AppError(httpStatus.NOT_FOUND, "Invalid Image Hosint Information")
        data.banner = {
            title: data.banner?.title,
            image: result
        }
    }
    const result = await BlogService.updateBlogIntoDB(data, Id)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Blog Update successfully",
        data: result
    })

})
const blogDelete = catchAsync(async (req, res) => {
    const { Id } = req.params;
    if (!Id) throw new Error("Invalid Body Information")
    const result = await BlogService.deleteBlogIntoDB(Id)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Blog created successfully",
        data: result
    })

})
const slugGetBlog = catchAsync(async (req, res) => {
    const { slug } = req.params;
    if (!slug) throw new Error("Invalid Body Information")
    const result = await BlogService.slugBlogIntoDB(slug)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Blog created successfully",
        data: result
    })

})

export const blogController = { blogCreate, blogUpdate, blogDelete, getallBlog, slugGetBlog, getSingleBlog }