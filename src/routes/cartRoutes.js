import express from 'express';
import { deleteAllcart, deletecartone, getAllCart, savecart, updateCart } from '../controllers/CartController/CartController.js';


const cartrouter = express.Router();

cartrouter.post('/savecart', savecart);
cartrouter.get('/getallcart', getAllCart);
cartrouter.put('/updatecart', updateCart);
cartrouter.delete('/deletecartone', deletecartone);
cartrouter.delete('/deleteallcart', deleteAllcart);

export default cartrouter;
