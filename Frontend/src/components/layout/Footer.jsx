export default function Footer() {
  return (
    <footer className="bg-gray-900 ">
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Info */}
          <div>
            <h3 className="text-2xl text-brand-highlight font-bold mb-4">💎 DIVA</h3>
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
              <li><a href="#" className="text-brand-muted ">Home</a></li>
              <li><a href="#" className="text-brand-muted ">Collections</a></li>
              <li><a href="#" className="text-brand-muted ">About Us</a></li>
              <li><a href="#" className="text-brand-muted ">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-brand-secondary">
              Customer Support
            </h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-brand-muted ">FAQs</a></li>
              <li><a href="#" className="text-brand-muted ">Shipping & Returns</a></li>
              <li><a href="#" className="text-brand-muted ">Privacy Policy</a></li>
              <li><a href="#" className="text-brand-muted">Terms & Conditions</a></li>
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
