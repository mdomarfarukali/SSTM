// src/pages/Products.jsx
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/common/LoadingSpinner.jsx";

// 🔹 Helper to extract unique filter options
const getUniqueOptions = (products, key) => {
    const options = new Set();
    products.forEach((product) => {
        const value = product[key];
        if (Array.isArray(value)) value.forEach((v) => options.add(v));
        else if (value) options.add(value);
    });
    return Array.from(options).sort();
};

// 🔹 Define filter categories (match your DB fields)
const FILTER_OPTIONS = {
    category: { label: "Jewelry Type", key: "category" },
    material: { label: "Material/Stone", key: "material" },
    collection: { label: "Collection", key: "collection" },
};

const Products = () => {
    const [activeFilters, setActiveFilters] = useState({
        category: [],
        material: [],
        collection: [],
    });

    const [products, setProducts] = useState([]);
    const [openFilter, setOpenFilter] = useState(null);
    const [loading, setLoading] = useState(true);

    // 🔹 Fetch products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get("/API/products?page=1&limit=100");
                // The products are inside data.products
                setProducts(data.products || []);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);


    // 🔹 Toggle filter dropdown
    const toggleFilter = (key) => {
        setOpenFilter(openFilter === key ? null : key);
    };

    // 🔹 Update filters when user selects options
    const handleFilterChange = (key, value) => {
        setActiveFilters((prev) => {
            const current = prev[key];
            return current.includes(value)
                ? { ...prev, [key]: current.filter((v) => v !== value) }
                : { ...prev, [key]: [...current, value] };
        });
    };

    // 🔹 Compute available filter options (depends on products)
    const availableOptions = useMemo(
        () => ({
            category: getUniqueOptions(products, "category"),
            material: getUniqueOptions(products, "material"),
            collection: getUniqueOptions(products, "collection"),
        }),
        [products]
    );

    // 🔹 Filter products based on selected filters
    const filteredProducts = useMemo(() => {
        const filters = activeFilters;
        const isFilterActive = Object.values(filters).some((arr) => arr.length > 0);
        if (!isFilterActive) return products;

        return products.filter((product) => {
            const categoryMatch =
                filters.category.length === 0 ||
                filters.category.includes(product.category);
            const materialMatch =
                filters.material.length === 0 ||
                filters.material.includes(product.material);
            const collectionMatch =
                filters.collection.length === 0 ||
                filters.collection.includes(product.collection);
            return categoryMatch && materialMatch && collectionMatch;
        });
    }, [activeFilters, products]);

    // 🔹 Clear all filters
    const clearFilters = () => {
        setActiveFilters({ category: [], material: [], collection: [] });
    };

    // 🔹 Filter Sidebar Component
    const FilterSidebar = () => (
        <aside className="w-full lg:w-1/4">
            <div className="p-8 rounded-2xl bg-brand-dark sticky top-24">
                <h3 className="text-3xl font-serif font-bold text-gray-800 mb-8 pb-4 border-b border-gray-200">
                    Refine Your Search{" "}
                    <span className="text-gray-500 text-base ml-2">
                        ({filteredProducts.length})
                    </span>
                </h3>

                {Object.keys(FILTER_OPTIONS).map((key) => (
                    <div key={key} className="mb-6 border-b border-gray-100">
                        <button
                            onClick={() => toggleFilter(key)}
                            className="w-full flex justify-between items-center py-3 text-xl font-semibold text-gray-700 hover:text-pink-600 transition"
                        >
                            <span>{FILTER_OPTIONS[key].label}</span>
                            <span
                                className={`transform transition-transform ${openFilter === key ? "rotate-180" : "rotate-0"
                                    }`}
                            >
                                ▼
                            </span>
                        </button>

                        <div
                            className={`overflow-hidden transition-all duration-300 ${openFilter === key ? "max-h-96 py-3" : "max-h-0"
                                }`}
                        >
                            {availableOptions[key]?.map((option) => (
                                <label key={option} className="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={activeFilters[key].includes(option)}
                                        onChange={() => handleFilterChange(key, option)}
                                        className="hidden peer"
                                    />
                                    <div
                                        className="w-5 h-5 border-2 border-brand-muted rounded-md flex items-center justify-center
                    peer-checked:bg-pink-500 peer-checked:border-pink-500 transition"
                                    >
                                        {activeFilters[key].includes(option) && (
                                            <svg
                                                className="w-3 h-3 text-white"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth="3"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                    <span className="ml-3 text-base text-gray-700">{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}

                <button
                    onClick={clearFilters}
                    className="w-full mt-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 rounded-lg"
                >
                    Clear All Filters
                </button>
            </div>
        </aside>
    );

    if (loading) {
        return (
            <LoadingSpinner />
        );
    }
    // 🔹 Render
    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-16 pt-8">
                    <h1 className="text-6xl font-serif font-bold text-gray-400 mb-4">
                        Our Exclusive Collection
                    </h1>
                    <p className="text-gray-600 text-xl max-w-2xl mx-auto">
                        Discover handcrafted jewelry made with love and precision.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-10">
                    <FilterSidebar />

                    <main className="w-full lg:w-3/4">
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                                {filteredProducts.map((product, index) => (
                                    <ProductCard key={product._id} product={product} index={index} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-xl shadow-lg border border-gray-100">
                                <p className="text-3xl text-gray-600 font-serif mb-6">
                                    😔 No products match your current selections.
                                </p>
                                <button
                                    onClick={clearFilters}
                                    className="mt-6 py-3 px-8 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg"
                                >
                                    Show All Products
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Products;
