import express from "express";
import {
  createOrder,
  cancelOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  getfilteroptions,
  downloadPDF,
  updateOrder,
} from "../controllers/order/orderController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const orderRoutes = express.Router();

orderRoutes.post("/create", authMiddleware(['Admin', 'Customer']), createOrder);


orderRoutes.get("/apigetallorder", authMiddleware(['Admin', 'Customer']), getAllOrders);
orderRoutes.post('/getfilteroptions', authMiddleware([ 'Admin','Customer']), getfilteroptions)
orderRoutes.put("/orders/updatebyid", authMiddleware(['Admin']), updateOrderStatus);
orderRoutes.delete("/orders/deletebyid", authMiddleware(['Admin', 'Customer']), cancelOrder);
orderRoutes.get('/apigetorderitemsbyid', authMiddleware(['Customer', 'Admin']),  getOrderById)
orderRoutes.post('/downloadPDF', authMiddleware(['Customer', 'Admin']), downloadPDF)
orderRoutes.put('/apiupdateorder', authMiddleware(['Customer', 'Admin']), updateOrder)

export default orderRoutes;

