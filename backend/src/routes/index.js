import express from 'express'
import apiRouter from './apiRoutes.js'
import productRoutes from './productRoutes.js'
import orderRoutes from './orderRoutes.js'
import shippingRoutes from './shippingRoutes.js'
// import productRouter from './productRoutes.js'
// import customersRouter from './customerRoutes.js'
// import employeesRouter from './employeeRoutes.js'
// import EnquiryRouter from './enquiryRoutes.js'
// import shippingRouter from './shippingRoutes.js'
// import categoryRouter from './categoryRoutes.js'
// import OrderRouter from './OrderRoutes.js'


const router = express.Router()
router.use('/api', apiRouter)
router.use('/products', productRoutes)
router.use('/orders', orderRoutes)
router.use('/shipping' , shippingRoutes)


// router.use('/category', categoryRouter)

// router.use('/employees', employeesRouter)
// router.use('/products', productRouter)
// router.use('/customers', customersRouter)
// router.use('/enquiry', EnquiryRouter)
// router.use('/shipping', shippingRouter)

// router.use('/orders', OrderRouter)
export default router
