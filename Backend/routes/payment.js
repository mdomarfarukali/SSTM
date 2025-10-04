// routes/paymentRoutes.js
import { Router } from "express";
import paymentController from "../controllers/paymentController.js";

const router = Router();

// POST: create order and initiate payment
router.post("/create", paymentController.createOrderPayment);

// POST: check payment status
router.post("/status", paymentController.checkOrderPaymentStatus);


export default router;
