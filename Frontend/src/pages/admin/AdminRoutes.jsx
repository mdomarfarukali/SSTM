import { useState } from "react";
// Removed 'Link' as we are using state for navigation
import { Users, Package, ShoppingCart, BarChart2 } from "lucide-react";

// Import all content components
import AdminProducts from "./AdminProducts";
import AdminOrders from "./AdminOrders";
import AdminUsers from "./AdminUsers";
import AdminDashboard from "./AdminDashboard"; // Assuming this file holds the dashboard cards/tables

export default function AdminRoutes() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    // State to determine which component to display (default to 'dashboard')
    const [currentView, setCurrentView] = useState('dashboard'); 

    // Function to conditionally render the main content component
    const renderView = () => {
        switch (currentView) {
            case 'products':
                return <AdminProducts />;
            case 'users':
                return <AdminUsers />;
            case 'orders':
                return <AdminOrders />;
            case 'dashboard':
            default:
                // This renders the content from AdminDashboard.jsx
                return <AdminDashboard />; 
        }
    };
    
    // Reusable NavItem component to handle state update and active styling
    const NavItem = ({ view, icon: Icon, label }) => {
        const isActive = currentView === view;
        return (
            <li>
                <div
                    onClick={() => setCurrentView(view)}
                    // Updated padding and colors for a modern, purple/blue look
                    className={`flex items-center gap-3 p-3 py-3.5 font-medium rounded-lg transition cursor-pointer mx-3 
                        ${isActive 
                            // Active: Vibrant fuchsia/purple background, strong shadow
                            ? 'bg-fuchsia-600 text-white shadow-lg shadow-fuchsia-600/50' 
                            // Inactive: Cyan text with indigo hover
                            : 'hover:bg-indigo-900 text-cyan-300 hover:text-white' 
                        }`
                    }
                >
                    <Icon size={18} />
                    {sidebarOpen && label}
                </div>
            </li>
        );
    };

    return (
        // Changed to a standard light gray background
        <div className="flex h-screen bg-admin-dark antialiased font-sans">
            
            {/* Sidebar */}
            <aside
                // Deep Indigo/Blue foundation (bg-indigo-950)
                className={`${sidebarOpen ? "w-64" : "w-16"} bg-indigo-950 transition-all duration-300 flex flex-col flex-shrink-0 shadow-2xl`}
                style={{ borderRadius: '0 12px 12px 0' }}
            >
                <div className="flex items-center justify-between p-4 border-b border-indigo-900 h-16">
                    {/* Primary branding in vibrant cyan tone */}
                    <h1 className={`text-3xl font-bold text-cyan-300 ${sidebarOpen ? "block" : "hidden"}`}>
                        Admin
                    </h1>
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-1.5 rounded-full text-cyan-300 hover:text-white hover:bg-indigo-900 transition"
                        title={sidebarOpen ? "Collapse Menu" : "Expand Menu"}
                    >
                        {sidebarOpen ? "<<" : ">>"}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 mt-6 space-y-2 overflow-y-auto">
                    <ul className="space-y-2">
                        <NavItem view="dashboard" icon={BarChart2} label="Dashboard" />
                        <NavItem view="products" icon={Package} label="Products" />
                        <NavItem view="orders" icon={ShoppingCart} label="Orders" />
                        <NavItem view="users" icon={Users} label="Users" />
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-10 overflow-auto bg-pink-100">
                {/* Dynamic Title based on current view */}
                {/* Font Improvement: Added tracking-tight for a sharper, modern font feel */}
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-10 border-b pb-3 border-indigo-200">
                    {currentView.charAt(0).toUpperCase() + currentView.slice(1)} Management
                </h1>
                
                {/* Render only the selected component */}
                <div className="admin-content-view">
                    {renderView()}
                </div>
            </main>
        </div>
    );
}