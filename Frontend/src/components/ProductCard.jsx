
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";

import { useWishlistContext } from "../context/WishListContext.jsx";
import { useCartContext } from "../context/CartContext";
// import "./ProductCard.css";

const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(Number(price) || 0);

const ProductCard = ({ product, index = 0 }) => {
    const productId = product._id || product.id;

    const {
        toggleWishlistItem,
        isItemWished,
        wishlistItems = [],
    } = useWishlistContext();

    const { addItemToCart } = useCartContext();

    const [isSaved, setIsSaved] = useState(
        () => isItemWished(productId)
    );

    const [adding, setAdding] = useState(false);

    // Sync heart state whenever the shared wishlist changes.
    useEffect(() => {
        setIsSaved(isItemWished(productId));
    }, [wishlistItems, productId, isItemWished]);

    const imageUrl =
        product.image ||
        product.thumbnail ||
        product.images?.[0]?.url ||
        product.images?.[0]?.secure_url ||
        (typeof product.images?.[0] === "string"
            ? product.images[0]
            : null) ||
        "/placeholder.png";

    const price = product.finalPrice ?? product.price ?? 0;

    const material = Array.isArray(product.material)
        ? product.material.join(" • ")
        : product.material || product.category || "";

    const badge = product.isNewArrival
        ? "New Arrival"
        : product.isBestSeller
            ? "Bestseller"
            : product.discount > 0
                ? `${product.discount}% Off`
                : null;

    const handleWishlist = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        try {
            await toggleWishlistItem(productId);
        } catch (error) {
            console.error("Error updating wishlist:", error);
        }
    };

    const handleAddToCart = async () => {
        if (adding) return;

        try {
            setAdding(true);

            await addItemToCart({
                id: productId,
                name: product.name,
                price,
                image: imageUrl,
                quantity: 1,
                selectedSize: "R",
            });
        } catch (error) {
            console.error("Error adding product to cart:", error);
        } finally {
            setAdding(false);
        }
    };

    return (
        <article
            className="diva-product-card"
            style={{ "--card-index": index }}
        >
            <div className="diva-card-image-wrap">
                <Link
                    to={`/product/${productId}`}
                    className="diva-card-image-link"
                    aria-label={`View ${product.name}`}
                >
                    <img
                        src={imageUrl}
                        alt={product.name || "DIVA jewellery"}
                        loading="lazy"
                        onError={(event) => {
                            event.currentTarget.src = "/placeholder.png";
                        }}
                    />
                </Link>

                {badge && (
                    <span
                        className={`diva-product-badge ${
                            product.isBestSeller ? "bestseller" : ""
                        }`}
                    >
                        {badge}
                    </span>
                )}

                <button
                    type="button"
                    className={`diva-wishlist-button ${
                        isSaved ? "is-saved" : ""
                    }`}
                    onClick={handleWishlist}
                    aria-label={
                        isSaved
                            ? `Remove ${product.name} from wishlist`
                            : `Add ${product.name} to wishlist`
                    }
                    aria-pressed={isSaved}
                >
                    <Heart
                        size={18}
                        strokeWidth={1.8}
                        fill={isSaved ? "currentColor" : "none"}
                    />
                </button>

                <div className="diva-card-hover-action">
                    <button
                        type="button"
                        onClick={handleAddToCart}
                        disabled={adding}
                    >
                        <ShoppingBag size={15} />
                        {adding ? "Adding..." : "Add to Bag"}
                    </button>
                </div>
            </div>

            <div className="diva-card-content">
                <div className="diva-card-description">
                    <p className="diva-card-material">
                        {material}
                    </p>

                    <Link
                        to={`/product/${productId}`}
                        className="diva-card-title-link"
                    >
                        <h2>{product.name}</h2>
                    </Link>
                </div>

                <div className="diva-card-price-row">
                    <div className="diva-card-price">
                        <span>{formatPrice(price)}</span>

                        {product.discount > 0 &&
                            product.price > price && (
                                <del>{formatPrice(product.price)}</del>
                            )}
                    </div>

                    <span className="diva-card-stock">
                        {product.inStock ? "Available" : "Made to Order"}
                    </span>
                </div>

                <button
                    type="button"
                    className="diva-mobile-add"
                    onClick={handleAddToCart}
                    disabled={adding}
                >
                    <ShoppingBag size={15} />
                    {adding ? "Adding..." : "Add to Bag"}
                </button>
            </div>
        </article>
    );
};

export default ProductCard;

