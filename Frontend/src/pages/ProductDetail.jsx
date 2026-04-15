// src/pages/ProductDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaHeart, FaTruck, FaShieldAlt } from "react-icons/fa";
import axios from "axios";

import { useCartContext } from "../context/CartContext.jsx";
import { useWishlistContext } from "../context/WishListContext.jsx";
import { showToast } from "../utils/toastUtils.js";
import LoadingSpinner from "../components/common/LoadingSpinner.jsx";

function ProductDetails() {
    const { id } = useParams();

    const { addItemToCart } = useCartContext();
    const { toggleWishlistItem, isItemWished } = useWishlistContext();

    const [product, setProduct] = useState(null);
    const [recommended, setRecommended] = useState([]);

    const [mainImage, setMainImage] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);

    const [loading, setLoading] = useState(true);

    // ⭐ Reviews
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    // 📦 Fetch product + recommendations + reviews
    useEffect(() => {
        const fetchData = async () => {
            try {
                // 🔌 API HERE - get single product
                const { data } = await axios.get(`/API/products/${id}`);
                setProduct(data.product);

                setMainImage(data.product.images?.[0]?.url);
                setSelectedSize(data.product?.sizes?.[0] || "");

                // 🔌 API HERE - recommended products
                const rec = await axios.get(`/API/products`);
                setRecommended(rec.data.products.slice(0, 6));

                // 🔌 API HERE - reviews
                const rev = await axios.get(`/API/products/${id}/reviews`);
                setReviews(rev.data.reviews || []);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const wished = product ? isItemWished(product._id) : false;

    const handleAddToCart = () => {
        if (!selectedSize) {
            showToast("Select variant first", "error");
            return;
        }

        addItemToCart({
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.images[0].url,
            selectedSize,
            quantity,
        });

        showToast("Added to cart", "success");
    };

    const handleToggleWishlist = () => {
        toggleWishlistItem({
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.images[0].url,
        });
    };

    // ⭐ Average rating
    const avgRating =
        reviews.length > 0
            ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1)
            : 0;

    // ⭐ Star UI
    const StarRating = ({ value, onChange }) => (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
                <span
                    key={s}
                    onClick={() => onChange && onChange(s)}
                    className={`cursor-pointer text-xl ${
                        s <= value ? "text-yellow-400" : "text-gray-300"
                    }`}
                >
                    ★
                </span>
            ))}
        </div>
    );

    // ⭐ Submit review
    const handleSubmitReview = async () => {
        if (!rating || !comment) return;

        try {
            // 🔌 API HERE - post review
            await axios.post(`/API/products/${id}/reviews`, {
                rating,
                comment,
            });

            showToast("Review added", "success");

            // refresh
            const { data } = await axios.get(`/API/products/${id}/reviews`);
            setReviews(data.reviews);

            setRating(0);
            setComment("");
        } catch (err) {
            console.log(err);
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="min-h-screen pt-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-2 gap-10">

                {/* 🔥 LEFT SIDE */}
                <div className="sticky top-28 h-fit flex gap-4">

                    {/* Vertical thumbnails */}
                    <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto">
                        {product.images?.map((img, i) => (
                            <img
                                key={i}
                                src={img.url}
                                className={`w-16 h-16 cursor-pointer border ${
                                    img.url === mainImage
                                        ? "border-black"
                                        : "border-gray-300"
                                }`}
                                onClick={() => setMainImage(img.url)}
                            />
                        ))}
                    </div>

                    {/* Main Image */}
                    <div className="relative flex-1 overflow-hidden rounded-xl">
                        <img
                            src={mainImage}
                            className="w-full transition hover:scale-110 duration-500"
                        />

                        {/* ❤️ Wishlist */}
                        <button
                            onClick={handleToggleWishlist}
                            className="absolute top-4 right-4 bg-white p-3 rounded-full shadow"
                        >
                            <FaHeart className={wished ? "text-red-500" : "text-gray-400"} />
                        </button>
                    </div>
                </div>

                {/* 🔥 RIGHT SIDE */}
                <div>

                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <p className="text-2xl text-pink-600 mt-2">₹{product.price}</p>

                    {/* ⭐ Rating */}
                    <div className="flex items-center gap-2 mt-2">
                        <StarRating value={Math.round(avgRating)} />
                        <span>{avgRating} ({reviews.length})</span>
                    </div>

                    {/* Sizes */}
                    <div className="mt-6 flex gap-2">
                        {product.sizes?.map((s) => (
                            <button
                                key={s}
                                onClick={() => setSelectedSize(s)}
                                className={`px-4 py-2 border ${
                                    selectedSize === s ? "bg-black text-white" : ""
                                }`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>

                    {/* Pincode */}
                    <div className="mt-6">
                        <input
                            placeholder="Enter Pincode"
                            className="border px-4 py-2"
                        />
                    </div>

                    {/* Offers */}
                    <div className="mt-6 bg-gray-100 p-4 rounded">
                        <p>10% OFF on prepaid</p>
                        <p>Free shipping</p>
                    </div>

                    {/* Sticky Buttons */}
                    <div className="sticky bottom-0 bg-white py-4 flex gap-3 mt-10">
                        <button className="flex-1 border py-3">Buy Now</button>
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 bg-black text-white py-3"
                        >
                            Add to Cart
                        </button>
                    </div>

                    {/* Description */}
                    <div className="mt-10">
                        <h2 className="text-xl font-bold">Product Details</h2>
                        <p>{product.description}</p>
                    </div>

                    {/* ⭐ Reviews */}
                    <div className="mt-12">
                        <h2 className="text-xl font-bold">Reviews</h2>

                        <StarRating value={rating} onChange={setRating} />

                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full border mt-2 p-2"
                        />

                        <button
                            onClick={handleSubmitReview}
                            className="mt-2 bg-black text-white px-4 py-2"
                        >
                            Submit
                        </button>

                        {reviews.map((r, i) => (
                            <div key={i} className="mt-4 border p-2">
                                <StarRating value={r.rating} />
                                <p>{r.comment}</p>
                            </div>
                        ))}
                    </div>

                    {/* 🔥 Recommended */}
                    <div className="mt-16">
                        <h2 className="text-xl font-bold mb-4">You May Also Like</h2>

                        <div className="grid grid-cols-2 gap-4">
                            {recommended.map((item) => (
                                <Link to={`/product/${item._id}`} key={item._id}>
                                    <img src={item.images?.[0]?.url} />
                                    <p>{item.name}</p>
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ProductDetails;