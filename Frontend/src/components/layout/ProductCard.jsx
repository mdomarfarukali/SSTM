// import React from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import React, { useEffect, useState } from "react";

import { useWishlistContext } from "../../context/WishListContext";
import { useCartContext } from "../../context/CartContext";

const ProductCard = ({ product, isSaved, onAddToWishlist, onAddToCart }) => {
    const productPath = `/product/${product._id}`;

    const { toggleWishlistItem, isItemWished } = useWishlistContext();
    const { addItemToCart } = useCartContext();

    // const productId = product._id;
    // const isProductSaved = isItemWished(productId);

    const productId = product._id;
    const [isProductSaved, setIsProductSaved] = useState(
        () => isItemWished(productId)
    );

    useEffect(() => {
        setIsProductSaved(isItemWished(productId));
    }, [productId, isItemWished, toggleWishlistItem]);


    const imageUrl =
        product.image ||
        product.thumbnail ||
        product.images?.[0]?.url ||
        product.images?.[0]?.secure_url ||
        product.images?.[0] ||
        "/placeholder.png";

    // const handleWishlist = (event) => {
    //     event.preventDefault();
    //     event.stopPropagation();
    //     toggleWishlistItem(productId);
    // };

    const handleWishlist = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        // Update the heart immediately for responsive feedback.
        setIsProductSaved((previous) => !previous);

        try {
            await toggleWishlistItem(productId);
        } catch (error) {
            // Revert if the wishlist operation fails.
            setIsProductSaved((previous) => !previous);
            console.error("Error updating wishlist:", error);
        }
    };

    const handleAddToCart = async () => {
        try {
            await addItemToCart({
                id: productId,
                name: product.name,
                price: product.finalPrice ?? product.price,
                image: imageUrl,
                quantity: 1,
                selectedSize: "R",
            });
        } catch (error) {
            console.error("Error adding product to cart:", error);
        }
    };

    return (
        <article className="diva-pcard">
            <div className="diva-pcard__frame">
                <div className="diva-pcard__image">
                    <Link
                        to={productPath}
                        aria-label={`View ${product.name}`}
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            loading="lazy"
                        />
                    </Link>

                    <button
                        type="button"
                        className={`diva-pcard__heart ${isProductSaved ? "is-saved" : ""}`}
                        aria-pressed={isProductSaved}
                        aria-label={
                            isProductSaved
                                ? `Remove ${product.name} from wishlist`
                                : `Save ${product.name} to wishlist`
                        }
                        onClick={handleWishlist}
                    >
                        <Heart size={17} fill={isProductSaved ? "currentColor" : "none"} />
                    </button>

                    {product.badge && (
                        <span className="diva-pcard__tag">{product.badge}</span>
                    )}
                </div>
            </div>

            <div className="diva-pcard__body">
                <Link
                    to={productPath}
                    className="diva-pcard__product-link"
                >
                    <h3>{product.name}</h3>
                    <p>{product.detail}</p>
                </Link>

                <p className="diva-pcard__material">{product.material}</p>

                <div className="diva-pcard__bottom">
                    <span className="diva-pcard__price">
                        ₹ {product.price}
                    </span>

                    <button
                        type="button"
                        className="diva-pcard__add text-white"
                        onClick={handleAddToCart}
                    >
                        <ShoppingBag size={14} aria-hidden="true" />
                        <span>Add</span>
                    </button>
                </div>
            </div>
        </article>
    );
}

export default ProductCard;