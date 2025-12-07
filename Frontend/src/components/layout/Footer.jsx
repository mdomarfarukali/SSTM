import { Link } from "react-router-dom";

import { useTheme } from "../../context/ThemeContext.jsx";
import lightLogo from "/DIVA_LightCut-removebg-preview.png";
import darkLogo from "/DIVA_Cut-removebg-preview.png";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="bg-brand-dark text-brand-primary py-12">
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Info */}
          <div>
            <h3 className="text-4xl text-brand font-serif font-bold ">
              <img
                src={theme === "dark" ? darkLogo : lightLogo}
                alt="DIVA Logo"
                className="w-20 h-20 inline-block mr-2 mb-1"
              />
              DIVA
            </h3>
            <p className="text-brand-muted">
              Crafting memories with elegance and shine.
              Jewellery that defines timeless beauty.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-brand-secondary">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-brand-muted ">Home</Link></li>
              <li><Link to="/products" className="text-brand-muted ">Collections</Link></li>
              <li><Link to="/about" className="text-brand-muted ">About Us</Link></li>
              <li><Link to="/contact" className="text-brand-muted ">Contact</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-brand-secondary">
              Customer Support
            </h4>
            <ul className="space-y-2">
              <li><Link to="/faqs" className="text-brand-muted ">FAQs</Link></li>
              <li><Link to="/shipping-returns" className="text-brand-muted ">Shipping & Returns</Link></li>
              <li><Link to="/privacy-policy" className="text-brand-muted ">Privacy Policy</Link></li>
              <li><Link to="/terms-condition" className="text-brand-muted">Terms & Condition</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-brand-muted pt-6 text-center text-brand-muted text-sm">
          <p>© {new Date().getFullYear()} DIVA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
