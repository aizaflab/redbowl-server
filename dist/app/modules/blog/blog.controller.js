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
exports.blogController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const blog_service_1 = require("./blog.service");
const AppError_1 = __importDefault(require("../../error/AppError"));
const cloudinary_1 = require("../../config/cloudinary");
const parseNestedJson_1 = __importDefault(require("../../utils/parseNestedJson"));
const blogCreate = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = (0, parseNestedJson_1.default)(req.body);
    const user = req.user;
    const file = req.file;
    if (!data || !(data === null || data === void 0 ? void 0 : data.category))
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Invalid Body Information");
    if (file) {
        const locaFilePath = file.path;
        const result = yield (0, cloudinary_1.uploadToCloudinary)(locaFilePath, 'blog');
        if (!result)
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Invalid Image Hosint Information");
        data.banner = {
            title: (_a = data.banner) === null || _a === void 0 ? void 0 : _a.title,
            image: result
        };
    }
    const result = yield blog_service_1.BlogService.createBlogIntoDB(data, user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Blog created successfully",
        data: result
    });
}));
const getallBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const user = req.user;
    if (!user)
        throw new Error("Invalid Body Information");
    const result = yield blog_service_1.BlogService.getAllBlogIntoDB(query, user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Blog created successfully",
        data: result
    });
}));
const getSingleBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Id } = req.params;
    if (!Id)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Invalid Id!");
    const result = yield blog_service_1.BlogService.getsingleBlogIntoDB(Id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Blog created successfully",
        data: result
    });
}));
const blogUpdate = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = (0, parseNestedJson_1.default)(req.body);
    const user = req.user;
    const file = req.file;
    const { Id } = req.params;
    if (!data || !Id)
        throw new Error("Invalid Body Information");
    if (file) {
        const locaFilePath = file.path;
        const result = yield (0, cloudinary_1.uploadToCloudinary)(locaFilePath, 'blog');
        if (!result)
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Invalid Image Hosint Information");
        data.banner = {
            title: (_a = data.banner) === null || _a === void 0 ? void 0 : _a.title,
            image: result
        };
    }
    const result = yield blog_service_1.BlogService.updateBlogIntoDB(data, Id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Blog Update successfully",
        data: result
    });
}));
const blogDelete = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Id } = req.params;
    if (!Id)
        throw new Error("Invalid Body Information");
    const result = yield blog_service_1.BlogService.deleteBlogIntoDB(Id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Blog created successfully",
        data: result
    });
}));
const slugGetBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    if (!slug)
        throw new Error("Invalid Body Information");
    const result = yield blog_service_1.BlogService.slugBlogIntoDB(slug);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Blog created successfully",
        data: result
    });
}));
exports.blogController = { blogCreate, blogUpdate, blogDelete, getallBlog, slugGetBlog, getSingleBlog };
