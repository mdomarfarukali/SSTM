import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaHeart, FaTruck, FaShieldAlt } from "react-icons/fa";
import { useCartContext } from "../context/CartContext.jsx";
import { useWishlistContext } from "../context/WishListContext.jsx";
import { showToast } from "../utils/toastUtils.js";
import axios from "axios";

const allProducts = [
    {
        id: "1",
        name: "Diamond Solitaire Ring",
        price: 299.0,
        images: [
            "https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?q=80&w=580&auto=format&fit=crop",
        ],
        description:
            "A handcrafted diamond ring that symbolizes eternal love. Made with 18k white gold and natural diamonds for unmatched brilliance and clarity.",
        material: "18k White Gold, 0.5 Carat Diamond",
        sizes: ["US 5", "US 6", "US 7", "US 8", "US 9"],
        stock: 15,
    },
    {
        id: "2",
        name: "Pearl Drop Earrings",
        price: 199.0,
        images: [
            "https://plus.unsplash.com/premium_photo-1739548338201-4c337ce176d2?w=500&auto=format&fit=crop&q=60",
        ],
        description:
            "Elegant pearl earrings with a subtle golden setting. Perfect for evening wear.",
        material: "Sterling gold, Freshwater Pearl",
        sizes: ["Small", "Medium"],
        stock: 22,
    },
    {
        id: "3",
        name: "Minimalist Diamond Band",
        price: 750.0,
        images: [
            "https://images.unsplash.com/photo-1628080064295-d8641a23e595?w=500&auto=format&fit=crop&q=60",
        ],
        description:
            "A contemporary thin band set with micro-pavé diamonds, perfect for stacking or as a simple wedding band.",
        material: "14k Rose Gold, Certified Diamonds",
        sizes: ["US 5", "US 6", "US 7", "US 8", "US 9"],
        stock: 30,
    },
    {
        id: "4",
        name: "Vintage Amethyst Pendant",
        price: 320.0,
        images: [
            "https://images.unsplash.com/photo-1611119641753-f725a3a2a091?w=500&auto=format&fit=crop&q=60",
        ],
        description:
            "An ornate silver pendant featuring a deep violet amethyst gemstone, inspired by classic Victorian design.",
        material: "Sterling Silver, Natural Amethyst",
        sizes: ["18 inch", "20 inch"],
        stock: 12,
    },
    {
        id: "5",
        name: "Delicate Chain Bracelet",
        price: 125.0,
        images: [
            "https://images.unsplash.com/photo-1598472504445-6453f7c9e0d9?w=500&auto=format&fit=crop&q=60",
        ],
        description:
            "A barely-there chain bracelet with three tiny accent stones. Perfect for everyday subtle elegance.",
        material: "14k Gold Vermeil, Cubic Zirconia",
        sizes: ["6.5 inch", "7 inch", "7.5 inch"],
        stock: 45,
    },
];

const useProductData = (id) => {
    const [product, setProducts] = useState(null);
    // useEffect(() => {
    //   const fetchProduct = () => {
    //     const foundProduct = allProducts.find((p) => p.id === id);
    //     setProduct(foundProduct === undefined ? undefined : foundProduct);
    //   };
    //   fetchProduct();
    // }, [id]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get(`/API/products/${id}`);
                // The products are inside data.products
                // console.log("Fetched product data:", data);
                setProducts(data.products || []);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);
    return product;
};

function ProductDetails() {
    const { id } = useParams();
    // console.log("Product ID from URL:", id);
    const product = useProductData(id);

    const { addItemToCart } = useCartContext();
    const { toggleWishlistItem, isItemWished } = useWishlistContext();

    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [mainImage, setMainImage] = useState("");

    useEffect(() => {
        if (product) {
            setMainImage(product?.images?.[0]?.url || "/placeholder.png");
            setSelectedSize(product?.sizes?.[0] || "R");
        }
    }, [product]);

    const wished = product ? isItemWished(product.id) : false;

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

    if (product === null) {
        return (
            <div className="min-h-screen pt-32 text-center bg-brand-light">
                <h2 className="text-3xl font-bold text-brand">Loading Product...</h2>
            </div>
        );
    }

    if (product === undefined) {
        return (
            <div className="min-h-screen pt-32 text-center bg-brand-light">
                <h2 className="text-3xl font-bold text-brand-danger">Product Not Found!</h2>
                <p className="mt-4 text-brand-muted">
                    The item you are looking for does not exist. Go back to{" "}
                    <Link to="/products" className="text-brand-primary hover:underline">
                        Collections
                    </Link>
                </p>
            </div>
        );
    }

    // console.log("Product images:", product);


    return (
        <div className="min-h-screen bg-brand-light transition-colors duration-500 pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="lg:grid lg:grid-cols-2 lg:gap-12">
                    {/* Image Gallery */}
                    <div className="lg:sticky lg:top-32 h-full">
                        <img
                            src={mainImage}
                            alt={product.name}
                            className="w-full h-auto rounded-xl shadow-2xl object-cover aspect-square"
                        />
                        <div className="flex gap-3 mt-4 overflow-x-auto p-1">
                            {product?.images?.map((img, index) => (
                                <img
                                    key={index}
                                    src={img.url}
                                    alt={`Thumbnail ${index + 1}`}
                                    className={`w-20 h-20 object-cover rounded-md cursor-pointer transition border-2 ${img === mainImage
                                            ? "border-brand-primary shadow-md"
                                            : "border-brand-muted hover:border-brand"
                                        }`}
                                    onClick={() => setMainImage(img)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="mt-10 lg:mt-0">
                        <h1 className="text-4xl font-serif font-extrabold text-brand">{product.name}</h1>
                        <p className="text-5xl font-bold text-brand-primary mt-4">
                            ${product.finalPrice}
                        </p>

                        {/* Sizes */}
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold text-brand mb-3">Select Size/Variant:</h3>
                            <div className="flex flex-wrap gap-3">
                                {product?.sizes?.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-4 py-2 border rounded-full text-sm font-medium transition ${selectedSize === size
                                                ? "bg-brand-primary text-brand-highlight border-brand-primary shadow-md"
                                                : "bg-brand-light text-brand border-brand-muted hover:border-brand-primary"
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity */}
                        <div className="mt-8 flex items-center gap-4">
                            <h3 className="text-lg font-semibold text-brand">Quantity:</h3>
                            <div className="flex items-center border border-brand-muted rounded-full">
                                <button
                                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                                    className="px-4 py-2 text-xl text-brand-muted hover:text-brand-primary transition"
                                >
                                    -
                                </button>
                                <span className="w-8 text-center font-bold text-brand">{quantity}</span>
                                <button
                                    onClick={() => setQuantity((prev) => Math.min(product.stock, prev + 1))}
                                    className="px-4 py-2 text-xl text-brand-muted hover:text-brand-primary transition"
                                >
                                    +
                                </button>
                            </div>
                            <span className="text-sm text-brand-muted">({product.stock} in stock)</span>
                        </div>

                        {/* Buttons */}
                        <div className="mt-10 flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 w-full sm:w-auto px-8 py-4 bg-brand-primary text-brand-highlight text-xl font-bold rounded-full shadow-xl hover:bg-brand-dark transition transform hover:scale-[1.02]"
                            >
                                Add to Cart
                            </button>

                            <button
                                onClick={handleToggleWishlist}
                                className={`px-6 py-4 border text-xl rounded-full transition flex items-center justify-center gap-2 ${wished
                                        ? "border-brand-danger bg-brand-light text-brand-danger"
                                        : "border-brand-primary text-brand-primary hover:bg-brand-light"
                                    }`}
                            >
                                <FaHeart className={wished ? "fill-current" : ""} />
                                {wished ? "Remove from Wishlist" : "Add to Wishlist"}
                            </button>
                        </div>

                        {/* Description */}
                        <div className="mt-12 border-t border-brand-muted pt-8">
                            <h2 className="text-2xl font-semibold text-brand mb-4">Product Details</h2>
                            <p className="text-brand-muted leading-relaxed">{product.description}</p>

                            <ul className="mt-6 space-y-3 text-brand">
                                <li className="flex items-center gap-3">
                                    <span className="font-bold text-brand-primary">Material:</span>{" "}
                                    {product.material}
                                </li>
                                <li className="flex items-center gap-3">
                                    <FaTruck className="text-brand-primary" />
                                    Free Express Shipping & Guaranteed Delivery
                                </li>
                                <li className="flex items-center gap-3">
                                    <FaShieldAlt className="text-brand-primary" />
                                    1-Year Manufacturer Warranty
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
