import mongoose from 'mongoose';
import { conn } from '../config/db/db.js';
import bcrypt from 'bcrypt';

const AdminSchema = new mongoose.Schema({
  First_Name: String,
  Last_Name: String,
  Email: { type: String, unique: true, required: true },
  Password: { type: String, required: true },
  Mobilenumber: String,
  Role: { type: String, default: 'Admin' },
  OTP: String,
  Status: { type: String, default: 'Inactive' },
});


AdminSchema.pre('save', async function (next) {
  if (this.isModified('Password')) {
    const salt = await bcrypt.genSalt(10);
    this.Password = await bcrypt.hash(this.Password, salt);
  }
  next();
});

const Admin = conn.model('admins', AdminSchema);
export { Admin };







