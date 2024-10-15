import mongoose from "mongoose";
import { conn } from '../config/db/db.js';

const Cartschema = mongoose.Schema({
    Email: String,
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'savebooks' }, 
    Quantity: { type: Number, default: 1 },
  }, { timestamps: true });
  
  const Cart = conn.model('carts', Cartschema);
  export { Cart };

