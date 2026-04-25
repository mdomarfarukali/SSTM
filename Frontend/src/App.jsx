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
// import ProductDetail from "./pages/_ProductDetail";
import ProductDetail from "./pages/ProductDetails/ProductDetail";
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

// --- NEW MY STUFF + SUPPORT PAGES ---
import TrackOrder from "./pages/TrackOrder";
import MyCoupons from "./pages/MyCoupons";
import MyReviews from "./pages/MyReviews";
import MyNotifications from "./pages/AllNotifications";
import HelpCenter from "./pages/HelpCenter";

// --- NEW USER ACCOUNT PAGES (Needed for Nested Routing) ---
import UserDashboard from "./pages/UserDashboard"; // The main account layout/sidebar
// import OrderHistory from "./pages/OrderHistory"; // The list of orders
// import OrderDetails from "./pages/OrderDetails"; // Details for a single order
// import UserAddress from "./pages/user/UserAddress";
// import UserProfile from "./pages/user/UserProfile";

// --- ADMIN PAGES ---
import AdminRoutes from "./pages/admin/AdminRoutes";
// import AdminDashboard from "./pages/admin/AdminRoutes";

// Login protection for user account routes
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import UploadImage from "./components/UploadImage.jsx";

import ScrollToTop from "./components/common/ScrollToTop.jsx";
// import LoadingSpinner from "./components/common/LoadingSpinner.jsx";

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // const storedUser = localStorage.getItem("user");
        // if (storedUser && storedUser !== "undefined") {
        //     try {
        //         setUser(JSON.parse(storedUser));
        //     } catch (error) {
        //         console.warn("Invalid user data in localStorage. Clearing stored user.", error);
        //         localStorage.removeItem("user");
        //     }
        // }

        try {
            const storedUser = localStorage.getItem("token");

            // console.log("User Local: ", storedUser);
            if (storedUser && storedUser !== "undefined") {
                // user = JSON.parse(storedUser);
                // setUser(JSON.parse(storedUser));
                setUser(storedUser);
            } else {
                localStorage.removeItem("email");
                localStorage.removeItem("user");
                localStorage.removeItem("role");
                localStorage.removeItem("token");
                // console.log("Home cleared.");
            }
        } catch (error) {
            console.error("Invalid user data in localStorage. Clearing stored user.");

            localStorage.removeItem("email");
            localStorage.removeItem("user");
            localStorage.removeItem("role");
            localStorage.removeItem("token");
        }
    }, []);

    // const handleLogout = () => {
    //     localStorage.removeItem("user");
    //     setUser(null);
    // };

    return (
        // Context Providers should ideally wrap this Router (e.g., CartProvider, AuthProvider)
        <Router>
            {/* <LoadingSpinner /> */}
            <ScrollToTop />
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

                    {/* track and help center  */}
                    <Route path="/track-order/:orderId" element={<TrackOrder />} />
                    <Route path="/help-center" element={<HelpCenter />} />



                    {/* ⭐️ 2. USER ACCOUNT DASHBOARD (Panel Routing) ⭐️ */}
                    <Route
                        path="/account/*"
                        element={
                            <ProtectedRoute>
                                <UserDashboard />
                            </ProtectedRoute>
                        }
                    />
                </Route>


                {/* ======================================================= */}
                {/* ⭐️ 2. USER ACCOUNT DASHBOARD (Panel Routing) ⭐️ */}
                {/* Use a single account route and render pages inside UserDashboard */}
                {/* ======================================================= */}
                {/* <Route path="/account" element={<PageLayout>  </PageLayout>}> */}
                {/* Default view when navigating to /account (shows profile content) */}
                {/* <Route index element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} /> */}

                {/* Routes accessible via the UserDashboard sidebar: /account/orders, /account/profile, etc. */}
                {/* <Route path="profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
                    <Route path="addresses" element={<ProtectedRoute><UserAddresses /></ProtectedRoute>} />
                    <Route path="wishlist" element={<ProtectedRoute><WishList /></ProtectedRoute>} /> */}

                {/* ✅ My Stuff */}
                {/* <Route path="coupons" element={<ProtectedRoute><MyCoupons /></ProtectedRoute>} />
                    <Route path="reviews" element={<ProtectedRoute><MyReviews /></ProtectedRoute>} />
                    <Route path="notifications" element={<ProtectedRoute><MyNotifications /></ProtectedRoute>} /> */}

                {/* Order Management Nested Routes */}
                {/* <Route path="orders" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
                    <Route path="orders/:orderId" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
                </Route> */}

                {/* <Route
                    path="/account/*"
                    element={
                        <PageLayout>
                        </ PageLayout>
                    }
                >

                    <Route index
                        element={
                            <ProtectedRoute>
                                <UserDashboard />
                            </ProtectedRoute>
                        }
                    /> */}

                {/* ✅ My Stuff */}
                {/* <Route path="coupons" element={<ProtectedRoute><MyCoupons /></ProtectedRoute>} /> */}
                {/* <Route path="reviews" element={<ProtectedRoute><MyReviews /></ProtectedRoute>} /> */}
                {/* <Route path="notifications" element={<ProtectedRoute><MyNotifications /></ProtectedRoute>} /> */}

                {/* </Route> */}

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