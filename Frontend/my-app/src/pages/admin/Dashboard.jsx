import {
  ShoppingBag,
  DollarSign,
  Users,
  Package,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  // Stats Cards Data
  const stats = [
    {
      title: "Total Sales",
      value: "$12,340",
      icon: <DollarSign className="h-8 w-8 text-pink-600" />,
      change: "+12%",
    },
    {
      title: "Orders",
      value: "1,245",
      icon: <ShoppingBag className="h-8 w-8 text-pink-600" />,
      change: "+8%",
    },
    {
      title: "Customers",
      value: "3,456",
      icon: <Users className="h-8 w-8 text-pink-600" />,
      change: "+5%",
    },
    {
      title: "Products",
      value: "320",
      icon: <Package className="h-8 w-8 text-pink-600" />,
      change: "+3%",
    },
  ];

  // Chart Data
  const salesData = [
    { month: "Jan", sales: 4000 },
    { month: "Feb", sales: 3200 },
    { month: "Mar", sales: 5000 },
    { month: "Apr", sales: 4600 },
    { month: "May", sales: 6000 },
    { month: "Jun", sales: 5200 },
  ];

  // Recent Orders Data
  const orders = [
    { id: "#1001", customer: "Tamanna", amount: "$120", status: "Completed" },
    { id: "#1002", customer: "Soumodip", amount: "$85", status: "Pending" },
    { id: "#1003", customer: "Rahul", amount: "$240", status: "Completed" },
    { id: "#1004", customer: "Ananya", amount: "$99", status: "Cancelled" },
  ];

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-pink-50 p-5 rounded-2xl shadow hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-gray-500 text-sm font-medium">
                  {stat.title}
                </h2>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {stat.value}
                </p>
                <span className="text-sm text-green-600">{stat.change}</span>
              </div>
              <div className="bg-white p-3 rounded-full shadow">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts + Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Sales Chart */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Sales Overview
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#ec4899" // pink
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Recent Orders
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border">
              <thead className="bg-pink-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 border">Order ID</th>
                  <th className="px-4 py-2 border">Customer</th>
                  <th className="px-4 py-2 border">Amount</th>
                  <th className="px-4 py-2 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, i) => (
                  <tr key={i} className="hover:bg-pink-50">
                    <td className="px-4 py-2 border">{order.id}</td>
                    <td className="px-4 py-2 border">{order.customer}</td>
                    <td className="px-4 py-2 border">{order.amount}</td>
                    <td
                      className={`px-4 py-2 border font-medium ${
                        order.status === "Completed"
                          ? "text-green-600"
                          : order.status === "Pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {order.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
