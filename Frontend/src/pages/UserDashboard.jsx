import React, { use, useState, useEffect } from 'react'; // <--- ADDED useState
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaCreditCard, FaMapMarkerAlt, FaBell, FaSignOutAlt, FaBox, FaHeart, FaTicketAlt } from 'react-icons/fa';
import axios from 'axios';

// --- NAVIGATION STRUCTURE (Same as before) ---
const dashboardNavGroups = [
    {
        title: 'MY ORDERS',
        items: [
            { name: 'My Orders', path: 'orders', icon: FaBox },
        ],
    },
    {
        title: 'ACCOUNT SETTINGS',
        items: [
            { name: 'Profile Information', path: 'profile', icon: FaUserCircle },
            { name: 'Manage Addresses', path: 'addresses', icon: FaMapMarkerAlt },
        ],
    },
    {
        title: 'PAYMENTS',
        items: [
            { name: 'Gift Cards', path: 'gift-cards', icon: FaCreditCard },
            { name: 'Saved UPI', path: 'saved-upi', icon: FaCreditCard },
            { name: 'Saved Cards', path: 'saved-cards', icon: FaCreditCard },
        ],
    },
    {
        title: 'MY STUFF',
        items: [
            { name: 'My Coupons', path: 'coupons', icon: FaTicketAlt },
            { name: 'My Reviews & Ratings', path: 'reviews', icon: FaBell },
            { name: 'All Notifications', path: 'notifications', icon: FaBell },
            { name: 'My Wishlist', path: 'wishlist', icon: FaHeart },
        ],
    },
];

function UserDashboard() {
    const location = useLocation();
    const Navigate = useNavigate();

    useEffect(() => {
        const isUser = localStorage.getItem("role") === "user";
        // console.log("User logged out, redirecting to home.", localStorage.getItem("user"), localStorage.getItem("role"), localStorage.getItem("email"), localStorage.getItem("userToken"))
        if (!isUser) {
            Navigate("/login", { state: { from: "/account" } });
        }
    }, [Navigate]);

    const email = localStorage.getItem("email") || "guest@example.com";

    // 1. Initialize a placeholder state for the user's name
    // In a real app, you would fetch this from your Auth Context or Redux store
    const [userName, setUserName] = useState('Guest User');

    // NOTE: If you are using an authentication context (like AuthContext), 
    // you would replace the line above with:
    // const { user } = useContext(AuthContext); 
    // const userName = user ? user.name : 'Guest User';

    const handleLogout = async () => {
        try {
            const res = await axios.post("/API/auth/logout", {}, { withCredentials: true });
            alert(res.message || "Logged out successfully");

            localStorage.removeItem("user");
            localStorage.removeItem("role");
            localStorage.removeItem("email");
            localStorage.removeItem("userToken");
            // console.log("User logged out, redirecting to home.", localStorage.getItem("user"), localStorage.getItem("role"), localStorage.getItem("email"), localStorage.getItem("userToken"));
            Navigate("/");
        } catch (error) {
            console.error("Error during logout:", error);
        }
    }

    const isActive = (path) => location.pathname.includes(path);

    return (
        <div className="min-h-screen bg-white pt-10">
            <div className="max-w-7xl mx-auto px-4 py-8">

                <div className="lg:grid lg:grid-cols-4 lg:gap-6">

                    {/* Sidebar Navigation */}
                    <aside className="lg:col-span-1 mb-8 lg:mb-0">
                        <nav className="bg-white rounded-lg sticky lg:top-28">

                            {/* Profile Greeting */}
                            <div className="flex items-center p-4 mb-4">
                                <span className="text-4xl text-gray-800 mr-3">
                                    <FaUserCircle />
                                </span>
                                <div>
                                    <p className="text-gray-500 text-sm">Hello,</p>
                                    {/* 3. Use the dynamic userName here */}
                                    <p className="font-semibold text-lg text-gray-800">{userName}</p>
                                </div>
                            </div>

                            {/* Navigation Groups (Rest of the code is unchanged) */}
                            {dashboardNavGroups.map((group) => (
                                <div key={group.title} className="mb-4">
                                    <h2 className="text-gray-500 text-xs font-semibold tracking-widest px-4 py-2 mt-2">
                                        {group.title}
                                    </h2>
                                    <ul>
                                        {group.items.map((item) => (
                                            <li key={item.name}>
                                                <Link
                                                    to={item.path}
                                                    className={`flex items-center gap-3 p-2 pl-4 text-sm font-medium transition-colors border-l-4 
                                                        ${isActive(item.path)
                                                            ? 'border-blue-500 text-blue-500 bg-blue-50'
                                                            : 'border-transparent text-gray-700 hover:text-blue-500 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    <item.icon className="w-4 h-4" />
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}

                            {/* Logout Link */}
                            <div className="border-t border-gray-200 mt-6 pt-4">
                                <div
                                    onClick={handleLogout}
                                    className="flex items-center gap-3 p-2 pl-4 text-sm font-medium text-gray-700 hover:text-red-500 cursor-pointer"
                                >
                                    <FaSignOutAlt className="w-4 h-4" />
                                    Logout
                                </div>
                            </div>

                            <div className="border-t border-gray-200 mt-4 pt-4 text-sm text-gray-500 px-4">
                                <h3 className="font-semibold text-gray-800 mb-2">Frequently Visited</h3>
                                <ul className="list-disc list-inside space-y-1 ml-2">
                                    <li>
                                        <Link
                                            to="/orders/track"
                                            className="text-gray-700 hover:text-blue-500" // <-- ADDED text-gray-700
                                        >
                                            Track Order
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/help"
                                            className="text-gray-700 hover:text-blue-500" // <-- ADDED text-gray-700
                                        >
                                            Help Center
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                        </nav>
                    </aside>

                    {/* Content Area */}
                    <main className="lg:col-span-3">
                        <div className="bg-white p-6 rounded-lg border border-gray-200 min-h-[60vh] shadow-sm">
                            <Outlet />

                            {/* Default content if no sub-route is matched (e.g., /account) */}
                            {location.pathname.endsWith('/account') && (
                                <div className="text-center py-10">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                        Welcome to Your Account
                                    </h2>
                                    <p className="text-gray-500">
                                        Select an option from the left to view and manage your details.
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