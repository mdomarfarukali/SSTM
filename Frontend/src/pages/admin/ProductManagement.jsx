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
    <div className="p-6 bg-admin-light min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-admin">Product Management</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-admin-primary text-admin-light rounded-lg hover:bg-admin-primary-hover transition">
          <Plus size={18} /> Add Product
        </button>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto bg-admin rounded-2xl shadow">
        <table className="w-full text-sm text-left border border-admin-border">
          <thead className="bg-admin-secondary text-admin-light">
            <tr>
              <th className="px-4 py-2 border border-admin-border">ID</th>
              <th className="px-4 py-2 border border-admin-border">Name</th>
              <th className="px-4 py-2 border border-admin-border">Price</th>
              <th className="px-4 py-2 border border-admin-border">Stock</th>
              <th className="px-4 py-2 border border-admin-border">Status</th>
              <th className="px-4 py-2 border border-admin-border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-admin-secondary-light transition">
                <td className="px-4 py-2 border border-admin-border text-admin">{product.id}</td>
                <td className="px-4 py-2 border border-admin-border text-admin">{product.name}</td>
                <td className="px-4 py-2 border border-admin-border text-admin">{product.price}</td>
                <td className="px-4 py-2 border border-admin-border text-admin">{product.stock}</td>
                <td
                  className={`px-4 py-2 border border-admin-border font-medium ${
                    product.status === "Active"
                      ? "text-admin-success"
                      : "text-admin-danger"
                  }`}
                >
                  {product.status}
                </td>
                <td className="px-4 py-2 border border-admin-border flex gap-3">
                  <button className="p-2 bg-admin-info text-admin-light rounded-lg hover:bg-admin-info-hover transition">
                    <Edit size={16} />
                  </button>
                  <button className="p-2 bg-admin-danger text-admin-light rounded-lg hover:bg-admin-danger-hover transition">
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

