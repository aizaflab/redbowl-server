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
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const user_model_1 = require("../user/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const JWT_SECRET = config_1.default.jwtSecret;
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = new user_model_1.UserModel(payload);
    if (!result)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Invalid User Infomation");
    yield result.save();
    return result;
});
const loginUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    if (!email || !password)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Invalid email and password !");
    const user = yield user_model_1.UserModel.findOne({ email: email }).select('+password');
    if (!user)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `Invalid ${email} no record create !`);
    const isDeleted = user === null || user === void 0 ? void 0 : user.isBlocked;
    if (isDeleted) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is deleted !');
    }
    // Compare provided password with the hashed password
    const isPasswordValid = yield bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
    if (!isPasswordValid) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid password!');
    }
    const token = jsonwebtoken_1.default.sign({
        _id: user === null || user === void 0 ? void 0 : user._id,
        email: user === null || user === void 0 ? void 0 : user.email,
        role: user === null || user === void 0 ? void 0 : user.role,
        isBlocked: user === null || user === void 0 ? void 0 : user.isBlocked,
    }, JWT_SECRET, { expiresIn: "10d" });
    const auth = { token, user };
    return auth;
});
exports.AuthService = {
    createUserIntoDB, loginUserIntoDB
};
