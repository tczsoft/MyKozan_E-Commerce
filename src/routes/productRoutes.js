import express from 'express'
import multer from 'multer'
import { createProduct, deleteProduct, getAllProducts, getfilteroptions, getProductbyId, searchProducts, updateProduct } from '../controllers/product/productController.js'
import authMiddleware from '../middlewares/authMiddleware.js';

const storage = multer.memoryStorage()
const upload = multer({ storage })
const productRoutes = express.Router()


productRoutes.post('/saveproducts',authMiddleware(['Admin']),upload.array('Images'), createProduct);
productRoutes.get('/getallproducts', getAllProducts);
productRoutes.get('/products/search', searchProducts);
productRoutes.get('/products/getproductbyid', getProductbyId);
// productRoutes.put('/products/:id', productController.updateProduct);
productRoutes.put('/apiupdateproduct', authMiddleware(['Admin']), upload.array('Images'), updateProduct)
productRoutes.delete('/apideleteproduct',authMiddleware(['Admin']), deleteProduct);
productRoutes.post('/getfilteroptions', getfilteroptions, authMiddleware(['Admin']))

export default productRoutes;