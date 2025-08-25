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
exports.userController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const user_service_1 = require("./user.service");
const cloudinary_1 = require("../../config/cloudinary");
const AppError_1 = __importDefault(require("../../error/AppError"));
;
const userProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req === null || req === void 0 ? void 0 : req.user;
    if (!_id)
        throw new Error("Invalid _id Information");
    const result = yield user_service_1.UserService.profileUserIntoDB(_id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Blog created successfully",
        data: result
    });
}));
const userProfileUpdate = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const user = req.user;
    const file = req.file;
    if (file) {
        const locaFilePath = file.path;
        const result = yield (0, cloudinary_1.uploadToCloudinary)(locaFilePath, 'profile');
        if (!result)
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Invalid Image Hosint Information");
        data.profileImage = result;
    }
    const result = yield user_service_1.UserService.userProfileUpdateIntoDB(data, user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "User Update successfully",
        data: result
    });
}));
const userUpdate = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const { Id } = req.params;
    if (!data || !Id)
        throw new Error("Invalid Body Information");
    const result = yield user_service_1.UserService.updateUserIntoDB(data, Id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "User Update successfully",
        data: result
    });
}));
exports.userController = { userUpdate, userProfile, userProfileUpdate };
