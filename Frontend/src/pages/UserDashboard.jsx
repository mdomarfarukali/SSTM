import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FaUserCircle, FaHistory, FaHeart, FaMapMarkerAlt, FaKey } from 'react-icons/fa';

const dashboardNav = [
    { name: 'My Profile', path: 'profile', icon: FaUserCircle },
    { name: 'Order History', path: 'orders', icon: FaHistory },
    { name: 'Wishlist', path: 'wishlist', icon: FaHeart },
    { name: 'Addresses', path: 'addresses', icon: FaMapMarkerAlt },
    { name: 'Change Password', path: 'password', icon: FaKey },
];

function UserDashboard() {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-brand-light transition-colors duration-500 pt-20">
            {/* Page Header */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-4xl font-serif font-bold text-brand mb-10">
                    My Account Dashboard
                </h1>

                <div className="lg:grid lg:grid-cols-4 lg:gap-10">
                    
                    {/* Sidebar Navigation */}
                    <aside className="lg:col-span-1 mb-8 lg:mb-0">
                        <nav className="bg-brand-dark p-6 rounded-xl shadow-lg border border-brand-muted sticky lg:top-28">
                            <h2 className="text-xl font-semibold text-brand mb-4 border-b border-brand-muted pb-2">
                                Account Navigation
                            </h2>
                            <ul>
                                {dashboardNav.map((item) => (
                                    <li key={item.name} className="mt-1">
                                        <Link
                                            to={item.path}
                                            className={`flex items-center gap-3 p-3 rounded-lg font-medium transition-colors ${
                                                location.pathname.includes(item.path)
                                                    ? 'bg-brand-primary text-brand-highlight'
                                                    : 'text-brand-muted hover:bg-brand-dark hover:text-brand'
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

                    {/* Content Area */}
                    <main className="lg:col-span-3">
                        <div className="bg-brand p-8 rounded-xl shadow-lg border border-brand-muted min-h-[60vh]">
                            <Outlet />

                            {location.pathname === '/account' && (
                                <div className="text-center py-10">
                                    <h2 className="text-3xl font-bold text-brand mb-4">
                                        Welcome to Your Dashboard!
                                    </h2>
                                    <p className="text-lg text-brand-muted">
                                        Use the navigation links on the left to manage your profile, orders, and addresses.
                                    </p>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;
