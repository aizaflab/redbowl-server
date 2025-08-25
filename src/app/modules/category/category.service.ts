import AppError from "../../error/AppError"
import httpStatus from 'http-status'
import { TCategory } from "./category.interface"
import { JwtPayload } from "jsonwebtoken"
import { CategoryModel } from "./category.model"
import QueryBuilder from "../../builder/QueryBuilder"
import { CategorySearchableFields } from "./category.constant"

const createCategoryIntoDB = async (payload: TCategory, user: JwtPayload) => {
    const { _id } = user;
    let payloadData = payload;
    payloadData.user = _id;
    const result = new CategoryModel(payload)
    if (!result) throw new AppError(httpStatus.NOT_FOUND, "Invalid Category Infomation")
    await result.save()
    return result;
}
const getAllCategoryIntoDB = async (query: Record<string, unknown>, user: JwtPayload) => {

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
const singleCategoryIntoDB = async (categoryId: string, user: JwtPayload) => {
    const { _id } = user;
    const result = CategoryModel.findOne({ user: _id, _id: categoryId })
    if (!result) throw new AppError(httpStatus.NOT_FOUND, "Invalid Category Infomation")
    return result;
}
const getCategoryIntoDB = async (categoryId: string, user: JwtPayload) => {

}
const deleteCategoryIntoDB = async (categoryId: string, user: JwtPayload) => {
    const { _id } = user;
    const result = CategoryModel.deleteOne({ user: _id, _id: categoryId })
    if (!result) throw new AppError(httpStatus.NOT_FOUND, "Invalid Delete Infomation")
    return result;
}

const updateCategoryIntoDB = async (categoryId: string, payload: Partial<TCategory>, user: JwtPayload) => {
    const { _id } = user;
    const result = await CategoryModel.findOneAndUpdate({ _id: categoryId, user: _id }, payload, { new: true });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, "Invalid User Infomation")
    return result;
}
export const CategoryService = {
    createCategoryIntoDB, singleCategoryIntoDB, getCategoryIntoDB, deleteCategoryIntoDB, updateCategoryIntoDB,
    getAllCategoryIntoDB
}