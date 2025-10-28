import { useState } from "react";
import { Plus, Edit2, Trash2, X } from "lucide-react"; // Importing useful icons

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
        { id: 1, name: "Diamond Ring", category: "Ring", material: "Diamond", price: 56000, stock: 15 },
        { id: 2, name: "Gold Necklace", category: "Necklace", material: "Gold", price: 32500, stock: 8 },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(initialProductState);
    const [isEditing, setIsEditing] = useState(false);

    // --- Handlers ---

    const handleDelete = (id) => {
        if (window.confirm(`Are you sure you want to delete product ID #${id}?`)) {
            setProducts(products.filter((p) => p.id !== id));
        }
    };

    const handleOpenModal = (product = initialProductState) => {
        setIsEditing(!!product.id);
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

    const handleSave = (e) => {
        e.preventDefault();
        
        // NOTE: In a real app, the `slug` and `finalPrice` would be calculated on the backend.
        
        if (isEditing) {
            // Update existing product
            setProducts(products.map(p => p.id === currentProduct.id ? currentProduct : p));
        } else {
            // Add new product (simple ID generation for mock data)
            const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
            setProducts([...products, { ...currentProduct, id: newId }]);
        }

        handleCloseModal();
    };

    // --- Sub-Component: Product Form Modal ---
    const ProductFormModal = () => (
        // Modal Backdrop
        <div className="fixed inset-0 bg-black/40 bg-opacity-10 flex items-center justify-center z-50 p-4">
            {/* Modal Content - Increased max-w-2xl for better layout of many fields */}
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl m-4 transform transition-all scale-100 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center border-b pb-3 mb-6">
                    <h3 className="text-2xl font-bold text-gray-800">
                        {isEditing ? `Edit Product #${currentProduct.id}` : "Add New Product"}
                    </h3>
                    <button onClick={handleCloseModal} className="text-gray-500 hover:text-red-600 p-1 rounded-full hover:bg-red-50">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSave} className="space-y-6">
                    {/* SECTION 1: Basic & Classification Info */}
                    <h4 className="text-lg font-semibold text-indigo-700 border-b pb-1">Basic & Classification</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        
                        {/* Name */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={currentProduct.name}
                                onChange={handleChange}
                                required
                                maxLength={120}
                                className="block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-fuchsia-600 focus:border-fuchsia-600"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                            <select
                                name="category"
                                value={currentProduct.category}
                                onChange={handleChange}
                                required
                                className="block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-fuchsia-600 focus:border-fuchsia-600"
                            >
                                {CATEGORY_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                            <select
                                name="gender"
                                value={currentProduct.gender}
                                onChange={handleChange}
                                className="block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-fuchsia-600 focus:border-fuchsia-600"
                            >
                                {GENDER_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                        </div>
                    </div>
                    
                    {/* Collection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Collection (e.g., Wedding, Festive)</label>
                        <input
                            type="text"
                            name="collection"
                            value={currentProduct.collection}
                            onChange={handleChange}
                            className="block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-fuchsia-600 focus:border-fuchsia-600"
                        />
                    </div>

                    {/* --- SECTION 2: Material & Weight Details --- */}
                    <h4 className="text-lg font-semibold text-indigo-700 border-b pb-1 pt-4">Material & Weights</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        
                        {/* Material */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Material *</label>
                            <select
                                name="material"
                                value={currentProduct.material}
                                onChange={handleChange}
                                required
                                className="block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-fuchsia-600 focus:border-fuchsia-600"
                            >
                                {MATERIAL_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                        </div>
                        
                        {/* Purity */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Purity (e.g., 22K, 925 Silver)</label>
                            <input
                                type="text"
                                name="purity"
                                value={currentProduct.purity}
                                onChange={handleChange}
                                className="block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-fuchsia-600 focus:border-fuchsia-600"
                            />
                        </div>

                        {/* Metal Weight (grams) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Metal Weight (g)</label>
                            <input
                                type="number"
                                name="metalWeight"
                                value={currentProduct.metalWeight}
                                onChange={handleChange}
                                min="0"
                                step="0.01"
                                className="block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-fuchsia-600 focus:border-fuchsia-600"
                            />
                        </div>

                        {/* Gemstone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Gemstone (e.g., Ruby, Sapphire)</label>
                            <input
                                type="text"
                                name="gemstone"
                                value={currentProduct.gemstone}
                                onChange={handleChange}
                                className="block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-fuchsia-600 focus:border-fuchsia-600"
                            />
                        </div>

                        {/* Gemstone Weight (carats) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Gemstone Weight (Carats)</label>
                            <input
                                type="number"
                                name="gemstoneWeight"
                                value={currentProduct.gemstoneWeight}
                                onChange={handleChange}
                                min="0"
                                step="0.01"
                                className="block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-fuchsia-600 focus:border-fuchsia-600"
                            />
                        </div>
                    </div>

                    {/* --- SECTION 3: Pricing & Stock --- */}
                    <h4 className="text-lg font-semibold text-indigo-700 border-b pb-1 pt-4">Pricing & Inventory</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        
                        {/* Price */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹) *</label>
                            <input
                                type="number"
                                name="price"
                                value={currentProduct.price}
                                onChange={handleChange}
                                required
                                min="0"
                                className="block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-fuchsia-600 focus:border-fuchsia-600"
                            />
                        </div>
                        
                        {/* Discount */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
                            <input
                                type="number"
                                name="discount"
                                value={currentProduct.discount}
                                onChange={handleChange}
                                min="0"
                                max="100"
                                className="block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-fuchsia-600 focus:border-fuchsia-600"
                            />
                        </div>

                        {/* Stock */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity *</label>
                            <input
                                type="number"
                                name="stock"
                                value={currentProduct.stock}
                                onChange={handleChange}
                                required
                                min="0"
                                className="block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-fuchsia-600 focus:border-fuchsia-600"
                            />
                        </div>
                    </div>

                    {/* --- SECTION 4: Description --- */}
                    <h4 className="text-lg font-semibold text-indigo-700 border-b pb-1 pt-4">Description</h4>
                    
                    {/* Short Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Short Description (Max 160 chars)</label>
                        <textarea
                            name="shortDescription"
                            value={currentProduct.shortDescription}
                            onChange={handleChange}
                            maxLength={160}
                            rows="2"
                            className="block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-fuchsia-600 focus:border-fuchsia-600"
                        />
                    </div>
                    
                    {/* Full Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
                        <textarea
                            name="description"
                            value={currentProduct.description}
                            onChange={handleChange}
                            rows="4"
                            className="block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-fuchsia-600 focus:border-fuchsia-600"
                        />
                    </div>


                    {/* Action Buttons */}
                    <div className="pt-6 flex justify-end gap-3">
                         <button
                            type="button"
                            onClick={handleCloseModal}
                            className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-fuchsia-600 text-white font-medium rounded-lg shadow-md shadow-fuchsia-600/30 hover:bg-fuchsia-700 transition"
                        >
                            {isEditing ? "Update Product" : "Save Product"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

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
                            <tr key={product.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{product.id}</td>
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
            {isModalOpen && <ProductFormModal />}
        </div>
    );
}
