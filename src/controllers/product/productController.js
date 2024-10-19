import mongoose from 'mongoose';
import { Product } from '../../models/ProductModel.js';
import { Saveimages } from '../../services/ImageServices.js';


// export const createProduct = async (req, res) => {
//     try {
//         // Get the latest product to determine the next Item_Code
//         const lastProduct = await Product.findOne().sort({ createdAt: -1 });
//         let newItemCode = 'Item001';

//         if (lastProduct && lastProduct.Item_Code) {
//             // Extract the numeric part of the last Item_Code and increment it
//             const lastItemCodeNumber = parseInt(lastProduct.Item_Code.replace('Item', ''), 10);
//             const nextItemCodeNumber = lastItemCodeNumber + 1;
//             newItemCode = `Item${nextItemCodeNumber.toString().padStart(3, '0')}`;
//         }

//         // Create a new product with the new Item_Code
//         const newProduct = new Product({
//             ...req.body,
//             Item_Code: newItemCode
//         });

//         // Save the product in the database
//         const savedProduct = await newProduct.save();

//         // Send the saved product back to the client
//         return res.status(201).json(savedProduct);

//     } catch (error) {
//         // Log the error and send a response with a 500 status code
//         console.error('Error creating product:', error);
//         return res.status(500).json({
//             message: 'Failed to create the product. Please try again later.',
//             error: error.message // Send the error message for debugging purposes
//         });
//     }
// };

export const createProduct = async (req, res, next) => {
    try {
      if (req.files && req.files.length !== 0) {
        req.body.Images = await Saveimages(req.files, 'products')
      }
      const resdata = await new Product(req.body).save()
      res.send(resdata)
    } catch (err) {
      console.error(err)
    }
  }


// export const getAllProducts= async (req, res) => {
//     try {
//       const products = await Product.find();
//       res.send(products);
//     } catch (error) {

//     console.log(error);
//     }
//   }

export const getAllProducts = async (req, res, next) => {
    try {
        const { first = 0, rows = 10, globalfilter, ...otherFilters } = req.query;
        const individualFilters = Object.keys(otherFilters).map(field => ({ [field]: { $regex: req.query[field] ?? '', $options: 'i' } }));
        const fieldArray = Object.keys(Product.schema.obj);
        const globalFilter = globalfilter ? { $or: fieldArray.filter(field => Product.schema.path(field) instanceof mongoose.Schema.Types.String).map(field => ({ [field]: { $regex: globalfilter, $options: 'i' } })) } : {};
        const filter = { $and: [globalFilter, ...individualFilters] };
        const products = await Product.find(filter).skip(parseInt(first, 10)).limit(parseInt(rows, 10));
        const totallength = await Product.countDocuments(filter);
        res.send({ products, totallength });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.send({ message: 'Server error while fetching products', error: error.message });
    }
};

export const getfilteroptions = async (req, res, next) => {
    try {
        const { field } = req.body;
        const updatedData = await Product.distinct(field);
        res.send({ [field]: updatedData });
    } catch (error) {
        console.error("Error updating record:", error);
        res.send({ message: "Internal server error" });
    }
};

export const searchProducts = async (req, res) => {
    try {
        const { name, category } = req.query;
        const query = {};

        if (name) {
            query.Product_Name = { $regex: name, $options: 'i' };
        }
        if (category) {
            query.Category = { $regex: category, $options: 'i' };
        }
        const products = await Product.find(query);
        if (products.length > 0) {
            res.status(200).json(products);
        } else {
            res.status(200).json({ message: 'No products found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// Update product by ID
export const updateProduct = async (req, res, next) => {
    try {
      const { _id } = req.query
      console.log(req.query)
      if (req.files && req.files.length !== 0) {
        req.body.Images = await Saveimages(req.files, 'products')
      }
      console.log(req.body)
      const resdata = await Product.findOneAndUpdate({ _id }, req.body, { new: true })
      res.send(resdata)
    } catch (err) {
      console.error(err)
    }
  }

// Delete product by ID
export const deleteProduct = async (req, res) => {
    try {
        const { _id } = req.query;
        const deletedProduct = await Product.deleteOne({ _id });

        res.status(200).json({ message: 'Product deleted successfully', deletedProduct });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}




export const getProductbyId = async (req, res) => {
    try {
        const { _id } = req.query;
        const product = await Product.find({ _id });
        res.send(product);

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}