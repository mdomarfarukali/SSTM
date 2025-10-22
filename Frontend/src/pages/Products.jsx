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
  { 
    id: 4, 
    name: "Emerald Cuff Bracelet", 
    price: "$750", 
    imageUrl: "https://images.unsplash.com/photo-1611680508538-b7100e49520a?auto=format&fit=crop&w=400&q=q=80", 
    badge: "Limited Edition", 
    description: "Striking sterling silver cuff with a raw emerald stone.",
  },
  { 
    id: 5, 
    name: "Rose Gold Initial Pendant", 
    price: "$120", 
    imageUrl: "https://images.unsplash.com/photo-1596791199347-19075778ed85?auto=format&fit=crop&w=400&q=80", 
    description: "Personalized rose gold necklace, a perfect gift.",
  },
  { 
    id: 6, 
    name: "Sapphire Studs", 
    price: "$350", 
    imageUrl: "https://images.unsplash.com/photo-1590483863777-be9616e4566c?auto=format&fit=crop&w=400&q=80", 
    badge: "Sale", 
    description: "Vibrant blue sapphire studs in a hypoallergenic setting.",
  },
  { 
    id: 7, 
    name: "Silver Bangle Set", 
    price: "$150", 
    imageUrl: "https://images.unsplash.com/photo-1579604100527-3725b7d6b38c?auto=format&fit=crop&w=400&q=80", 
    description: "Set of three thin, minimalist sterling silver bangles.",
  },
  { 
    id: 8, 
    name: "Celestial Charm Anklet", 
    price: "$75", 
    imageUrl: "https://images.unsplash.com/photo-1618795908639-c1214c77764d?auto=format&fit=crop&w=400&q=80", 
    badge: "New", 
    description: "Delicate silver anklet with tiny moon and star charms.",
  },
  { 
    id: 9, 
    name: "Ruby Eternity Band", 
    price: "$580", 
    imageUrl: "https://images.unsplash.com/photo-1577903672016-e5554f67ff7c?auto=format&fit=crop&w=400&q=80", 
    description: "A gorgeous band featuring channel-set ruby stones.",
  },
  { 
    id: 10, 
    name: "Leather Wrap Bracelet", 
    price: "$95", 
    imageUrl: "https://images.unsplash.com/photo-1579883584852-5a242c73024c?auto=format&fit=crop&w=400&q=80", 
    badge: "Hot", 
    description: "Boho-chic bracelet made with genuine leather and metallic accents.",
  },
  { 
    id: 11, 
    name: "Vintage Cameo Brooch", 
    price: "$210", 
    imageUrl: "https://images.unsplash.com/photo-1517409477033-fd48c2677d29?auto=format&fit=crop&w=400&q=80", 
    description: "An antique-inspired piece with detailed ivory carving.",
  },
  { 
    id: 12, 
    name: "Chunky Chain Ring", 
    price: "$85", 
    imageUrl: "https://images.unsplash.com/photo-1628177142646-95034c51950e?auto=format&fit=crop&w=400&q=80", 
    description: "Bold, modern sterling silver link chain ring.",
  },
  { 
    id: 13, 
    name: "Amethyst Pendant Necklace", 
    price: "$175", 
    imageUrl: "https://images.unsplash.com/photo-1595168019056-2e8c89423985?auto=format&fit=crop&w=400&q=80", 
    badge: "Popular", 
    description: "Raw amethyst crystal suspended on a delicate 10k gold chain.",
  },
  { 
    id: 14, 
    name: "Diamond Tennis Bracelet", 
    price: "$1499", 
    imageUrl: "https://images.unsplash.com/photo-1587353347101-b5419992495d?auto=format&fit=crop&w=400&q=80", 
    description: "Luxurious bracelet with a continuous line of brilliant-cut diamonds.",
  },
  { 
    id: 15, 
    name: "Minimalist Bar Studs", 
    price: "$45", 
    imageUrl: "https://images.unsplash.com/photo-1627096645934-8c83e20d20d6?auto=format&fit=crop&w=400&q=80", 
    description: "Small, horizontal gold bar studs for everyday wear.",
  },
  { 
    id: 16, 
    name: "Black Onyx Signet Ring", 
    price: "$230", 
    imageUrl: "https://images.unsplash.com/photo-1620921822452-f476a26d7730?auto=format&fit=crop&w=400&q=80", 
    badge: "Men's", 
    description: "Bold signet ring featuring a polished black onyx inlay.",
  },
  // --- ADDED 7 MORE PRODUCTS ---
  { 
    id: 17, 
    name: "Hammered Gold Hoops", 
    price: "$89", 
    imageUrl: "https://images.unsplash.com/photo-1596791176219-90d23c14c387?auto=format&fit=crop&w=400&q=80", 
    description: "Medium-sized 18k gold-plated hoops with a hand-hammered finish.",
  },
  { 
    id: 18, 
    name: "Stackable Thin Ring Set", 
    price: "$65", 
    imageUrl: "https://images.unsplash.com/photo-1621251842813-fa6c38260b4a?auto=format&fit=crop&w=400&q=80", 
    badge: "Hot", 
    description: "Set of five ultra-thin rings in mixed metals for stacking.",
  },
  { 
    id: 19, 
    name: "Tanzanite Cluster Pendant", 
    price: "$620", 
    imageUrl: "https://images.unsplash.com/photo-1616147413985-e6a68393e157?auto=format&fit=crop&w=400&q=80", 
    description: "Oval tanzanite gemstone surrounded by a cluster of tiny diamonds.",
  },
  { 
    id: 20, 
    name: "Rope Chain Bracelet", 
    price: "$140", 
    imageUrl: "https://images.unsplash.com/photo-1617038161559-009c91012354?auto=format&fit=crop&w=400&q=80", 
    badge: "Best Seller", 
    description: "A finely woven gold vermeil rope chain bracelet.",
  },
  { 
    id: 21, 
    name: "Evil Eye Charm Necklace", 
    price: "$55", 
    imageUrl: "https://images.unsplash.com/photo-1588444654316-523190870954?auto=format&fit=crop&w=400&q=80", 
    description: "Dainty necklace featuring a protective evil eye charm.",
  },
  { 
    id: 22, 
    name: "Opal and Fire Ring", 
    price: "$310", 
    imageUrl: "https://images.unsplash.com/photo-1610427670732-c6edc13a3733?auto=format&fit=crop&w=400&q=80", 
    description: "Unique ring with a mesmerizing Australian opal.",
  },
  { 
    id: 23, 
    name: "Baroque Pearl Tassel Earrings", 
    price: "$185", 
    imageUrl: "https://images.unsplash.com/photo-1619656831006-258169188e02?auto=format&fit=crop&w=400&q=80", 
    badge: "Unique", 
    description: "Statement earrings with irregular baroque pearls and a gold tassel.",
  },
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
