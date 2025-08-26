import httpStatus from "http-status";
import QueryBuilder from "../../../builder/QueryBuilder";
import AppError from "../../../error/AppError";
import { CategorySearchableFields } from "../category.constant";
import { CategoryModel } from "../category.model";
import { BlogModel } from "../../blog/blog.model";


const getAllPublicCategoryIntoDB = async (query: Record<string, unknown>) => {
    const categoryQuery = new QueryBuilder(CategoryModel.find(), query)
        .search(CategorySearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const categorys = await categoryQuery.modelQuery.populate({
        path: 'user',
        select: "name email"
    });

    const totalItemsQuery = new QueryBuilder(CategoryModel.find(), query)
        .search(CategorySearchableFields)
        .filter();

    const totalItems = await totalItemsQuery.countDocuments();

    return { categorys, totalItems };
}

const slugPublicCategoryIntoDB = async (slug: string) => {
    const category = await CategoryModel.findOne({slug:slug})
    if (!category) throw new AppError(httpStatus.NOT_FOUND, "Invalid Delete Infomation")
    // const relative blog
    const relativeBlogs = await BlogModel.find({ category: category?._id }).populate([
        {
            path: 'user',
            select: "name email profileImage"
        },
        {
            path: 'category',
            select: "title slug"
        }
    ]).limit(5);
    return { category, relativeBlogs };
}





export const CategoryPublicService = {
    getAllPublicCategoryIntoDB,slugPublicCategoryIntoDB
}