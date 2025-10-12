import { Plus, Edit, Trash2 } from "lucide-react";

const ProductManagement = () => {
  // Dummy Product Data
  const products = [
    { id: 1, name: "Diamond Ring", price: "₹ 5,60,000", stock: 12, status: "Active" },
    { id: 2, name: "Gold Necklace", price: "₹ 3,25,000", stock: 8, status: "Active" },
    { id: 3, name: "Bracelet", price: "₹ 35,000", stock: 25, status: "Active" },
    { id: 4, name: "Silver Earrings", price: "₹ 12,000", stock: 0, status: "Out of Stock" },
  ];

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition">
          <Plus size={18} /> Add Product
        </button>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow">
        <table className="w-full text-sm text-left border">
          <thead className="bg-pink-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Stock</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-pink-50">
                <td className="px-4 py-2 border">{product.id}</td>
                <td className="px-4 py-2 border">{product.name}</td>
                <td className="px-4 py-2 border">{product.price}</td>
                <td className="px-4 py-2 border">{product.stock}</td>
                <td
                  className={`px-4 py-2 border font-medium ${
                    product.status === "Active"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {product.status}
                </td>
                <td className="px-4 py-2 border flex gap-3">
                  <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition">
                    <Edit size={16} />
                  </button>
                  <button className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
