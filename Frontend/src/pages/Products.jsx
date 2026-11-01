
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Grid3X3,
    Columns3,
    Diamond,
    RotateCcw,
    Check,
    ShieldCheck,
    Truck,
    Infinity as InfinityIcon,
    Gem,
} from "lucide-react";

import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/common/LoadingSpinner.jsx";
import "./Products.css";

const PAGE_SIZE = 12;

const METAL_PATTERN =
    /gold|platinum|silver|titanium|steel|metal|palladium/i;

const splitMaterial = (value) => {
    if (Array.isArray(value)) {
        return value.flatMap(splitMaterial);
    }

    if (!value || typeof value !== "string") return [];

    return value
        .split(/[•,|/]/)
        .map((item) => item.trim())
        .filter(Boolean);
};

const getProductMaterial = (product) => {
    return splitMaterial(product.material);
};

const getProductMetals = (product) => {
    return getProductMaterial(product).filter((item) =>
        METAL_PATTERN.test(item)
    );
};

const getProductGemstones = (product) => {
    const explicitStone =
        product.gemstone ||
        product.gemstones ||
        product.stone;

    const stones = [
        ...splitMaterial(explicitStone),
        ...getProductMaterial(product).filter(
            (item) => !METAL_PATTERN.test(item)
        ),
    ];

    return [...new Set(stones)];
};

const getPrice = (product) =>
    Number(product.finalPrice ?? product.price ?? 0);

const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(price);

const getUniqueValues = (products, getter) => {
    return [
        ...new Set(
            products.flatMap((product) => getter(product))
        ),
    ].sort((a, b) => a.localeCompare(b));
};

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [activeCategory, setActiveCategory] = useState("all");
    const [selectedMetals, setSelectedMetals] = useState([]);
    const [selectedGemstones, setSelectedGemstones] = useState([]);
    const [inStockOnly, setInStockOnly] = useState(false);

    const [priceCeiling, setPriceCeiling] = useState(null);
    const [openFilter, setOpenFilter] = useState(null);

    const [sortBy, setSortBy] = useState("featured");
    const [gridColumns, setGridColumns] = useState(4);

    const [currentPage, setCurrentPage] = useState(1);
    const [showAll, setShowAll] = useState(false);

    // Fetch products from your existing backend.
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError("");

                const { data } = await axios.get(
                    "/API/products?page=1&limit=100"
                );

                setProducts(
                    Array.isArray(data.products)
                        ? data.products
                        : []
                );
            } catch (err) {
                console.error("Error fetching products:", err);
                setError(
                    err.response?.data?.message ||
                    "We couldn't load the collection. Please try again."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Dynamic category, metal and gemstone options.
    const categories = useMemo(
        () =>
            getUniqueValues(products, (product) =>
                product.category ? [product.category] : []
            ),
        [products]
    );

    const metals = useMemo(
        () => getUniqueValues(products, getProductMetals),
        [products]
    );

    const gemstones = useMemo(
        () => getUniqueValues(products, getProductGemstones),
        [products]
    );

    const priceBounds = useMemo(() => {
        const prices = products.map(getPrice).filter((price) => price > 0);

        return {
            min: prices.length ? Math.min(...prices) : 0,
            max: prices.length ? Math.max(...prices) : 0,
        };
    }, [products]);

    useEffect(() => {
        if (priceBounds.max > 0) {
            setPriceCeiling(priceBounds.max);
        }
    }, [priceBounds.max]);

    const categoryCounts = useMemo(() => {
        const counts = {};

        products.forEach((product) => {
            const category = product.category;
            if (category) {
                counts[category] = (counts[category] || 0) + 1;
            }
        });

        return counts;
    }, [products]);

    // Toggle multi-select filters.
    const toggleSelection = (value, setter) => {
        setter((previous) =>
            previous.includes(value)
                ? previous.filter((item) => item !== value)
                : [...previous, value]
        );

        setCurrentPage(1);
        setShowAll(false);
    };

    // Apply all filters.
    const filteredProducts = useMemo(() => {
        let result = products.filter((product) => {
            const categoryMatch =
                activeCategory === "all" ||
                product.category === activeCategory;

            const productMetals = getProductMetals(product);
            const metalMatch =
                selectedMetals.length === 0 ||
                selectedMetals.some((metal) =>
                    productMetals.includes(metal)
                );

            const productGemstones = getProductGemstones(product);
            const gemstoneMatch =
                selectedGemstones.length === 0 ||
                selectedGemstones.some((stone) =>
                    productGemstones.includes(stone)
                );

            const price = getPrice(product);
            const priceMatch =
                priceCeiling === null ||
                price <= priceCeiling;

            const stockMatch =
                !inStockOnly || product.inStock === true;

            return (
                categoryMatch &&
                metalMatch &&
                gemstoneMatch &&
                priceMatch &&
                stockMatch
            );
        });

        // Sorting.
        switch (sortBy) {
            case "newest":
                result = [...result].sort(
                    (a, b) =>
                        new Date(b.createdAt || 0) -
                        new Date(a.createdAt || 0)
                );
                break;

            case "price-low":
                result = [...result].sort(
                    (a, b) => getPrice(a) - getPrice(b)
                );
                break;

            case "price-high":
                result = [...result].sort(
                    (a, b) => getPrice(b) - getPrice(a)
                );
                break;

            case "name":
                result = [...result].sort((a, b) =>
                    (a.name || "").localeCompare(b.name || "")
                );
                break;

            default:
                result = [...result].sort((a, b) => {
                    const score = (product) =>
                        Number(product.isFeatured) * 4 +
                        Number(product.isBestSeller) * 2 +
                        Number(product.isNewArrival);

                    return score(b) - score(a);
                });
        }

        return result;
    }, [
        products,
        activeCategory,
        selectedMetals,
        selectedGemstones,
        priceCeiling,
        inStockOnly,
        sortBy,
    ]);

    // Reset pagination whenever filters change.
    useEffect(() => {
        setCurrentPage(1);
    }, [
        activeCategory,
        selectedMetals,
        selectedGemstones,
        priceCeiling,
        inStockOnly,
        sortBy,
    ]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredProducts.length / PAGE_SIZE)
    );

    const visibleCount = showAll
        ? filteredProducts.length
        : Math.min(currentPage * PAGE_SIZE, filteredProducts.length);

    const displayedProducts = showAll
        ? filteredProducts
        : filteredProducts.slice(
            (currentPage - 1) * PAGE_SIZE,
            currentPage * PAGE_SIZE
        );

    const pageProducts = showAll
        ? displayedProducts
        : displayedProducts;

    const hasActiveFilters =
        activeCategory !== "all" ||
        selectedMetals.length > 0 ||
        selectedGemstones.length > 0 ||
        inStockOnly ||
        (priceCeiling !== null &&
            priceBounds.max > 0 &&
            priceCeiling < priceBounds.max);

    const clearFilters = () => {
        setActiveCategory("all");
        setSelectedMetals([]);
        setSelectedGemstones([]);
        setInStockOnly(false);
        setPriceCeiling(priceBounds.max || null);
        setSortBy("featured");
        setCurrentPage(1);
        setShowAll(false);
        setOpenFilter(null);
    };

    const toggleFilter = (filter) => {
        setOpenFilter((previous) =>
            previous === filter ? null : filter
        );
    };

    const goToPage = (page) => {
        setCurrentPage(Math.min(Math.max(page, 1), totalPages));
        setShowAll(false);

        document
            .getElementById("products-grid")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <main className="diva-products-page">
                <div className="diva-products-error">
                    <Diamond size={32} />
                    <h2>Our collection is taking a moment.</h2>
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()}>
                        Try Again
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="diva-products-page">
            {/* COLLECTION INTRODUCTION */}
            <section className="diva-collection-intro">
                <nav className="diva-breadcrumb" aria-label="Breadcrumb">
                    <a href="/">Maison</a>
                    <span>/</span>
                    <span>Collections</span>
                    <span>/</span>
                    <strong>Fine Jewellery</strong>
                </nav>

                <div className="diva-collection-heading">
                    <div className="diva-collection-copy">
                        <div className="diva-eyebrow">
                            <span />
                            Haute Joaillerie Atelier
                        </div>

                        <h1>Fine Jewellery Creations</h1>

                        <p>
                            Meticulously handcrafted in precious metals
                            and exceptional gemstones. Discover timeless
                            creations designed for effortless brilliance
                            and heirloom endurance.
                        </p>
                    </div>

                    <div className="diva-curation-index">
                        <div className="diva-index-icon">
                            <Diamond size={21} />
                        </div>

                        <div>
                            <span>Curation Index</span>
                            <strong>
                                {filteredProducts.length} Masterworks
                            </strong>
                        </div>
                    </div>
                </div>

                {/* CATEGORY PILLS */}
                <div className="diva-category-pills">
                    <button
                        className={
                            activeCategory === "all" ? "active" : ""
                        }
                        onClick={() => setActiveCategory("all")}
                    >
                        All Pieces ({products.length})
                    </button>

                    {categories.map((category) => (
                        <button
                            key={category}
                            className={
                                activeCategory === category ? "active" : ""
                            }
                            onClick={() => setActiveCategory(category)}
                        >
                            {category} ({categoryCounts[category]})
                        </button>
                    ))}
                </div>
            </section>

            {/* FILTER AND SORT CONTROLS */}
            <section className="diva-filter-section">
                <div className="diva-filter-panel">
                    <div className="diva-filter-top">
                        <div className="diva-filter-controls">

                            {/* METAL FILTER */}
                            {/* <div className="diva-filter-wrap"> */}
                            <div
                                className="diva-filter-wrap"
                                // onMouseEnter={() => setOpenFilter("metal")}
                                // onMouseLeave={() => setOpenFilter(null)}
                                onPointerEnter={(event) => {
                                    if (event.pointerType === "mouse") {
                                        setOpenFilter("metal");
                                    }
                                }}
                                onPointerLeave={(event) => {
                                    if (event.pointerType === "mouse") {
                                        setOpenFilter(null);
                                    }
                                }}
                            >
                                <button
                                    className="diva-filter-pill"
                                    onClick={() => toggleFilter("metal")}
                                    aria-expanded={openFilter === "metal"}
                                >
                                    Metal
                                    <span className="diva-filter-selection">
                                        {selectedMetals.length
                                            ? `${selectedMetals.length} selected`
                                            : "All Metals"}
                                    </span>
                                    <ChevronDown size={15} />
                                </button>

                                {openFilter === "metal" && (
                                    <div className="diva-filter-dropdown">
                                        <p className="diva-dropdown-title">
                                            Select Metal
                                        </p>

                                        {metals.length ? (
                                            metals.map((metal) => (
                                                <label key={metal}>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedMetals.includes(metal)}
                                                        onChange={() =>
                                                            toggleSelection(
                                                                metal,
                                                                setSelectedMetals
                                                            )
                                                        }
                                                    />
                                                    <span className="diva-checkmark">
                                                        {selectedMetals.includes(metal) && (
                                                            <Check size={12} />
                                                        )}
                                                    </span>
                                                    {metal}
                                                </label>
                                            ))
                                        ) : (
                                            <p className="diva-empty-filter">
                                                No metal data available.
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* GEMSTONE FILTER */}
                            {/* <div className="diva-filter-wrap"> */}
                            <div
                                className="diva-filter-wrap"
                                // onMouseEnter={() => setOpenFilter("gemstone")}
                                // onMouseLeave={() => setOpenFilter(null)}
                                onPointerEnter={(event) => {
                                    if (event.pointerType === "mouse") {
                                        setOpenFilter("gemstone");
                                    }
                                }}
                                onPointerLeave={(event) => {
                                    if (event.pointerType === "mouse") {
                                        setOpenFilter(null);
                                    }
                                }}
                            >
                                <button
                                    className="diva-filter-pill"
                                    onClick={() => toggleFilter("gemstone")}
                                    aria-expanded={openFilter === "gemstone"}
                                >
                                    Gemstone
                                    <ChevronDown size={15} />
                                </button>

                                {openFilter === "gemstone" && (
                                    <div className="diva-filter-dropdown">
                                        <p className="diva-dropdown-title">
                                            Select Gemstone
                                        </p>

                                        {gemstones.length ? (
                                            gemstones.map((stone) => (
                                                <label key={stone}>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedGemstones.includes(stone)}
                                                        onChange={() =>
                                                            toggleSelection(
                                                                stone,
                                                                setSelectedGemstones
                                                            )
                                                        }
                                                    />
                                                    <span className="diva-checkmark">
                                                        {selectedGemstones.includes(stone) && (
                                                            <Check size={12} />
                                                        )}
                                                    </span>
                                                    {stone}
                                                </label>
                                            ))
                                        ) : (
                                            <p className="diva-empty-filter">
                                                No gemstone data available.
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* PRICE FILTER */}
                            {/* <div className="diva-filter-wrap"> */}
                            <div
                                className="diva-filter-wrap"
                                // onMouseEnter={() => setOpenFilter("price")}
                                // onMouseLeave={() => setOpenFilter(null)}
                                onPointerEnter={(event) => {
                                    if (event.pointerType === "mouse") {
                                        setOpenFilter("price");
                                    }
                                }}
                                onPointerLeave={(event) => {
                                    if (event.pointerType === "mouse") {
                                        setOpenFilter(null);
                                    }
                                }}
                            >
                                <button
                                    className="diva-filter-pill"
                                    onClick={() => toggleFilter("price")}
                                    aria-expanded={openFilter === "price"}
                                >
                                    Price Range
                                    <ChevronDown size={15} />
                                </button>

                                {openFilter === "price" && (
                                    <div className="diva-filter-dropdown diva-price-dropdown">
                                        <p className="diva-dropdown-title">
                                            Maximum Price
                                        </p>

                                        <strong>
                                            {formatPrice(priceCeiling ?? priceBounds.max)}
                                        </strong>

                                        <input
                                            type="range"
                                            min={priceBounds.min}
                                            max={priceBounds.max || 1}
                                            step={Math.max(
                                                1,
                                                Math.round(
                                                    (priceBounds.max - priceBounds.min) / 100
                                                )
                                            )}
                                            value={priceCeiling ?? priceBounds.max}
                                            onChange={(event) => {
                                                setPriceCeiling(Number(event.target.value));
                                                setCurrentPage(1);
                                                setShowAll(false);
                                            }}
                                        />

                                        <div className="diva-price-range-labels">
                                            <span>{formatPrice(priceBounds.min)}</span>
                                            <span>{formatPrice(priceBounds.max)}</span>
                                        </div>

                                        <button
                                            className="diva-dropdown-reset"
                                            onClick={() => {
                                                setPriceCeiling(priceBounds.max);
                                                setOpenFilter(null);
                                            }}
                                        >
                                            Reset Price
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* STOCK FILTER */}
                            <button
                                className={`diva-filter-pill diva-stock-pill ${inStockOnly ? "selected" : ""
                                    }`}
                                onClick={() => setInStockOnly((previous) => !previous)}
                                aria-pressed={inStockOnly}
                            >
                                In Atelier Today
                                <span className="diva-stock-dot" />
                            </button>
                        </div>

                        {/* GRID DENSITY AND SORT */}
                        <div className="diva-sort-controls">
                            <div className="diva-grid-switch">
                                <button
                                    aria-label="Four column grid"
                                    className={gridColumns === 4 ? "active" : ""}
                                    onClick={() => setGridColumns(4)}
                                >
                                    <Grid3X3 size={17} />
                                </button>

                                <button
                                    aria-label="Three column grid"
                                    className={gridColumns === 3 ? "active" : ""}
                                    onClick={() => setGridColumns(3)}
                                >
                                    <Columns3 size={17} />
                                </button>
                            </div>

                            <label className="diva-sort-select">
                                <span>Sort:</span>
                                <select
                                    value={sortBy}
                                    onChange={(event) => setSortBy(event.target.value)}
                                >
                                    <option value="featured">Featured &amp; Curated</option>
                                    <option value="newest">Newest Creations</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="name">Name: A to Z</option>
                                </select>
                                <ChevronDown size={14} />
                            </label>
                        </div>
                    </div>

                    {/* ACTIVE FILTER RIBBON */}
                    <div className="diva-active-filters">
                        <span className="diva-active-label">Active View:</span>

                        <span className="diva-active-chip">
                            Collection: {activeCategory === "all" ? "All Masterworks" : activeCategory}
                        </span>

                        {inStockOnly && (
                            <span className="diva-active-chip">
                                In Stock &amp; Atelier Ready
                            </span>
                        )}

                        {selectedMetals.map((metal) => (
                            <button
                                key={metal}
                                className="diva-active-chip removable"
                                onClick={() => toggleSelection(metal, setSelectedMetals)}
                            >
                                {metal} ×
                            </button>
                        ))}

                        {selectedGemstones.map((stone) => (
                            <button
                                key={stone}
                                className="diva-active-chip removable"
                                onClick={() => toggleSelection(stone, setSelectedGemstones)}
                            >
                                {stone} ×
                            </button>
                        ))}

                        {hasActiveFilters && (
                            <button
                                className="diva-reset-filters"
                                onClick={clearFilters}
                            >
                                <RotateCcw size={12} />
                                Reset Filters
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* PRODUCT COLLECTION */}
            <section
                className="diva-product-section"
                id="products-grid"
            >
                {pageProducts.length > 0 ? (
                    <div
                        className={`diva-product-grid columns-${gridColumns}`}
                    >
                        {pageProducts.map((product, index) => (
                            <React.Fragment key={product._id || product.id}>
                                {index === 8 && currentPage === 1 && !showAll && (
                                    <div className="diva-atelier-banner">
                                        <div className="diva-atelier-emblem">
                                            <Gem size={34} />
                                            <span>DIVA</span>
                                            <small>Maison</small>
                                        </div>

                                        <div className="diva-atelier-copy">
                                            <div className="diva-eyebrow">
                                                The Private Salon
                                                <span />
                                                Bespoke Orders
                                            </div>

                                            <h2>
                                                Bespoke Commissions &amp; Custom Sizing
                                            </h2>

                                            <p>
                                                Every love story and milestone is
                                                singular. Explore personalized
                                                creations and discover the art of
                                                jewellery crafted around you.
                                            </p>
                                        </div>

                                        <div className="diva-atelier-actions">
                                            <a href="/contact">
                                                Consult Our Atelier
                                            </a>
                                            <a href="/collections">
                                                Explore Collections
                                            </a>
                                        </div>
                                    </div>
                                )}

                                <ProductCard
                                    product={product}
                                    index={index}
                                />
                            </React.Fragment>
                        ))}
                    </div>
                ) : (
                    <div className="diva-empty-state">
                        <Diamond size={35} />
                        <h2>No creations found</h2>
                        <p>
                            We couldn't find pieces matching your current
                            selections.
                        </p>
                        <button onClick={clearFilters}>
                            Explore All Creations
                        </button>
                    </div>
                )}
            </section>

            {/* PAGINATION */}
            {filteredProducts.length > PAGE_SIZE && !showAll && (
                <section className="diva-pagination-section">
                    <div className="diva-progress">
                        <div className="diva-progress-labels">
                            <span>
                                Displaying {visibleCount} of {filteredProducts.length} Curated Creations
                            </span>
                            <strong>
                                {Math.round(
                                    (visibleCount / filteredProducts.length) * 100
                                )}%
                            </strong>
                        </div>

                        <div className="diva-progress-track">
                            <div
                                style={{
                                    width: `${(visibleCount / filteredProducts.length) * 100
                                        }%`,
                                }}
                            />
                        </div>
                    </div>

                    <div className="diva-pagination">
                        <button
                            aria-label="Previous page"
                            disabled={currentPage === 1}
                            onClick={() => goToPage(currentPage - 1)}
                        >
                            <ChevronLeft size={18} />
                        </button>

                        {Array.from(
                            { length: totalPages },
                            (_, index) => index + 1
                        ).map((page) => (
                            <button
                                key={page}
                                className={currentPage === page ? "active" : ""}
                                onClick={() => goToPage(page)}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            aria-label="Next page"
                            disabled={currentPage === totalPages}
                            onClick={() => goToPage(currentPage + 1)}
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>

                    <button
                        className="diva-load-all"
                        onClick={() => setShowAll(true)}
                    >
                        Load All {filteredProducts.length} Creations
                    </button>
                </section>
            )}

            {showAll && filteredProducts.length > PAGE_SIZE && (
                <div className="diva-show-less">
                    <button
                        onClick={() => {
                            setShowAll(false);
                            setCurrentPage(1);
                        }}
                    >
                        Show Paginated Collection
                    </button>
                </div>
            )}

            {/* ATELIER ASSURANCES */}
            <section className="diva-assurances">
                <div className="diva-assurance-item">
                    <span><ShieldCheck size={23} /></span>
                    <div>
                        <h3>Certified Natural Gems</h3>
                        <p>Carefully selected gemstones and materials.</p>
                    </div>
                </div>

                <div className="diva-assurance-item">
                    <span><Gem size={23} /></span>
                    <div>
                        <h3>Considered Craftsmanship</h3>
                        <p>Thoughtfully crafted jewellery, made to endure.</p>
                    </div>
                </div>

                <div className="diva-assurance-item">
                    <span><Truck size={23} /></span>
                    <div>
                        <h3>Insured Delivery</h3>
                        <p>Secure handling from our atelier to your door.</p>
                    </div>
                </div>

                <div className="diva-assurance-item">
                    <span><InfinityIcon size={23} /></span>
                    <div>
                        <h3>Timeless Care</h3>
                        <p>Support to help your pieces last a lifetime.</p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Products;

