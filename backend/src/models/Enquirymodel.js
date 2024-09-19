import mongoose from 'mongoose'
import { conn } from '../config/db/db.js'
const Enquiryschema = mongoose.Schema({
  Name: String,
  Email: String,
  Mobilenumber: String,
  Address: String,
  Country: String,
  State: String,
  City: String,
  Zipcode: String,
  Images: Array,
  Message: String,
  Remarks: String,
  Status: { type: String, default: 'incomplete' }
}, { timestamps: true })

const Enquiry = conn.model('enquiries', Enquiryschema)
export { Enquiry }
