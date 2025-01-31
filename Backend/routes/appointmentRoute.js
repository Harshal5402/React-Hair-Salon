import express from 'express'
import { appointAvailable, appointmentBook, appointmentRemove, getAppointment, FetchAppointment } from '../controllers/appointmentController.js'
import authMiddleware from '../middleware/auth.js'

const appointmentRouter = express.Router()

appointmentRouter.get('/appointAvailable', authMiddleware, appointAvailable )
appointmentRouter.post('/appointmentBook', authMiddleware, appointmentBook)
appointmentRouter.get('/getappointment', authMiddleware, getAppointment);
appointmentRouter.delete('/appointmentRemove', authMiddleware, appointmentRemove);
appointmentRouter.get('/fetchappointment', authMiddleware, FetchAppointment);

export default appointmentRouter;