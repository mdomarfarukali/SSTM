import React, { createContext, useContext, useState, useEffect } from "react";
import { showToast } from "../utils/toastUtils";
import axios from 'axios';

// =========================================================
//  CART CONTEXT INITIALIZATION
// =========================================================
const CartContext = createContext();

const authConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
  },
  withCredentials: true,
});


// =========================================================
//  PROVIDER COMPONENT
// =========================================================
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const fetchCart = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            // User not authenticated, skip fetching cart
            setCartItems([]);
            return;
        }

        try {
            const { data } = await axios.get('/API/cart', authConfig());
            setCartItems(data.cart?.items || []);
        } catch (error) {
            console.error('Error fetching cart:', error.response?.data || error.message || error);
            setCartItems([]);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    // =========================================================
    //  ADD ITEM TO CART
    // =========================================================
    const addItemToCart = async (item) => {
        const token = localStorage.getItem('token');
        if (!token) {
            showToast("Please login to add items to cart.", "error");
            return;
        }

        try {
            const { data } = await axios.post('/API/cart', {
                productId: item.id,
                quantity: item.quantity,
                selectedSize: item.selectedSize
            }, authConfig());

            setCartItems(data.cart?.items || []);
            showToast(`${item.name} added to cart!`, "success");
        } catch (error) {
            console.error('Error adding item to cart:', error.response?.data || error.message || error);
            showToast("Failed to add item to cart.", "error");
        }
    };

    // =========================================================
    //  REMOVE ITEM FROM CART
    // =========================================================
    const removeItemFromCart = async (id, size) => {
        const token = localStorage.getItem('token');
        if (!token) {
            showToast("Please login to manage cart.", "error");
            return;
        }

        try {
            const { data } = await axios.delete(`/API/cart/${id}?size=${encodeURIComponent(size)}`, authConfig());
            setCartItems(data.cart?.items || []);
            showToast("Item removed from cart.", "info");
        } catch (error) {
            console.error('Error removing item from cart:', error.response?.data || error.message || error);
            showToast("Failed to remove item from cart.", "error");
        }
    };

    // =========================================================
    //  UPDATE ITEM QUANTITY
    // =========================================================
    const updateItemQuantity = async (id, size, newQuantity) => {
        const token = localStorage.getItem('token');
        if (!token) {
            showToast("Please login to manage cart.", "error");
            return;
        }

        try {
            const { data } = await axios.put(`/API/cart/${id}`, {
                quantity: newQuantity,
                selectedSize: size
            }, authConfig());

            setCartItems(data.cart?.items || []);
        } catch (error) {
            console.error('Error updating item quantity:', error.response?.data || error.message || error);
            showToast("Failed to update item quantity.", "error");
        }
    };

    // =========================================================
    //  CLEAR CART
    // =========================================================
    const clearCart = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            showToast("Please login to manage cart.", "error");
            return;
        }

        try {
            const { data } = await axios.delete('/API/cart', authConfig());
            setCartItems(data.cart?.items || []);
            showToast("Cart cleared.", "info");
        } catch (error) {
            console.error('Error clearing cart:', error.response?.data || error.message || error);
            showToast("Failed to clear cart.", "error");
        }
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