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
exports.uploadToCloudinary = void 0;
const fs_1 = __importDefault(require("fs"));
const cloudinary_1 = require("cloudinary");
const path_1 = __importDefault(require("path")); // Import path module to handle file paths
const uploadToCloudinary = (localFilePath, folder) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract the filename from the local file path
        const fileName = path_1.default.basename(localFilePath, path_1.default.extname(localFilePath)); // Filename without extension
        const filePathOnCloudinary = `${folder}/${fileName}`;
        // Upload the file to Cloudinary
        const result = yield cloudinary_1.v2.uploader.upload(localFilePath, { public_id: filePathOnCloudinary });
        // Delete the local file after upload
        fs_1.default.unlinkSync(localFilePath);
        return result.secure_url; // Return the secure HTTPS URL
    }
    catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        // Delete the local file if it exists in case of an error
        if (fs_1.default.existsSync(localFilePath)) {
            fs_1.default.unlinkSync(localFilePath);
        }
        return null;
    }
});
exports.uploadToCloudinary = uploadToCloudinary;
