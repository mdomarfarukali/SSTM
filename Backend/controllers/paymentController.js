// Import necessary modules
import axios from 'axios';  // Axios for making HTTP requests
import { Buffer } from 'buffer';  // Buffer for encoding/decoding data
import dotenv from 'dotenv';  // Dotenv for loading environment variables
dotenv.config();  // Load environment variables from .env file
import generateChecksum from '../components/ChecksumGenerate.js';  // Function to generate checksum for validation
import generateOrderId from '../components/OrderIDGenerate.js';  // Function to generate a unique order ID
import Order from "../models/Order.js";  // Order model to save order details in the database

// Access environment variables for PhonePe Payment Gateway configuration
// const { Buffer } = require('node:buffer');  // Buffer for encoding/decoding data
// const { generateChecksum } = require('../utils/paymentHelper');  // Function to generate checksum for validation
// const generateOrderId = require('../helpers/orderIdGenerate');  // Function to generate a unique order ID
// const Order = require("../models/order");  // Order model to save order details in the database

// Access environment variables for PhonePe Payment Gateway configuration
const PAYMENT_SALT_KEY = process.env.PAYMENT_SALT_KEY;  // Salt key used for checksum generation
const MERCHANT_ID = process.env.MERCHANT_ID;  // Merchant ID provided by PhonePe
const MERCHANT_BASE_URL = process.env.MERCHANT_BASE_URL;  // Base URL for payment initiation
const MERCHANT_STATUS_URL = process.env.MERCHANT_STATUS_URL;  // URL to check payment status

// Function to create an order and initiate payment
const createOrderPayment = async (req, res) => {
    // Destructure the totalAmount from the request body
    const { totalAmount, user } = req.body;

    // Generate a unique order ID using the helper function
    const orderId = generateOrderId();

    // Retrieve the user ID from the request (assuming the user is authenticated)
    const userId = user;

    // Convert the total amount to paise (as PhonePe API expects the amount in paise)
    const amount = parseFloat(totalAmount) * 100;

    // Prepare the payment payload with the necessary details
    const paymentPayload = {
        merchantId: MERCHANT_ID,  // Merchant ID for identification
        merchantTransactionId: orderId,  // Unique transaction ID for the order
        merchantUserId: userId,  // User ID to identify the customer
        amount: amount,  // Total amount in paise (multiplied by 100)
        redirectUrl: `${process.env.FRONTEND_URL}/payment/${orderId}`,  // URL to redirect the user after payment
        callbackUrl: `${process.env.API}`,  // Callback URL for the status of the payment
        paymentInstrument: { type: 'PAY_PAGE' }  // Payment method type (pay page for PhonePe)
    };

    // Convert the payment payload into a Base64 encoded string
    let payloadBase64 = Buffer.from(JSON.stringify(paymentPayload), "utf8").toString("base64");

    // Generate the checksum required by PhonePe for security validation
    const checksum = await generateChecksum(payloadBase64, '/pg/v1/pay', PAYMENT_SALT_KEY);

    // Prepare the options for making the POST request to PhonePe's API
    const options = {
        method: 'POST',  // POST request to initiate the payment
        url: MERCHANT_BASE_URL,  // The base URL for PhonePe's payment API
        headers: {
            accept: 'application/json',  // Accept JSON response
            'Content-Type': 'application/json',  // Specify JSON content type
            'X-VERIFY': checksum  // Include the checksum in the request header for security
        },
        data: { request: payloadBase64 }  // Send the encoded payment payload in the request body
    };

    // Make the API request to PhonePe's payment gateway
    try {
        const response = await axios.request(options);  // Execute the request
        // Check if the response contains the necessary data for redirect URL
        if (response.data && response.data.data && response.data.data.instrumentResponse) {
            // Send a successful response to the frontend with the URL for redirecting the user
            res.status(200).json({
                msg: "OK",  // Status message indicating success
                url: response.data.data.instrumentResponse.redirectInfo.url  // Redirect URL for the user to complete payment
            });
        }
    } catch (error) {
        // If an error occurs during the request, return a 500 status with the error details
        res.status(500).json({ error });
    }
};


const checkOrderPaymentStatus = async (req, res) => {
    const { merchantTransactionId, cartItems } = req.body;
    const checksum = await generateChecksum(`/pg/v1/status/${MERCHANT_ID}/`, merchantTransactionId, PAYMENT_SALT_KEY);

    const options = {
        method: 'GET',
        url: `${MERCHANT_STATUS_URL}/${MERCHANT_ID}/${merchantTransactionId}`,
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'X-VERIFY': checksum
        }
    };

    try {
        const response = await axios.request(options);
        const payRes = response.data.data;
        const amountRs = payRes.amount / 100; // Convert paise to rupees
        if (response.data.success) {
            const orderItems = cartItems.map((item) => ({
                productId: item._id,
                payablePrice: item.price,
                purchasedQty: item.quantity
            }));

            const order = new Order({
                customOrderId: merchantTransactionId,
                user: req.user._id,
                items: orderItems,
                totalAmount: amountRs,
                paymentStatus: 'COMPLETED'
            });

            await order.save();
            res.sendSuccessRes(200, 'Order created successfully', order);
        } else {
            res.sendErrorRes(400, 'Payment failed. Please try again.');
        }
    } catch (error) {
        res.sendErrorRes(400, 'Error checking payment status.', error);
    }
};

export default { createOrderPayment, checkOrderPaymentStatus };
