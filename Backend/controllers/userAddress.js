import UserAddress from "../models/userAddress.js";
import Order from "../models/Order.js";

// 📦 Create new address
export const createAddress = async (req, res) => {
  try {
    // console.log("USER:", req.user);
    // console.log("BODY:", req.body);

    await UserAddress.create({ ...req.body, user: req.user._id });

    // ✅ fetch ALL addresses again
    const addresses = await UserAddress.find({ user: req.user._id });

    res.status(201).json({
      success: true,
      message: "Address added successfully",
      addresses, // 🔥 IMPORTANT
    });

  } catch (error) {
    console.error("CREATE ADDRESS ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 📚 Get all addresses for a user
export const getUserAddresses = async (req, res) => {
  try {
    const addresses = await UserAddress.find({ user: req.user._id });
    res.status(200).json({ success: true, addresses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🏠 Get single address
export const getAddressById = async (req, res) => {
  try {
    const address = await UserAddress.findOne({ _id: req.params.id, user: req.user._id });
    if (!address) return res.status(404).json({ success: false, message: "Address not found" });
    res.status(200).json({ success: true, address });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✏️ Update address
export const updateAddress = async (req, res) => {
  try {
    const address = await UserAddress.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!address) {
      return res.status(404).json({ success: false, message: "Address not found" });
    }

    const addresses = await UserAddress.find({ user: req.user._id });

    res.status(200).json({
      success: true,
      message: "Address updated",
      addresses, // 🔥 IMPORTANT
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ❌ Delete address
export const deleteAddress = async (req, res) => {
  try {
    const address = await UserAddress.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!address) {
      return res.status(404).json({ success: false, message: "Address not found" });
    }

    // ✅ fetch updated list
    const addresses = await UserAddress.find({ user: req.user._id });

    res.status(200).json({
      success: true,
      message: "Address deleted",
      addresses, // 🔥 IMPORTANT
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ⭐ Set default address
export const setDefaultAddress = async (req, res) => {
  try {
    await UserAddress.updateMany({ user: req.user._id }, { isDefault: false });
    const updated = await UserAddress.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { isDefault: true },
      { new: true }
    );
    res.status(200).json({ success: true, message: "Default address updated", updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔗 Link address to order (when order is created)
export const linkAddressToOrder = async (req, res) => {
  try {
    const { addressId, orderId } = req.body;
    const address = await UserAddress.findById(addressId);
    if (!address) return res.status(404).json({ success: false, message: "Address not found" });

    address.linkedOrders.push(orderId);
    await address.save();

    await Order.findByIdAndUpdate(orderId, { shippingAddress: addressId });

    res.status(200).json({ success: true, message: "Address linked to order", address });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 👑 Admin Controllers

// Get all addresses
export const adminGetAllAddresses = async (req, res) => {
  try {
    const addresses = await UserAddress.find().populate("user", "name email");
    res.status(200).json({ success: true, addresses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete any user's address
export const adminDeleteAddress = async (req, res) => {
  try {
    const deleted = await UserAddress.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Address not found" });
    res.status(200).json({ success: true, message: "Address deleted by admin" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
