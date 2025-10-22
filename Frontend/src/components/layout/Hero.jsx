import React, { useEffect, useState } from 'react'; // <-- ADDED useState and useEffect
import { Link } from 'react-router-dom';
import { FaGem } from 'react-icons/fa';
import backgroundImage from "../../assets/p22.jpg";

function Hero() {
    // 1. STATE TO TRIGGER ANIMATION
    const [isAnimated, setIsAnimated] = useState(false);

    useEffect(() => {
        // Trigger the animation shortly after the component mounts
        const timer = setTimeout(() => {
            setIsAnimated(true);
        }, 100);

        return () => clearTimeout(timer); // Cleanup
    }, []);

    // Base transition classes for all text elements
    const baseTransition = 'transition-all duration-1000 ease-out';
    const initialClasses = 'opacity-0 translate-y-6';
    const finalClasses = 'opacity-100 translate-y-0';

    // console.log("Hero component loaded");
    // console.log("Background image URL:", 'https://images.unsplash.com/photo-1549414002-3c1a7d656096?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1800&q=80');

    return (
        <section
            className="relative h-[90vh] bg-brand overflow-hidden pt-20"
            style={{
                // Using a light, elegant image (replace with your own high-res image later)
                // backgroundImage: 'url("https://images.unsplash.com/photo-1549414002-3c1a7d656096?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1800&q=80")',
                backgroundImage: 'url(' + backgroundImage + ')',
                backgroundSize: 'cover',
                backgroundPosition: 'center 40%',
            }}
        >
            {/* Overlay for contrast in dark mode */}
            <div className="absolute inset-0  bg-opacity-100 dark:bg-opacity-50 bg-gradient-to-t from-black/60 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-100"></div>

            <div className="relative max-w-7xl mx-auto h-full flex items-center px-4 sm:px-6 lg:px-8">
                {/* Text Content - Positioned left for emphasis */}
                <div className="max-w-xl text-brand -blur-sm p-6 rounded-xl bg-opacity-20">
                    {/* H1 - DIVA */}
                    <h1 className={`text-6xl md:text-8xl font-serif font-extrabold leading-tight tracking-tight ${baseTransition} ${isAnimated ? finalClasses : initialClasses}`} style={{ transitionDelay: '0ms' }}>
                        <img src="/DIVA_LightCut-removebg-preview.png" alt="DIVA Logo" className="w-25 h-25 inline-block mr-2 mb-1" />
                        DIVA
                    </h1>

                    {/* H2 - Handcrafted Brilliance. */}
                    <h2 className={`text-3xl font-light mt-2 mb-4 ${baseTransition} ${isAnimated ? finalClasses : initialClasses}`} style={{ transitionDelay: '150ms' }}>
                        Handcrafted Brilliance.
                    </h2>

                    {/* Paragraph */}
                    <p className={`text-lg mb-8 max-w-md ${baseTransition} ${isAnimated ? finalClasses : initialClasses}`} style={{ transitionDelay: '300ms' }}>
                        Discover exclusive, ethically-sourced jewelry designs. From classic solitaires to modern statement pieces, find your perfect sparkle.
                    </p>

                    {/* Primary CTA */}
                    <Link
                        to="/products"
                        className={`inline-flex items-center px-8 py-4 bg-brand-dark text-brand text-xl font-bold rounded-full shadow-2xl hover:bg-brand-light transition transform hover:scale-[1.05] gap-3 ${baseTransition} ${isAnimated ? finalClasses : initialClasses}`}
                        style={{ transitionDelay: '0ms' }}
                    >
                        <FaGem /> Shop The Collection
                    </Link>

                    {/* Secondary CTA */}
                    <p className={`mt-4 text-sm text-brand-muted ${baseTransition} ${isAnimated ? finalClasses : initialClasses}`} style={{ transitionDelay: '600ms' }}>
                        Free express shipping on all orders over $200.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Hero;