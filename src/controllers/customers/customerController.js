import mongoose from 'mongoose'
import { Customer } from '../../models/CustomerModel.js';


export const getallCustomers = async (req, res, next) => {
  try {
    const { first, rows, globalfilter, email, colfilter } = req.query;
    const fieldArray = Object.keys(Customer.schema.obj);
    const emailFilter = email ? { Email: email } : {};
    const globalFilter = globalfilter ? { $or: fieldArray.filter((field1) => Customer.schema.path(field1) instanceof mongoose.Schema.Types.String).map(field => ({ [field]: { $regex: globalfilter, $options: 'i' } })) ,...emailFilter} : emailFilter;
    const filter = colfilter?{ ...globalFilter,...colfilter} : globalFilter;
    const resdata = await Customer.find(filter).skip(first).limit(rows);
    const totallength = await Customer.countDocuments(filter);
    res.send({ resdata, totallength });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

export const getfilteroptions= async (req, res, next) => {
  try {
    const { field } = req.body;
    const updatedData = await Customer.distinct(field);
    res.send({[field]:updatedData});
  } catch (error) {
    console.error("Error updating record:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



export const updateCustomer = async (req, res, next) => {
  try {
    const { Email } = req.body;  
    console.log('Request body:', req.body);  

    const updateFields = req.body; 
    delete updateFields.Email;
    const updatedCustomer = await Customer.findOneAndUpdate(
      { Email },  
      { $set: updateFields }, 
      { new: true, runValidators: true }  
    );

    if (!updatedCustomer) {
      return res.status(404).send({ message: 'Customer not found' });
    }

    res.send({ message: 'Customer updated successfully', updatedCustomer });
  } catch (err) {
    console.error('Error updating customer:', err);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

