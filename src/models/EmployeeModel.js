import mongoose from 'mongoose'
import { conn } from '../config/db/db.js'

const Employeeschema = mongoose.Schema({
  First_Name: String,
  Last_Name: String,
  Email: String,
  Password: String,
  Mobilenumber: String,
  Address:String,
  City:String,
  State:String,
  Country:String,
  Role: { type: String, default: 'User' },
  OTP: String,
  Status: { type: String, default: 'Inactive' }
}, { timestamps: true })




const Shippingschema = mongoose.Schema({
  First_Name: String,
  Last_Name: String,
  Email: String,
  Password: String,
  Mobilenumber: String,
  Address:String,
  City:String,
  State:String,
  Country:String,
  Role: { type: String, default: 'User' },
  OTP: String,
  Status: { type: String, default: 'Inactive' }
}, { timestamps: true })










const Employee = conn.model('employees', Employeeschema)
const Shipping = conn.model('shipping', Shippingschema)
export { Employee , Shipping }
