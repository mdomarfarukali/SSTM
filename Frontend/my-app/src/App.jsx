import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageLayout from "./components/layout/PageLayout";

// --- CORE USER PAGES ---
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import WishList from "./pages/WishList";
import OrderSuccess from "./pages/OrderSuccess";

// --- NEW USER ACCOUNT PAGES (Needed for Nested Routing) ---
import UserDashboard from "./pages/UserDashboard"; // The main account layout/sidebar
import OrderHistory from "./pages/OrderHistory"; // The list of orders
import OrderDetails from "./pages/OrderDetails"; // Details for a single order
// Placeholder component for user profile management
const UserProfile = () => <div>User Profile Settings Form</div>; 
// Placeholder component for addresses/settings
const UserAddresses = () => <div>User Address Book</div>;

// --- ADMIN PAGES ---
import AdminLayout from "./components/layout/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import OrderManagement from "./pages/admin/OrderManagement";
import ProductManagement from "./pages/admin/ProductManagement";
import UsersManagement from "./pages/admin/UsersManagement";
import CODManagement from "./pages/admin/CODManagement";

function App() {
  return (
    // Context Providers should ideally wrap this Router (e.g., CartProvider, AuthProvider)
    <Router>
      <Routes>
        
        {/* ======================================================= */}
        {/* ⭐️ 1. USER FACING ROUTES (Wrapped in PageLayout) ⭐️ */}
        {/* ======================================================= */}

        {/* Home, Products, Product Detail (Direct Routes) */}
        <Route element={<PageLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        
          {/* Cart Flow Routes */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/wishlist" element={<WishList />} />
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
        <Route path="/admin" element={<AdminLayout />}>
          {/* Default admin view */}
          <Route index element={<Dashboard />} /> 
          
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="users" element={<UsersManagement />} />
          <Route path="cod" element={<CODManagement />} />
        </Route>
        
        {/* Add a Catch-all 404 Route */}
        <Route path="*" element={<PageLayout><div>404 Page Not Found</div></PageLayout>} />

      </Routes>
    </Router>
  );
}

export default App;


