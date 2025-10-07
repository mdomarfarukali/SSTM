import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaHeart, FaTruck, FaShieldAlt } from "react-icons/fa"; 
// ⭐️ IMPORT BOTH CONTEXTS ⭐️
import { useCartContext } from "../context/CartContext.jsx"; 
import { useWishlistContext } from "../context/WishListContext.jsx"; // New import
import { showToast } from "../utils/toastUtils"; 

// =========================================================
// Custom Hook for Data Fetching (Retained for efficiency)
// =========================================================
const allProducts = [
  {
    id: "1", // MUST match the ID used in Products.jsx
    name: "Diamond Solitaire Ring",
    price: 299.00, // Price must be a number here
    images: [
      "https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // High-res main image
       // Angle 3
    ],
    description: "A handcrafted diamond ring that symbolizes eternal love. Made with 18k white gold and natural diamonds for unmatched brilliance and clarity.",
    material: "18k White Gold, 0.5 Carat Diamond",
    sizes: ["US 5", "US 6", "US 7", "US 8", "US 9"],
    stock: 15,
  },
  {
    id: "2",
    name: "Pearl Drop Earrings",
    price: 199.00,
    images: ["https://plus.unsplash.com/premium_photo-1739548338201-4c337ce176d2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVhcmwlMjBkcm9wJTIwZWFycmluZ3xlbnwwfHwwfHx8MA%3D%3D"],
    description: "Elegant pearl earrings with a subtle golden setting. Perfect for evening wear.",
    material: "Sterling gold, Freshwater Pearl",
    sizes: ["Small", "Medium"],
    stock: 22,
  },
      // Product ID 3: Modern Diamond Ring
    {
        id: "3",
        name: "Minimalist Diamond Band",
        price: 750.00,
        images: ["https://images.unsplash.com/photo-1628080064295-d8641a23e595?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGRpYW1vbmQlMjByaW5nJTIwYmFuZHxlbnwwfHwwfHx8MA%3D%3D"],
        description: "A contemporary thin band set with micro-pavé diamonds, perfect for stacking or as a simple wedding band.",
        material: "14k Rose Gold, Certified Diamonds",
        sizes: ["US 5", "US 6", "US 7", "US 8", "US 9"],
        stock: 30,
    },
    // Product ID 4: Statement Necklace
    {
        id: "4",
        name: "Vintage Amethyst Pendant",
        price: 320.00,
        images: ["https://images.unsplash.com/photo-1611119641753-f725a3a2a091?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YW1ldGh5c3QlMjBuZWNrbGFjZXxlbnwwfHwwfHx8MA%3D%3D"],
        description: "An ornate silver pendant featuring a deep violet amethyst gemstone, inspired by classic Victorian design.",
        material: "Sterling Silver, Natural Amethyst",
        sizes: ["18 inch", "20 inch"],
        stock: 12,
    },
    // Product ID 5: Delicate Bracelet
    {
        id: "5",
        name: "Delicate Chain Bracelet",
        price: 125.00,
        images: ["https://images.unsplash.com/photo-1598472504445-6453f7c9e0d9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRlbGljYXRlJTIwYnJhY2VsZXR8ZW58MHx8MHx8fDA%3D"],
        description: "A barely-there chain bracelet with three tiny accent stones. Perfect for everyday subtle elegance.",
        material: "14k Gold Vermeil, Cubic Zirconia",
        sizes: ["6.5 inch", "7 inch", "7.5 inch"],
        stock: 45,
    },
  // ADD MORE DETAILED PRODUCT OBJECTS HERE...
];

const useProductData = (id) => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = () => {
            const foundProduct = allProducts.find(p => p.id === id); 
            setProduct(foundProduct === undefined ? undefined : foundProduct);
        };
        fetchProduct(); 
    }, [id]);

    return product;
};
// =========================================================

function ProductDetails() {
    const { id } = useParams();
    const product = useProductData(id); 

    // ⭐️ Context Integrations ⭐️
    const { addItemToCart } = useCartContext();
    const { toggleWishlistItem, isItemWished } = useWishlistContext();
    
    // State for user selections
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [mainImage, setMainImage] = useState('');

    // Set initial size and image once product data is loaded
    useEffect(() => {
        if (product) {
            setMainImage(product.images[0]); 
            setSelectedSize(product.sizes[0]); 
        }
    }, [product]);

    // Check if the current product is in the wishlist
    const wished = product ? isItemWished(product.id) : false;

    // Handler for Add to Cart Button (from previous refactor)
    const handleAddToCart = () => {
        if (!selectedSize) {
            showToast("Please select a size or variant before adding to cart.", "error"); 
            return;
        }

        const itemToAdd = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0], 
            selectedSize: selectedSize,
            quantity: quantity,
        };
        
        addItemToCart(itemToAdd);
        showToast(`${product.name} (x${quantity}) added! View cart.`, "success");
    };

    // ⭐️ Handler for Wishlist Button ⭐️
    const handleToggleWishlist = () => {
        const itemToToggle = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
        };
        
        toggleWishlistItem(itemToToggle);
        
        if (wished) {
            showToast(`${product.name} removed from Wishlist.`, "info");
        } else {
            showToast(`${product.name} added to Wishlist!`, "success");
        }
    };


    // Display Loading State
    if (product === null) {
        return (
            <div className="min-h-screen pt-32 text-center bg-white dark:bg-gray-900">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Loading Product...</h2>
            </div>
        );
    }
    
    // Display Not Found State
    if (product === undefined) {
        return (
            <div className="min-h-screen pt-32 text-center bg-white dark:bg-gray-900">
                <h2 className="text-3xl font-bold text-red-600 dark:text-red-400">Product Not Found!</h2>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                    The item you are looking for does not exist. Go back to <Link to="/products" className="text-pink-600 hover:underline">Collections</Link>
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500 pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="lg:grid lg:grid-cols-2 lg:gap-12">
                    
                    {/* ========== 1. Image Gallery ========== */}
                    <div className="lg:sticky lg:top-32 h-full">
                        <img 
                            src={mainImage} 
                            alt={product.name} 
                            className="w-full h-auto rounded-xl shadow-2xl object-cover aspect-square" 
                        />
                        <div className="flex gap-3 mt-4 overflow-x-auto p-1">
                            {product.images.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Thumbnail ${index + 1}`}
                                    className={`w-20 h-20 object-cover rounded-md cursor-pointer transition border-2 ${
                                        img === mainImage ? 'border-pink-600 shadow-md' : 'border-transparent hover:border-pink-300'
                                    }`}
                                    onClick={() => setMainImage(img)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* ========== 2. Details and Actions ========== */}
                    <div className="mt-10 lg:mt-0">
                        <h1 className="text-4xl font-serif font-extrabold text-gray-900 dark:text-white">{product.name}</h1>
                        <p className="text-5xl font-bold text-pink-600 mt-4">${product.price.toFixed(2)}</p>

                        {/* Sizes/Variants Selector */}
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">Select Size/Variant:</h3>
                            <div className="flex flex-wrap gap-3">
                                {product.sizes.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-4 py-2 border rounded-full text-sm font-medium transition ${
                                            selectedSize === size
                                                ? 'bg-pink-600 text-white border-pink-600 shadow-md'
                                                : 'bg-white text-gray-700 border-gray-300 hover:border-pink-500 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700'
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity Selector */}
                        <div className="mt-8 flex items-center gap-4">
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Quantity:</h3>
                            <div className="flex items-center border border-gray-300 rounded-full dark:border-gray-700">
                                <button 
                                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))} 
                                    className="px-4 py-2 text-xl text-gray-600 dark:text-gray-400 hover:text-pink-600 transition"
                                >-</button>
                                <span className="w-8 text-center font-bold text-gray-900 dark:text-white">{quantity}</span>
                                <button 
                                    onClick={() => setQuantity(prev => Math.min(product.stock, prev + 1))} 
                                    className="px-4 py-2 text-xl text-gray-600 dark:text-gray-400 hover:text-pink-600 transition"
                                >+</button>
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">({product.stock} in stock)</span>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-10 flex flex-col sm:flex-row gap-4">
                            <button 
                                onClick={handleAddToCart}
                                className="flex-1 w-full sm:w-auto px-8 py-4 bg-pink-600 text-white text-xl font-bold rounded-full shadow-xl hover:bg-pink-700 transition transform hover:scale-[1.02]"
                            >
                                Add to Cart
                            </button>
                            {/* ⭐️ WISHIST BUTTON INTEGRATION ⭐️ */}
                            <button 
                                onClick={handleToggleWishlist}
                                className={`px-6 py-4 border text-xl rounded-full transition flex items-center justify-center gap-2 ${
                                    wished 
                                        ? 'border-red-500 bg-red-50 text-red-500 dark:bg-red-900 dark:text-red-300' 
                                        : 'border-pink-600 text-pink-600 hover:bg-pink-50 dark:hover:bg-gray-800'
                                }`}
                            >
                                <FaHeart className={wished ? 'fill-current' : ''} /> 
                                {wished ? 'Remove from Wishlist' : 'Add to Wishlist'}
                            </button>
                        </div>

                        {/* Product Description and Features */}
                        <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Product Details</h2>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{product.description}</p>
                            
                            <ul className="mt-6 space-y-3 text-gray-700 dark:text-gray-300">
                                <li className="flex items-center gap-3">
                                    <span className="font-bold text-pink-600">Material:</span> {product.material}
                                </li>
                                <li className="flex items-center gap-3">
                                    <FaTruck className="text-pink-600" />
                                    Free Express Shipping & Guaranteed Delivery
                                </li>
                                <li className="flex items-center gap-3">
                                    <FaShieldAlt className="text-pink-600" />
                                    1-Year Manufacturer Warranty
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* NOTE: You should include your <Footer /> component here */}
        </div>
    );
}

export default ProductDetails;


