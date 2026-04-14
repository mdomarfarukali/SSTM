import dotenv from 'dotenv';
dotenv.config();  // Load environment variables from .env file
// import generateChecksum from '../components/ChecksumGenerate.js';  // Function to generate checksum for validation
// import generateOrderId from '../components/OrderIDGenerate.js';  // Function to generate a unique order ID
// import Order from "../models/order.js";  // Order model to save order details in the database
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import errorMiddleware from './middleware/errorMiddleware.js';


import Route from './controllers/routeController.js';
import connectToDB from './config/db.js';
import { getLocalIP } from './utils/networkUtils.js';

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 5000;

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


app.use('/API', Route);

// Database connection with improved configuration
// const connectDB = async () => {
//   try {
//     const mongoOptions = {
//       serverSelectionTimeoutMS: 15000,
//       socketTimeoutMS: 45000,
//       connectTimeoutMS: 15000,
//       maxPoolSize: 50,
//       minPoolSize: 10,
//       maxIdleTimeMS: 60000,
//       writeConcern: { w: 'majority' },
//       retryWrites: true,
//       retryReads: true
//     };

//     // await mongoose.connect('mongodb://localhost:27017/ecommerce', mongoOptions);
//     await mongoose.connect( process.env.MONGO_URI, mongoOptions);
//     console.log('MongoDB Connected Successfully');
//   } catch (error) {
//     console.error('MongoDB Connection Error:', error.message);
//     // If initial connection fails, retry after 5 seconds
//     setTimeout(connectDB, 5000);
//   }
// };

// // Handle MongoDB connection events
// mongoose.connection.on('error', err => {
//   console.error('MongoDB Connection Error:', err.message);
// });

// mongoose.connection.on('disconnected', () => {
//   console.log('MongoDB Disconnected, trying to reconnect...');
//   connectDB();
// });

// mongoose.connection.on('reconnected', () => {
//   console.log('MongoDB Reconnected Successfully');
// });

// Initialize database connection
// connectDB();

// Error handling middleware
app.use(errorMiddleware);

connectToDB().then(() => {
    app.listen(PORT, HOST, () => {
        console.log(`### Server running at: http://${HOST}:${PORT}`);
        console.log(`### Network: http://${getLocalIP()}:${PORT}`);
    });
});

export default app;
