import httpStatus from "http-status";
import QueryBuilder from "../../../builder/QueryBuilder";
import AppError from "../../../error/AppError";
import { BlogSearchableFields } from "../blog.constant";
import { BlogModel } from "../blog.model";

const getAllPublicBlogIntoDB = async (query: Record<string, unknown>) => {
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
            select: "title slug"
        }
    ]);

    const totalItemsQuery = new QueryBuilder(BlogModel.find(), query)
        .search(BlogSearchableFields)
        .filter();

    const totalItems = await totalItemsQuery.countDocuments();


    return { bolgs, totalItems };
}


const slugPublicBlogIntoDB = async (slug: string) => {
    const blog = await BlogModel.findOne({ slug: slug }).populate([
        {
            path: 'user',
            select: "name email profileImage"
        },
        {
            path: 'category',
            select: "title slug"
        }
    ]);
    if (!blog) throw new AppError(httpStatus.NOT_FOUND, "Invalid Delete Infomation")
    // const relative blog
    const relativeBlogs = await BlogModel.find({ category: blog?.category }).populate([
        {
            path: 'user',
            select: "name email profileImage"
        },
        {
            path: 'category',
            select: "title slug"
        }
    ]).limit(2);

    return { blog, relativeBlogs };
}


export const BlogPublicService = {
    getAllPublicBlogIntoDB,
    slugPublicBlogIntoDB
}