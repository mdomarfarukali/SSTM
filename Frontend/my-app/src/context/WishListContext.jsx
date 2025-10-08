import React, { createContext, useReducer, useContext, useEffect } from 'react';

// 1. Define the Context
const WishlistContext = createContext();

// 2. Initial State (Load wishlist from Local Storage if available)
const initialState = {
  wishlistItems: JSON.parse(localStorage.getItem('wishlistItems')) || [],
};

// 3. Define the Reducer Function
const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_ITEM': {
      const newItem = action.payload;
      // Check if item already exists in the wishlist
      const isExisting = state.wishlistItems.some((item) => item.id === newItem.id);

      if (isExisting) {
        // If it exists, remove it
        return {
          ...state,
          wishlistItems: state.wishlistItems.filter((item) => item.id !== newItem.id),
        };
      } else {
        // If it's new, add it
        return { ...state, wishlistItems: [...state.wishlistItems, newItem] };
      }
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        wishlistItems: state.wishlistItems.filter((item) => item.id !== action.payload),
      };

    case 'CLEAR_WISHLIST':
      return { ...state, wishlistItems: [] };

    default:
      return state;
  }
};

// 4. Wishlist Provider Component
export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  // Effect to sync wishlist state with Local Storage
  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(state.wishlistItems));
  }, [state.wishlistItems]);

  // Actions/Functions to be exposed to consumers
  const toggleWishlistItem = (item) => {
    // The item should be the basic product object {id, name, price, image}
    dispatch({ type: 'TOGGLE_ITEM', payload: item });
  };
  
  const isItemWished = (id) => {
    return state.wishlistItems.some(item => item.id === id);
  };

  const removeItemFromWishlist = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems: state.wishlistItems,
        toggleWishlistItem,
        isItemWished,
        removeItemFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// 5. Custom Hook to consume the Wishlist Context easily
export const useWishlistContext = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlistContext must be used within a WishlistProvider');
  }
  return context;
};