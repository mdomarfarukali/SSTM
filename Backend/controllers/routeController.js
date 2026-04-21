import express from 'express';

import authRoutes from '../routes/auth.js';
import productRoutes from '../routes/products.js';
// import userRoutes from '../routes/user.js';
import orderRoutes from '../routes/order.js';
import paymentRoutes from '../routes/payment.js';
import addressRoutes from "../routes/userAddress.js";
// import uploadRoutes from '../routes/upload.js';
// import dashboardRoutes from '../routes/dashboard.js';
import cloud from '../routes/cloudinary.js';
import reviewRoutes from '../routes/reviewRoutes.js';

const Route = express.Router();

Route.use('/auth', authRoutes);
Route.use('/products', productRoutes);
// Route.use('/users', userRoutes);
Route.use('/orders', orderRoutes);
Route.use('/payment', paymentRoutes);
Route.use("/addresses", addressRoutes);

// Route.use('/upload', uploadRoutes);
// Route.use('/dashboard', dashboardRoutes);
Route.use('/cloudinary', cloud);
Route.use('/reviews', reviewRoutes);

export default Route;
