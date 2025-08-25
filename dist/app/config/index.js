"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join((process.cwd(), '.env')) });
exports.default = {
    port: process.env.PORT || 3000,
    database: process.env.DATABASE_URL,
    webEmail: process.env.WEB_EMAIL,
    webEmailPass: process.env.WEB_EMAIL_PASS,
    webEmailHost: process.env.WEM_HOST,
    NodeDev: process.env.NODE_DEV,
    bcryptSalt: process.env.BCRYPT_SALT_ROUNDS,
    jwtSecret: process.env.JWT_SECRET,
    //cloudinary 
    cloudName: process.env.CLOUD_NAME,
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
};
