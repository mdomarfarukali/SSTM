import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaHeart, FaStar, FaPlus, FaMinus } from "react-icons/fa";
import axios from "axios";

import { useCartContext } from "../../context/CartContext.jsx";
import { useWishlistContext } from "../../context/WishListContext.jsx";
import { showToast } from "../../utils/toastUtils.js";
import LoadingSpinner from "../../components/common/LoadingSpinner.jsx";

import useProductData from "../../components/hooks/useProductData.js";
import useReviews from "../../components/hooks/useReviews.js";
import useRecommendedProducts from "../../components/hooks/useRecommendedProducts.js";

function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    // console.log("\n\nCurrent Product:", id);
    const { addItemToCart } = useCartContext();
    const { toggleWishlistItem, isItemWished } = useWishlistContext();

    const { product, loading } = useProductData(id);
    // console.log("\nProduct: ", product);

    const recommended = useRecommendedProducts(id);
    const [mainImage, setMainImage] = useState("/placeholder.png");
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);

    const [pincode, setPincode] = useState("");
    const [isPincodeValid, setIsPincodeValid] = useState(null);
    const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const { reviews, refetchReviews } = useReviews(id);
    // console.log("Rdata: ", reviews);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    // const staticReviews = [
    //     { id: "rev_001", user: { name: "Amit Sharma", avatar: "https://i.pravatar.cc/150?img=1" }, rating: 4.5, comment: "Great video quality and smooth streaming experience!", createdAt: "2026-04-10T14:32:00Z" },
    //     { id: "rev_002", user: { name: "Priya Das", avatar: "https://i.pravatar.cc/150?img=2" }, rating: 5, comment: "Loved the content! Very informative and well explained.", createdAt: "2026-04-11T09:15:00Z" },
    //     { id: "rev_003", user: { name: "Rahul Verma", avatar: "https://i.pravatar.cc/150?img=3" }, rating: 3.5, comment: "Good video but buffering could be improved.", createdAt: "2026-04-12T18:45:00Z" },
    //     { id: "rev_004", user: { name: "Sneha Roy", avatar: "https://i.pravatar.cc/150?img=4" }, rating: 4, comment: "Nice UI and playback controls. Enjoyed watching!", createdAt: "2026-04-13T12:20:00Z" },
    //     { id: "rev_005", user: { name: "Arjun Singh", avatar: "https://i.pravatar.cc/150?img=5" }, rating: 2.5, comment: "Content is okay but needs better audio clarity.", createdAt: "2026-04-14T20:05:00Z" }
    // ];

    useEffect(() => {
        try {
            // console.log("Hey we're here. loading: ", loading, "\nId: ", id);
            if (product) {
                // console.log("Product data loaded:", product._id);
                setMainImage(product.images?.[0]?.url || "/placeholder.png");
                setSelectedSize(product?.sizes?.[0] || "R");
                setQuantity(1);
            }
        } catch (error) {
            console.error("Error setting product data:", error);
        }
    }, [product]);

    // 🛠️ Action Handlers Fixed
    const handleAddToCart = async (item, size, qty) => {
        if (!size) {
            console.log("\nsize is undefined.\n");
            showToast("Please select a size/variant first.", "error");
            return;
        }
        await addItemToCart({
            id: item._id,
            name: item.name,
            price: item.finalPrice || item.price,
            image: item.images[0].url,
            selectedSize: size,
            quantity: qty,
        });
        showToast(`${qty} x ${item.name} added to cart!`, "success");
    };

    const handleBuyNow = (item, size, qty) => {
        if (!size) {
            showToast("Please select a size/variant first.", "error");
            return;
        }
        handleAddToCart(item, size, qty);
        navigate("/cart");
    };

    const handleToggleWishlist = () => {
        toggleWishlistItem(product._id);
    };

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;
        setZoomPos({ x, y });
    };

    const handleSubmitReview = async () => {
        if (!comment || !rating) return;

        try {
            // setSubmitting(true);
            // need to add loading animation here.

            await axios.post(
                "/API/reviews",
                {
                    product_id: product._id,
                    review: comment,
                    rating
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            setComment("");
            setRating(0);

            // ✅ Refresh reviews (IMPORTANT)
            await refetchReviews();
        } catch (err) {
            console.error("Error submitting review:", err);
        } finally {
            // setSubmitting(false);
        }
    };

    if (loading || !product) return <LoadingSpinner />;
    // if (!product) return <div className="pt-32 text-center">Product not found.</div>;

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

    const wished = isItemWished(product._id);

    return (
        <div className="min-h-screen pt-24 bg-white pb-20">
            <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16">

                {/* LEFT: Image Gallery */}
                <div className="flex flex-col gap-6">
                    <div
                        className="relative overflow-hidden rounded-3xl bg-gray-50 border border-gray-100 aspect-square cursor-crosshair"
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        <img
                            src={mainImage}
                            className="w-full h-full object-cover transition-transform duration-150"
                            style={{
                                transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                                transform: isHovering ? "scale(2.2)" : "scale(1)"
                            }}
                            alt={product.name}
                        />
                        <button
                            onClick={handleToggleWishlist}
                            className="absolute top-6 right-6 bg-white/90 backdrop-blur p-4 rounded-full shadow-lg z-10 transition-transform active:scale-90"
                        >
                            <FaHeart className={wished ? "text-red-500" : "text-gray-300"} size={22} />
                        </button>
                    </div>

                    <div className="flex gap-4 w-full">
                        {product.images?.map((img, i) => (
                            <img
                                key={i}
                                src={img.url}
                                className={`w-28 h-28 object-cover cursor-pointer rounded-2xl border-2 transition-all ${img.url === mainImage ? "border-pink-500 scale-105" : "border-transparent opacity-60"}`}
                                onClick={() => setMainImage(img.url)}
                            />
                        ))}
                    </div>
                </div>

                {/* RIGHT: Product Info */}
                <div className="flex flex-col">
                    <h1 className="text-4xl font-serif font-bold text-gray-900">{product.name}</h1>
                    <div className="flex items-center gap-2 mt-4 text-yellow-500">
                        <div className="flex text-sm"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
                        <span className="text-gray-400 text-sm ml-2 font-sans">(4.8 / 5.0)</span>
                    </div>

                    <div className="flex items-center gap-4 mt-6">
                        <span className="text-3xl text-pink-600 font-bold">
                            ₹{product.finalPrice || product.price}
                        </span>

                        {product.discount > 0 && (
                            <>
                                <span className="text-lg text-gray-400 line-through">
                                    ₹{product.price}
                                </span>

                                <span className="text-sm text-green-600 font-semibold">
                                    {product.discount}% OFF
                                </span>
                            </>
                        )}
                    </div>

                    {/* Variant Selector */}
                    <div className="mt-10">
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Select Variant</p>
                        <div className="flex gap-3">
                            {product.sizes?.map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setSelectedSize(s)}
                                    className={`px-8 py-3 rounded-full border-2 transition-all font-bold text-sm ${selectedSize === s ? "bg-black border-black text-white" : "bg-white border-gray-200 text-gray-700"}`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quantity */}
                    <div className="mt-8">
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Quantity</p>
                        <div className="flex items-center border border-gray-200 w-fit rounded-full p-1">
                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:text-pink-500"><FaMinus size={12} /></button>
                            <span className="px-6 font-bold text-lg">{quantity}</span>
                            <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:text-pink-500"><FaPlus size={12} /></button>
                        </div>
                    </div>

                    {/* Pink Action Buttons */}
                    <div className="flex gap-4 mt-10">
                        <button
                            onClick={() => handleBuyNow(product, selectedSize, quantity)}
                            className="flex-1 border-2 border-pink-500 text-pink-600 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-pink-50 transition-all"
                        >
                            Buy Now
                        </button>
                        <button
                            onClick={() => handleAddToCart(product, selectedSize, quantity)}
                            className="flex-1 bg-pink-500 text-white py-4 rounded-full font-bold uppercase tracking-widest hover:bg-pink-600 shadow-lg shadow-pink-100 transition-all active:scale-95"
                        >
                            Add to Cart
                        </button>
                    </div>

                    {/* Pincode */}
                    <div className="mt-10 p-6 bg-gray-50 rounded-3xl border border-gray-100">
                        <div className="flex gap-3">
                            <input
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
                                placeholder="Enter Pincode"
                                className="flex-1 bg-white border border-gray-200 px-6 py-3 rounded-full outline-none focus:ring-2 focus:ring-pink-200"
                            />
                            <button onClick={() => setIsPincodeValid(pincode.length === 6)} className="bg-black text-white px-8 py-3 rounded-full font-bold">Check</button>
                        </div>
                        {isPincodeValid !== null && (
                            <p className={`text-xs font-bold mt-3 ml-4 ${isPincodeValid ? "text-green-600" : "text-red-500"}`}>
                                {isPincodeValid ? "✓ Standard delivery in 3-5 days" : "× Service unavailable"}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div className="mt-12">
                        <h2 className="text-xl font-bold border-b pb-4 text-gray-800 font-serif">Product Details</h2>
                        <div className="mt-6 text-gray-600 leading-relaxed font-serif text-lg italic opacity-80">
                            {product.description || "A masterfully crafted piece designed for those who appreciate the finer things in life."}
                        </div>
                    </div>
                </div>
            </div>

            {/* ⭐ REVIEWS SECTION */}
            <div className="max-w-7xl mx-auto px-4 mt-24">
                <div className="flex items-center gap-6 mb-12">
                    <h2 className="text-3xl font-serif font-bold text-gray-900">Customer Reviews</h2>
                    <div className="flex-1 h-px bg-gray-100"></div>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Write a review */}
                    <div className="lg:col-span-1 bg-gray-50 p-8 rounded-3xl h-fit">
                        <h3 className="font-bold text-xl mb-4">Share your thoughts</h3>
                        <div className="flex gap-1 mb-6">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <FaStar key={s} onClick={() => setRating(s)} className={`cursor-pointer text-2xl ${s <= rating ? "text-yellow-400" : "text-gray-200"}`} />
                            ))}
                        </div>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Write your experience..."
                            className="w-full h-32 p-4 rounded-2xl border border-gray-200 mb-4 outline-none focus:ring-2 focus:ring-pink-200"
                        />
                        <button
                            onClick={() => handleSubmitReview()}
                            className="w-full bg-black text-white py-4 rounded-full font-bold">
                            Post Review
                        </button>
                    </div>

                    {/* Review List */}
                    <div className="lg:col-span-2 space-y-6">
                        {reviews.map((rev) => (
                            <div key={rev._id} className="p-8 border border-gray-100 rounded-3xl hover:bg-gray-50 transition-colors">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                        <img src={rev.user_id.avatar ||"/userAvatarTrimmed.png"} className="w-12 h-12 rounded-full" alt="avatar" />
                                        <div>
                                            <p className="font-bold text-gray-900">{rev.user_id.name}</p>
                                            <div className="flex text-yellow-400 text-xs">
                                                {[...Array(5)].map((_, i) => <FaStar key={i} className={i < Math.floor(rev.rating) ? "text-yellow-400" : "text-gray-200"} />)}
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-400 uppercase tracking-widest">{new Date(rev.createdAt).toLocaleDateString()}</span>
                                </div>
                                <p className="text-gray-600 leading-relaxed italic">"{rev.review}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 🔥 RECOMMENDED */}
            <div className="max-w-7xl mx-auto px-4 mt-32">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl font-serif font-bold text-gray-900">You May Also Like</h2>
                    <div className="h-[2px] bg-pink-100 flex-1 ml-8"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {recommended.map((item) => (
                        <div key={item._id} className="group bg-white p-5 rounded-[2rem] border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col">
                            {/* <Link to={`/product/${item._id}`}>
                                <div className="overflow-hidden rounded-2xl aspect-square mb-5">
                                    <img src={item.images?.[0]?.url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.name} />
                                </div>
                                <h3 className="font-bold text-gray-800 truncate mb-1 px-1">{item.name}</h3>
                                <p className="text-pink-600 font-bold mb-5 px-1">₹{item.price}</p>
                            </Link> */}

                            <button onClick={() => navigate(`/product/${item._id}`)}>
                                <div className="overflow-hidden rounded-2xl aspect-square mb-5">
                                    <img src={item.images?.[0]?.url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.name} />
                                </div>
                                <h3 className="font-bold text-gray-800 truncate mb-1 px-1">{item.name}</h3>
                                <div className="flex items-center gap-2 mb-5 px-1">
                                    <span className="text-pink-600 font-bold">
                                        ₹{item.finalPrice || item.price}
                                    </span>

                                    {item.discount > 0 && (
                                        <>
                                            <span className="text-sm text-gray-400 line-through">
                                                ₹{item.price}
                                            </span>

                                            <span className="text-xs text-green-600 font-semibold">
                                                {item.discount}% OFF
                                            </span>
                                        </>
                                    )}
                                </div>
                            </button>

                            <div className="flex flex-col gap-2 mt-auto">
                                <button onClick={() => handleBuyNow(item, item.sizes?.[0] || "R", 1)} className="w-full py-3 rounded-full border border-pink-500 text-pink-600 text-xs font-bold hover:bg-pink-50 transition-colors uppercase tracking-widest">Quick Buy</button>
                                <button onClick={() => handleAddToCart(item, item.sizes?.[0] || "R", 1)} className="w-full py-3 rounded-full bg-pink-500 text-white text-xs font-bold hover:bg-pink-600 transition-colors uppercase tracking-widest">Add to Cart</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;