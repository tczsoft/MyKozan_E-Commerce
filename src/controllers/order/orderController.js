import moment from "moment-timezone";
import { Order, Ordermaster } from "../../models/OrderModel.js";
import { Product  } from "../../models/ProductModel.js";
import mongoose from "mongoose";
import { generatepdf } from "../../services/email/invoicedesign.js";


export const getAllOrders = async (req, res, next) => {
  try {
    const { first, rows, globalfilter, colfilter } = req.query;

    const fieldArray = Object.keys(Order.schema.obj);
    const globalFilter = globalfilter ? { $or: fieldArray.filter((field1) => Order.schema.path(field1) instanceof mongoose.Schema.Types.String).map(field => ({ [field]: { $regex: globalfilter, $options: 'i' } })) } : {};
    const emailFilter = req.user.Role == 'Customer' ? {...globalFilter, Email: req.user.Email } : globalFilter;
    const filter = colfilter?{ ...colfilter, ...emailFilter }:emailFilter;
    const resdata = await Order.find(filter).sort({ createdAt: -1 }).skip(first).limit(rows);
    const totallength = await Order.countDocuments(filter);
    res.send({ resdata, totallength });
  } catch (err) {
    console.error(err);
  }
};



export const createOrder = async (req, res) => {
  try {
    const { orderdata, ordermasterdata } = req.body;
    console.log(req.body)
    const generateUniqueIds = () => {
      const orderId = `MYKO_${moment().format('DDMMYY_HHmmss')}`;
      const invoiceId = `INV_${moment().format('YYMMDD')}_${Math.floor(Math.random() * 10000)}`;
      return { orderId, invoiceId };
    };

    const { orderId, invoiceId } = generateUniqueIds();

    const newOrder = {
      ...orderdata,
      Order_id: orderId,
      Invoice_ID: invoiceId,
      Order_Date: moment().tz('Asia/Kolkata').format('YYYY-MM-DD'),
    };

    const savedOrder = await new Order(newOrder).save();

    // Prepare product order data
    const productOrders = ordermasterdata.map((product) => ({
      Order_id: orderId,
      Username: orderdata.Username,
      Product_Name: product.Product_Name,
      Images: product.Images,
      Sale_Price: product.Sale_Price,
      Discount: product.Discount,
      Quantity: product.Quantity,
    }));

    // Save product order data in Ordermaster
    await Ordermaster.insertMany(productOrders);

    // Optional: Update product stock
    for (const product of ordermasterdata) {
      await Product.findOneAndUpdate(
        { Product_Name: product.Product_Name },
        { $inc: { Avail_Stock: -product.Quantity } }
      );
    }

    res.status(200).json({
      message: 'Order and product details saved successfully!',
      order: savedOrder,
      products: productOrders,
    });
  } catch (error) {
    console.error('Error while creating order:', error);
    res.status(500).json({ message: 'Error creating order', error });
  }
};


export const getOrderById = async (req, res) => {
  try {
    const { Order_id } = req.query
    const resdata = await Ordermaster.find({ Order_id })
    res.send(resdata)
  } catch (err) {
    console.error(err)
  }
}

export const updateOrderStatus = async (req, res) => {
  try {
    const { _id } = req.query;
    const { Order_Status,  } = req.body;
    const currentOrder = await Order.findById(_id);
    const statusHasChanged = currentOrder.Order_Status !== Order_Status;
    const updateFields = { Order_Status };
    if (statusHasChanged) {
      updateFields.Updated_At = moment().format(); 
    }
    const updatedOrder = await Order.findByIdAndUpdate(_id, updateFields, { new: true });
    res.send({ message: "Order updated successfully", updatedOrder });
 } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating order", error });
  }
};

    // const updatedOrder = await Order.findOneAndUpdate({ _id },{ Order_Status,  Updated_At: Order_Status ? new Date() : res.body });
    // if (!updatedOrder) {
    //   return res.status(20).json({ message: "Order not found" });
    // }
    // res
    //   .status(200)
    //   .json({ message: "Order updated successfully", updatedOrder });
 



// Delete order


export const cancelOrder = async (req, res) => {
  try {
    const { Order_id } = req.query;
    const orderItems = await Ordermaster.find({ Order_id });
    // const canceledOrder = await Order.findOneAndDelete({ Order_id });
    //                      await Ordermaster.deleteMany({ Order_id });
      const canceledOrder = await Ordermaster.updateMany({ Order_id });
   
    for (const item of orderItems) {
      await Product.findOneAndUpdate(
        { Product_Name: item.Product_Name },
        { $inc: { Avail_Stock: +item.Quantity } } 
      );}
  res.send({message: "Order deleted successfully", canceledOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting order", error });
  }
};


export const getfilteroptions= async (req, res, next) => {
  try {
    const { field } = req.body;
    const updatedData = await Order.distinct(field);
    res.send({[field]:updatedData});
  } catch (error) {
    console.error("Error updating record:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const downloadPDF = async(req,res,next)=>{
  try{
    console.log(req.body.Order_id)
    var datas = await generatepdf(req.body.Order_id);
    res.send(datas)
  }
  catch(err){
    console.error(err)
    res.status(500).send({ error: 'Internal Server Error' })
  }
}

export const updateOrder = async (req, res, next) => {
  try {
    const { _id } = req.query
    let previousVal = await Order.find({_id}).lean();
    let updateData = req.body.Order_Status != previousVal.Order_Status ?{...req.body,Order_Last_Update_Date: new Date(moment().format('YYYY-MM-DD'))}:req.body;
    const resdata = await Order.findOneAndUpdate({ _id }, updateData, { new: true });
    res.send(resdata)
  } catch (err) {
    console.error(err)
  }
}