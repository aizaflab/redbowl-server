"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const express_1 = __importDefault(require("express"));
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const user_validation_1 = require("../user/user.validation");
const auth_validation_1 = require("./auth.validation");
const auth_controller_1 = require("./auth.controller");
const multer_1 = require("../../middlewares/multer");
const router = express_1.default.Router();
router.post('/register', multer_1.upload.single('image'), (0, validationRequest_1.default)(user_validation_1.createUserValidationSchema), auth_controller_1.authController.userCreaetAccount);
router.post('/login', (0, validationRequest_1.default)(auth_validation_1.LoginAuthValidationSchema), auth_controller_1.authController.userLogin);
exports.AuthRoute = router;
