import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");

        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
        setError("Product not found or server error.");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-pink-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <p className="text-red-500 text-xl font-semibold mb-4">{error}</p>
        <Link
          to="/"
          className="px-6 py-3 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition"
        >
          Go Back Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50 flex flex-col items-center">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center px-8 py-5 bg-white/80 backdrop-blur-md shadow-md fixed top-0 z-50">
        <h1 className="text-3xl font-serif text-pink-700">💎 DIVA</h1>
        <ul className="flex gap-8 text-gray-700 font-medium">
          <li>
            <Link to="/" className="hover:text-pink-600">
              Home
            </Link>
          </li>
          <li>
            <a href="#collections" className="hover:text-pink-600">
              Collections
            </a>
          </li>
        </ul>
      </nav>

      {/* Product Section */}
      <section className="flex flex-col md:flex-row items-center gap-12 max-w-6xl p-8 mt-28 bg-white shadow-lg rounded-2xl">
        {/* Product Image */}
        <div className="flex-1">
          <img
            src={product?.image || "https://via.placeholder.com/600x600"}
            alt={product?.name || "Product Image"}
            className="rounded-xl shadow-md w-full"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 text-left">
          <h2 className="text-4xl font-bold text-gray-800">{product?.name}</h2>
          <p className="text-pink-600 text-2xl font-semibold mt-2">₹ {product?.price}</p>
          <p className="text-gray-600 mt-4">{product?.description}</p>

          <div className="flex gap-4 mt-6">
            <button className="px-6 py-3 bg-pink-600 text-white font-semibold rounded-full shadow-lg hover:bg-pink-700 transition">
              Add to Cart
            </button>
            <button className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-full hover:bg-gray-300 transition">
              Buy Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetails;
