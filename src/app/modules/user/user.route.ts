import express from 'express'
import { userController } from './auth.controller'
import { auth } from '../../middlewares/auth'
import { upload } from '../../middlewares/multer'

const router = express.Router()

router.get('/profile', auth.authUser, userController.userProfile)
router.patch('/', auth.authUser, upload.single('image'), userController.userProfileUpdate)

export const UserRoute = router




