import express from "express"
import { stripePayment } from "../controllers/paymentController.js"
import authMiddleware from "../middleware/auth.js";

const paymentRouter = express.Router()

paymentRouter.post('/create-payment', authMiddleware, stripePayment);

export default paymentRouter;