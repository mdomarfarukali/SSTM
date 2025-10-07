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
                <thead className="bg-green-200">
                    <tr>
                        <th className="px-6 py-3 text-gray-900">ID</th>
                        <th className="px-6 py-3 text-gray-900">Name</th>
                        <th className="px-6 py-3 text-gray-900">Price</th>
                        <th className="px-6 py-3 text-gray-900">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className="hover:bg-green-50 transition">
                            <td className="px-6 py-4 text-gray-900">{product.id}</td>
                            <td className="px-6 py-4 text-gray-900">{product.name}</td>
                            <td className="px-6 py-4 text-gray-900">₹ {product.price.toLocaleString()}</td>
                            <td className="px-6 py-4 flex gap-2">
                                {/* <div className="dark p-4">
                                    <button className="px-3 py-1 bg-gray-800 dark:bg-gray-900 text-white rounded">
                                        Edit
                                    </button>
                                </div> */}

                                <button
                                    className="px-3 py-1 bg-black text-gray-900 rounded hover:bg-red-100 transition"
                                >
                                    Edit
                                </button>
                                <button
                                    className="px-3 py-1 text-gray-900 rounded hover:bg-red-100 transition"
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
