import { Product } from '../../models/ProductModel.js';


export const createProduct = async (req, res) => {
      try {
        const lastProduct = await Product.findOne().sort({ createdAt: -1 });
        let newItemCode = 'Item001';
        if (lastProduct && lastProduct.Item_Code) {
        
            const lastItemCodeNumber = parseInt(lastProduct.Item_Code.replace('Item', ''), 10);
      
            const nextItemCodeNumber = lastItemCodeNumber + 1;
            newItemCode = `Item${nextItemCodeNumber.toString().padStart(3, '0')}`; 
          }
      
        const newProduct = new Product({ ...req.body, Item_Code: newItemCode });
        const savedProduct = await newProduct.save();
        res.send(savedProduct);
      } catch (error) {
        console.log(error);
      }
    }


    export const getAllProducts= async (req, res) => {
        try {
          const products = await Product.find();
          res.send(products);
        } catch (error) {
     
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
            const { _id } = req.query;
            const updatedProduct = await Product.findByIdAndUpdate( { _id } , req.body, { new: true });
                 res.send(updatedProduct);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }

    // Delete product by ID
    export const deleteProduct= async (req, res) => {
        try {
            const { _id } = req.query;
            const deletedProduct = await Product.findByIdAndDelete( { _id } );

            res.status(200).json({ message: 'Product deleted successfully', deletedProduct });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }




    export const getProductbyId = async (req,res) => {
        try {
            const { _id } = req.query;
            const product = await Product.find({_id});
            res.send(product);
            
        } catch (error) {
            console.log(error)
            res.send(error)
        }
      }