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
exports.BlogService = void 0;
const AppError_1 = __importDefault(require("../../error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const blog_model_1 = require("./blog.model");
const category_model_1 = require("../category/category.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const blog_constant_1 = require("./blog.constant");
const createBlogIntoDB = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = user;
    payload.user = userData === null || userData === void 0 ? void 0 : userData._id;
    const checkCategory = category_model_1.CategoryModel.findById({ _id: payload === null || payload === void 0 ? void 0 : payload.category });
    if (!checkCategory)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Invalid Category ID");
    const result = yield blog_model_1.BlogModel.create(payload);
    if (!result)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Invalid User Infomation");
    return result;
});
const getAllBlogIntoDB = (query, user) => __awaiter(void 0, void 0, void 0, function* () {
    const blogQuery = new QueryBuilder_1.default(blog_model_1.BlogModel.find(), query)
        .search(blog_constant_1.BlogSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const bolgs = yield blogQuery.modelQuery.populate([
        {
            path: 'user',
            select: "name email profileImage"
        },
        {
            path: 'category',
            select: "title"
        }
    ]);
    const totalItemsQuery = new QueryBuilder_1.default(blog_model_1.BlogModel.find(), query)
        .search(blog_constant_1.BlogSearchableFields)
        .filter();
    const totalItems = yield totalItemsQuery.countDocuments();
    return { bolgs, totalItems };
});
const getsingleBlogIntoDB = (Id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.BlogModel.findOne({ _id: Id }).populate({
        path: 'user',
        select: "name email"
    });
    return result;
});
const updateBlogIntoDB = (payload, Id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.BlogModel.findOneAndUpdate({ _id: Id }, payload, { new: true });
    if (!result)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Invalid User Infomation");
    return result;
});
const deleteBlogIntoDB = (Id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.BlogModel.deleteOne({ _id: Id });
    if (!result)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Invalid Delete Infomation");
    return result;
});
const slugBlogIntoDB = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.BlogModel.findOne({ slug: slug }).populate({
        path: 'category',
        select: "title slug"
    });
    if (!result)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Invalid Delete Infomation");
    return result;
});
exports.BlogService = {
    createBlogIntoDB,
    updateBlogIntoDB,
    getAllBlogIntoDB,
    deleteBlogIntoDB,
    getsingleBlogIntoDB,
    slugBlogIntoDB
};
