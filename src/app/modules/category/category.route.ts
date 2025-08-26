import express from 'express'
import { auth } from '../../middlewares/auth'
import { categoryController } from './category.controller'
import validationRequest from '../../middlewares/validationRequest'
import { createCategoryValidationSchema, updateCategoryValidationSchema } from './category.validation'
import { categoryPublicController } from './public/category.public.controller'

const router = express.Router()
// public 
router.get('/public/', categoryPublicController.getAllPublicCategory)
router.get('/public/:slug', categoryPublicController.getSlugPubliCategory)

//auth
router.post('/', auth.authUser, validationRequest(createCategoryValidationSchema), categoryController.createCategory)
router.get('/', auth.authUser, categoryController.getCategory)
router.get('/:categoryId', auth.authUser, categoryController.singleCategory)
router.patch('/:categoryId', auth.authUser, validationRequest(updateCategoryValidationSchema), categoryController.updateCategory)
router.delete('/:categoryId', auth.authUser, categoryController.deleteCategory)




export const CategoryRoute = router
