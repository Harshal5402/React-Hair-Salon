import express from 'express'
import { appointAvailable, appointmentBook } from '../controllers/appointmentController.js'

const appointmentRouter = express.Router()

appointmentRouter.get('/appointAvailable', appointAvailable )
appointmentRouter.post('/appointmentBook', appointmentBook)

export default appointmentRouter;