import AppError from "../../error/AppError"
import httpStatus from 'http-status'
import { TBlog } from "./blog.interface"
import { BlogModel } from "./blog.model"
import { JwtPayload } from "jsonwebtoken"
import { CategoryModel } from "../category/category.model"
import QueryBuilder from "../../builder/QueryBuilder"
import { BlogSearchableFields } from "./blog.constant"

const createBlogIntoDB = async (payload: TBlog, user: JwtPayload) => {
    const userData = user;
    payload.user = userData?._id;
    const checkCategory = CategoryModel.findById({ _id: payload?.category })
    if (!checkCategory) throw new AppError(httpStatus.NOT_FOUND, "Invalid Category ID")
    const result = await BlogModel.create(payload)
    if (!result) throw new AppError(httpStatus.NOT_FOUND, "Invalid User Infomation")
    return result;
}
const getAllBlogIntoDB = async (query: Record<string, unknown>, user: JwtPayload) => {
    const blogQuery = new QueryBuilder(BlogModel.find(), query)
        .search(BlogSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields()

    const bolgs = await blogQuery.modelQuery.populate([
        {
            path: 'user',
            select: "name email profileImage"
        },
        {
            path: 'category',
            select: "title"
        }
    ]);
    const totalItemsQuery = new QueryBuilder(BlogModel.find(), query)
        .search(BlogSearchableFields)
        .filter();

    const totalItems = await totalItemsQuery.countDocuments();



    return { bolgs, totalItems };
}
const getsingleBlogIntoDB = async (Id: string) => {
    const result = await BlogModel.findOne({ _id: Id }).populate({
        path: 'user',
        select: "name email"
    });
    return result;
}

const updateBlogIntoDB = async (payload: Partial<TBlog>, Id: string) => {
    const result = await BlogModel.findOneAndUpdate({ _id: Id }, payload, { new: true });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, "Invalid User Infomation")
    return result;
}

const deleteBlogIntoDB = async (Id: string) => {
    const result = await BlogModel.deleteOne({ _id: Id });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, "Invalid Delete Infomation")
    return result;
}
const slugBlogIntoDB = async (slug: string) => {
    const result = await BlogModel.findOne({ slug: slug }).populate({
        path: 'category',
        select: "title slug"
    });

    if (!result) throw new AppError(httpStatus.NOT_FOUND, "Invalid Delete Infomation")
    return result;
}


export const BlogService = {
    createBlogIntoDB,
    updateBlogIntoDB,
    getAllBlogIntoDB,
    deleteBlogIntoDB,
    getsingleBlogIntoDB,
    slugBlogIntoDB
}