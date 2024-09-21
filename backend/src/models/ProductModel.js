import mongoose from 'mongoose'
import { conn } from '../config/db/db.js'
const Productschema = mongoose.Schema({
  Images: Array,
  Product_Name: String,
  Product_Description:String,
  Category: String,
  Sub_Category:String,
  Regular_Price: { type: Number, default: 0 },
  Sale_Price: { type: Number, default: 0 },
  Discount: { type: Number, default: 0 },
  TAX_Percentage: Number,
  Avail_Stock: Number,
  Item_Code: { type: String , unique: true },
  Status: { type: String, default: 'instock' } 

  // GST_Type: String,
  // Stock: String,
  // Brand_Name: String,
  // Color: String,
  
}, { timestamps: true })

const Product = conn.model('products', Productschema)
export { Product }
