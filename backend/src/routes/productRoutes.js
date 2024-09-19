import express from 'express'

import { createProduct, deleteProduct, getAllProducts, searchProducts, updateProduct } from '../controllers/product/productController.js'
import authMiddleware from '../middlewares/authMiddleware.js';

const productRoutes = express.Router()


productRoutes.post('/products',authMiddleware(['Admin']), createProduct);
productRoutes.get('/products', getAllProducts);
productRoutes.get('/products/search', searchProducts);
// productRoutes.put('/products/:id', productController.updateProduct);
productRoutes.put('/products/update',authMiddleware(['Admin']), updateProduct);
productRoutes.delete('/products/delete',authMiddleware(['Admin']), deleteProduct);

export default productRoutes;