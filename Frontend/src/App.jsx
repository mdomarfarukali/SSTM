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
// import AdminLayout from "./components/layout/AdminLayout";
// import Dashboard from "./pages/admin/Dashboard";
// import OrderManagement from "./pages/admin/OrderManagement";
// import ProductManagement from "./pages/admin/ProductManagement";
// import UsersManagement from "./pages/admin/UsersManagement";
// import CODManagement from "./pages/admin/CODManagement";

import AdminRoutes from "./pages/admin/AdminRoutes";
// import AdminDashboard from "./pages/admin/AdminRoutes";
// src/components/AdminProtected.jsx
import { Navigate } from "react-router-dom";

const AdminProtected = ({ children }) => {
    const isAdmin = localStorage.getItem("role") === "admin";
    // or however you store user role (e.g., from context, cookie, JWT decode, etc.)

    if (!isAdmin) {
        // If not admin, redirect to login or home
        return <Navigate to="/login" replace />;
    }

    // Otherwise, render the child route
    return children;
}


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

                {/* <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route path="/wishlist" element={<WishList />} /> */}

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
                <Route path="/account" element={<PageLayout><UserDashboard /></PageLayout>}>
                    {/* Default view when navigating to /account (shows profile content) */}
                    <Route index element={<UserProfile />} />

                    {/* Routes accessible via the UserDashboard sidebar: /account/orders, /account/profile, etc. */}
                    <Route path="profile" element={<UserProfile />} />
                    <Route path="addresses" element={<UserAddresses />} />
                    <Route path="wishlist" element={<WishList />} />

                    {/* Order Management Nested Routes */}
                    <Route path="orders" element={<OrderHistory />} />
                    <Route path="orders/:orderId" element={<OrderDetails />} />
                </Route>


                {/* ======================================================= */}
                {/* ⭐️ 3. ADMIN ROUTES (Wrapped in AdminLayout) ⭐️ */}
                {/* ======================================================= */}
                {/* <Route path="/admin" element={<AdminLayout />}> */}
                {/* Default admin view */}
                {/* <Route index element={<Dashboard />} />

                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="orders" element={<OrderManagement />} />
                    <Route path="products" element={<ProductManagement />} />
                    <Route path="users" element={<UsersManagement />} />
                    <Route path="cod" element={<CODManagement />} />
                </Route> */}


                <Route
                    path="/admin"
                    element={
                        <AdminProtected>
                            <AdminRoutes />
                        </AdminProtected>
                    }
                    // element={<AdminRoutes />}
                />
            </Routes>
        </Router>
    );
}

export default App;


