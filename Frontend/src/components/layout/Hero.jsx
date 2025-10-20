import React from 'react';
import { Link } from 'react-router-dom';
import { FaGem } from 'react-icons/fa';

function Hero() {

    console.log("Hero component loaded");
    console.log("Background image URL:", 'https://images.unsplash.com/photo-1549414002-3c1a7d656096?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1800&q=80');

    return (
        <section
            className="relative h-[90vh] bg-brand overflow-hidden pt-20"
            style={{
                // Using a light, elegant image (replace with your own high-res image later)
                backgroundImage: 'url("https://images.unsplash.com/photo-1549414002-3c1a7d656096?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1800&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center 40%',
            }}
        >
            {/* Overlay for contrast in dark mode */}
            <div className="absolute inset-0 bg-black bg-opacity-30 dark:bg-opacity-50"></div>

            <div className="relative max-w-7xl mx-auto h-full flex items-center px-4 sm:px-6 lg:px-8">
                {/* Text Content - Positioned left for emphasis */}
                <div className="max-w-xl text-brand-highlight -blur-sm p-6 rounded-xl bg-opacity-20">
                    <h1 className="text-6xl md:text-8xl font-serif font-extrabold leading-tight tracking-tight">
                        DIVA
                    </h1>
                    <h2 className="text-3xl font-light mt-2 mb-4">
                        Handcrafted Brilliance.
                    </h2>
                    <p className="text-lg mb-8 max-w-md">
                        Discover exclusive, ethically-sourced jewelry designs. From classic solitaires to modern statement pieces, find your perfect sparkle.
                    </p>

                    {/* Primary CTA */}
                    <Link
                        to="/products"
                        className="inline-flex items-center px-8 py-4 bg-brand-dark  text-brand  text-xl font-bold rounded-full shadow-2xl hover:bg-brand-light transition transform hover:scale-[1.05] gap-3"
                    >
                        <FaGem /> Shop The Collection
                    </Link>

                    {/* Secondary CTA */}
                    <p className="mt-4 text-sm text-brand-muted">
                        Free express shipping on all orders over $200.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Hero;
