import express from "express"
import { stripePayment } from "../controllers/paymentController.js"

const paymentRouter = express.Router()

paymentRouter.post('/create-payment', stripePayment);

export default paymentRouter;