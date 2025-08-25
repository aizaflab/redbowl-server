import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import { BlogPublicService } from "./blog.public.service";
import sendResponse from "../../../utils/sendResponse";

const getSlugPublicBlog = catchAsync(async (req, res) => {
    const { slug } = req.params;
    if (!slug) throw new Error("Invalid Body Information")
    const result = await BlogPublicService.slugPublicBlogIntoDB(slug)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Blog created successfully",
        data: result
    })

})
const getallPublicBlog = catchAsync(async (req, res) => {
    const query = req.query;
    const result = await BlogPublicService.getAllPublicBlogIntoDB(query)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Blog created successfully",
        data: result
    })

})
export const blogPublicController = { getSlugPublicBlog, getallPublicBlog }