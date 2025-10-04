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
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Products Management</h2>
      <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-pink-50">
          <tr>
            <th className="px-6 py-3">ID</th>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-pink-50 transition">
              <td className="px-6 py-4">{product.id}</td>
              <td className="px-6 py-4">{product.name}</td>
              <td className="px-6 py-4">₹ {product.price.toLocaleString()}</td>
              <td className="px-6 py-4 flex gap-2">
                <button className="px-3 py-1 bg-yellow-500 text-white rounded">Edit</button>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded"
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
