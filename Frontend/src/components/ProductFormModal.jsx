import React, { useState } from "react";
import axios from "axios";
import { X, Upload, Loader2 } from "lucide-react";

// --- ENUM OPTIONS ---
const CATEGORY_OPTIONS = [
    "Necklace", "Ring", "Earrings", "Bracelet", "Pendant",
    "Anklet", "Bangle", "Brooch", "Chain", "Others"
];
const GENDER_OPTIONS = ["Women", "Men", "Unisex"];
const MATERIAL_OPTIONS = ["Gold", "Silver", "Diamond", "Platinum", "Artificial", "Other"];

const ProductFormModal = ({ isEditing, currentProduct, setCurrentProduct, handleChange, handleCloseModal, handleSave }) => {
    // const [product, setProduct] = useState(currentProduct || {});
    const [uploading, setUploading] = useState(false);

    // const [imagePreviews, setImagePreviews] = useState(
    //     currentProduct.images ? currentProduct.images.map(img => img.url) : []
    // );
    const [imagePreviews, setImagePreviews] = useState(
        currentProduct.images
            ? currentProduct.images.map(img => ({
                url: img.url,
                public_id: img.public_id
            }))
            : []
    );


    // console.log("Current Product in Modal :", currentProduct);
    // console.log("Image Previews in Modal :", imagePreviews);
    // const handleChange = (e) => {
    //     const { name, value, type } = e.target;
    //     setCurrentProduct(prev => ({
    //         ...prev,
    //         [name]: type === 'number' ? parseFloat(value) || 0 : value
    //     }));
    // };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("images", file); // backend expects 'images' field

        try {
            const res = await axios.post("/API/cloudinary/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                timeout: 60000
            });
            // console.log("Upload response:", res.data);
            const newImage = res.data; // first image returned
            setCurrentProduct(prev => ({
                ...prev,
                images: [...(prev.images || []), { url: newImage.url, public_id: newImage.public_id }],
                thumbnail: newImage.url, // first image as thumbnail
            }));
            setImagePreviews(prev => [...prev,
            { url: newImage.url, public_id: newImage.public_id }
            ]);

            // console.log("Images added till now :", imagePreviews);
        } catch (err) {
            console.error("Upload failed", err);
        } finally {
            setUploading(false);
        }
    };


    // 🧾 Submit handler
    const handleSubmit = (e) => {
        e.preventDefault();
        currentProduct.images = imagePreviews;
        // console.log("Submitting Product :", currentProduct);
        handleSave(currentProduct);
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-3xl m-4 overflow-y-auto max-h-[90vh]">
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-3 mb-6">
                    <h3 className="text-2xl font-bold text-gray-800">
                        {isEditing ? `Edit Product` : "Add New Product"}
                    </h3>
                    <button
                        onClick={handleCloseModal}
                        className="text-gray-500 hover:text-red-600 p-1 rounded-full hover:bg-red-50"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* === FORM START === */}
                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* 🧩 BASIC INFO */}
                    <section>
                        <h4 className="text-lg font-semibold text-indigo-700 border-b pb-1 mb-4">Basic & Classification</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    // value={product.name || ""}
                                    onChange={handleChange}
                                    value={currentProduct?.name || ""}
                                    // onChange={(e) =>
                                    // setCurrentProduct((prev) => ({ ...prev, name: e.target.value }))
                                    // }
                                    placeholder="Enter product name"
                                    className="w-full border rounded-lg p-2 shadow-sm focus:ring-fuchsia-500 focus:border-fuchsia-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                                <select
                                    name="category"
                                    required
                                    value={currentProduct.category || ""}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-2 shadow-sm focus:ring-fuchsia-500 focus:border-fuchsia-500"
                                >
                                    <option value="">Select category</option>
                                    {CATEGORY_OPTIONS.map((opt) => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                <select
                                    name="gender"
                                    value={currentProduct.gender || "Unisex"}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-2 shadow-sm focus:ring-fuchsia-500 focus:border-fuchsia-500"
                                >
                                    {GENDER_OPTIONS.map((opt) => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="mt-3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Collection</label>
                            <input
                                type="text"
                                name="collection"
                                value={currentProduct.collection || ""}
                                onChange={handleChange}
                                placeholder="e.g., Wedding Collection"
                                className="w-full border rounded-lg p-2 shadow-sm focus:ring-fuchsia-500 focus:border-fuchsia-500"
                            />
                        </div>
                    </section>

                    {/* 💎 MATERIAL SECTION */}
                    <section>
                        <h4 className="text-lg font-semibold text-indigo-700 border-b pb-1 mb-4">Material & Weights</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Material *</label>
                                <select
                                    name="material"
                                    required
                                    value={currentProduct.material || ""}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-2 shadow-sm focus:ring-fuchsia-500 focus:border-fuchsia-500"
                                >
                                    <option value="">Select material</option>
                                    {MATERIAL_OPTIONS.map((opt) => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Purity</label>
                                <input
                                    name="purity"
                                    value={currentProduct.purity || ""}
                                    onChange={handleChange}
                                    placeholder="e.g., 22K"
                                    className="w-full border rounded-lg p-2 shadow-sm focus:ring-fuchsia-500 focus:border-fuchsia-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Metal Weight (g)</label>
                                <input
                                    type="number"
                                    name="metalWeight"
                                    value={currentProduct.metalWeight || ""}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-2 shadow-sm focus:ring-fuchsia-500 focus:border-fuchsia-500"
                                />
                            </div>
                        </div>
                    </section>

                    {/* 🖼️ IMAGE UPLOAD SECTION */}
                    <section>
                        <h4 className="text-lg font-semibold text-indigo-700 border-b pb-1 mb-4">
                            Product Images
                        </h4>
                        <div className="flex items-center gap-4 flex-wrap">
                            {/* Upload Button */}
                            <label className="cursor-pointer flex items-center gap-2 px-4 py-2 border rounded-lg bg-fuchsia-50 hover:bg-fuchsia-100 transition">
                                <Upload size={20} className="text-fuchsia-600" />
                                <span className="text-fuchsia-700 font-medium">Upload Image</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    hidden
                                />
                            </label>

                            {/* Loading Spinner */}
                            {uploading && <Loader2 className="animate-spin text-fuchsia-600" size={28} />}

                            {/* Previews */}
                            {imagePreviews.length > 0 &&
                                imagePreviews.map((img, idx) => (
                                    <div key={idx} className="relative w-24 h-24">
                                        <img
                                            src={img.url}
                                            alt={`preview ${idx}`}
                                            className="w-24 h-24 rounded-lg object-cover border shadow"
                                        />
                                        {/* Remove button */}
                                        <button
                                            type="button"
                                            className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                                            onClick={() => {
                                                // Remove image from state
                                                setImagePreviews(prev => prev.filter((_, i) => i !== idx));
                                                setCurrentProduct(prev => ({
                                                    ...prev,
                                                    images: prev.images.filter((_, i) => i !== idx),
                                                }));
                                            }}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                        </div>
                    </section>

                    {/* 💰 PRICE & STOCK */}
                    <section>
                        <h4 className="text-lg font-semibold text-indigo-700 border-b pb-1 mb-4">Pricing & Inventory</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹) *</label>
                                <input
                                    type="number"
                                    name="price"
                                    required
                                    min="0"
                                    value={currentProduct.price || ""}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-2 shadow-sm focus:ring-fuchsia-500 focus:border-fuchsia-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
                                <input
                                    type="number"
                                    name="discount"
                                    min="0"
                                    max="100"
                                    value={currentProduct.discount || ""}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-2 shadow-sm focus:ring-fuchsia-500 focus:border-fuchsia-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Stock *</label>
                                <input
                                    type="number"
                                    name="stock"
                                    required
                                    min="0"
                                    value={currentProduct.stock || ""}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-2 shadow-sm focus:ring-fuchsia-500 focus:border-fuchsia-500"
                                />
                            </div>
                        </div>
                    </section>

                    {/* 📄 DESCRIPTION */}
                    <section>
                        <h4 className="text-lg font-semibold text-indigo-700 border-b pb-1 mb-4">Description</h4>
                        <textarea
                            name="description"
                            value={currentProduct.description || ""}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Write product details..."
                            className="w-full border rounded-lg p-2 shadow-sm focus:ring-fuchsia-500 focus:border-fuchsia-500"
                        />
                    </section>

                    {/* ACTION BUTTONS */}
                    <div className="flex justify-end gap-3 pt-6 border-t">
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
}


export default ProductFormModal;