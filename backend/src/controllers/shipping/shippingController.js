import { Shiping } from '../../models/CustomerModel.js';


export const createShipping = async (req, res) => {
try {
    const newShipping = new Shiping(req.body);
    const savedShipping = await newShipping.save();
    res.send({ message: 'Shipping address created successfully', savedShipping });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating shipping address', error });
  }
};


export const getAllShippings = async (req, res) => {
  try {
    const shippings = await Shiping.find();
    res.send({ message: 'Shipping addresses fetched successfully', shippings });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error fetching shipping addresses', error });
  }
};

export const updateShipping = async (req, res) => {
  try {
    const { id } = req.query;
    const updatedShipping = await Shiping.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedShipping) {
      return res.send({ message: 'Shipping address not found' });
    }

    res.send({ message: 'Shipping address updated successfully', updatedShipping });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error updating shipping address', error });
  }
};





// export const getShippingById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const shipping = await Shiping.findById(id);

//     if (!shipping) {
//       return res.status(404).json({ message: 'Shipping address not found' });
//     }

//     res.status(200).json({ message: 'Shipping address fetched successfully', shipping });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error fetching shipping address', error });
//   }
// };



