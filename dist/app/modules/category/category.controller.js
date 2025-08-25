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
exports.categoryController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const category_service_1 = require("./category.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const createCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const user = req.user;
    if (!data || !user)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Category not Found");
    const result = yield category_service_1.CategoryService.createCategoryIntoDB(data, user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "create Category success",
        data: result
    });
}));
const singleCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    const user = req.user;
    if (!categoryId || !user)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Category not Found");
    const result = yield category_service_1.CategoryService.singleCategoryIntoDB(categoryId, user);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "create Category success",
        data: result
    });
}));
const updateCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    const data = req.body;
    const user = req.user;
    if (!categoryId || !user || !data)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Category not Found");
    const result = yield category_service_1.CategoryService.updateCategoryIntoDB(categoryId, data, user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "create Category success",
        data: result
    });
}));
const deleteCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    const user = req.user;
    if (!categoryId || !user)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Category not Found");
    const result = yield category_service_1.CategoryService.deleteCategoryIntoDB(categoryId, user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "create Category success",
        data: result
    });
}));
const getCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const query = req.query;
    if (!user || !query)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Category not Found");
    const result = yield category_service_1.CategoryService.getAllCategoryIntoDB(query, user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "create Category success",
        data: result
    });
}));
exports.categoryController = { createCategory, singleCategory, updateCategory, deleteCategory, getCategory };
