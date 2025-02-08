import express from 'express'
import { getProfile, loginUser, registerUser, updateProfile } from '../controllers/userController.js'
import authMiddleware from '../middleware/auth.js'
import upload from '../middleware/multer.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/getProfile', authMiddleware, getProfile)
userRouter.post('/updateProfile', upload.single('image'), authMiddleware, updateProfile)

export default userRouter;
