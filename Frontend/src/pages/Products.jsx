// src/pages/Products.jsx
import React from "react";
import ProductCard from "../components/ProductCard"; 

const products = [
  { 
    id: 1, 
    name: "Diamond Solitaire Ring", 
    price: "$299", 
    imageUrl: "https://images.unsplash.com/photo-1600185365483-26d7c0e9d0e7?auto=format&fit=crop&w=400&q=80", 
    badge: "New", 
    description: "Classic 18k white gold with a brilliant diamond.",
  },
  { 
    id: 2, 
    name: "Pearl Drop Earrings", 
    price: "$199", 
    imageUrl: "https://images.unsplash.com/photo-1581579214941-3d1b636bcd3a?auto=format&fit=crop&w=400&q=80", 
    badge: "Hot", 
    description: "Elegant, delicate pearl earrings.",
  },
  { 
    id: 3, 
    name: "Gold Figaro Necklace", 
    price: "$499", 
    imageUrl: "https://images.unsplash.com/photo-1581579185538-1c1f3bfa91aa?auto=format&fit=crop&w=400&q=80", 
    description: "Thick 14k gold chain, perfect for layering.",
  },
  // ADD MORE PRODUCTS HERE...
];

const Products = () => {
  return (
    <div className="min-h-screen bg-brand-light transition-colors duration-500 pt-20">
      {/* <Navbar /> */}

      <div className="container mx-auto px-4 py-8">
        
        {/* Title Section */}
        <div className="text-center mb-16 pt-8">
          <h1 className="text-5xl font-serif font-bold text-brand mb-4">
            Our Exclusive Collection
          </h1>
          <p className="text-brand-muted text-lg">
            Discover handcrafted jewelry made with love and precision.
          </p>
        </div>

        {/* Layout with space for a sidebar (Filter) */}
        <div className="flex flex-col lg:flex-row gap-10">
            
          {/* Optional: Filter Sidebar Placeholder */}
          {/*
          <aside className="w-full lg:w-1/4">
            <div className="p-6 rounded-xl bg-brand-dark shadow-md">
                <h3 className="text-2xl font-semibold text-brand mb-4">Filter By</h3>
                <p className="text-brand-muted">Filters go here (e.g., Price, Material, Stone)</p>
            </div>
          </aside>
          */}

          {/* Products Grid */}
          <main className="w-full lg:w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product, index) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  index={index} // Pass index for staggered animation
                />
              ))}
            </div>
          </main>
        </div>
      </div>
      
      {/* <Footer /> */}
    </div>
  );
};

export default Products;
