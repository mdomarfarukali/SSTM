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
    const allowedOrigins = ['https://diva-ten-ebon.vercel.app/', process.env.FRONTEND_URL ];
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

// For render hosting
app.get("/a5asd4f45asdf4", (req, res) => {
  res.status(200).send("OK");
});

// Error handling middleware
app.use(errorMiddleware);

connectToDB().then(() => {
    app.listen(PORT, HOST, () => {
        console.log(`### Server running at: http://${HOST}:${PORT}`);
        console.log(`### Network: http://${getLocalIP()}:${PORT}`);
    });
});

export default app;
