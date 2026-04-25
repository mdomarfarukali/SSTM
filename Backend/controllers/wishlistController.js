import Wishlist from "../models/Wishlist.js";
import Product from "../models/Product.js";

const transformWishlist = (wishlist) => {
  if (!wishlist || !wishlist.items) return [];

  return wishlist.items
    .map((item) => item.product)
    .filter(Boolean)
    .map((product) => ({
      _id: product._id,
      name: product.name,
      price: product.finalPrice ?? product.price,
      image: product.images?.[0]?.url || product.thumbnail || "",
      slug: product.slug,
      category: product.category,
      discount: product.discount || 0,
      inStock: product.inStock,
    }));
};

// GET wishlist
export const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id }).populate("items.product");
    return res.json({ success: true, wishlist: transformWishlist(wishlist) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ADD item
export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ success: false, message: "Product ID is required." });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }

    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user._id,
        items: [{ product: productId }],
        numberOfItems: 1,
      });
    } else {
      const alreadyExists = wishlist.items.some(
        (item) => item.product.toString() === productId
      );

      if (!alreadyExists) {
        wishlist.items.push({ product: productId });
        wishlist.numberOfItems = wishlist.items.length;
        await wishlist.save();
      }
    }

    await wishlist.populate("items.product");
    return res.json({ success: true, wishlist: transformWishlist(wishlist) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE item
export const deleteWishlistItem = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOneAndUpdate(
      { user: req.user._id },
      { $pull: { items: { product: req.params.id } } },
      { new: true }
    ).populate("items.product");

    if (wishlist) {
      wishlist.numberOfItems = wishlist.items.length;
      await wishlist.save();
    }

    return res.json({ success: true, wishlist: transformWishlist(wishlist) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};