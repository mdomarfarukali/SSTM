import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
// import { FaHeart, FaStar, FaPlus, FaMinus } from "react-icons/fa";
import { FaHeart, FaStar, FaMinus, FaPlus, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

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
    const handleAddToCart = (item, size, qty) => {
        if (!size) {
            console.log("\nsize is undefined.\n");
            showToast("Please select a size/variant first.", "error");
            return;
        }
        addItemToCart({
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

    const handleToggleWishlist = (productId) => {
        toggleWishlistItem(productId);
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

    const scrollThumbnails = (direction) => {
        const container = document.getElementById('thumbnail-gallery');
        if (container) {
            const scrollAmount = direction === 'left' ? -150 : 150;
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen pt-4 lg:pt-28 bg-white pb-32 lg:pb-24 relative selection:bg-pink-100 selection:text-pink-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-5 lg:gap-20">

                {/* LEFT: Image Gallery */}
                {/* Changed 'sticky top-16' to 'lg:sticky lg:top-28' so it scrolls normally on mobile */}
                <div className="flex flex-col gap-2.5 lg:gap-6 lg:sticky lg:top-28 h-fit">
                    {/* Main Image */}
                    <div
                        // restricted mobile height to 40vh so it leaves room for text
                        className="relative overflow-hidden rounded-xl lg:rounded-3xl bg-gray-50 border border-gray-100 h-[40vh] w-full lg:h-auto lg:aspect-square lg:cursor-crosshair group shadow-sm"
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        <img
                            src={mainImage}
                            className="w-full h-full object-cover transition-transform duration-200"
                            style={{
                                transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                                transform: isHovering ? "scale(2.2)" : "scale(1)"
                            }}
                            alt={product.name}
                        />
                        {/* Wished Button */}
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleToggleWishlist(product._id);
                            }}
                            className="absolute top-3 right-3 lg:top-6 lg:right-6 bg-white/90 backdrop-blur-md p-2.5 lg:p-4 rounded-full shadow-md z-10 transition-all hover:scale-105 active:scale-95"
                        >
                            <FaHeart className={`transition-colors duration-300 ${wished ? "text-red-500" : "text-gray-300 hover:text-gray-400"}`} size={18} />
                        </button>
                    </div>

                    {/* Thumbnail Gallery with Navigation Arrows */}
                    <div className="relative group/gallery w-full flex items-center">
                        {/* Left Arrow (Desktop Only) */}
                        {product.images?.length > 4 && (
                            <button
                                onClick={() => scrollThumbnails('left')}
                                className="hidden lg:flex absolute -left-4 z-10 bg-white border border-gray-100 shadow-md p-2 rounded-full opacity-0 group-hover/gallery:opacity-100 transition-opacity hover:bg-gray-50 active:scale-95"
                            >
                                <FaChevronLeft className="text-gray-600" size={14} />
                            </button>
                        )}

                        {/* Scrollable Thumbnails */}
                        <div
                            id="thumbnail-gallery"
                            className="flex gap-2 lg:gap-3 w-full overflow-x-auto pb-1.5 pt-1 snap-x scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-1"
                        >
                            {product.images?.map((img, i) => (
                                <img
                                    key={i}
                                    src={img.url}
                                    // Smaller mobile thumbnails: w-12 h-12
                                    className={`min-w-[3rem] w-12 h-12 lg:min-w-[5rem] lg:w-20 lg:h-20 object-cover cursor-pointer rounded-lg lg:rounded-2xl border-2 transition-all snap-center ${img.url === mainImage ? "border-pink-500 shadow-sm lg:shadow-md scale-100" : "border-transparent opacity-60 hover:opacity-100 bg-gray-50"}`}
                                    onClick={() => setMainImage(img.url)}
                                    alt={`Thumbnail ${i + 1}`}
                                />
                            ))}
                        </div>

                        {/* Right Arrow (Desktop Only) */}
                        {product.images?.length > 4 && (
                            <button
                                onClick={() => scrollThumbnails('right')}
                                className="hidden lg:flex absolute -right-4 z-10 bg-white border border-gray-100 shadow-md p-2 rounded-full opacity-0 group-hover/gallery:opacity-100 transition-opacity hover:bg-gray-50 active:scale-95"
                            >
                                <FaChevronRight className="text-gray-600" size={14} />
                            </button>
                        )}
                    </div>
                </div>

                {/* RIGHT: Product Info */}
                <div className="flex flex-col py-1 lg:py-4">
                    <div className="mb-1 lg:mb-2">
                        <span className="text-[10px] lg:text-xs font-bold tracking-widest text-pink-500 uppercase">Premium Collection</span>
                    </div>
                    {/* Smaller Mobile Title */}
                    <h1 className="text-2xl sm:text-3xl lg:text-[2.75rem] font-serif font-bold text-gray-900 leading-tight lg:leading-[1.1] mb-2 lg:mb-4">
                        {product.name}
                    </h1>

                    <div className="flex items-center gap-2 lg:gap-3 text-yellow-500 mb-4 lg:mb-8">
                        <div className="flex text-xs lg:text-sm"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
                        <span className="text-gray-500 text-xs lg:text-sm font-medium hover:text-gray-900 cursor-pointer transition-colors">(124 Reviews)</span>
                    </div>

                    <div className="flex items-end gap-3 lg:gap-4 mb-5 pb-5 lg:mb-10 lg:pb-8 border-b border-gray-100">
                        {/* Smaller Mobile Price */}
                        <span className="text-2xl sm:text-3xl lg:text-4xl text-gray-900 font-bold tracking-tight">
                            ₹{product.finalPrice || product.price}
                        </span>

                        {product.discount > 0 && (
                            <div className="flex items-center gap-2 lg:gap-3 pb-0.5 lg:pb-1">
                                <span className="text-sm lg:text-lg text-gray-400 line-through font-medium">
                                    ₹{product.price}
                                </span>
                                <span className="text-[10px] lg:text-xs font-bold text-pink-600 bg-pink-50 px-2 lg:px-2.5 py-1 rounded-md uppercase tracking-wider">
                                    Save {product.discount}%
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Variant Selector */}
                    <div className="mb-5 lg:mb-8">
                        <div className="flex justify-between items-center mb-3 lg:mb-4">
                            <p className="text-xs lg:text-sm font-bold text-gray-900">Select Size</p>
                            <button className="text-[10px] lg:text-xs text-gray-400 underline hover:text-gray-900 transition-colors">Size Guide</button>
                        </div>
                        <div className="flex flex-wrap gap-2 lg:gap-3">
                            {product.sizes?.map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setSelectedSize(s)}
                                    // Smaller mobile buttons
                                    className={`min-w-[2.5rem] lg:min-w-[3.5rem] px-3 py-1.5 lg:px-5 lg:py-2.5 rounded-lg lg:rounded-xl border-2 transition-all font-bold text-xs lg:text-sm flex items-center justify-center ${selectedSize === s ? "bg-gray-900 border-gray-900 text-white shadow-md" : "bg-white border-gray-200 text-gray-600 hover:border-gray-900 hover:text-gray-900"}`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quantity */}
                    <div className="mb-6 lg:mb-10">
                        <p className="text-xs lg:text-sm font-bold text-gray-900 mb-3 lg:mb-4">Quantity</p>
                        <div className="flex items-center border border-gray-200 w-fit rounded-lg lg:rounded-xl bg-white shadow-sm">
                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2.5 lg:p-3.5 text-gray-400 hover:text-gray-900 transition-colors"><FaMinus size={10} className="lg:text-xs" /></button>
                            <span className="px-4 lg:px-6 font-bold text-sm lg:text-lg w-12 lg:w-16 text-center text-gray-900">{quantity}</span>
                            <button onClick={() => setQuantity(quantity + 1)} className="p-2.5 lg:p-3.5 text-gray-400 hover:text-gray-900 transition-colors"><FaPlus size={10} className="lg:text-xs" /></button>
                        </div>
                    </div>

                    {/* Desktop Action Buttons */}
                    <div className="hidden lg:flex gap-4 mb-10">
                        <button
                            onClick={() => handleAddToCart(product, selectedSize, quantity)}
                            className="flex-[1.5] bg-gray-900 text-white py-4.5 rounded-xl font-bold uppercase tracking-widest hover:bg-black shadow-[0_8px_20px_rgba(0,0,0,0.12)] transition-all active:scale-[0.98] flex items-center justify-center"
                        >
                            Add to Cart
                        </button>
                        <button
                            onClick={() => handleBuyNow(product, selectedSize, quantity)}
                            className="flex-1 border-2 border-brand bg-brand-primary text-white py-4.5 rounded-xl font-bold uppercase tracking-widest hover:bg-pink-600 hover:border-pink-600 transition-all active:scale-[0.98]"
                        >
                            Buy Now
                        </button>
                    </div>

                    {/* Pincode Check - Hidden or condensed on mobile if space is tight, but kept smaller here */}
                    <div className="mb-6 lg:mb-10 p-1 lg:p-1.5 bg-gray-50/50 border border-gray-200 rounded-xl lg:rounded-2xl flex flex-col sm:flex-row gap-2">
                        <input
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                            placeholder="Enter delivery pincode"
                            className="flex-1 bg-transparent px-4 lg:px-5 py-2.5 lg:py-3.5 outline-none text-gray-700 placeholder-gray-400 w-full font-medium text-sm lg:text-base"
                        />
                        <button onClick={() => setIsPincodeValid(pincode.length === 6)} className="bg-white text-gray-900 border border-gray-200 px-6 lg:px-8 py-2.5 lg:py-3.5 rounded-lg lg:rounded-xl font-bold w-full sm:w-auto hover:bg-gray-50 transition-colors shadow-sm text-sm lg:text-base">Check</button>
                    </div>
                    {isPincodeValid !== null && (
                        <div className={`-mt-4 lg:-mt-6 mb-6 lg:mb-10 text-xs lg:text-sm font-medium flex items-center gap-2 ${isPincodeValid ? "text-green-600" : "text-red-500"}`}>
                            {isPincodeValid ? "✓ Standard delivery in 3-5 days" : "× Service unavailable in your area"}
                        </div>
                    )}

                    {/* Description - Tightened mobile spacing */}
                    <div className="mt-2 lg:mt-4 border-t border-gray-100 pt-5 lg:pt-8">
                        <h2 className="text-base lg:text-lg font-bold text-gray-900 mb-3 lg:mb-4">Product Details</h2>
                        <div className="text-gray-500 leading-relaxed text-xs lg:text-base space-y-2 lg:space-y-4">
                            <p>{product.description || "A masterfully crafted piece designed for those who appreciate the finer things in life. Perfect for everyday elegance."}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ⭐ REVIEWS SECTION */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-16 lg:mt-32">
                <div className="flex items-center gap-4 lg:gap-6 mb-8 lg:mb-12">
                    <h2 className="text-xl lg:text-3xl font-serif font-bold text-gray-900">Customer Reviews</h2>
                    <div className="flex-1 h-[1px] bg-gray-200"></div>
                </div>

                <div className="grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16">
                    {/* Write a review */}
                    <div className="lg:sticky top-28 h-fit bg-gray-50 p-5 lg:p-8 rounded-2xl lg:rounded-3xl border border-gray-100">
                        <h3 className="font-bold text-lg lg:text-xl text-gray-900 mb-1 lg:mb-2">Write a Review</h3>
                        <p className="text-xs lg:text-sm text-gray-500 mb-5 lg:mb-6">Share your thoughts with other customers.</p>

                        <div className="flex gap-1.5 mb-5 lg:mb-6">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <FaStar key={s} onClick={() => setRating(s)} className={`cursor-pointer text-xl lg:text-2xl transition-colors ${s <= rating ? "text-yellow-400" : "text-gray-300 hover:text-yellow-300"}`} />
                            ))}
                        </div>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="What did you like or dislike?"
                            className="w-full h-28 lg:h-32 p-3 lg:p-4 rounded-xl border border-gray-200 mb-5 lg:mb-6 outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none text-sm"
                        />
                        <button
                            onClick={() => handleSubmitReview()}
                            className="w-full bg-gray-900 text-white py-3 lg:py-4 rounded-xl font-bold hover:bg-black transition-colors shadow-lg shadow-gray-200 text-sm lg:text-base">
                            Submit Review
                        </button>
                    </div>

                    {/* Review List */}
                    <div className="space-y-4 lg:space-y-6">
                        {reviews.map((rev) => (
                            <div key={rev._id} className="p-5 lg:p-8 bg-white border border-gray-100 rounded-2xl lg:rounded-3xl hover:shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-shadow">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 lg:gap-4 mb-4 lg:mb-5">
                                    <div className="flex items-center gap-3 lg:gap-4">
                                        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gray-100 overflow-hidden border border-gray-200 flex-shrink-0">
                                            <img src={rev.user_id.avatar || "/userAvatarTrimmed.png"} className="w-full h-full object-cover" alt={rev.user_id.name} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 text-sm lg:text-base">{rev.user_id.name}</p>
                                            <div className="flex text-yellow-400 text-[10px] lg:text-xs mt-0.5 lg:mt-1">
                                                {[...Array(5)].map((_, i) => <FaStar key={i} className={i < Math.floor(rev.rating) ? "text-yellow-400" : "text-gray-200"} />)}
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-[10px] lg:text-xs text-gray-400 font-medium">{new Date(rev.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>
                                <p className="text-gray-600 leading-relaxed text-xs lg:text-base">"{rev.review}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 🔥 RECOMMENDED (Scrollable Carousel on Desktop) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-16 lg:mt-32 overflow-hidden">
                <div className="flex items-center justify-between mb-6 lg:mb-12">
                    <h2 className="text-xl lg:text-3xl font-serif font-bold text-gray-900">You May Also Like</h2>
                    <div className="hidden lg:flex gap-2">
                        <button onClick={() => scrollThumbnails('left')} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"><FaChevronLeft size={12} className="text-gray-600" /></button>
                        <button onClick={() => scrollThumbnails('right')} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"><FaChevronRight size={12} className="text-gray-600" /></button>
                    </div>
                </div>

                {/* Scrollable Container */}
                <div className="flex overflow-x-auto gap-4 lg:gap-5 pb-8 lg:pb-12 snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4 sm:mx-0 sm:px-0">
                    {recommended.map((item) => (
                        <div key={item._id} className="group w-[150px] sm:w-[200px] lg:w-[240px] xl:w-[260px] flex-none snap-start bg-white p-3 lg:p-4 rounded-[1.25rem] lg:rounded-[1.75rem] border border-gray-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-gray-200 transition-all duration-300 flex flex-col relative">

                            {/* STRICT SIZING APPLIED HERE: w-[150px] mobile, w-[200px] tablet, w-[240px] desktop, flex-none */}
                            {/* Wishlist Button on Product Card */}
                            <button
                                className="absolute top-4 right-4 lg:top-5 lg:right-5 z-10 bg-white/90 backdrop-blur p-1.5 lg:p-2 rounded-full shadow-sm hover:scale-110 active:scale-95 transition-all"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.stopPropagation();
                                    handleToggleWishlist(item._id);
                                }}
                            >
                                <FaHeart className={`text-[10px] lg:text-sm ${item.isWished ? "text-red-500" : "text-gray-300 hover:text-red-400"}`} />
                            </button>

                            <button onClick={() => navigate(`/product/${item._id}`)} className="text-left w-full h-full flex flex-col outline-none">
                                <div className="overflow-hidden rounded-xl aspect-[4/5] mb-2 lg:mb-4 relative bg-gray-50 w-full">
                                    <img src={item.images?.[0]?.url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={item.name} />
                                </div>
                                <h3 className="font-bold text-gray-900 truncate mb-1 px-1 text-xs lg:text-sm">{item.name}</h3>
                                <div className="flex items-center gap-1.5 lg:gap-2 mb-2 lg:mb-4 px-1">
                                    <span className="text-gray-900 font-bold text-xs lg:text-sm">
                                        ₹{item.finalPrice || item.price}
                                    </span>
                                    {item.discount > 0 && (
                                        <span className="text-[9px] lg:text-[10px] text-gray-400 line-through">
                                            ₹{item.price}
                                        </span>
                                    )}
                                </div>
                            </button>

                            <div className="mt-auto pt-1 lg:pt-2">
                                <button
                                    onClick={() => handleAddToCart(item, item.sizes?.[0] || "R", 1)}
                                    className="w-full py-2 lg:py-2.5 rounded-lg lg:rounded-xl border border-brand bg-brand-light text-brand-muted text-[9px] lg:text-xs font-bold hover:text-white hover:border-brand hover:bg-brand-primary transition-all uppercase tracking-widest"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 📱 MOBILE STICKY BOTTOM BAR */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-2.5 px-4 flex gap-2 z-50 shadow-[0_-10px_20px_rgba(0,0,0,0.03)] pb-safe">
                <button
                    onClick={() => handleAddToCart(product, selectedSize, quantity)}
                    className="flex-[1.5] bg-gray-900 text-white py-3 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all"
                >
                    Add to Cart
                </button>
                <button
                    onClick={() => handleBuyNow(product, selectedSize, quantity)}
                    className="flex-1 bg-brand-primary text-white py-3 rounded-lg font-bold text-xs uppercase tracking-wider active:bg-pink-600 transition-colors"
                >
                    Buy Now
                </button>
            </div>

        </div >
    );
}

export default ProductDetails;