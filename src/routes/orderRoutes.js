import express from "express";
import {
  createOrder,
  cancelOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  getfilteroptions,
} from "../controllers/order/orderController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const orderRoutes = express.Router();

orderRoutes.post("/create", authMiddleware(['Admin', 'Customer']), createOrder);


orderRoutes.get("/apigetallorder", authMiddleware(['Admin', 'Customer']), getAllOrders);
orderRoutes.post('/getfilteroptions', authMiddleware([ 'Admin','Customer']), getfilteroptions)
orderRoutes.put("/orders/updatebyid", authMiddleware(['Admin']), updateOrderStatus);
orderRoutes.delete("/orders/deletebyid", authMiddleware(['Admin', 'Customer']), cancelOrder);
orderRoutes.get("/orders/getbyid", authMiddleware(['Admin', 'Customer']), getOrderById);


export default orderRoutes;

