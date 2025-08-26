"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoute = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middlewares/auth");
const category_controller_1 = require("./category.controller");
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const category_validation_1 = require("./category.validation");
const category_public_controller_1 = require("./public/category.public.controller");
const router = express_1.default.Router();
// public 
router.get('/public/', category_public_controller_1.categoryPublicController.getAllPublicCategory);
router.get('/public/:slug', category_public_controller_1.categoryPublicController.getSlugPubliCategory);
//auth
router.post('/', auth_1.auth.authUser, (0, validationRequest_1.default)(category_validation_1.createCategoryValidationSchema), category_controller_1.categoryController.createCategory);
router.get('/', auth_1.auth.authUser, category_controller_1.categoryController.getCategory);
router.get('/:categoryId', auth_1.auth.authUser, category_controller_1.categoryController.singleCategory);
router.patch('/:categoryId', auth_1.auth.authUser, (0, validationRequest_1.default)(category_validation_1.updateCategoryValidationSchema), category_controller_1.categoryController.updateCategory);
router.delete('/:categoryId', auth_1.auth.authUser, category_controller_1.categoryController.deleteCategory);
exports.CategoryRoute = router;
