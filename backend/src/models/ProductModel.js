import mongoose from 'mongoose'
import { conn } from '../config/db/db.js'
const Productschema = mongoose.Schema({
  Images: Array,
  Product_Name: String,
  // Brand_Name: String,
  Product_Description:String,
  Category: String,
  Sub_Category:String,
  // Stock: String,
  Regular_Price: { type: Number, default: 0 },
  Sale_Price: { type: Number, default: 0 },
  // Color: String,
  Discount: { type: Number, default: 0 },
  // GST_Type: String,
  TAX_Percentage: Number,
  Status: { type: String, default: 'instock' }
}, { timestamps: true })

const Product = conn.model('products', Productschema)
export { Product }
