import express from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/order/orderController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const            orderRoutes = express.Router();

orderRoutes.post("/orders",authMiddleware(['Admin','Customer']), createOrder);
orderRoutes.get("/orders",authMiddleware(['Admin','Customer']), getAllOrders);
orderRoutes.put("/orders/updatebyid" ,authMiddleware(['Admin']), updateOrderStatus);
orderRoutes.delete("/orders/deletebyid" ,authMiddleware(['Admin','Customer']), deleteOrder);
orderRoutes.get("/orders/getbyid",authMiddleware(['Admin','Customer']), getOrderById);


export default orderRoutes;

