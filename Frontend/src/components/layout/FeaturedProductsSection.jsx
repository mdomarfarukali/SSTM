import ProductCard from "./ProductCard";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import axios from "axios";

const FeaturedProductsSection = () => {
    const [category, setCategory] = useState("All Pieces");
    const [saved, setSaved] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const FILTERS = ["All Pieces", "Rings", "Necklaces", "Earrings"];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError("");

                const { data } = await axios.get(
                    "/API/products?page=1&limit=100"
                );

                const allProducts = [...(data.products ?? [])];

                // Shuffle products on each page load.
                for (let i = allProducts.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [allProducts[i], allProducts[j]] = [
                        allProducts[j],
                        allProducts[i],
                    ];
                }

                setProducts(allProducts);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError(
                    err.response?.data?.message ||
                    err.message ||
                    "Unable to load products."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = useMemo(() => {
        if (category === "All Pieces") return products;
        if (category === "Rings") {
            return products.filter((p) => /ring|solitaire/i.test(`${p.name} ${p.category ?? ""}`));
        }
        if (category === "Necklaces") {
            return products.filter((p) => /necklace|pendant/i.test(`${p.name} ${p.category ?? ""}`));
        }
        return products.filter((p) => /earring|stud|jhumka/i.test(`${p.name} ${p.category ?? ""}`));
    }, [category, products]);

    const toggleWishlist = (productId) => {
        setSaved((current) =>
            current.includes(productId)
                ? current.filter((id) => id !== productId)
                : [...current, productId]
        );
    };

    return (
        <section className="diva-featured diva-section" id="featured">
            <div className="diva-featured__head">
                <div>
                    <p className="diva-eyebrow">Haute Curations</p>
                    <h2>Featured Icons &amp; New Arrivals</h2>
                </div>

                <div className="diva-pills" role="group" aria-label="Filter featured products">
                    {FILTERS.map((item) => (
                        <button
                            type="button"
                            key={item}
                            className={category === item ? "is-active" : ""}
                            aria-pressed={category === item}
                            onClick={() => setCategory(item)}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <p className="diva-product-status" role="status">Discovering your pieces…</p>
            ) : error ? (
                <p className="diva-product-status" role="alert">{error}</p>
            ) : filteredProducts.length === 0 ? (
                <p className="diva-product-status">No pieces found in this category yet.</p>
            ) : (
                <div className="diva-pgrid">
                    {filteredProducts.slice(0, 4).map((product) => (
                        <ProductCard
                            key={product._id}
                            product={{
                                ...product,
                                detail: product.description ?? product.material ?? "",
                                material: product.material ?? "",
                                price: product.finalPrice ?? product.price,
                                image:
                                    product.thumbnail ??
                                    (Array.isArray(product.images)
                                        ? product.images[0]
                                        : product.images) ??
                                    "",
                                path: `/products/${product.slug ?? product._id}`,
                                badge: product.isNewArrival
                                    ? "New Arrival"
                                    : product.isBestSeller
                                        ? "Best Seller"
                                        : "",
                            }}
                            isSaved={saved.includes(product._id ?? product.id ?? product.slug)}
                            onAddToWishlist={() =>
                                toggleWishlist(product._id ?? product.id ?? product.slug)
                            }
                        />
                    ))}
                </div>
            )}

            <div className="diva-featured__footer">
                <Link className="diva-outline-cta" to="/products">
                    Discover complete collection <ArrowRight size={15} aria-hidden="true" />
                </Link>
            </div>

            {saved.length > 0 && (
                <p className="diva-saved-feedback" role="status">
                    {saved.length} {saved.length === 1 ? "piece" : "pieces"} saved for this browsing session.
                    Sign in to keep your wishlist across devices.
                </p>
            )}
        </section>
    );
}


export default FeaturedProductsSection;