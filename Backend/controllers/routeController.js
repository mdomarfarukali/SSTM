import express from 'express';

import authRoutes from '../routes/auth.js';
import productRoutes from '../routes/products.js';
// import userRoutes from '../routes/user.js';
import orderRoutes from '../routes/order.js';
import paymentRoutes from '../routes/payment.js';
// import uploadRoutes from '../routes/upload.js';
// import dashboardRoutes from '../routes/dashboard.js';

const Route = express.Router();

Route.use('/auth', authRoutes);
Route.use('/products', productRoutes);
// Route.use('/users', userRoutes);
Route.use('/orders', orderRoutes);
Route.use('/payment', paymentRoutes);
// Route.use('/upload', uploadRoutes);
// Route.use('/dashboard', dashboardRoutes);

export default Route;
