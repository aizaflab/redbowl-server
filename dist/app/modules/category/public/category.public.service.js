"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryPublicService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../../error/AppError"));
const category_constant_1 = require("../category.constant");
const category_model_1 = require("../category.model");
const blog_model_1 = require("../../blog/blog.model");
const getAllPublicCategoryIntoDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryQuery = new QueryBuilder_1.default(category_model_1.CategoryModel.find(), query)
        .search(category_constant_1.CategorySearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const categorys = yield categoryQuery.modelQuery.populate({
        path: 'user',
        select: "name email"
    });
    const totalItemsQuery = new QueryBuilder_1.default(category_model_1.CategoryModel.find(), query)
        .search(category_constant_1.CategorySearchableFields)
        .filter();
    const totalItems = yield totalItemsQuery.countDocuments();
    return { categorys, totalItems };
});
const slugPublicCategoryIntoDB = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield category_model_1.CategoryModel.findOne({ slug: slug });
    if (!category)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Invalid Delete Infomation");
    // const relative blog
    const relativeBlogs = yield blog_model_1.BlogModel.find({ category: category === null || category === void 0 ? void 0 : category._id }).populate([
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
});
exports.CategoryPublicService = {
    getAllPublicCategoryIntoDB, slugPublicCategoryIntoDB
};
