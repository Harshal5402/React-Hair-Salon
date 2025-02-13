import express from "express"
import { handlePaymentSuccess, stripePayment } from "../controllers/paymentController.js"
import authMiddleware from "../middleware/auth.js";

const paymentRouter = express.Router()

paymentRouter.post('/create-payment', authMiddleware, stripePayment);
paymentRouter.get('/payment-success', authMiddleware, handlePaymentSuccess);

export default paymentRouter;