
const products = [
    // ... (Your products array is correctly defined here)
    {
        id: 1,
        name: "Diamond Solitaire Ring",
        price: "$299",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761142300/p1_fznogt.jpg",
        badge: "New",
        description: "Classic 18k white gold with a brilliant diamond.",
        type: "Rings",
        material: ["Diamond", "Gold", "Fine Jewelry"],
        collection: ["Bridal & Wedding", "Gifts"]
    },
    {
        id: 2,
        name: "Pearl Drop Earrings",
        price: "$199",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761142301/p2_exmcft.jpg",
        badge: "Hot",
        description: "Elegant, delicate pearl earrings.",
        type: "Earrings",
        material: ["Pearls", "Gold Vermeil & Plated"],
        collection: ["Everyday Essentials", "Gifts"]
    },
    {
        id: 3,
        name: "Gold Figaro Necklace",
        price: "$499",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761142304/p3_u2ncyu.jpg",
        description: "Thick 14k gold chain, perfect for layering.",
        type: "Necklaces & Pendants",
        material: ["Gold", "Fine Jewelry"],
        collection: ["Everyday Essentials"]
    },
    {
        id: 4,
        name: "Emerald Cuff Bracelet",
        price: "$750",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761142302/p4_fiuybe.jpg",
        badge: "Limited Edition",
        description: "Striking sterling silver cuff with a raw emerald stone.",
        type: "Bracelets & Bangles",
        material: ["Gemstones (Emerald)", "Sterling Silver", "Demi-Fine Jewelry"],
        collection: ["Statement/Cocktail Wear"]
    },
    {
        id: 5,
        name: "Rose Gold Initial Pendant",
        price: "$120",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761142306/p5_fffbly.jpg",
        description: "Personalized rose gold necklace, a perfect gift.",
        type: "Necklaces & Pendants",
        material: ["Gold Vermeil & Plated"],
        collection: ["Everyday Essentials", "Gifts"]
    },
    {
        id: 6,
        name: "Sapphire Studs",
        price: "$350",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761142306/p6_rlnnq0.jpg",
        badge: "Sale",
        description: "Vibrant blue sapphire studs in a hypoallergenic setting.",
        type: "Earrings",
        material: ["Gemstones (Sapphire)", "Gold", "Fine Jewelry"],
        collection: ["Everyday Essentials", "Gifts"]
    },
    {
        id: 7,
        name: "Silver Bangle Set",
        price: "$150",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761142303/p7_iiouxr.jpg",
        description: "Set of three thin, minimalist sterling silver bangles.",
        type: "Bracelets & Bangles",
        material: ["Sterling Silver", "Demi-Fine Jewelry"],
        collection: ["Everyday Essentials", "Stacking Rings"]
    },
    {
        id: 8,
        name: "Celestial Charm Anklet",
        price: "$75",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761142304/p8_xykmyl.jpg",
        badge: "New",
        description: "Delicate silver anklet with tiny moon and star charms.",
        type: "Anklets & Body Jewelry",
        material: ["Sterling Silver"],
        collection: ["Everyday Essentials"]
    },
    {
        id: 9,
        name: "Ruby Eternity Band",
        price: "$580",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761142305/p9_j9gy5m.jpg",
        description: "A gorgeous band featuring channel-set ruby stones.",
        type: "Rings",
        material: ["Gemstones (Ruby)", "Gold", "Fine Jewelry"],
        collection: ["Bridal & Wedding", "Gifts"]
    },
    {
        id: 10,
        name: "Leather Wrap Bracelet",
        price: "$95",
        imageUrl: "https://images.unsplash.com/photo-1579883584852-5a242c73024c?auto=format&fit=crop&w=400&q=80",
        badge: "Hot",
        description: "Boho-chic bracelet made with genuine leather and metallic accents.",
        type: "Bracelets & Bangles",
        material: ["Fashion/Costume Jewelry"],
        collection: ["Everyday Essentials"]
    },
    {
        id: 11,
        name: "Vintage Cameo Brooch",
        price: "$210",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761142308/p11_rqca3t.jpg",
        badge: "Unique",
        description: "An antique-inspired piece with detailed ivory carving.",
        type: "Anklets & Body Jewelry",
        material: ["Fashion/Costume Jewelry"],
        collection: ["Vintage & Antique Style"]
    },
    {
        id: 12,
        name: "Chunky Chain Ring",
        price: "$85",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761142310/p12_m2whjp.jpg",
        description: "Bold, modern sterling silver link chain ring.",
        type: "Rings",
        material: ["Sterling Silver"],
        collection: ["Statement/Cocktail Wear"]
    },
    {
        id: 13,
        name: "Amethyst Pendant Necklace",
        price: "$175",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761142310/p13_q6piky.jpg",
        badge: "Popular",
        description: "Raw amethyst crystal suspended on a delicate 10k gold chain.",
        type: "Necklaces & Pendants",
        material: ["Gemstones (Amethyst)", "Gold", "Demi-Fine Jewelry"],
        collection: ["Gifts (Birthstones)"]
    },
    {
        id: 14,
        name: "Diamond Tennis Bracelet",
        price: "$1499",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761142316/p14_fvfalh.jpg",
        description: "Luxurious bracelet with a continuous line of brilliant-cut diamonds.",
        type: "Bracelets & Bangles",
        material: ["Diamond", "Fine Jewelry"],
        collection: ["Statement/Cocktail Wear", "Gifts"]
    },
    {
        id: 15,
        name: "Minimalist Bar Studs",
        price: "$45",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761142310/p15_menvol.jpg",
        description: "Small, horizontal gold bar studs for everyday wear.",
        type: "Earrings",
        material: ["Gold Vermeil & Plated"],
        collection: ["Everyday Essentials"]
    },
    {
        id: 16,
        name: "Black Onyx Signet Ring",
        price: "$230",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761142311/p16_qknc1z.jpg",
        badge: "Men's",
        description: "Bold signet ring featuring a polished black onyx inlay.",
        type: "Rings",
        material: ["Sterling Silver", "Gemstones"],
        collection: ["Men's (Cufflinks, Chains)", "Gifts"]
    },
    {
        id: 17,
        name: "Hammered Gold Hoops",
        price: "$89",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761142311/p17_dwh7w6.jpg",
        description: "Medium-sized 18k gold-plated hoops with a hand-hammered finish.",
        type: "Earrings",
        material: ["Gold Vermeil & Plated"],
        collection: ["Everyday Essentials"]
    },
    {
        id: 18,
        name: "Stackable Thin Ring Set",
        price: "$65",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761142313/p18_axwneu.jpg",
        badge: "Hot",
        description: "Set of five ultra-thin rings in mixed metals for stacking.",
        type: "Rings",
        material: ["Gold Vermeil & Plated", "Sterling Silver"],
        collection: ["Everyday Essentials", "Stacking Rings"]
    },
    {
        id: 19,
        name: "Tanzanite Cluster Pendant",
        price: "$620",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761142312/p19_sn5txy.jpg",
        description: "Oval tanzanite gemstone surrounded by a cluster of tiny diamonds.",
        type: "Necklaces & Pendants",
        material: ["Gemstones (Tanzanite)", "Diamond", "Fine Jewelry"],
        collection: ["Statement/Cocktail Wear", "Gifts"]
    },
    {
        id: 20,
        name: "Rope Chain Bracelet",
        price: "$140",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761142314/p20_blszr0.jpg",
        badge: "Best Seller",
        description: "A finely woven gold vermeil rope chain bracelet.",
        type: "Bracelets & Bangles",
        material: ["Gold Vermeil & Plated", "Demi-Fine Jewelry"],
        collection: ["Everyday Essentials"]
    },
    {
        id: 21,
        name: "Evil Eye Charm Necklace",
        price: "$55",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761142314/p21_gtugov.jpg",
        description: "Dainty necklace featuring a protective evil eye charm.",
        type: "Necklaces & Pendants",
        material: ["Fashion/Costume Jewelry"],
        collection: ["Everyday Essentials", "Gifts"]
    },
    {
        id: 22,
        name: "Opal and Fire Ring",
        price: "$310",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761142289/p22_es8ulr.jpg",
        description: "Unique ring with a mesmerizing Australian opal.",
        type: "Rings",
        material: ["Gemstones (Opal)", "Sterling Silver", "Demi-Fine Jewelry"],
        collection: ["Gifts (Birthstones)", "Statement/Cocktail Wear"]
    },
    {
        id: 23,
        name: "Baroque Pearl Tassel Earrings",
        price: "$185",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761142298/p23_opfvba.jpg",
        badge: "Unique",
        description: "Statement earrings with irregular baroque pearls and a gold tassel.",
        type: "Earrings",
        material: ["Pearls", "Gold Vermeil & Plated"],
        collection: ["Statement/Cocktail Wear"]
    },

    {
        id: 24,
        name: "Ruby Radiance Earrings",
        price: "$450",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761210181/p24_ghgkx4.jpg",
        description: "Classic ruby earrings that exude timeless beauty.",
        type: "Earrings",
        material: ["Gemstones (Ruby)", "Fine Jewelry"],
        collection: ["Everyday Essentials", "Statement/Cocktail Wear"]
    },
    {
        id: 25,
        name: "Diamond Bliss Bracelet",
        price: "$780",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761210220/p25_gdbss4.jpg",
        description: "Luxurious bracelet crafted with brilliant-cut diamonds.",
        type: "Bracelets & Bangles",
        material: ["Diamond", "Fine Jewelry"],
        collection: ["Bridal & Wedding", "Gifts"]
    },
    {
        id: 26,
        name: "Sapphire Sky Anklet",
        price: "$270",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761210279/p26_s1qt0w.jpg",
        description: "Charming anklet set with deep-blue sapphire stones.",
        type: "Anklets & Body Jewelry",
        material: ["Gemstones (Sapphire)", "Fashion/Costume Jewelry"],
        collection: ["Everyday Essentials", "Gifts"]
    },
    {
        id: 27,
        name: "Amethyst Aura Pendant",
        price: "$340",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761210267/p27_cmtvic.jpg",
        description: "Radiant amethyst pendant that symbolizes peace and balance.",
        type: "Necklaces & Pendants",
        material: ["Gemstones (Amethyst)", "Fine Jewelry"],
        collection: ["Gifts (Birthstones)", "Everyday Essentials"]
    },
    {
        id: 28,
        name: "Emerald Envy Ring",
        price: "$610",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761210278/p28_hmlitp.jpg",
        description: "A luxury ring featuring a vivid green emerald centerpiece.",
        type: "Rings",
        material: ["Gemstones (Emerald)", "Fine Jewelry"],
        collection: ["Statement/Cocktail Wear", "Bridal & Wedding"]
    },
    {
        id: 29,
        name: "Ruby Charm Bracelet",
        price: "$400",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761210278/p29_wgukxr.jpg",
        description: "Delicate bracelet with ruby charms for a passionate look.",
        type: "Bracelets & Bangles",
        material: ["Gemstones (Ruby)", "Demi-Fine Jewelry"],
        collection: ["Gifts", "Everyday Essentials"]
    },
    {
        id: 30,
        name: "Sapphire Dream Earrings",
        price: "$380",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761210302/p30_qrdxmy.jpg",
        description: "Blue sapphire earrings perfect for elegant evening wear.",
        type: "Earrings",
        material: ["Gemstones (Sapphire)", "Fine Jewelry"],
        collection: ["Statement/Cocktail Wear", "Bridal & Wedding"]
    },
    {
        id: 31,
        name: "Opal Whisper Anklet",
        price: "$290",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761210293/p31_abeweg.jpg",
        description: "Subtle opal anklet with iridescent shimmer for daily wear.",
        type: "Anklets & Body Jewelry",
        material: ["Gemstones (Opal)", "Fashion/Costume Jewelry"],
        collection: ["Everyday Essentials", "Gifts (Birthstones)"]
    },
    {
        id: 32,
        name: "Amethyst Halo Ring",
        price: "$355",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761210279/p32_nled7e.jpg",
        description: "Stunning ring featuring a radiant amethyst surrounded by a silver halo.",
        type: "Rings",
        material: ["Gemstones (Amethyst)", "Sterling Silver", "Demi-Fine Jewelry"],
        collection: ["Gifts (Birthstones)", "Everyday Essentials"]
    },
    {
        id: 33,
        name: "Emerald Horizon Bracelet",
        price: "$490",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761210291/p33_mjsipx.jpg",
        description: "Elegant bracelet showcasing a line of emerald stones set in fine gold.",
        type: "Bracelets & Bangles",
        material: ["Gemstones (Emerald)", "Fine Jewelry"],
        collection: ["Bridal & Wedding", "Statement/Cocktail Wear"]
    },
    {
        id: 34,
        name: "Ruby Cascade Necklace",
        price: "$620",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761210291/p34_vf4bl0.jpg",
        description: "A captivating ruby necklace with a cascading gemstone design.",
        type: "Necklaces & Pendants",
        material: ["Gemstones (Ruby)", "Fine Jewelry"],
        collection: ["Vintage & Antique Style", "Statement/Cocktail Wear"]
    },
    {
        id: 35,
        name: "Sapphire Bloom Earrings",
        price: "$410",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761210290/p35_by2nbx.jpg",
        description: "Floral-inspired sapphire earrings designed for graceful charm.",
        type: "Earrings",
        material: ["Gemstones (Sapphire)", "Demi-Fine Jewelry"],
        collection: ["Everyday Essentials", "Gifts"]
    },
    {
        id: 36,
        name: "Opal Luxe Pendant",
        price: "$330",
        imageUrl: "https://res.cloudinary.com/dgdpg6eqi/image/upload/v1761210298/p36_dg57gv.jpg",
        description: "A luxurious opal pendant with gold detailing, symbolizing elegance.",
        type: "Necklaces & Pendants",
        material: ["Gemstones (Opal)", "Fine Jewelry"],
        collection: ["Gifts (Birthstones)", "Bridal & Wedding"]
    },
]

export default products;