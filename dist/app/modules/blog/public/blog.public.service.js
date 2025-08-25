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
exports.BlogPublicService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../../error/AppError"));
const blog_constant_1 = require("../blog.constant");
const blog_model_1 = require("../blog.model");
const getAllPublicBlogIntoDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
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
            select: "title slug"
        }
    ]);
    const totalItemsQuery = new QueryBuilder_1.default(blog_model_1.BlogModel.find(), query)
        .search(blog_constant_1.BlogSearchableFields)
        .filter();
    const totalItems = yield totalItemsQuery.countDocuments();
    return { bolgs, totalItems };
});
const slugPublicBlogIntoDB = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.BlogModel.findOne({ slug: slug }).populate([
        {
            path: 'user',
            select: "name email profileImage"
        },
        {
            path: 'category',
            select: "title slug"
        }
    ]);
    if (!blog)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Invalid Delete Infomation");
    // const relative blog
    const relativeBlogs = yield blog_model_1.BlogModel.find({ category: blog === null || blog === void 0 ? void 0 : blog.category }).populate([
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
});
exports.BlogPublicService = {
    getAllPublicBlogIntoDB,
    slugPublicBlogIntoDB
};
