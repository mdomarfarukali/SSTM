import { Link } from "react-router-dom";
import { LogIn } from "lucide-react";
import model1 from "../assets/5.jpg";
import { useState, useEffect } from "react";
import model2 from "../assets/6.jpg";
import model3 from "../assets/7.jpg";
import model4 from "../assets/8.jpg";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const modelImages = [model1, model2, model3, model4];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToNextSlide = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % modelImages.length);
      setIsFading(false);
    }, 500);
  };

  const goToPrevSlide = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? modelImages.length - 1 : prevIndex - 1
      );
      setIsFading(false);
    }, 500);
  };

  const goToSlide = (index) => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentImageIndex(index);
      setIsFading(false);
    }, 500);
  };

  return (
    <>
      {/* Body Content */}
      <div className="min-h-screen bg-beige flex flex-col">
        {/* Navbar */}
        <nav className="fixed top-0 inset-x-0 bg-pink-100 shadow-md z-50">
          <div className="mx-auto flex flex-col md:flex-row justify-between items-center px-[25px] py-5 gap-4 md:gap-0">
            <h1 className="text-3xl font-serif text-pink-700">💎 DIVA</h1>

            {/* 🔍 Search Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log("Searching:", searchQuery);
              }}
              className="w-full md:w-1/3"
            >
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-full border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 text-black"
              />
            </form>

            {/* Navigation Links */}
            <ul className="flex gap-6 text-gray-700 font-medium items-center">
              <li><Link to="/" className="hover:text-pink-600">Home</Link></li>
              <li><Link to="/product/1" className="hover:text-pink-600">Collections</Link></li>
              <li><a href="#about" className="hover:text-pink-600">About</a></li>
              <li><a href="#contact" className="hover:text-pink-600">Contact</a></li>
              <li>
                <Link
                  to="/login"
                  className="flex items-center gap-2 bg-pink-400 text-white px-4 py-2 rounded-full hover:bg-pink-700 transition"
                >
                  <LogIn size={18} />
                  <span>Sign In</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center justify-center text-center md:text-left px-40 pt-40 pb-20 gap-0 bg-white">
          <div className="flex-1">
            <h2 className="text-6xl font-bold text-gray-900 leading-snug">
              Timeless <span className="text-pink-600">Jewellery</span> for Every Occasion
            </h2>
            <p className="text-gray-600 mt-6 text-lg max-w-md">
              Explore rings, necklaces, and bangles designed with passion, elegance, and luxury.
              A sparkle that stays forever ✨
            </p>
            <div className="mt-8">
              <Link to="/product/1">
                <button className="px-8 py-3 bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 text-white font-semibold rounded-full shadow-lg hover:opacity-90 transition">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
          <div
            className="flex-1 relative"
            // className="flex-1 relative  h-[600px] w-[600px]"
          >
            <img
              src={modelImages[currentImageIndex]}
              alt="Jewellery Model"
              className={`rounded-3xl shadow-xl w-[800px] h-[800px] object-cover transition-opacity duration-500 ease-in-out ${isFading ? "opacity-0" : "opacity-100"
                }`}
            />
            {/* Navigation Buttons */}
            <button
              onClick={goToPrevSlide}
              className="absolute top-1/2 left-10 transform -translate-y-1/2 bg-white/70 hover:bg-white text-pink-700 p-2 rounded-full shadow-md transition"
            >
              ‹
            </button>
            <button
              onClick={goToNextSlide}
              className="absolute top-1/2 right-10 transform -translate-y-1/2 bg-white/70 hover:bg-white text-pink-700 p-2 rounded-full shadow-md transition"
            >
              ›
            </button>
            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
              {modelImages.map((_, index) => (
                <span
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`inline-block rounded-full cursor-pointer border border-pink-600 transition-all duration-300 ${index === currentImageIndex
                    ? "w-4 h-4 bg-pink-600 scale-110 animate-pulse"
                    : "w-3 h-3 bg-white scale-100"
                    }`}
                ></span>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Collections */}
        <section className="py-16 px-8 bg-pink-50">
          <h3 className="text-4xl font-bold text-center text-gray-800 mb-12">Featured Collections</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {/* Product Cards */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:scale-105 transition">
              <img src="/2.jpg" alt="Diamond Ring" className="w-full h-64 object-cover" />
              <div className="p-6 text-center">
                <h4 className="text-xl font-semibold">Diamond Ring</h4>
                <p className="text-pink-600 font-bold mt-2">₹ 5,60,000</p>
                <Link to="/product/1" className="inline-block mt-4 px-6 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition">View</Link>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:scale-105 transition">
              <img src="/1.jpg" alt="Gold Necklace" className="w-full h-64 object-cover" />
              <div className="p-6 text-center">
                <h4 className="text-xl font-semibold">Gold Necklace</h4>
                <p className="text-pink-600 font-bold mt-2">₹ 3,25,000</p>
                <Link to="/product/1" className="inline-block mt-4 px-6 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition">View</Link>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:scale-105 transition">
              <img src="/3.jpg" alt="Bracelet" className="w-full h-64 object-cover" />
              <div className="p-6 text-center">
                <h4 className="text-xl font-semibold">Elegant Bracelet</h4>
                <p className="text-pink-600 font-bold mt-2">₹ 35,000</p>
                <Link to="/product/1" className="inline-block mt-4 px-6 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition">View</Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer OUTSIDE of body */}
      <footer id="contact" className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <div className="flex items-center space-x-2 mb-4">
                {/* Logo + About */}
                {/* <img src={logo} className="h-10 w-15"/> */}
                <h3 className="font-laila text-2xl font-bold">💎 DIVA</h3>
                {/* <h4 className="text-2xl font-semibold mb-3">💎 DIVA</h4> */}
                {/* <p className="text-gray-400">
                    Crafting memories with elegance and shine.
                    Jewellery that defines timeless beauty.
                  </p> */}
              </div>
              <p className="text-gray-300 pr-8">Crafting memories with elegance and shine.
                Jewellery that defines timeless beauty.</p>
            </div>
            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h4 className="font-semibold text-lg mb-4 text-brand-yellow">Quick Links</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-300 hover:text-white">Home</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Collections</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">About Us</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-4 text-brand-yellow">Customer Support</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-300 hover:text-white">FAQs</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Shipping & Returns</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Terms & Conditions</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>© {new Date().getFullYear()} DIVA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;