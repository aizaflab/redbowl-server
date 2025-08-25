import express from 'express'
import { blogController } from './blog.controller'
import validationRequest from '../../middlewares/validationRequest'
import { createBlogValidationSchema, updateBlogValidationSchema } from './blog.validation'
import { auth } from '../../middlewares/auth'
import { upload } from '../../middlewares/multer'
import { blogPublicController } from './public/blog.public.controller'

const router = express.Router()


// public
router.get('/public',blogPublicController.getallPublicBlog)
router.get('/public/:slug', blogPublicController.getSlugPublicBlog)

// route 
router.post('/', auth.authUser, upload.single('image'), validationRequest(createBlogValidationSchema), blogController.blogCreate)
router.get('/', auth.authUser, blogController.getallBlog)
router.get('/:Id', auth.authUser, blogController.getSingleBlog)
router.patch('/:Id', auth.authUser, upload.single('image'), validationRequest(updateBlogValidationSchema), blogController.blogUpdate)
router.delete('/:Id', auth.authUser, blogController.blogDelete)


export const BlogsRoute = router
