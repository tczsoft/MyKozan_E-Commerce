import express from 'express';
import { createShipping, getAllShippings, updateShipping } from '../controllers/shipping/shippingController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const shippingRoutes = express.Router();

shippingRoutes.post('/shipping',authMiddleware(['Admin','Customer']) , createShipping);
shippingRoutes.get('/shipping',authMiddleware(['Admin']), getAllShippings);
shippingRoutes.put('/shipping/update',authMiddleware(['Admin','Customer']), updateShipping);


export default shippingRoutes;



// shippingRoutes.get('/shipping/:id', getShippingById);
