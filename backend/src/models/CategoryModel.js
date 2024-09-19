import mongoose from 'mongoose'
import { conn } from '../config/db/db.js'

const Categoryschema = mongoose.Schema({
  Images: Array,
  Category_Name: String,
  Subcategories: Array,
  Brand_Name: String,
  Card_color: String,
  Status: { type: String, default: 'Inactive' }
})
const Category = conn.model('categories', Categoryschema)
export { Category }
