import { Link, Outlet } from "react-router-dom";
import { LayoutDashboard, Package, Users, ClipboardList, DollarSign } from "lucide-react";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-6">
        <h1 className="text-2xl font-bold text-pink-400 mb-8">Admin Panel</h1>
        <nav className="flex flex-col gap-4">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-800"
          >
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link
            to="/admin/orders"
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-800"
          >
            <ClipboardList size={18} /> Orders
          </Link>
          <Link
            to="/admin/products"
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-800"
          >
            <Package size={18} /> Products
          </Link>
          <Link
            to="/admin/users"
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-800"
          >
            <Users size={18} /> Users
          </Link>
          <Link
            to="/admin/cod"
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-800"
          >
            <DollarSign size={18} /> COD Mgmt
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Admin Dashboard</h2>
          <span className="text-gray-600">Welcome, Admin 👋</span>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
