import React, { useState } from 'react';
import AdminProducts from './AdminProducts'; // Import the child views
import AdminUsers from './AdminUsers';
import AdminOrders from './AdminOrders';

// Styles for simplicity (replace with your CSS framework/styles)
const panelStyles = {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: 'sans-serif'
};
const sidebarStyles = {
    width: '250px',
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '20px',
    boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
};
const mainContentStyles = {
    flexGrow: 1,
    padding: '30px',
    backgroundColor: '#ecf0f1'
};
const navItemStyles = {
    padding: '10px',
    marginBottom: '10px',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'background-color 0.3s'
};

const AdminPanel = () => {
    // State to determine which component to display
    const [currentView, setCurrentView] = useState('products'); 

    // Function to render the correct component based on state
    const renderView = () => {
        switch (currentView) {
            case 'products':
                return <AdminProducts />;
            case 'users':
                return <AdminUsers />;
            case 'orders':
                return <AdminOrders />;
            default:
                return <AdminProducts />;
        }
    };

    const NavItem = ({ view, label }) => (
        <div
            onClick={() => setCurrentView(view)}
            style={{
                ...navItemStyles,
                backgroundColor: currentView === view ? '#3498db' : 'transparent',
                fontWeight: currentView === view ? 'bold' : 'normal',
                
            }}
        >
            {label}
        </div>
    );

    return (
        <div style={panelStyles}>
            {/* Sidebar for Navigation */}
            <div style={sidebarStyles}>
                <h2 style={{ marginBottom: '30px', borderBottom: '1px solid #7f8c8d', paddingBottom: '15px' }}>
                    Admin Dashboard
                </h2>
                <nav>
                    <NavItem view="products" label="📦 Manage Products" />
                    <NavItem view="orders" label="🛒 Manage Orders" />
                    <NavItem view="users" label="👥 Manage Users" />
                    {/* Add more links here */}
                </nav>
            </div>

            {/* Main Content Area */}
            <div style={mainContentStyles}>
                <h1>{currentView.charAt(0).toUpperCase() + currentView.slice(1)} Management</h1>
                {renderView()}
            </div>
        </div>
    );
};

export default AdminPanel;