import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PageLayout from "./components/layout/PageLayout";

// --- CORE USER PAGES ---
import Home from "./pages/Home";
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import WishList from "./pages/WishList";
import OrderSuccess from "./pages/OrderSuccess";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQs from "./pages/FAQs";
import ShippingReturns from "./pages/ShippingReturns";
import PrivacyPolicy_ from "./pages/PrivacyPolicy_";
import TermsCondition from "./pages/TermsCondition";

// --- NEW USER ACCOUNT PAGES (Needed for Nested Routing) ---
import UserDashboard from "./pages/UserDashboard"; // The main account layout/sidebar
import OrderHistory from "./pages/OrderHistory"; // The list of orders
import OrderDetails from "./pages/OrderDetails"; // Details for a single order
// Placeholder component for user profile management
const UserProfile = () => <div>User Profile Settings Form</div>; //
// Placeholder component for addresses/settings
const UserAddresses = () => <div>User Address Book</div>; //

// --- ADMIN PAGES ---
import AdminRoutes from "./pages/admin/AdminRoutes";
// import AdminDashboard from "./pages/admin/AdminRoutes";

// Login protection for user account routes
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import UploadImage from "./components/UploadImage.jsx";
function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        // Context Providers should ideally wrap this Router (e.g., CartProvider, AuthProvider)
        <Router>
            <Routes>

                <Route path="/upload-image" element={<UploadImage />} />
                {/* ======================================================= */}
                {/* ⭐️ 1. USER FACING ROUTES (Wrapped in PageLayout) ⭐️ */}
                {/* ======================================================= */}

                {/* Home, Products, Product Detail (Direct Routes) */}
                <Route element={<PageLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Register />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/product/:id" element={<ProductDetail />} />

                    {/* Cart Flow Routes */}
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order-success" element={<OrderSuccess />} />
                    <Route path="/wishlist" element={<WishList />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/faqs" element={<FAQs />} />
                    <Route path="/shipping-returns" element={<ShippingReturns />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy_ />} />
                    <Route path="/terms-condition" element={<TermsCondition />} />

                </Route>


                {/* ======================================================= */}
                {/* ⭐️ 2. USER ACCOUNT DASHBOARD (Nested Routes) ⭐️ */}
                {/* Consolidating /profile, /orders, /settings under /account */}
                {/* ======================================================= */}
                <Route path="/account" element={<PageLayout>  </PageLayout>}>
                    {/* Default view when navigating to /account (shows profile content) */}
                    <Route index element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />

                    {/* Routes accessible via the UserDashboard sidebar: /account/orders, /account/profile, etc. */}
                    <Route path="profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
                    <Route path="addresses" element={<ProtectedRoute><UserAddresses /></ProtectedRoute>} />
                    <Route path="wishlist" element={<ProtectedRoute><WishList /></ProtectedRoute>} />

                    {/* Order Management Nested Routes */}
                    <Route path="orders" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
                    <Route path="orders/:orderId" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
                </Route>


                {/* ======================================================= */}
                {/* ⭐️ 3. ADMIN ROUTES (Wrapped in AdminLayout) ⭐️ */}
                {/* ======================================================= */}
                <Route
                    path="/admin"
                    element={
                        <AdminRoutes />
                    }
                />

            </Routes>
        </Router>
    );
}

export default App;


