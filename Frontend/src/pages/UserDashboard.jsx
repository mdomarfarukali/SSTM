import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaCreditCard, FaMapMarkerAlt, FaBell, FaSignOutAlt, FaBox, FaHeart, FaTicketAlt } from 'react-icons/fa';
import axios from 'axios';
import UserProfile from './user/UserProfile';
import UserAddress from './user/UserAddress';
import WishList from './WishList';
import OrderHistory from './OrderHistory';

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

const PlaceholderView = ({ title }) => (
    <div className="rounded-3xl border border-brand-muted bg-brand-light p-8 min-h-[52vh]">
        <h2 className="text-2xl font-semibold text-brand mb-3">{title}</h2>
        <p className="text-sm text-brand-muted">This section is coming soon. The page will render here inside your account panel.</p>
    </div>
);

function UserDashboard() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const isUser = localStorage.getItem("role") === "user";
        if (!isUser) {
            navigate("/login", { state: { from: "/account" } });
        }
    }, [navigate]);

    const email = localStorage.getItem("email") || "guest@example.com";

    const [userName, setUserName] = useState(localStorage.getItem("username") || 'Guest User');
    const [currentView, setCurrentView] = useState('profile');

    useEffect(() => {
        const pathSegment = location.pathname.split('/').filter(Boolean).pop();
        if (pathSegment && pathSegment !== 'account') {
            setCurrentView(pathSegment);
        } else {
            setCurrentView('profile');
        }
    }, [location.pathname]);

    const handleSelectView = (view) => {
        setCurrentView(view);
        navigate(`/account/${view}`);
    };

    const renderView = () => {
        switch (currentView) {
            case 'addresses':
                return <UserAddress />;
            case 'wishlist':
                return <WishList />;
            case 'orders':
                return <OrderHistory />;
            case 'profile':
                return <UserProfile />;
            case 'gift-cards':
                return <PlaceholderView title="Gift Cards" />;
            case 'saved-upi':
                return <PlaceholderView title="Saved UPI" />;
            case 'saved-cards':
                return <PlaceholderView title="Saved Cards" />;
            case 'coupons':
                return <PlaceholderView title="My Coupons" />;
            case 'reviews':
                return <PlaceholderView title="Reviews & Ratings" />;
            case 'notifications':
                return <PlaceholderView title="Notifications" />;
            default:
                return <UserProfile />;
        }
    };

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
            navigate("/");
        } catch (error) {
            console.error("Error during logout:", error);
        }
    }

    const isActive = (path) => currentView === path;

    const NavItem = ({ item }) => {
        const active = isActive(item.path);
        return (
            <li key={item.name}>
                <button
                    type="button"
                    onClick={() => handleSelectView(item.path)}
                    className={`w-full text-left flex items-center gap-3 p-3 pl-4 text-sm font-medium transition duration-300 ease-out rounded-3xl
                        ${active
                            ? 'bg-brand-primary/20 border-l-4 border-brand-primary text-brand-primary shadow-lg shadow-brand-primary/10 scale-100'
                            : 'text-brand-muted hover:text-brand hover:bg-brand-primary/10 hover:scale-[1.01]'
                        }`}
                >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                </button>
            </li>
        );
    };

    return (
        <div className="min-h-screen bg-brand-light pt-10">
            <div className="max-w-7xl mx-auto px-4 py-8">

                <div className="lg:grid lg:grid-cols-4 lg:gap-6">

                    {/* Sidebar Navigation */}
                    <aside className="lg:col-span-1 mb-8 lg:mb-0">
                        <nav className="bg-gradient-to-br from-brand-primary/15 via-brand-light/80 to-brand-secondary/10 rounded-3xl border border-brand-muted/70 sticky lg:top-28 shadow-xl backdrop-blur-sm ring-1 ring-brand-primary/10 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-brand-primary/80">

                            {/* Profile Greeting */}
                            <div className="flex items-center p-4 mb-4 rounded-3xl bg-brand-primary/10 border border-brand-primary/20 shadow-inner transition duration-300 hover:bg-brand-primary/15">
                                <span className="text-4xl text-brand-primary mr-3 animate-pulse">
                                    <FaUserCircle />
                                </span>
                                <div>
                                    <p className="text-brand-muted text-sm">Hello,</p>
                                    <p className="font-semibold text-lg text-brand">{userName}</p>
                                </div>
                            </div>

                            {/* Navigation Groups */}
                            {dashboardNavGroups.map((group) => (
                                <div key={group.title} className="mb-4 px-3 py-3 rounded-3xl bg-brand-light/70 border border-brand-primary/10 shadow-sm transition duration-300 hover:bg-brand-primary/10 hover:border-brand-primary/20 hover:shadow-md">
                                    <h2 className="text-brand-muted text-xs font-semibold tracking-widest px-3 py-2 uppercase">
                                        {group.title}
                                    </h2>
                                    <ul className="space-y-1">
                                        {group.items.map((item) => (
                                            <NavItem key={item.name} item={item} />
                                        ))}
                                    </ul>
                                </div>
                            ))}

                            {/* Logout Link */}
                            <div className="border-t border-brand-muted mt-6 pt-4">
                                <div
                                    onClick={handleLogout}
                                    className="flex items-center gap-3 p-2 pl-4 text-sm font-medium text-brand-muted hover:text-brand-primary cursor-pointer"
                                >
                                    <FaSignOutAlt className="w-4 h-4" />
                                    Logout
                                </div>
                            </div>

                            <div className="border-t border-brand-muted mt-4 pt-4 text-sm text-brand-muted px-4">
                                <h3 className="font-semibold text-brand mb-2">Frequently Visited</h3>
                                <ul className="list-disc list-inside space-y-1 ml-2">
                                    <li>
                                        <Link
                                            to="/orders/track"
                                            className="text-brand hover:text-brand-primary"
                                        >
                                            Track Order
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/help"
                                            className="text-brand hover:text-brand-primary"
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
                        <div className="bg-white p-6 rounded-3xl border border-brand-muted min-h-[60vh] shadow-sm">
                            {renderView()}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;