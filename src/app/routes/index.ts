import express from 'express'
import { AuthRoute } from '../modules/auth/auth.route';
import { BlogsRoute } from '../modules/blog/blog.route';
import { AdminRoute } from '../modules/admin/admin.route';
import { UserRoute } from '../modules/user/user.route';
import { CategoryRoute } from '../modules/category/category.route';


const router = express.Router()

const moduleRoutes = [
    {
        path: '/auth',
        route: AuthRoute
    },
    {
        path: '/admin/users',
        route: AdminRoute
    },
    {
        path: '/user',
        route: UserRoute
    },
    {
        path: '/blogs',
        route: BlogsRoute
    },
    {
        path: '/categorys',
        route: CategoryRoute
    },

]

moduleRoutes.forEach(route => router.use(route.path, route.route));




export default router;



