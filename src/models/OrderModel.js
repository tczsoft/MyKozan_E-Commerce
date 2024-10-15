import mongoose from 'mongoose';
import { conn } from '../config/db/db.js';
import moment from 'moment-timezone';

const OrderSchema = new mongoose.Schema(
  {
    Order_id: { type: String, unique: true },
    Order_Date: { type: Date, default: moment().tz('Asia/Kolkata').format('YYYY-MM-DD') },
    Invoice_ID: { type: String, unique: true },
    Billing_Name: String,
    Username: String,
    Email: String,
    Mobilenumber: String,
    Delivery_Address: String,
    Total_Amount: Number,
    Payment_id: String,
    Payment_Type: String,
    Shipping_Cost: Number,
    City: String,
    Delivery_Address_id: String,
    Payment_Status: { type: String, default: "Not Paid" },
    Order_Status: { type: String, default: "Payment Pending" },
    Description: String,
    shipment_id: Number,
  },
  { timestamps: true }
);

const OrderMasterSchema = new mongoose.Schema(
  {
    Order_id: String,
    Username: String,
    Product_Name: String,
    Images: Array,
    Description: String,
    Sale_Price: Number,
    // GST_Type: String,
    TAX_Percentage: Number,
    Discount: { type: Number, default: 0 },
    Quantity: Number,
  },
  { timestamps: true }
);

const Order = conn.model('orders',OrderSchema);
const Ordermaster = conn.model('ordermasters', OrderMasterSchema);

export { Order, Ordermaster };


