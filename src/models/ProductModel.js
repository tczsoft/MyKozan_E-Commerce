

import mongoose from 'mongoose'
import { conn } from '../config/db/db.js'
const Productschema = mongoose.Schema({
  Images: Array,
  Product_Name: String,
  Product_Description:String,
  // Category: String,
  // Sub_Category:String,
  Material:String,
  Color:String,
  Regular_Price: { type: String, default: 0 },
  Sale_Price: { type: String, default: 0 },
  Discount: { type: String, default: 0 },
  TAX_Percentage: String,
  Avail_Stock: String,
  Item_Code: { type: String},
  Status: { type: String, default: 'Instock' } ,
 

  
}, { timestamps: true })

const Product = conn.model('products', Productschema)
export { Product }