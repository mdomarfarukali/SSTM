import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import AdminProducts from "./AdminProducts";
import AdminOrders from "./AdminOrders";
import AdminUsers from "./AdminUsers";

export default function AdminRoutes() {
    return (
        <Routes>
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/products" element={<AdminProducts />} />
            <Route path="/orders" element={<AdminOrders />} />
            <Route path="/users" element={<AdminUsers />} />
        </Routes>
    );
}
