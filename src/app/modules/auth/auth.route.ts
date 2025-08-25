import express from 'express'
import validationRequest from '../../middlewares/validationRequest'
import { createUserValidationSchema } from '../user/user.validation'
import { LoginAuthValidationSchema } from './auth.validation'
import { authController } from './auth.controller'
import { upload } from '../../middlewares/multer'

const router = express.Router()

router.post('/register', upload.single('image'), validationRequest(createUserValidationSchema), authController.userCreaetAccount)
router.post('/login', validationRequest(LoginAuthValidationSchema), authController.userLogin)

export const AuthRoute = router




