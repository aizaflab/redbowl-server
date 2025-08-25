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
exports.UserService = void 0;
const AppError_1 = __importDefault(require("../../error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("./user.model");
const profileUserIntoDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findById(_id);
    if (!result)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Invalid User Infomation");
    return result;
});
const updateUserIntoDB = (payload, Id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findOneAndUpdate({ _id: Id }, payload, { new: true });
    if (!result)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Invalid User Infomation");
    return result;
});
const userProfileUpdateIntoDB = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = user;
    const result = yield user_model_1.UserModel.findOneAndUpdate({ _id: _id }, payload, { new: true });
    if (!result)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Invalid User Infomation");
    return result;
});
exports.UserService = {
    updateUserIntoDB,
    profileUserIntoDB,
    userProfileUpdateIntoDB
};
