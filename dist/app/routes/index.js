"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const blog_route_1 = require("../modules/blog/blog.route");
const admin_route_1 = require("../modules/admin/admin.route");
const user_route_1 = require("../modules/user/user.route");
const category_route_1 = require("../modules/category/category.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoute
    },
    {
        path: '/admin/users',
        route: admin_route_1.AdminRoute
    },
    {
        path: '/user',
        route: user_route_1.UserRoute
    },
    {
        path: '/blogs',
        route: blog_route_1.BlogsRoute
    },
    {
        path: '/categorys',
        route: category_route_1.CategoryRoute
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
