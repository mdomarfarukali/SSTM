import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// 🔄 Transform Cart
const transformCart = (cart) => {
  if (!cart || !cart.items) {
    return { items: [], total: 0, count: 0 };
  }

  const items = cart.items
    .map((item) => {
      const product = item.product;
      if (!product) return null;

      const price = product.finalPrice ?? product.price;

      return {
        id: product._id,
        name: product.name,
        price,
        image:
          product.images?.[0]?.url ||
          product.thumbnail ||
          "",
        slug: product.slug,
        category: product.category,
        discount: product.discount || 0,
        inStock: product.inStock,
        quantity: item.noof_item,
        selectedSize: item.size,
        subtotal: price * item.noof_item,
      };
    })
    .filter(Boolean);

  const total = items.reduce((acc, item) => acc + item.subtotal, 0);

  return {
    items,
    total,
    count: items.length,
  };
};


// 🟢 GET Cart
export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id })
      .populate("items.product");

    if (!cart) {
      return res.json({
        success: true,
        cart: transformCart(null),
      });
    }

    return res.json({
      success: true,
      cart: transformCart(cart),
    });
  } catch (error) {
    console.error("GET CART ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// 🟢 ADD to Cart (smart merge)
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1, selectedSize } = req.body;

    if (!productId || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Valid productId and quantity required",
      });
    }

    const product = await Product.findById(productId);

    if (!product || !product.inStock) {
      return res.status(404).json({
        success: false,
        message: "Product not available",
      });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [{ product: productId, noof_item: quantity, size: selectedSize }],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.product.toString() === productId && item.size === selectedSize
      );

      if (existingItem) {
        existingItem.noof_item += quantity;
      } else {
        cart.items.push({ product: productId, noof_item: quantity, size: selectedSize });
      }

      await cart.save();
    }

    await cart.populate("items.product");

    return res.json({
      success: true,
      cart: transformCart(cart),
    });
  } catch (error) {
    console.error("ADD CART ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// 🟡 UPDATE quantity (auto remove if 0)
export const updateCartItem = async (req, res) => {
  try {
    const { quantity, selectedSize } = req.body;
    const productId = req.params.id;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "productId required",
      });
    }

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId && item.size === selectedSize
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Item not in cart",
      });
    }

    // 🔥 remove if quantity 0
    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].noof_item = quantity;
    }

    await cart.save();
    await cart.populate("items.product");

    return res.json({
      success: true,
      cart: transformCart(cart),
    });
  } catch (error) {
    console.error("UPDATE CART ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// 🔴 DELETE item
export const deleteCartItem = async (req, res) => {
  try {
    const productId = req.params.id;
    const selectedSize = req.query.size;

    const cart = await Cart.findOneAndUpdate(
      { user: req.user._id },
      { $pull: { items: { product: productId, size: selectedSize } } },
      { new: true }
    ).populate("items.product");

    return res.json({
      success: true,
      cart: transformCart(cart),
    });
  } catch (error) {
    console.error("DELETE CART ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// 🧹 CLEAR Cart (NEW 🔥)
export const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndUpdate(
      { user: req.user._id },
      { items: [] }
    );

    return res.json({
      success: true,
      cart: transformCart(null),
    });
  } catch (error) {
    console.error("CLEAR CART ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};