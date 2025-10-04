import dotenv from 'dotenv';
dotenv.config();  // Load environment variables from .env file
// import generateChecksum from '../components/ChecksumGenerate.js';  // Function to generate checksum for validation
// import generateOrderId from '../components/OrderIDGenerate.js';  // Function to generate a unique order ID
// import Order from "../models/order.js";  // Order model to save order details in the database
// require('dotenv').config();
import express from 'express';
// const express = require('express');
import mongoose from 'mongoose';
// const mongoose = require('mongoose');
import cors from 'cors';
// const cors = require('cors');
import cookieParser from 'cookie-parser';
// const cookieParser = require('cookie-parser');
import bodyParser from 'body-parser';
// const bodyParser = require('body-parser');
import errorMiddleware from './middleware/errorMiddleware.js';
// const errorMiddleware = require('./middleware/errorMiddleware');

// Import routes
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import userRoutes from './routes/user.js';
import orderRoutes from './routes/order.js';
import paymentRoutes from './routes/payment.js';
// import uploadRoutes from './routes/upload.js';
// import dashboardRoutes from './routes/dashboard.js';

// Import routes
// const authRoutes = require('./routes/auth');
// const productRoutes = require('./routes/product');
// const userRoutes = require('./routes/user');
// const orderRoutes = require('./routes/order');
// // const paymentRoutes = require('./routes/payment');
// // const uploadRoutes = require('./routes/upload');
// // const dashboardRoutes = require('./routes/dashboard');

const app = express();

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = ['https://sastakart.vercel.app', 'http://localhost:5173', 'http://localhost:3000'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'stripe-signature'],
  exposedHeaders: ['set-cookie'],
  maxAge: 86400 // Cache preflight requests for 24 hours
}));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to E-Commerce API' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);
// app.use('/api/upload', uploadRoutes);
// app.use('/api/dashboard', dashboardRoutes);

// Database connection with improved configuration
const connectDB = async () => {
  try {
    const mongoOptions = {
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 15000,
      maxPoolSize: 50,
      minPoolSize: 10,
      maxIdleTimeMS: 60000,
      writeConcern: { w: 'majority' },
      retryWrites: true,
      retryReads: true
    };

    // await mongoose.connect('mongodb://localhost:27017/ecommerce', mongoOptions);
    await mongoose.connect('mongodb://localhost:27017/ecommerce', mongoOptions);
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    // If initial connection fails, retry after 5 seconds
    setTimeout(connectDB, 5000);
  }
};

// Handle MongoDB connection events
mongoose.connection.on('error', err => {
  console.error('MongoDB Connection Error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB Disconnected, trying to reconnect...');
  connectDB();
});

mongoose.connection.on('reconnected', () => {
  console.log('MongoDB Reconnected Successfully');
});

// Initialize database connection
connectDB();

// Error handling middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;


// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";

// import productRoutes from "./routes/products.js";
// import userRoutes from "./routes/users.js";
// import orderRoutes from "./routes/orders.js";

// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/products", productRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/orders", orderRoutes);

// const PORT = process.env.PORT || 5000;
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
//   .catch((err) => console.log(err));
