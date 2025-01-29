import express from 'express'
import { addToCart, getCartItems, removeFromCart } from '../controllers/cartController.js';
import authMiddleware from '../middleware/auth.js';

const cartRouter = express.Router()

cartRouter.post('/add', authMiddleware, addToCart)
cartRouter.get('/items', authMiddleware, getCartItems)
cartRouter.delete('/items/:id', authMiddleware, removeFromCart)

export default cartRouter;