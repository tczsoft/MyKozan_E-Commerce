import mongoose from 'mongoose'
import { conn } from '../config/db/db.js'

const Customerschema = mongoose.Schema({
  First_Name: String,
  Last_Name: String,
  Email: String,
  Password: String,
  Mobilenumber: String,
  Address:String,
  City:String,
  State:String,
  Country:String,
  Zipcode:String,
  Role: { type: String, default: 'Customer' },
  OTP: String,
  Status: { type: String, default: 'Inactive' }
})







const shipingschema = mongoose.Schema(
  {
    First_Name: String,
    Last_Name: String,
    Address_Type: { type: String, default: 'Home' },
    Email: String,
    Mobilenumber: String,
    Address:String,
  City:String,
  State:String,
  Country:String,
    Zipcode: String
   
  },
  { timestamps: true }
)
const Customer = conn.model('customers', Customerschema)
const Shiping = conn.model('shippings', shipingschema)
export { Customer, Shiping }
