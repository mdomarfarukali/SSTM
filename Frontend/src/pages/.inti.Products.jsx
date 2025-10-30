// src/pages/Products.jsx
import React, { useState, useEffect, useMemo } from "react";
import ProductCard from "../components/.init.ProductCard";
import axios from "axios";

// Helper function to extract all unique filter options (Needed for availableOptions)
const getUniqueOptions = (products, key) => {
    const options = new Set();
    products.forEach(product => {
        const value = product[key];
        console.log("Extracting filter option:", key, value);
        if (Array.isArray(value)) {
            value.forEach(v => options.add(v));
        } else if (value) {
            options.add(value);
        }
    });
    return Array.from(options).sort();
};

const products = [
    // ... (Your products array is correctly defined here)
    {
        id: 1,
        name: "Diamond Solitaire Ring",
        price: "$299",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761142300/p1_fznogt.jpg",
        badge: "New",
        description: "Classic 18k white gold with a brilliant diamond.",
        type: "Rings",
        material: ["Diamond", "Gold", "Fine Jewelry"],
        collection: ["Bridal & Wedding", "Gifts"]
    },
    {
        id: 2,
        name: "Pearl Drop Earrings",
        price: "$199",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761142301/p2_exmcft.jpg",
        badge: "Hot",
        description: "Elegant, delicate pearl earrings.",
        type: "Earrings",
        material: ["Pearls", "Gold Vermeil & Plated"],
        collection: ["Everyday Essentials", "Gifts"]
    },
    {
        id: 3,
        name: "Gold Figaro Necklace",
        price: "$499",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761142304/p3_u2ncyu.jpg",
        description: "Thick 14k gold chain, perfect for layering.",
        type: "Necklaces & Pendants",
        material: ["Gold", "Fine Jewelry"],
        collection: ["Everyday Essentials"]
    },
    {
        id: 4,
        name: "Emerald Cuff Bracelet",
        price: "$750",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761142302/p4_fiuybe.jpg",
        badge: "Limited Edition",
        description: "Striking sterling silver cuff with a raw emerald stone.",
        type: "Bracelets & Bangles",
        material: ["Gemstones (Emerald)", "Sterling Silver", "Demi-Fine Jewelry"],
        collection: ["Statement/Cocktail Wear"]
    },
    {
        id: 5,
        name: "Rose Gold Initial Pendant",
        price: "$120",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761142306/p5_fffbly.jpg",
        description: "Personalized rose gold necklace, a perfect gift.",
        type: "Necklaces & Pendants",
        material: ["Gold Vermeil & Plated"],
        collection: ["Everyday Essentials", "Gifts"]
    },
    {
        id: 6,
        name: "Sapphire Studs",
        price: "$350",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761142306/p6_rlnnq0.jpg",
        badge: "Sale",
        description: "Vibrant blue sapphire studs in a hypoallergenic setting.",
        type: "Earrings",
        material: ["Gemstones (Sapphire)", "Gold", "Fine Jewelry"],
        collection: ["Everyday Essentials", "Gifts"]
    },
    {
        id: 7,
        name: "Silver Bangle Set",
        price: "$150",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761142303/p7_iiouxr.jpg",
        description: "Set of three thin, minimalist sterling silver bangles.",
        type: "Bracelets & Bangles",
        material: ["Sterling Silver", "Demi-Fine Jewelry"],
        collection: ["Everyday Essentials", "Stacking Rings"]
    },
    {
        id: 8,
        name: "Celestial Charm Anklet",
        price: "$75",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761142304/p8_xykmyl.jpg",
        badge: "New",
        description: "Delicate silver anklet with tiny moon and star charms.",
        type: "Anklets & Body Jewelry",
        material: ["Sterling Silver"],
        collection: ["Everyday Essentials"]
    },
    {
        id: 9,
        name: "Ruby Eternity Band",
        price: "$580",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761142305/p9_j9gy5m.jpg",
        description: "A gorgeous band featuring channel-set ruby stones.",
        type: "Rings",
        material: ["Gemstones (Ruby)", "Gold", "Fine Jewelry"],
        collection: ["Bridal & Wedding", "Gifts"]
    },
    {
        id: 10,
        name: "Leather Wrap Bracelet",
        price: "$95",
        imageUrl: "https://images.unsplash.com/photo-1579883584852-5a242c73024c?auto=format&fit=crop&w=400&q=80",
        badge: "Hot",
        description: "Boho-chic bracelet made with genuine leather and metallic accents.",
        type: "Bracelets & Bangles",
        material: ["Fashion/Costume Jewelry"],
        collection: ["Everyday Essentials"]
    },
    {
        id: 11,
        name: "Vintage Cameo Brooch",
        price: "$210",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761142308/p11_rqca3t.jpg",
        badge: "Unique",
        description: "An antique-inspired piece with detailed ivory carving.",
        type: "Anklets & Body Jewelry",
        material: ["Fashion/Costume Jewelry"],
        collection: ["Vintage & Antique Style"]
    },
    {
        id: 12,
        name: "Chunky Chain Ring",
        price: "$85",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761142310/p12_m2whjp.jpg",
        description: "Bold, modern sterling silver link chain ring.",
        type: "Rings",
        material: ["Sterling Silver"],
        collection: ["Statement/Cocktail Wear"]
    },
    {
        id: 13,
        name: "Amethyst Pendant Necklace",
        price: "$175",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761142310/p13_q6piky.jpg",
        badge: "Popular",
        description: "Raw amethyst crystal suspended on a delicate 10k gold chain.",
        type: "Necklaces & Pendants",
        material: ["Gemstones (Amethyst)", "Gold", "Demi-Fine Jewelry"],
        collection: ["Gifts (Birthstones)"]
    },
    {
        id: 14,
        name: "Diamond Tennis Bracelet",
        price: "$1499",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761142316/p14_fvfalh.jpg",
        description: "Luxurious bracelet with a continuous line of brilliant-cut diamonds.",
        type: "Bracelets & Bangles",
        material: ["Diamond", "Fine Jewelry"],
        collection: ["Statement/Cocktail Wear", "Gifts"]
    },
    {
        id: 15,
        name: "Minimalist Bar Studs",
        price: "$45",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761142310/p15_menvol.jpg",
        description: "Small, horizontal gold bar studs for everyday wear.",
        type: "Earrings",
        material: ["Gold Vermeil & Plated"],
        collection: ["Everyday Essentials"]
    },
    {
        id: 16,
        name: "Black Onyx Signet Ring",
        price: "$230",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761142311/p16_qknc1z.jpg",
        badge: "Men's",
        description: "Bold signet ring featuring a polished black onyx inlay.",
        type: "Rings",
        material: ["Sterling Silver", "Gemstones"],
        collection: ["Men's (Cufflinks, Chains)", "Gifts"]
    },
    {
        id: 17,
        name: "Hammered Gold Hoops",
        price: "$89",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761142311/p17_dwh7w6.jpg",
        description: "Medium-sized 18k gold-plated hoops with a hand-hammered finish.",
        type: "Earrings",
        material: ["Gold Vermeil & Plated"],
        collection: ["Everyday Essentials"]
    },
    {
        id: 18,
        name: "Stackable Thin Ring Set",
        price: "$65",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761142313/p18_axwneu.jpg",
        badge: "Hot",
        description: "Set of five ultra-thin rings in mixed metals for stacking.",
        type: "Rings",
        material: ["Gold Vermeil & Plated", "Sterling Silver"],
        collection: ["Everyday Essentials", "Stacking Rings"]
    },
    {
        id: 19,
        name: "Tanzanite Cluster Pendant",
        price: "$620",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761142312/p19_sn5txy.jpg",
        description: "Oval tanzanite gemstone surrounded by a cluster of tiny diamonds.",
        type: "Necklaces & Pendants",
        material: ["Gemstones (Tanzanite)", "Diamond", "Fine Jewelry"],
        collection: ["Statement/Cocktail Wear", "Gifts"]
    },
    {
        id: 20,
        name: "Rope Chain Bracelet",
        price: "$140",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761142314/p20_blszr0.jpg",
        badge: "Best Seller",
        description: "A finely woven gold vermeil rope chain bracelet.",
        type: "Bracelets & Bangles",
        material: ["Gold Vermeil & Plated", "Demi-Fine Jewelry"],
        collection: ["Everyday Essentials"]
    },
    {
        id: 21,
        name: "Evil Eye Charm Necklace",
        price: "$55",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761142314/p21_gtugov.jpg",
        description: "Dainty necklace featuring a protective evil eye charm.",
        type: "Necklaces & Pendants",
        material: ["Fashion/Costume Jewelry"],
        collection: ["Everyday Essentials", "Gifts"]
    },
    {
        id: 22,
        name: "Opal and Fire Ring",
        price: "$310",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761142289/p22_es8ulr.jpg",
        description: "Unique ring with a mesmerizing Australian opal.",
        type: "Rings",
        material: ["Gemstones (Opal)", "Sterling Silver", "Demi-Fine Jewelry"],
        collection: ["Gifts (Birthstones)", "Statement/Cocktail Wear"]
    },
    {
        id: 23,
        name: "Baroque Pearl Tassel Earrings",
        price: "$185",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761142298/p23_opfvba.jpg",
        badge: "Unique",
        description: "Statement earrings with irregular baroque pearls and a gold tassel.",
        type: "Earrings",
        material: ["Pearls", "Gold Vermeil & Plated"],
        collection: ["Statement/Cocktail Wear"]
    },

    {
        id: 24,
        name: "Ruby Radiance Earrings",
        price: "$450",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761210181/p24_ghgkx4.jpg",
        description: "Classic ruby earrings that exude timeless beauty.",
        type: "Earrings",
        material: ["Gemstones (Ruby)", "Fine Jewelry"],
        collection: ["Everyday Essentials", "Statement/Cocktail Wear"]
    },
    {
        id: 25,
        name: "Diamond Bliss Bracelet",
        price: "$780",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761210220/p25_gdbss4.jpg",
        description: "Luxurious bracelet crafted with brilliant-cut diamonds.",
        type: "Bracelets & Bangles",
        material: ["Diamond", "Fine Jewelry"],
        collection: ["Bridal & Wedding", "Gifts"]
    },
    {
        id: 26,
        name: "Sapphire Sky Anklet",
        price: "$270",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761210279/p26_s1qt0w.jpg",
        description: "Charming anklet set with deep-blue sapphire stones.",
        type: "Anklets & Body Jewelry",
        material: ["Gemstones (Sapphire)", "Fashion/Costume Jewelry"],
        collection: ["Everyday Essentials", "Gifts"]
    },
    {
        id: 27,
        name: "Amethyst Aura Pendant",
        price: "$340",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761210267/p27_cmtvic.jpg",
        description: "Radiant amethyst pendant that symbolizes peace and balance.",
        type: "Necklaces & Pendants",
        material: ["Gemstones (Amethyst)", "Fine Jewelry"],
        collection: ["Gifts (Birthstones)", "Everyday Essentials"]
    },
    {
        id: 28,
        name: "Emerald Envy Ring",
        price: "$610",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761210278/p28_hmlitp.jpg",
        description: "A luxury ring featuring a vivid green emerald centerpiece.",
        type: "Rings",
        material: ["Gemstones (Emerald)", "Fine Jewelry"],
        collection: ["Statement/Cocktail Wear", "Bridal & Wedding"]
    },
    {
        id: 29,
        name: "Ruby Charm Bracelet",
        price: "$400",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761210278/p29_wgukxr.jpg",
        description: "Delicate bracelet with ruby charms for a passionate look.",
        type: "Bracelets & Bangles",
        material: ["Gemstones (Ruby)", "Demi-Fine Jewelry"],
        collection: ["Gifts", "Everyday Essentials"]
    },
    {
        id: 30,
        name: "Sapphire Dream Earrings",
        price: "$380",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761210302/p30_qrdxmy.jpg",
        description: "Blue sapphire earrings perfect for elegant evening wear.",
        type: "Earrings",
        material: ["Gemstones (Sapphire)", "Fine Jewelry"],
        collection: ["Statement/Cocktail Wear", "Bridal & Wedding"]
    },
    {
        id: 31,
        name: "Opal Whisper Anklet",
        price: "$290",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761210293/p31_abeweg.jpg",
        description: "Subtle opal anklet with iridescent shimmer for daily wear.",
        type: "Anklets & Body Jewelry",
        material: ["Gemstones (Opal)", "Fashion/Costume Jewelry"],
        collection: ["Everyday Essentials", "Gifts (Birthstones)"]
    },
    {
        id: 32,
        name: "Amethyst Halo Ring",
        price: "$355",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761210279/p32_nled7e.jpg",
        description: "Stunning ring featuring a radiant amethyst surrounded by a silver halo.",
        type: "Rings",
        material: ["Gemstones (Amethyst)", "Sterling Silver", "Demi-Fine Jewelry"],
        collection: ["Gifts (Birthstones)", "Everyday Essentials"]
    },
    {
        id: 33,
        name: "Emerald Horizon Bracelet",
        price: "$490",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761210291/p33_mjsipx.jpg",
        description: "Elegant bracelet showcasing a line of emerald stones set in fine gold.",
        type: "Bracelets & Bangles",
        material: ["Gemstones (Emerald)", "Fine Jewelry"],
        collection: ["Bridal & Wedding", "Statement/Cocktail Wear"]
    },
    {
        id: 34,
        name: "Ruby Cascade Necklace",
        price: "$620",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761210291/p34_vf4bl0.jpg",
        description: "A captivating ruby necklace with a cascading gemstone design.",
        type: "Necklaces & Pendants",
        material: ["Gemstones (Ruby)", "Fine Jewelry"],
        collection: ["Vintage & Antique Style", "Statement/Cocktail Wear"]
    },
    {
        id: 35,
        name: "Sapphire Bloom Earrings",
        price: "$410",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761210290/p35_by2nbx.jpg",
        description: "Floral-inspired sapphire earrings designed for graceful charm.",
        type: "Earrings",
        material: ["Gemstones (Sapphire)", "Demi-Fine Jewelry"],
        collection: ["Everyday Essentials", "Gifts"]
    },
    {
        id: 36,
        name: "Opal Luxe Pendant",
        price: "$330",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761210298/p36_dg57gv.jpg",
        description: "A luxurious opal pendant with gold detailing, symbolizing elegance.",
        type: "Necklaces & Pendants",
        material: ["Gemstones (Opal)", "Fine Jewelry"],
        collection: ["Gifts (Birthstones)", "Bridal & Wedding"]
    },
]


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

    const [_products, setProducts] = useState([]);

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
            const typeMatch = filters.type.length === 0 || filters.type.includes(product.type);
            const materialMatch = filters.material.length === 0 ||
                filters.material.some(filter => product.material.includes(filter));
            const collectionMatch = filters.collection.length === 0 ||
                filters.collection.some(filter => product.collection.includes(filter));

            return typeMatch && materialMatch && collectionMatch;
        });
    }, [activeFilters]);

    // 4. Memoize the unique filter options (Needed by FilterSidebar)
    const availableOptions = useMemo(() => ({
        type: getUniqueOptions(products, 'type'),
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
                                        key={product.id}
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