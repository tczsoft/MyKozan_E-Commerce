// import mongoose from 'mongoose'
// import { conn } from '../config/db/db.js'
// const Productschema = mongoose.Schema({
//   Images: Array,
//   Product_Name: String,
//   Product_Description:String,
//   Category: String,
//   Sub_Category:String,
//   Regular_Price: { type: Number, default: 0 },
//   Sale_Price: { type: Number, default: 0 },
//   Discount: { type: Number, default: 0 },
//   TAX_Percentage: Number,
//   Avail_Stock: Number,
//   Item_Code: { type: String , unique: true },
//   Status: { type: String, default: 'instock' } 

//   // GST_Type: String,
//   // Stock: String,
//   // Brand_Name: String,
//   // Color: String,
  
// }, { timestamps: true })

// const Product = conn.model('products', Productschema)
// export { Product }


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
  Status: { type: String, default: 'instock' } ,
  General: [
    {
      Material: { type: String },
      Shape: { type: String },
      Place_of_Origin: { type: String },
      Brand_Name: { type: String, default: "No" },
      Modal_Number: { type: String, default: "No" },
      Design: { type: String, default: "Customized Designs" },
      MOQ: { type: Number, default: 50 }, 
      Usage: { type: String, default: "Multi-Purpose" },
      Function: { type: String, default: "Reliable , Usable" }
    }
  ],
  Specs:[
    {
      Star_Rate: {  type: String , default:"4.6" },
      Rating_mem: {  type: String , default:"1256" },
      Review_mem: {  type: String , default:"652" },
      Sales_Package: {  type: String, default:"Pack of 1 Cloth Dryer Stand" },
      Pack_of: {  type: String, default: "1" },
    }
  ]

  
  
}, { timestamps: true })

const Product = conn.model('products', Productschema)
export { Product }