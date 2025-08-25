"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoute = void 0;
const express_1 = __importDefault(require("express"));
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const user_validation_1 = require("../user/user.validation");
const auth_1 = require("../../middlewares/auth");
const blog_controller_1 = require("../blog/blog.controller");
const auth_controller_1 = require("../user/auth.controller");
const router = express_1.default.Router();
// route 
router.patch('users/:userId/block', auth_1.auth.authUser, auth_1.auth.onlyAdmin, (0, validationRequest_1.default)(user_validation_1.updateUserValidationSchema), auth_controller_1.userController.userUpdate);
router.delete('blogs/:Id', auth_1.auth.authUser, auth_1.auth.onlyAdmin, blog_controller_1.blogController.blogDelete);
exports.AdminRoute = router;
