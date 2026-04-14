import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PageLayout from "./components/layout/PageLayout";

// --- CORE USER PAGES ---
import Home from "./pages/Home";
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgetPassword from './pages/auth/ForgotPassword.jsx';
import ResetPassword from './pages/auth/ResetPassword.jsx';

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
import UserAddress from "./pages/user/UserAddress";
import UserProfile from "./pages/user/UserProfile";

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
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.warn("Invalid user data in localStorage. Clearing stored user.", error);
                localStorage.removeItem("user");
            }
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

                {/* <Route path="/upload-image" element={<UploadImage />} /> */}
                {/* ======================================================= */}
                {/* ⭐️ 1. USER FACING ROUTES (Wrapped in PageLayout) ⭐️ */}
                {/* ======================================================= */}

                {/* Home, Products, Product Detail (Direct Routes) */}
                <Route element={<PageLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Register />} />
                    <Route path="/forget-password" element={<ForgetPassword />} />
                    <Route path="/reset-password/:token" element={<ResetPassword />} />
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
                {/* ⭐️ 2. USER ACCOUNT DASHBOARD (Panel Routing) ⭐️ */}
                {/* Use a single account route and render pages inside UserDashboard */}
                {/* ======================================================= */}
                <Route
                    path="/account/*"
                    element={<ProtectedRoute><UserDashboard /></ProtectedRoute>}
                />

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


