import express from 'express';
import { savecart, getAllCart, updateCart, deletecartone, deleteAllcart } from '../controllers/cartController.js';

const router = express.Router();

router.post('/savecart', savecart);
router.get('/getallcart', getAllCart);
router.put('/updatecart', updateCart);
router.delete('/deletecartone', deletecartone);
router.delete('/deleteallcart', deleteAllcart);

export default router;
