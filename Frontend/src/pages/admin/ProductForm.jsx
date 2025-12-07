import { useState } from "react";

export default function AdminProducts() {
  const [products, setProducts] = useState([
    { id: 1, name: "Diamond Ring", price: 560000 },
    { id: 2, name: "Gold Necklace", price: 325000 },
  ]);

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="p-8 bg-admin-light min-h-screen">
      <h2 className="text-3xl font-bold text-admin mb-6">Products Management</h2>
      <table className="min-w-full bg-admin shadow rounded-lg overflow-hidden">
        <thead className="bg-admin-primary">
          <tr>
            <th className="px-6 py-3 text-admin-light">ID</th>
            <th className="px-6 py-3 text-admin-light">Name</th>
            <th className="px-6 py-3 text-admin-light">Price</th>
            <th className="px-6 py-3 text-admin-light">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-admin-secondary transition">
              <td className="px-6 py-4 text-admin">{product.id}</td>
              <td className="px-6 py-4 text-admin">{product.name}</td>
              <td className="px-6 py-4 text-admin">₹ {product.price.toLocaleString()}</td>
              <td className="px-6 py-4 flex gap-2">
                <button className="px-3 py-1 bg-admin-primary text-admin-light rounded hover:bg-admin-secondary transition">
                  Edit
                </button>
                <button
                  className="px-3 py-1 bg-admin-danger text-admin-light rounded hover:bg-admin-secondary transition"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 