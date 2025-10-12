import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FaUserCircle, FaHistory, FaHeart, FaMapMarkerAlt, FaKey } from 'react-icons/fa';

// NOTE: You will need to make sure your router (e.g., App.jsx) is set up 
// with a parent route like <Route path="/account" element={<UserDashboard />}>
// and nested routes for OrderHistory, Profile, etc.

// Define the navigation items for the user's dashboard sidebar
const dashboardNav = [
    { name: 'My Profile', path: 'profile', icon: FaUserCircle }, // e.g., /account/profile
    { name: 'Order History', path: 'orders', icon: FaHistory },   // e.g., /account/orders
    { name: 'Wishlist', path: 'wishlist', icon: FaHeart },       // e.g., /account/wishlist
    { name: 'Addresses', path: 'addresses', icon: FaMapMarkerAlt },
    { name: 'Change Password', path: 'password', icon: FaKey },
];

function UserDashboard() {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500 pt-20">
            {/* Page Header */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-10">
                    My Account Dashboard
                </h1>

                <div className="lg:grid lg:grid-cols-4 lg:gap-10">
                    
                    {/* ========== 1. Sidebar Navigation (1/4 width) ========== */}
                    <aside className="lg:col-span-1 mb-8 lg:mb-0">
                        <nav className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-pink-100 dark:border-gray-700 sticky lg:top-28">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 border-b pb-2">
                                Account Navigation
                            </h2>
                            <ul>
                                {dashboardNav.map((item) => (
                                    <li key={item.name} className="mt-1">
                                        <Link
                                            to={item.path}
                                            // Check if the current URL path includes the item's path for active styling
                                            className={`flex items-center gap-3 p-3 rounded-lg font-medium transition-colors ${
                                                location.pathname.includes(item.path)
                                                    ? 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300'
                                                    : 'text-gray-600 hover:bg-gray-50 hover:text-pink-600 dark:text-gray-300 dark:hover:bg-gray-700'
                                            }`}
                                        >
                                            <item.icon className="w-5 h-5" />
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </aside>

                    {/* ========== 2. Content Area (3/4 width) ========== */}
                    <main className="lg:col-span-3">
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-pink-100 dark:border-gray-700 min-h-[60vh]">
                            {/* The <Outlet /> component renders the content of the nested route.
                                For example, if the URL is /account/orders, the OrderHistory.jsx 
                                component will be rendered here.
                            */}
                            <Outlet />

                            {/* Default Content if no nested route is matched */}
                            {location.pathname === '/account' && (
                                <div className="text-center py-10">
                                    <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-300 mb-4">
                                        Welcome to Your Dashboard!
                                    </h2>
                                    <p className="text-lg text-gray-500 dark:text-gray-400">
                                        Use the navigation links on the left to manage your profile, orders, and addresses.
                                    </p>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
            {/* NOTE: Include your <Footer /> component here */}
        </div>
    );
}

export default UserDashboard;