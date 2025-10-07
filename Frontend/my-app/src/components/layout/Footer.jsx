export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">💎 DIVA</h3>
            <p className="text-gray-400">
              Crafting memories with elegance and shine.  
              Jewellery that defines timeless beauty.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-pink-400">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-pink-400">Home</a></li>
              <li><a href="#" className="hover:text-pink-400">Collections</a></li>
              <li><a href="#" className="hover:text-pink-400">About Us</a></li>
              <li><a href="#" className="hover:text-pink-400">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-pink-400">
              Customer Support
            </h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-pink-400">FAQs</a></li>
              <li><a href="#" className="hover:text-pink-400">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-pink-400">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-pink-400">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} DIVA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
