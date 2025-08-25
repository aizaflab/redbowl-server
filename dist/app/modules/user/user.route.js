"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const auth_1 = require("../../middlewares/auth");
const multer_1 = require("../../middlewares/multer");
const router = express_1.default.Router();
router.get('/profile', auth_1.auth.authUser, auth_controller_1.userController.userProfile);
router.patch('/', auth_1.auth.authUser, multer_1.upload.single('image'), auth_controller_1.userController.userProfileUpdate);
exports.UserRoute = router;
