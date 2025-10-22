import React, { useEffect, useState } from 'react'; // <-- ADDED useState and useEffect
import { Link } from 'react-router-dom';
import { FaRing, FaGem, FaLink, FaStar } from 'react-icons/fa';
import ring from '../../assets/6.jpg';
import necklace from '../../assets/7.jpg';
import earrings from '../../assets/8.jpg';
import bestsellers from '../../assets/9.jpg';

const collections = [
    // { name: "Rings", description: "Symbol of eternal love.", icon: FaRing, link: "/products?category=rings", image: "https://images.unsplash.com/photo-1600185365483-26d7c0e9d0e7?auto=format&fit=crop&w=400&q=80" },
    // { name: "Necklaces", description: "Elegant layering pieces.", icon: FaLink, link: "/products?category=necklaces", image: "https://images.unsplash.com/photo-1581579185538-1c1f3bfa91aa?auto=format&fit=crop&w=400&q=80" },
    // { name: "Earrings", description: "Frame your face with brilliance.", icon: FaGem, link: "/products?category=earrings", image: "https://images.unsplash.com/photo-1581579214941-3d1b636bcd3a?auto=format&fit=crop&w=400&q=80" },
    // { name: "Best Sellers", description: "Shop the community favorites.", icon: FaStar, link: "/products?sort=best_sellers", image: "https://images.unsplash.com/photo-1620921822452-f476a26d7730?auto=format&fit=crop&w=400&q=80" },

    { name: "Rings", description: "Symbol of eternal love.", icon: FaRing, link: "/products?category=rings", image: ring },
    { name: "Necklaces", description: "Elegant layering pieces.", icon: FaLink, link: "/products?category=necklaces", image: necklace },
    { name: "Earrings", description: "Frame your face with brilliance.", icon: FaGem, link: "/products?category=earrings", image: earrings },
    { name: "Best Sellers", description: "Shop the community favorites.", icon: FaStar, link: "/products?sort=best_sellers", image: bestsellers },
];

const FeaturedCollections = () => {
    // State to trigger the animation on load
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Set a small timeout to ensure the component is mounted before starting the transition
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 50);

        return () => clearTimeout(timer); // Cleanup function
    }, []);

    // Animation classes for the fade-in/slide-up effect
    const baseTransition = 'transition-all duration-700 ease-out';
    const initialClasses = 'opacity-0 translate-y-8';
    const finalClasses = 'opacity-100 translate-y-0';

    return (
        <section className="py-16 bg-brand-light transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Animation added to the heading */}
                <h2 className={`text-4xl font-serif font-bold text-center text-brand-secondary mb-12 ${baseTransition} ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                    Shop By Category
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {collections.map((collection, index) => (
                        <Link
                            key={index}
                            to={collection.link}
                            // Animation classes added here
                            className={`group relative block overflow-hidden rounded-xl shadow-xl transition-all duration-150 hover:shadow-2xl hover:scale-[1.02] ${baseTransition} ${isLoaded ? finalClasses : initialClasses}`}
                            // Staggered delay added here
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            <img
                                src={collection.image}
                                alt={collection.name}
                                className="w-full h-80 object-cover object-center transition-transform duration-150 group-hover:scale-110"
                            />

                            <div className="absolute inset-0 flex flex-col justify-end p-6 text-brand-primary z-10 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-100">
                                {/* ICON + TITLE in one row */}
                                <div className="flex items-center gap-3 mb-1">
                                    <collection.icon className="w-8 h-8 text-brand-primary drop-shadow-md" />
                                    <h3 className="text-3xl font-extrabold font-serif drop-shadow-md">
                                        {collection.name}
                                    </h3>
                                </div>

                                {/* Description below */}
                                <p className="text-lg drop-shadow-sm">{collection.description}</p>
                            </div>

                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default FeaturedCollections;