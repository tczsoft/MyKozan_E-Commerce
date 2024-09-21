import mongoose from "mongoose";
import { conn } from "../config/db/db.js";

const PurchaseSchema = new mongoose.Schema(
  {
    Purchase_id: { type: String, unique: true },
    Purchase_Date: { type: Date, default: Date.now },
    Supplier_Name: { type: String, required: true },
    Total_Amount: { type: Number, required: true },
    Payment_Status: { type: String, default: "Pending" },
    Description: { type: String },
  },
  { timestamps: true }
);

const PurchaseMasterSchema = new mongoose.Schema(
  {
    Purchase_id: { type: String, required: true },
    Product_Name: { type: String, required: true },
    Quantity: { type: Number, required: true },
    Purchase_Price: { type: Number, required: true },
    Total_Price: { type: Number, required: true },
    Item_Code: { type: String, unique: true },
  },
  { timestamps: true }
);

const PurchaseMaster = conn.model("purchasemasters", PurchaseMasterSchema);
const Purchase = conn.model("purchases", PurchaseSchema);
export { Purchase, PurchaseMaster };
