import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import { getallCustomers, getfilteroptions, updateCustomer } from '../controllers/customers/customerController.js'

const customersRouter = express.Router()
customersRouter.get('/apigetallcustomers', authMiddleware(['Customer', 'Admin']), getallCustomers)
customersRouter.post('/getfilteroptions', getfilteroptions, authMiddleware(['Admin']))
customersRouter.put('/updatecustomer', updateCustomer, authMiddleware(['Customer','Admin']))
export default customersRouter
