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




// import React, {
//   createContext,
//   useState,
//   useContext,
//   useEffect,
//   useCallback,
// } from "react";
// import axios from "axios";

// const WishlistContext = createContext();

// const LOCAL_WISHLIST_KEY = "wishlist";
// const TOKEN_KEY = "token";

// // const authConfig = () => ({
// //   headers: {
// //     Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY) || ""}`,
// //   },
// //   withCredentials: true,
// // });

// const authConfig = () => {
//   const token = localStorage.getItem("token");

//   return {
//     headers: token
//       ? { Authorization: `Bearer ${token}` }
//       : {},
//     withCredentials: true,
//   };
// };

// const getProductId = (item) =>
//   String(item?._id ?? item?.id ?? item?.productId?._id ?? item?.productId ?? "");

// const readLocalWishlist = () => {
//   try {
//     const stored = JSON.parse(
//       localStorage.getItem(LOCAL_WISHLIST_KEY) || "[]"
//     );
//     return Array.isArray(stored) ? stored : [];
//   } catch {
//     return [];
//   }
// };

// const writeLocalWishlist = (items) => {
//   localStorage.setItem(LOCAL_WISHLIST_KEY, JSON.stringify(items));
// };

// export const WishlistProvider = ({ children }) => {
//   const [wishlistItems, setWishlistItems] = useState(readLocalWishlist);

//   const isLoggedIn = () => Boolean(localStorage.getItem("token"));

//   const fetchWishlist = useCallback(async () => {
//     // Guest: load local wishlist only.
//     if (!isLoggedIn()) {
//       setWishlistItems(readLocalWishlist());
//       return;
//     }

//     try {
//       const { data } = await axios.get("/API/wishlist", authConfig());
//       const cloudItems = Array.isArray(data.wishlist) ? data.wishlist : [];

//       setWishlistItems(cloudItems);
//       writeLocalWishlist(cloudItems);
//     } catch (error) {
//       console.error(
//         "Error fetching cloud wishlist; using local wishlist:",
//         error.response?.data || error.message || error
//       );
//       setWishlistItems(readLocalWishlist());
//     }
//   }, []);

//   useEffect(() => {
//     fetchWishlist();
//   }, [fetchWishlist]);

//   const toggleWishlistItem = async (productOrId) => {
//     // const productId = getProductId(productOrId);

//     const productId = productOrId;
//     console.log(productOrId);

//     // console.log("Toggling wishlist item:", productId, "Current wishlist:", wishlistItems);

//     if (!productId) return;

//     const currentItems = wishlistItems;
//     const exists = currentItems.some(
//       (item) => getProductId(item) === productId
//     );

//     // Guest wishlist: update local storage.
//     if (!isLoggedIn()) {
//       const updatedItems = exists
//         ? currentItems.filter((item) => getProductId(item) !== productId)
//         : [
//           ...currentItems,
//           typeof productOrId === "object"
//             ? productOrId
//             : { _id: productId },
//         ];

//       setWishlistItems(updatedItems);
//       writeLocalWishlist(updatedItems);
//       return;
//     }

//     // Logged-in wishlist: update the backend.
//     try {
//       const { data } = exists
//         ? await axios.delete(`/API/wishlist/${productId}`, authConfig())
//         : await axios.post(
//           "/API/wishlist",
//           { productId },
//           authConfig()
//         );

//       const cloudItems = Array.isArray(data.wishlist)
//         ? data.wishlist
//         : [];

//       setWishlistItems(cloudItems);
//       writeLocalWishlist(cloudItems);
//     } catch (error) {
//       console.error(
//         "Error updating cloud wishlist:",
//         error.response?.data || error.message || error
//       );

//       // Fall back to local changes if the cloud operation fails.
//       const updatedItems = exists
//         ? currentItems.filter((item) => getProductId(item) !== productId)
//         : [
//           ...currentItems,
//           typeof productOrId === "object"
//             ? productOrId
//             : { _id: productId },
//         ];

//       setWishlistItems(updatedItems);
//       writeLocalWishlist(updatedItems);
//     }
//   };

//   const removeItemFromWishlist = async (productOrId) => {
//     const productId = getProductId(productOrId);
//     if (!productId) return;

//     const currentItems = wishlistItems;
//     const updatedItems = currentItems.filter(
//       (item) => getProductId(item) !== productId
//     );

//     // Guest: remove locally.
//     if (!isLoggedIn()) {
//       setWishlistItems(updatedItems);
//       writeLocalWishlist(updatedItems);
//       return;
//     }

//     try {
//       const { data } = await axios.delete(
//         `/API/wishlist/${productId}`,
//         authConfig()
//       );

//       const cloudItems = Array.isArray(data.wishlist)
//         ? data.wishlist
//         : updatedItems;

//       setWishlistItems(cloudItems);
//       writeLocalWishlist(cloudItems);
//     } catch (error) {
//       console.error(
//         "Error removing cloud wishlist item:",
//         error.response?.data || error.message || error
//       );
//       setWishlistItems(updatedItems);
//       writeLocalWishlist(updatedItems);
//     }
//   };

//   const isItemWished = (productOrId) => {
//     const productId = getProductId(productOrId);
//     return Boolean(
//       productId &&
//       wishlistItems.some((item) => getProductId(item) === productId)
//     );
//   };

//   return (
//     <WishlistContext.Provider
//       value={{
//         wishlistItems,
//         toggleWishlistItem,
//         isItemWished,
//         removeItemFromWishlist,
//         fetchWishlist,
//       }}
//     >
//       {children}
//     </WishlistContext.Provider>
//   );
// };

// export const useWishlistContext = () => {
//   const context = useContext(WishlistContext);

//   if (!context) {
//     throw new Error(
//       "useWishlistContext must be used within a WishlistProvider"
//     );
//   }

//   return context;
// };
