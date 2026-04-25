import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// 1. Define the Context
const WishlistContext = createContext();

const authConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
  },
  withCredentials: true,
});

// 2. Wishlist Provider Component
export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  const fetchWishlist = async () => {
    try {
      const { data } = await axios.get('/API/wishlist', authConfig());
      setWishlistItems(data.wishlist || []);
    } catch (error) {
      console.error('Error fetching wishlist:', error.response?.data || error.message || error);
      setWishlistItems([]);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const toggleWishlistItem = async (productId) => {
    try {
      const exists = wishlistItems.some((item) => item._id === productId);
      if (exists) {
        const { data } = await axios.delete(`/API/wishlist/${productId}`, authConfig());
        setWishlistItems(data.wishlist || []);
      } else {
        const { data } = await axios.post('/API/wishlist', { productId }, authConfig());
        setWishlistItems(data.wishlist || []);
      }
    } catch (error) {
      console.error('Error toggling wishlist item:', error.response?.data || error.message || error);
    }
  };

  const removeItemFromWishlist = async (id) => {
    try {
      const { data } = await axios.delete(`/API/wishlist/${id}`, authConfig());
      setWishlistItems(data.wishlist || []);
    } catch (error) {
      console.error('Error removing wishlist item:', error.response?.data || error.message || error);
    }
  };

  const isItemWished = (id) => wishlistItems.some((item) => item._id === id);

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlistItem,
        isItemWished,
        removeItemFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// 3. Custom Hook to consume the Wishlist Context easily
export const useWishlistContext = () => {
  const context = useContext(WishlistContext);
  if (!context || context === undefined) {
    throw new Error('useWishlistContext must be used within a WishlistProvider');
  }
  return context;
};