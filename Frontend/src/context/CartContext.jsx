import React, { createContext, useContext, useState, useEffect } from "react";
import { showToast } from "../utils/toastUtils";

// =========================================================
//  CART CONTEXT INITIALIZATION
// =========================================================
const CartContext = createContext();


// =========================================================
//  PROVIDER COMPONENT
// =========================================================
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        // Load from localStorage if available
        try {
            const saved = localStorage.getItem("cart");
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error("Failed to load cart:", error);
            return [];
        }
    });

    // Save to localStorage on cart change
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    // =========================================================
    //  ADD ITEM TO CART
    // =========================================================
    const addItemToCart = (item) => {
        setCartItems((prevCart) => {
            const existingItemIndex = prevCart.findIndex(
                (p) => p.id === item.id && p.selectedSize === item.selectedSize
            );

            // If item (same size/variant) exists, increase quantity
            if (existingItemIndex !== -1) {
                const updatedCart = [...prevCart];
                updatedCart[existingItemIndex].quantity += item.quantity;
                showToast(`${item.name} quantity updated in cart.`, "info");
                return updatedCart;
            }

            // Otherwise, add new item
            showToast(`${item.name} added to cart!`, "success");
            return [...prevCart, item];
        });
    };

    // =========================================================
    //  REMOVE ITEM FROM CART
    // =========================================================
    const removeItemFromCart = (id, size) => {
        setCartItems((prevCart) => {
            const updatedCart = prevCart.filter(
                (item) => !(item.id === id && item.selectedSize === size)
            );
            showToast("Item removed from cart.", "info");
            return updatedCart;
        });
    };

    // =========================================================
    //  UPDATE ITEM QUANTITY
    // =========================================================
    const updateItemQuantity = (id, size, newQuantity) => {
        setCartItems((prevCart) =>
            prevCart.map((item) =>
                item.id === id && item.selectedSize === size
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    // =========================================================
    //  CLEAR CART
    // =========================================================
    const clearCart = () => {
        setCartItems([]);
        showToast("Cart cleared.", "info");
    };

    // =========================================================
    //  TOTAL PRICE CALCULATION
    // =========================================================
    const cartTotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
    
    // =========================================================
    //  TOTAL ITEM COUNT
    // =========================================================
    const totalItems = cartItems.reduce(
        (count, item) => count + item.quantity,
        0
    );


    // =========================================================
    //  CONTEXT VALUE
    // =========================================================
    const value = {
        cartItems,
        addItemToCart,
        removeItemFromCart,
        updateItemQuantity,
        clearCart,
        cartTotal,
        totalItems,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

// =========================================================
//  CUSTOM HOOK
// =========================================================
export const useCartContext = () => {
    const context = useContext(CartContext);
    // console.log("CartContext:", context);
    if (!context) {
        throw new Error("useCartContext must be used within a CartProvider");
    }
    return context;
};