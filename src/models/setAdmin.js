import mongoose from 'mongoose';

import { Admin } from './models/AdminModel.js'; // Adjust the path as necessary

const setAdmin = async () => {
  try {
    // Connect to your MongoDB
    await mongoose.connect('mongodb://localhost:27017/mykozan');  // Update with your DB URL

    const existingAdmin = await Admin.findOne({ Email: 'krishnaofficial2802@gmail.com' });
    
    // Check if admin already exists
    if (existingAdmin) {
      console.log('Admin already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash('1234', 10);  // Hashing the password

    const newAdmin = new Admin({
      Email: 'krishnaofficial2802@gmail.com',
      Password: hashedPassword,
      Role: 'admin',
      Status: 'Active',
    });

    await newAdmin.save();  // Save the new admin to the database
    console.log('Admin created successfully');
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    await mongoose.disconnect();  // Disconnect from the DB
  }
};

setAdmin();
