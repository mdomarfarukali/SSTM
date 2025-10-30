import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X } from "lucide-react"; // Importing useful icons
import ProductFormModal from "../../components/ProductFormModal.jsx";
import axios from "axios";
import LoadingSpinner from "../../components/common/LoadingSpinner";

// --- Mongoose Schema Constants (Mirroring Backend Enums) ---
const CATEGORY_OPTIONS = [
    "Necklace", "Ring", "Earrings", "Bracelet", "Pendant",
    "Anklet", "Bangle", "Brooch", "Chain", "Others"
];
const MATERIAL_OPTIONS = ["Gold", "Silver", "Diamond", "Platinum", "Artificial", "Other"];
const GENDER_OPTIONS = ["Women", "Men", "Unisex"];

const initialProductState = {
    id: null,
    name: '',
    category: CATEGORY_OPTIONS[0],
    gender: GENDER_OPTIONS[2],
    collection: 'Regular',
    material: MATERIAL_OPTIONS[0],
    purity: '',
    gemstone: '',
    gemstoneWeight: 0,
    metalWeight: 0,
    price: 0,
    discount: 0,
    stock: 0,
    description: '',
    shortDescription: '',
};

export default function AdminProducts() {
    const [products, setProducts] = useState([
        // { id: 1, name: "Diamond Ring", category: "Ring", material: "Diamond", price: 56000, stock: 15 },
        // { id: 2, name: "Gold Necklace", category: "Necklace", material: "Gold", price: 32500, stock: 8 },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(initialProductState);
    const [isEditing, setIsEditing] = useState(false);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("/API/products?page=1&limit=1000000");
                // Update metrics based on fetched data
                setProducts(res.data.products);
            } catch (error) {
                console.error("❌ Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // --- Handlers ---

    const handleDelete = (_id) => {
        if (window.confirm(`Are you sure you want to delete product ID #${_id}?`)) {
            setProducts(products.filter((p) => p._id !== _id));
        }
    };

    const handleOpenModal = (product = initialProductState) => {
        setIsEditing(!!product._id);
        setCurrentProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentProduct(initialProductState);
        setIsEditing(false);
    };

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setCurrentProduct(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) || 0 : value
        }));
    };

    const handleSave = async (productData) => {
        try {
            const token = localStorage.getItem("token");
            if (isEditing) {
                await axios.put(`/API/products/${productData._id}`, productData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProducts(products.map(p => p._id === productData._id ? productData : p));
            } else {
                await axios.post("/API/products", productData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const newId = products.length ? Math.max(...products.map(p => p._id || 0)) + 1 : 1;
                setProducts([...products, { ...productData, _id: newId }]);
            }
        } catch (error) {
            console.error("❌ Failed to save product:", error);
            return;
        }
        // if (isEditing) {
        //     setProducts(products.map(p => p._id === productData._id ? productData : p));
        // } else {
        //     const newId = products.length ? Math.max(...products.map(p => p._id || 0)) + 1 : 1;
        //     setProducts([...products, { ...productData, _id: newId }]);
        // }
        handleCloseModal();
    };


    if (loading) {
        return (
            // <div className="flex items-center justify-center min-h-screen text-gray-600">
            //     Loading users...
            // </div>
            <LoadingSpinner />
        );
    }

    // --- Main Component Render ---
    return (
        // Adjusted class names for better integration with the dashboard's light background
        <div className="p-0 bg-gray-50 min-h-full">

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Products Management</h2>
                <button
                    onClick={() => handleOpenModal(initialProductState)}
                    className="flex items-center gap-2 px-4 py-2 bg-fuchsia-600 text-white font-medium rounded-lg shadow-md shadow-fuchsia-600/40 hover:bg-fuchsia-700 transition"
                >
                    <Plus size={18} />
                    Add Product
                </button>
            </div>

            {/* Product Table */}
            <div className="overflow-x-auto bg-white shadow-xl rounded-xl">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-indigo-900">
                        <tr>
                            <th className="px-6 py-3 text-white text-left text-sm font-semibold">ID</th>
                            <th className="px-6 py-3 text-white text-left text-sm font-semibold">Name</th>
                            <th className="px-6 py-3 text-white text-left text-sm font-semibold">Price (₹)</th>
                            <th className="px-6 py-3 text-white text-left text-sm font-semibold">Stock</th>
                            <th className="px-6 py-3 text-white text-left text-sm font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {products.map((product) => (
                            <tr key={product._id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{product._id}</td>
                                <td className="px-6 py-4 text-gray-800 font-medium">{product.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-700 font-medium">
                                    ₹ {product.price.toLocaleString()}
                                </td>
                                <td className={`px-6 py-4 whitespace-nowrap font-medium 
                                    ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-yellow-600' : 'text-red-600'}`}>
                                    {product.stock}
                                </td>
                                <td className="px-6 py-4 flex gap-2">
                                    <button
                                        className="p-1 text-fuchsia-600 rounded-full hover:bg-fuchsia-50 transition"
                                        onClick={() => handleOpenModal(product)}
                                        title="Edit Product"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button
                                        className="p-1 text-red-600 rounded-full hover:bg-red-50 transition"
                                        onClick={() => handleDelete(product.id)}
                                        title="Delete Product"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Render Modal */}
            {isModalOpen && <ProductFormModal isEditing={isEditing} currentProduct={currentProduct} setCurrentProduct={setCurrentProduct} handleChange={handleChange} handleCloseModal={handleCloseModal} handleSave={handleSave} />}
        </div>
    );
}
