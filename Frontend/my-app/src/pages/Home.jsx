import { Link } from "react-router-dom";
import { LogIn } from "lucide-react"; //  Import login icon
import image from "../assets/5.jpg";

function Home() {
  return (
    <div className="min-h-screen bg-beige flex flex-col bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 bg-pink-100 shadow-md z-50">
        <div className="mx-auto flex justify-between items-center px-[25px] py-5">
          <h1 className="text-3xl font-serif text-pink-700">💎 DIVA</h1>
          <ul className="flex gap-8 text-gray-700 font-medium items-center">
            <li><Link to="/" className="hover:text-pink-600">Home</Link></li>
            <li><Link to="/product/1" className="hover:text-pink-600">Collections</Link></li>
            <li><a href="#about" className="hover:text-pink-600">About</a></li>
            <li><a href="#contact" className="hover:text-pink-600">Contact</a></li>

            {/* Sign In Button */}
            <li>
              <Link
                to="/login"
                className="flex items-center gap-2 bg-pink-400 text-white px-4 py-2 rounded-full hover:bg-pink-700 transition"
              >
                <LogIn size={18} />
                <span>Sign In</span>
              </Link>
            </li>
          </ul></div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-center text-center md:text-left px-10 pt-32 pb-20 gap-12">
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
        <div className="flex-1">
          <img
            src={image}
            alt="Jewellery Model"
            className="rounded-3xl shadow-xl"
          />
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-16 px-8 bg-pink-50">
        <h3 className="text-4xl font-bold text-center text-gray-800 mb-12">Featured Collections</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          {/* Product Card 1 */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:scale-105 transition">
            <img src="/2.jpg" alt="Diamond Ring" className="w-full h-64 object-cover" />
            <div className="p-6 text-center">
              <h4 className="text-xl font-semibold">Diamond Ring</h4>
              <p className="text-pink-600 font-bold mt-2">₹ 5,60,000</p>
              <Link to="/product/1" className="inline-block mt-4 px-6 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition">View</Link>
            </div>
          </div>

          {/* Product Card 2 */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:scale-105 transition">
            <img src="/1.jpg" alt="Gold Necklace" className="w-full h-64 object-cover" />
            <div className="p-6 text-center">
              <h4 className="text-xl font-semibold">Gold Necklace</h4>
              <p className="text-pink-600 font-bold mt-2">₹ 3,25,000</p>
              <Link to="/product/1" className="inline-block mt-4 px-6 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition">View</Link>
            </div>
          </div>

          {/* Product Card 3 */}
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
      <footer id="contact" className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h4 className="text-xl font-semibold mb-2">💎 DIVA</h4>
          <p className="text-gray-400">Crafting memories with elegance and shine.</p>
          <p className="mt-4 text-gray-400">© {new Date().getFullYear()} DIVA. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}

export default Home;
