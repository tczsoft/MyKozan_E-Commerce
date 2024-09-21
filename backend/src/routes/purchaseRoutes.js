import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js';
import { createPurchase, getAllPurchase } from '../controllers/purchase/purchaseController.js';

const purchaseRouter = express.Router()

purchaseRouter.post('/purchase', authMiddleware(['Admin']) , createPurchase);
purchaseRouter.get('/purchase', authMiddleware(['Admin']) , getAllPurchase);
// purchaseRouter.put('/purchase/update', authMiddleware(['Admin']) , updatePurchase);

export default purchaseRouter;
