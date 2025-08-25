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
exports.CategoryService = void 0;
const AppError_1 = __importDefault(require("../../error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const category_model_1 = require("./category.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const category_constant_1 = require("./category.constant");
const createCategoryIntoDB = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = user;
    let payloadData = payload;
    payloadData.user = _id;
    const result = new category_model_1.CategoryModel(payload);
    if (!result)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Invalid Category Infomation");
    yield result.save();
    return result;
});
const getAllCategoryIntoDB = (query, user) => __awaiter(void 0, void 0, void 0, function* () {
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
const singleCategoryIntoDB = (categoryId, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = user;
    const result = category_model_1.CategoryModel.findOne({ user: _id, _id: categoryId });
    if (!result)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Invalid Category Infomation");
    return result;
});
const getCategoryIntoDB = (categoryId, user) => __awaiter(void 0, void 0, void 0, function* () {
});
const deleteCategoryIntoDB = (categoryId, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = user;
    const result = category_model_1.CategoryModel.deleteOne({ user: _id, _id: categoryId });
    if (!result)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Invalid Delete Infomation");
    return result;
});
const updateCategoryIntoDB = (categoryId, payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = user;
    const result = yield category_model_1.CategoryModel.findOneAndUpdate({ _id: categoryId, user: _id }, payload, { new: true });
    if (!result)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Invalid User Infomation");
    return result;
});
exports.CategoryService = {
    createCategoryIntoDB, singleCategoryIntoDB, getCategoryIntoDB, deleteCategoryIntoDB, updateCategoryIntoDB,
    getAllCategoryIntoDB
};
