import express from 'express'
import { appointAvailable, appointmentBook } from '../controllers/appointmentController.js'
import authMiddleware from '../middleware/auth.js'

const appointmentRouter = express.Router()

appointmentRouter.get('/appointAvailable', authMiddleware, appointAvailable )
appointmentRouter.post('/appointmentBook', authMiddleware, appointmentBook)

export default appointmentRouter;