import { Createtoken } from '../../services/tokenService.js';
import bcrypt from 'bcrypt';
import { Customer } from '../../models/CustomerModel.js';
import { Admin } from '../../models/AdminModel.js';

export const Login = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const adminData = await Admin.findOne({ Email,Password, Status: 'Active' });
    if (adminData) {
        const token = Createtoken({ _id: adminData._id, Email: adminData.Email, Role: adminData.Role });
        return res.send({ status: 'Success', token, role: 'admin', Role: adminData.Role });
    }
    const customerData = await Customer.findOne({ Email, Status: 'Active' });
    if (customerData) {
      const isPasswordValid = await bcrypt.compare(Password, customerData.Password);
      if (isPasswordValid) {
        const token = Createtoken({ _id: customerData._id, First_Name: customerData.First_Name, Email: customerData.Email, Role: customerData.Role });
        return res.send({ status: 'Success', token, role: 'customer', Role: customerData.Role });
      } else {
        return res.send({ status: 'Invalid email or password' });
      }
    }

  






   
    return res.send({ status: 'Invalid email or password' });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ status: 'Error', message: 'Server error' });
  }
};
