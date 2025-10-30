// src/pages/Products.jsx
import React, { useState, useEffect, useMemo } from "react";
import ProductCard from "../components/.mod.ProductCard";
import axios from "axios";

// Helper function to extract all unique filter options (Needed for availableOptions)
const getUniqueOptions = (products, key) => {
    const options = new Set();
    products.forEach(product => {
        const value = product[key];
        console.log("Extracting filter option:", key, value);
        console.log("Type of value:", typeof value);
        if (Array.isArray(value)) {
            value.forEach(v => options.add(v));
        } else if (value) {
            options.add(value);
        }
    });
    return Array.from(options).sort();
};

// Definition of Filter Keys (Needed for FILTER_OPTIONS)
const FILTER_OPTIONS = {
    type: { label: "Jewelry Type", key: "type" },
    material: { label: "Material/Stone", key: "material" },
    collection: { label: "Collection", key: "collection" },
};


const Products = () => {
    // 1. State for active filters (Needed by FilterSidebar)
    const [activeFilters, setActiveFilters] = useState({
        type: [],
        material: [],
        collection: [],
    });

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("/API/products");
                console.log("Fetched products:", response.data);
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    // State to manage which filter dropdown is open
    const [openFilter, setOpenFilter] = useState(null); // 'type', 'material', 'collection', or null

    // 2. Handler to toggle a filter value (Needed by FilterSidebar)
    const handleFilterChange = (key, value) => {
        setActiveFilters(prevFilters => {
            const currentValues = prevFilters[key];
            if (currentValues.includes(value)) {
                return { ...prevFilters, [key]: currentValues.filter(v => v !== value) };
            } else {
                return { ...prevFilters, [key]: [...currentValues, value] };
            }
        });
    };

    // 3. Memoized list of filtered products (Needed for the count in FilterSidebar)
    const filteredProducts = useMemo(() => {
        const filters = activeFilters;
        const isFilterActive = Object.values(filters).some(arr => arr.length > 0);

        if (!isFilterActive) {
            return products;
        }

        return products.filter(product => {
            const typeMatch = filters.type.length === 0 || filters.type.includes(product.category);
            const materialMatch = filters.material.length === 0 ||
                filters.material.some(filter => product.material.includes(filter));
            const collectionMatch = filters.collection.length === 0 ||
                filters.collection.some(filter => product.collection.includes(filter));

            return typeMatch && materialMatch && collectionMatch;
        });
    }, [activeFilters]);

    // 4. Memoize the unique filter options (Needed by FilterSidebar)
    const availableOptions = useMemo(() => ({
        type: getUniqueOptions(products, 'category'),
        material: getUniqueOptions(products, 'material'),
        collection: getUniqueOptions(products, 'collection'),
    }), []);

    // Handler for toggling the dropdown
    const toggleFilter = (key) => {
        setOpenFilter(openFilter === key ? null : key);
    };

    // --- Filter Sidebar Component (Inline for Simplicity) ---
    const FilterSidebar = () => (
        <aside className="w-full lg:w-1/4">
            <div className="p-8 rounded-2xl bg-brand-dark sticky top-24 transform transition-all duration-300">
                <h3 className="text-3xl font-serif font-bold text-gray-800 mb-8 pb-4 border-b border-gray-200 tracking-wide">
                    Refine Your Search <span className="text-gray-500 text-base ml-2">({filteredProducts.length})</span>
                </h3>

                {Object.keys(FILTER_OPTIONS).map(key => (
                    <div key={key} className="mb-6 border-b border-gray-100 last:border-b-0">
                        {/* Dropdown Header/Toggle Button */}
                        <button
                            onClick={() => toggleFilter(key)}
                            className="w-full flex justify-between items-center py-3 text-xl font-semibold text-gray-700 hover:text-pink-600 transition-colors duration-200 capitalize focus:outline-none"
                        >
                            <span className="flex items-center">
                                {FILTER_OPTIONS[key].label}
                                <span className="ml-2 text-gray-400 text-sm">
                                    {key === 'type'}
                                    {key === 'material'}
                                    {key === 'collection'}
                                </span>
                            </span>
                            <span className={`transform transition-transform duration-300 ${openFilter === key ? 'rotate-180' : 'rotate-0'}`}>
                                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </span>
                        </button>

                        {/* Dropdown Content */}
                        <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${openFilter === key ? 'max-h-96 py-3' : 'max-h-0'}`}
                        >
                            <div className="space-y-3">
                                {availableOptions[key].map(option => (
                                    <label key={option} className="flex items-center cursor-pointer group">
                                        <input
                                            id={`${key}-${option}`}
                                            type="checkbox"
                                            checked={activeFilters[key].includes(option)}
                                            onChange={() => handleFilterChange(key, option)}
                                            className="hidden peer"
                                        />
                                        {/* Custom checkbox */}
                                        <div className="w-5 h-5 border-2 border-gray-300 rounded-md flex items-center justify-center 
                                                        group-hover:border-pink-400 transition-colors duration-200 flex-shrink-0
                                                        peer-checked:bg-pink-500 peer-checked:border-pink-500">
                                            {activeFilters[key].includes(option) && (
                                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </div>
                                        <span className="ml-3 text-base font-medium text-gray-700 group-hover:text-pink-600 transition-colors duration-200">
                                            {option}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}

                <button
                    onClick={() => setActiveFilters({ type: [], material: [], collection: [] })}
                    className="w-full mt-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 rounded-lg 
                            shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 
                            focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                    Clear All Filters
                </button>
            </div>
        </aside>
    );
    // END of Filter Sidebar Component
    // ------------------------------

    return (
        <div className="min-h-screen bg-brand-light transition-colors duration-500 pt-20"> {/* Changed bg-brand-light to bg-gray-50 for consistency */}
            {/* <Navbar /> */}

            <div className="container mx-auto px-4 py-8">

                {/* Title Section */}
                <div className="text-center mb-16 pt-8">
                    <h1 className="text-6xl font-serif font-bold text-gray-400 mb-4"> {/* Enhanced header styling */}
                        Our Exclusive Collection
                    </h1>
                    <p className="text-gray-600 text-xl max-w-2xl mx-auto"> {/* Enhanced description styling */}
                        Discover handcrafted jewelry made with love and precision.
                    </p>
                </div>

                {/* Layout with space for a sidebar (Filter) */}
                <div className="flex flex-col lg:flex-row gap-10">

                    {/* The Filter Sidebar is rendered here */}
                    <FilterSidebar />

                    {/* Products Grid */}
                    <main className="w-full lg:w-3/4">
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                                {filteredProducts.map((product, index) => (
                                    <ProductCard
                                        key={product._id}
                                        product={product}
                                        index={index}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-xl shadow-lg border border-gray-100">
                                <p className="text-3xl text-gray-600 font-serif mb-6">
                                    😔 No products match your current selections.
                                </p>
                                <button
                                    onClick={() => setActiveFilters({ type: [], material: [], collection: [] })}
                                    className="mt-6 py-3 px-8 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg 
                                                shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 
                                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                >
                                    Show All Products
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>

            {/* <Footer /> */}
        </div>
    );
};

export default Products;