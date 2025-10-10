import React from 'react';
import { Link } from 'react-router-dom';
import { FaRing, FaGem, FaLink, FaStar } from 'react-icons/fa';

const collections = [
    { name: "Rings", description: "Symbol of eternal love.", icon: FaRing, link: "/products?category=rings", image: "https://images.unsplash.com/photo-1600185365483-26d7c0e9d0e7?auto=format&fit=crop&w=400&q=80" },
    { name: "Necklaces", description: "Elegant layering pieces.", icon: FaLink, link: "/products?category=necklaces", image: "https://images.unsplash.com/photo-1581579185538-1c1f3bfa91aa?auto=format&fit=crop&w=400&q=80" },
    { name: "Earrings", description: "Frame your face with brilliance.", icon: FaGem, link: "/products?category=earrings", image: "https://images.unsplash.com/photo-1581579214941-3d1b636bcd3a?auto=format&fit=crop&w=400&q=80" },
    { name: "Best Sellers", description: "Shop the community favorites.", icon: FaStar, link: "/products?sort=best_sellers", image: "https://images.unsplash.com/photo-1620921822452-f476a26d7730?auto=format&fit=crop&w=400&q=80" },
];

const FeaturedCollections = () => {
    return (
        <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-serif font-bold text-center text-gray-800 dark:text-white mb-12">
                    Shop By Category
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {collections.map((collection, index) => (
                        <Link
                            key={index}
                            to={collection.link}
                            className="group relative block overflow-hidden rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
                        >
                            <img
                                src={collection.image}
                                alt={collection.name}
                                className="w-full h-80 object-cover object-center transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                            />
                            
                            {/* Text Overlay */}
                            <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300"></div>
                            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                                <collection.icon className="w-8 h-8 text-pink-400 mb-2" />
                                <h3 className="text-3xl font-extrabold font-serif">{collection.name}</h3>
                                <p className="text-lg mt-1">{collection.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedCollections;