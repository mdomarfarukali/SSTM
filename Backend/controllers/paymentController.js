import Payment from "../models/Payment.js";
import Order from "../models/Order.js";

// ✅ USER: Create new payment
export const createPayment = async (req, res) => {
  try {
    const { orderId, paymentMethod, amount, provider, transactionId } = req.body;
    const userId = req.user._id;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const payment = await Payment.create({
      order: orderId,
      user: userId,
      paymentMethod,
      amount,
      provider,
      transactionId,
      paymentStatus: paymentMethod === "COD" ? "Pending" : "Processing",
    });

    res.status(201).json({ success: true, payment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ USER: Get user’s all payments
export const getUserPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user._id }).populate("order");
    res.status(200).json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ USER: Get single payment
export const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate("order");
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    if (payment.user.toString() !== req.user._id.toString() && !req.user.isAdmin)
      return res.status(403).json({ message: "Unauthorized access" });

    res.status(200).json({ success: true, payment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ USER: Request refund
export const requestRefund = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    if (payment.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Unauthorized" });

    payment.refundStatus = "Requested";
    await payment.save();

    res.status(200).json({ success: true, message: "Refund requested", payment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ ADMIN: Get all payments
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("user", "name email")
      .populate("order", "totalPrice orderStatus");
    res.status(200).json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ ADMIN: Update payment status
export const updatePaymentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const payment = await Payment.findById(req.params.id);

    if (!payment) return res.status(404).json({ message: "Payment not found" });

    payment.paymentStatus = status;
    if (status === "Paid") payment.paymentDate = new Date();
    if (status === "Refunded") payment.refundStatus = "Completed";
    await payment.save();

    res.status(200).json({ success: true, message: "Payment updated", payment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ ADMIN: Process refund
export const processRefund = async (req, res) => {
  try {
    const { refundId, refundAmount } = req.body;
    const payment = await Payment.findById(req.params.id);

    if (!payment) return res.status(404).json({ message: "Payment not found" });

    payment.refundId = refundId;
    payment.refundAmount = refundAmount;
    payment.refundStatus = "Processing";

    // Simulate refund completion
    setTimeout(async () => {
      payment.refundStatus = "Completed";
      payment.refundDate = new Date();
      await payment.save();
    }, 3000);

    await payment.save();
    res.status(200).json({ success: true, message: "Refund initiated", payment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
