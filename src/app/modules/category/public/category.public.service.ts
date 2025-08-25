import QueryBuilder from "../../../builder/QueryBuilder";
import { CategorySearchableFields } from "../category.constant";
import { CategoryModel } from "../category.model";


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
export const CategoryPublicService = {
    getAllPublicCategoryIntoDB
}