import { Link } from "react-router-dom";

function ProductDetails() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50 flex flex-col items-center">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center px-8 py-5 bg-white/80 backdrop-blur-md shadow-md fixed top-0 z-50">
        <h1 className="text-3xl font-serif text-pink-700">💎 DIVA</h1>
        <ul className="flex gap-8 text-gray-700 font-medium">
          <li><Link to="/" className="hover:text-pink-600">Home</Link></li>
          <li><a href="#collections" className="hover:text-pink-600">Collections</a></li>
        </ul>
      </nav>

      {/* Product Section */}
      <section className="flex flex-col md:flex-row items-center gap-12 max-w-6xl p-8 mt-28 bg-white shadow-lg rounded-2xl">
        {/* Product Image */}
        <div className="flex-1">
          <img
            src="https://images.unsplash.com/photo-1600185365483-26d7c0e9d0e7?auto=format&fit=crop&w=800&q=60"
            alt="Diamond Ring"
            className="rounded-xl shadow-md w-full"
          />
        </div>
        
        {/* Product Info */}
        <div className="flex-1 text-left">
          <h2 className="text-4xl font-bold text-gray-800">Diamond Ring</h2>
          <p className="text-pink-600 text-2xl font-semibold mt-2">$299</p>
          <p className="text-gray-600 mt-4">
            A handcrafted diamond ring that symbolizes eternal love.  
            Made with 18k white gold and natural diamonds for unmatched brilliance.
          </p>
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
