import express from 'express'
import { appointAvailable, appointmentBook, appointmentRemove, fetchAppointment } from '../controllers/appointmentController.js'
import authMiddleware from '../middleware/auth.js'

const appointmentRouter = express.Router()

appointmentRouter.get('/appointAvailable', authMiddleware, appointAvailable )
appointmentRouter.post('/appointmentBook', authMiddleware, appointmentBook)
appointmentRouter.get('/appointment', authMiddleware, fetchAppointment);
appointmentRouter.delete('/appointmentRemove', authMiddleware, appointmentRemove);

export default appointmentRouter;