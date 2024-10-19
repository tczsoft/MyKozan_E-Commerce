import express from 'express';
import { createShipping, deleteShipping, getAllShippings, updateShipping } from '../controllers/shipping/shippingController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const shippingRoutes = express.Router();

shippingRoutes.post('/shipping',authMiddleware(['Admin','Customer']) , createShipping);
shippingRoutes.get('/getallshipping',authMiddleware(['Admin','Customer']), getAllShippings);
shippingRoutes.put('/shipping/update',authMiddleware(['Admin','Customer']), updateShipping);
shippingRoutes.delete('/shipping/delete',authMiddleware(['Admin','Customer']),deleteShipping);



export default shippingRoutes;



// shippingRoutes.get('/shipping/:id', getShippingById);
