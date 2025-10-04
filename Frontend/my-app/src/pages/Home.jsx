import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

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

  // Auto-slide effect
  useEffect(() => {
    if (!product || !product.images) return;
    const interval = setInterval(() => {
      goToNextSlide();
    }, 5000); // 5 seconds
    return () => clearInterval(interval);
  }, [product, currentImageIndex]);

  // Carousel functions
  const goToNextSlide = () => {
    if (!product) return;
    setIsFading(true);
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex + 1 >= product.images.length ? 0 : prevIndex + 1
      );
      setIsFading(false);
    }, 300);
  };

  const goToPrevSlide = () => {
    if (!product) return;
    setIsFading(true);
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
      );
      setIsFading(false);
    }, 300);
  };

  const goToSlide = (index) => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentImageIndex(index);
      setIsFading(false);
    }, 300);
  };

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
        {/* Product Carousel */}
        <div className="flex-1 relative">
          <img
            src={product.images[currentImageIndex] || "https://via.placeholder.com/600"}
            alt={product.name}
            className={`rounded-xl shadow-md w-full object-cover transition-opacity duration-500 ease-in-out ${
              isFading ? "opacity-0" : "opacity-100"
            }`}
          />
          {/* Prev/Next Buttons */}
          <button
            onClick={goToPrevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/70 hover:bg-white text-pink-700 p-2 rounded-full shadow-md transition"
          >
            ‹
          </button>
          <button
            onClick={goToNextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/70 hover:bg-white text-pink-700 p-2 rounded-full shadow-md transition"
          >
            ›
          </button>
          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
            {product.images.map((_, index) => (
              <span
                key={index}
                onClick={() => goToSlide(index)}
                className={`inline-block rounded-full cursor-pointer border border-pink-600 transition-all duration-300 ${
                  index === currentImageIndex
                    ? "w-4 h-4 bg-pink-600 scale-110 animate-pulse"
                    : "w-3 h-3 bg-white scale-100"
                }`}
              ></span>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 text-left">
          <h2 className="text-4xl font-bold text-gray-800">{product.name}</h2>
          <p className="text-pink-600 text-2xl font-semibold mt-2">₹ {product.price}</p>
          <p className="text-gray-600 mt-4">{product.description}</p>

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
