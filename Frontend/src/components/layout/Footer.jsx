import { Link } from "react-router-dom";

import { useTheme } from "../../context/ThemeContext.jsx";
import lightLogo from "/DIVA_LightCut-removebg-preview.png";
import darkLogo from "/DIVA_Cut-removebg-preview.png";

// export default function Footer() {
//     const { theme } = useTheme();

//     return (
//         <footer className="bg-brand-dark text-brand-primary py-12">
//             <div className="container mx-auto px-6 lg:px-12 py-16">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
//                     {/* Brand Info */}
//                     <div>
//                         <h3 className="text-4xl text-brand font-serif font-bold ">
//                             <img
//                                 src={theme === "dark" ? darkLogo : lightLogo}
//                                 alt="DIVA Logo"
//                                 className="w-20 h-20 inline-block mr-2 mb-1"
//                             />
//                             DIVA
//                         </h3>
//                         <p className="text-brand-muted">
//                             Crafting memories with elegance and shine.
//                             Jewellery that defines timeless beauty.
//                         </p>
//                     </div>

//                     {/* Quick Links */}
//                     <div>
//                         <h4 className="font-semibold text-lg mb-4 text-brand-secondary">
//                             Quick Links
//                         </h4>
//                         <ul className="space-y-2">
//                             <li><Link to="/" className="text-brand-muted ">Home</Link></li>
//                             <li><Link to="/products" className="text-brand-muted ">Collections</Link></li>
//                             <li><Link to="/about" className="text-brand-muted ">About Us</Link></li>
//                             <li><Link to="/contact" className="text-brand-muted ">Contact</Link></li>
//                         </ul>
//                     </div>

//                     {/* Support */}
//                     <div>
//                         <h4 className="font-semibold text-lg mb-4 text-brand-secondary">
//                             Customer Support
//                         </h4>
//                         <ul className="space-y-2">
//                             <li><Link to="/faqs" className="text-brand-muted ">FAQs</Link></li>
//                             <li><Link to="/shipping-returns" className="text-brand-muted ">Shipping & Returns</Link></li>
//                             <li><Link to="/privacy-policy" className="text-brand-muted ">Privacy Policy</Link></li>
//                             <li><Link to="/terms-condition" className="text-brand-muted">Terms & Condition</Link></li>
//                         </ul>
//                     </div>
//                 </div>

//                 {/* Bottom Bar */}
//                 <div className="mt-12 border-t border-brand-muted pt-6 text-center text-brand-muted text-sm">
//                     <p>© {new Date().getFullYear()} DIVA. All rights reserved.</p>
//                 </div>
//             </div>
//         </footer>
//     );
// }


// import { Link } from "react-router-dom"; // Ensure this is imported if using React Router

export default function Footer() {
    const { theme } = useTheme();
    
    return (
        <footer className="bg-brand-dark text-brand-primary border-t border-brand-muted/20">
            {/* Standardized max-width container with responsive padding */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
                
                {/* Main Content Layout */}
                <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-16">
                    
                    {/* Brand Info - Left side on desktop, top on mobile */}
                    <div className="lg:w-1/3 flex flex-col items-start">
                        <Link to="/" className="flex items-center gap-3 mb-4 group">
                            <img
                                src={theme === "dark" ? darkLogo : lightLogo}
                                alt="DIVA Logo"
                                className="w-12 h-12 lg:w-16 lg:h-16 object-contain transition-transform group-hover:scale-105"
                            />
                            <span className="text-3xl lg:text-4xl text-brand font-serif font-bold tracking-wide">
                                DIVA
                            </span>
                        </Link>
                        <p className="text-brand-muted text-sm lg:text-base leading-relaxed max-w-sm">
                            Crafting memories with elegance and shine.
                            Jewellery that defines timeless beauty.
                        </p>
                    </div>

                    {/* Quick Links & Support - Side by side on mobile to save space! */}
                    <div className="grid grid-cols-2 gap-8 lg:w-1/2 lg:flex lg:justify-end lg:gap-24">
                        
                        {/* Quick Links */}
                        <div>
                            <h4 className="font-serif font-semibold text-base lg:text-lg mb-4 text-brand-secondary uppercase tracking-widest">
                                Explore
                            </h4>
                            <ul className="space-y-3">
                                <li><Link to="/" className="text-sm lg:text-base text-brand-muted hover:text-brand transition-colors duration-200">Home</Link></li>
                                <li><Link to="/products" className="text-sm lg:text-base text-brand-muted hover:text-brand transition-colors duration-200">Collections</Link></li>
                                <li><Link to="/about" className="text-sm lg:text-base text-brand-muted hover:text-brand transition-colors duration-200">About Us</Link></li>
                                <li><Link to="/contact" className="text-sm lg:text-base text-brand-muted hover:text-brand transition-colors duration-200">Contact</Link></li>
                            </ul>
                        </div>

                        {/* Support */}
                        <div>
                            <h4 className="font-serif font-semibold text-base lg:text-lg mb-4 text-brand-secondary uppercase tracking-widest">
                                Support
                            </h4>
                            <ul className="space-y-3">
                                <li><Link to="/faqs" className="text-sm lg:text-base text-brand-muted hover:text-brand transition-colors duration-200">FAQs</Link></li>
                                <li><Link to="/shipping-returns" className="text-sm lg:text-base text-brand-muted hover:text-brand transition-colors duration-200">Shipping & Returns</Link></li>
                                <li><Link to="/privacy-policy" className="text-sm lg:text-base text-brand-muted hover:text-brand transition-colors duration-200">Privacy Policy</Link></li>
                                <li><Link to="/terms-condition" className="text-sm lg:text-base text-brand-muted hover:text-brand transition-colors duration-200">Terms & Conditions</Link></li>
                            </ul>
                        </div>

                    </div>
                </div>

                {/* Bottom Bar - Elegant thin border separator */}
                <div className="mt-10 lg:mt-16 border-t border-brand-muted/30 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                    <p className="text-brand-muted text-xs lg:text-sm">
                        © {new Date().getFullYear()} DIVA. All rights reserved.
                    </p>
                    
                    {/* Optional: Extra subtle links for the bottom bar */}
                    <div className="flex gap-4 text-xs lg:text-sm text-brand-muted">
                        <span className="hover:text-brand cursor-pointer transition-colors duration-200">Privacy</span>
                        <span className="hover:text-brand cursor-pointer transition-colors duration-200">Terms</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}