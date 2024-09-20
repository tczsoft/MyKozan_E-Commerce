import { Product } from '../../models/ProductModel.js';


export const createProduct = async (req, res) => {
      try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
      } catch (error) {
        // res.status(400).json({ message: error.message });
        console.log(error);
      }
    }


    export const getAllProducts= async (req, res) => {
        try {
          const products = await Product.find();
          res.status(200).json(products);
        } catch (error) {
        //   res.status(500).json({ message: error.message });
        console.log(error);
        }
      }

        
      export const searchProducts= async (req, res) => {
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
    export const updateProduct= async (req, res) => {
        try {
            const { id } = req.query;
            const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });

            if (!updatedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }

            res.status(200).json(updatedProduct);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }

    // Delete product by ID
    export const deleteProduct= async (req, res) => {
        try {
            const { id } = req.query;
            const deletedProduct = await Product.findByIdAndDelete(id);

            if (!deletedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }

            res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }




