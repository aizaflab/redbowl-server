"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogsRoute = void 0;
const express_1 = __importDefault(require("express"));
const blog_controller_1 = require("./blog.controller");
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const blog_validation_1 = require("./blog.validation");
const auth_1 = require("../../middlewares/auth");
const multer_1 = require("../../middlewares/multer");
const blog_public_controller_1 = require("./public/blog.public.controller");
const router = express_1.default.Router();
// public
router.get('/public', blog_public_controller_1.blogPublicController.getallPublicBlog);
router.get('/public/:slug', blog_public_controller_1.blogPublicController.getSlugPublicBlog);
// route 
router.post('/', auth_1.auth.authUser, multer_1.upload.single('image'), (0, validationRequest_1.default)(blog_validation_1.createBlogValidationSchema), blog_controller_1.blogController.blogCreate);
router.get('/', auth_1.auth.authUser, blog_controller_1.blogController.getallBlog);
router.get('/:Id', auth_1.auth.authUser, blog_controller_1.blogController.getSingleBlog);
router.patch('/:Id', auth_1.auth.authUser, multer_1.upload.single('image'), (0, validationRequest_1.default)(blog_validation_1.updateBlogValidationSchema), blog_controller_1.blogController.blogUpdate);
router.delete('/:Id', auth_1.auth.authUser, blog_controller_1.blogController.blogDelete);
exports.BlogsRoute = router;
