import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  Diamond,
  Instagram,
  ShieldCheck,
  Heart,
  ShoppingBag,
} from "lucide-react";
import "./Home.css";
import ChatButton from "../components/common/ChatButton";

const ASSETS = {
  logo: "https://lh3.googleusercontent.com/aida/AEtjO1XZ-sy9-20S3OHxJh_LDy_ZSX6m5RslLsBeWhQeEDuGm97rdW289ZzQQPcXYVC_ZxWLuaS7YZjxQvotWQ3JE8G3kX_SwyvzwIn4VWbtdw-JCSwXqzSvxqw5RPyDb-kGA--gphG8V3P8O3aMfBLQCsYk0hn1ebBpYfCh_yy4L_nQBdYXTeAMJCncw73D97qROSkDAI2fz2CLKfxmjh8oQWKjk8uFpnw_NUFfkx0-dHMVeXzV1rlcSEd6hsqK",
  hero: "https://lh3.googleusercontent.com/aida-public/AB6AXuAf9k0MGVCzwOEvxTZdHuCFv5cOKzAISt0TiGfFPSY1pftgBtngG4FtLjiGJR3AH2QuQcTAR4jnIQ12zk4MaOZC-RJd2m6CP9VDYhotOclVhTzrB9lzwndg_SvlRbpLgi6AZR8LrsLSH0NtlVQPbqV-eHtyVfEOVP0sS0PzyUnl1_kzBn-95InetDlkIW2F7KWa3Bw_ZPOUTTmyJCLFl4lQZ0bYpQz3w0AmpyzdRjqNupPpe8XoRPGy5g",
  rings: "https://lh3.googleusercontent.com/aida-public/AB6AXuDa7jTqnukqHgEM4o7AJ9oaJI9FUJMtNDxCArAPAw89doTkAOVsg87cCmgwSWKOjrCY3k_sp_t-bUKyKHg5AKNiL4MC-D9SCgrrZWvALoSNh8yXeApGSLrk2saCZi1iCUMQVdGuZBUxDG_NgAwzZyUWNigaFifDH5vaybqvcwQhy6QZomzZyA9yEkHIQzNB99rwWlXdaa4PBtP467_J2LWkT4dHUeLEK3Ran0ebBdrek0lbxl2OVhgKEg",
  necklaces: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRz0XcqR2846NO6KL2E7Y4gVFOxpHG6V5NAm0m08ot6-vzF-Osuf_Kicg7_sz4JjPR1uWyrs4RYcWaC-nQfiwCciSGXf8qQQstxM8TlZEQDUlox-4NAJgE0L37sFFmpMfPctW_UP4G3i2pXroVMoVOZp2P3Xt934vo4oeK2_FjoqfKy98AJ9xxA4VRXPTdNJwltVMbUxKY2eJtTb5UPTdmNXDUTxmmCO92157Y1Ri88WH29SJ84ViDnA",
  earrings: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0yNRykAn7ivRuF1KpKjuX7pXaKGgmZGUXcX4lxOlZGoBorZoMfcoBQpIZZXcD5ruAuimM7f38GZ2ByMH_CXlt8-sDlyalBT9VrW3I2pvKQe57LWMtYd0Ju4Gj5zoL5-f0hK_nWpIaIfp-IqU8wPcpzS6DqlS1MaKs_IjltqhP7w9qewEIpJM2utn3C3MMCZsjSlVLrCwo0NgsSAWamjHuH-YT8qcvysxaBPRs0ZmDWgHRpLTFrzHWYg",
  favorites: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdXevRZKxLfVSS2XZCS_J_cPlSXHsd15LS6EvvhEQkpVZ_8nIafha45IrOTqLtudxk0q9yO3QhLZnCwP5FDeaUCm83G1hNJ90eugVfyskJQ2Xh1es0gIrSKtNrfgybDxsnl6knNaBm4bd8ivXmnAxDjJ5sTWOOY4KdBYdkzZVMnzulrxwVO39ubcPQyTAuRTYJxg-ZOK-w214jbXKz6ln4HcxJeIuOP0n_rUlAwT42wtCaUL4Tr9p_Vw",
  atelier: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnqgQkfjI4XXYK6kAdFwkODoTU0I76M_jJRyqY-E81Cah_5zNHvtTqumRdH8De8YOCxt4jch0mNDgOfGpiAfCzQcf9_4ot7foMNKQJmJQICu20SifmT1HIej8oTKf5VkbMGzFWIW2ylvdYMAKK3jhF9Az9B8Oifmn6Yj6lIY4S06Iwj5fh9Rjf8ZQZwhBAOyqW03fDJvg1-BBvQlNThD8SsppdO-qyLqxK5U8LJ0t-gkaUCg_lcXvP2A",
  product1: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVF55ITz8d5DWVqJo8pULo7QMlXbK4TkxfuNiSostniBKuCJWihhMn7EA4XltD8aJbLc8nxdjLFKFc571pA45dqJpKGlQpTlAFBTFcI6wuYK82fc98bk1RRFig-IdNOnIt0L3FE3FKmiQ4hTaTDeAET2U2LLEWRQ93cJbmY70MKuDpi3MDKkRRXShzM4JfTnSn0oQ4i8WmjQHsuBSv1lYM9o_e9Yb6wM52thYLgeH5RM8_WHp6CdaTYg",
  product2: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCMJ9O3Xu_0H_gaJm_7CdIz6iK2VxnpjkV5V4rVkvTpKmLpLkoylnI3FoMn8t5BcnoK-ZWVjUMDYPk-diyUBnoX7PnP_gWdfkreeF1E6idVC7y66NgDkNwwwa4Gv_h4lBNl1f5nitb6GDvPKai4KAlm27uZQgpxtQpIRryvbRr2bBSr2BZ9qvJayUZIIkmdEucG5n03GMsSAhT034_f2uTt_Hu54Yzd8s7hAggBjZZGEugoXlMdtCxcQ",
  product3: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8UIGoigmwnhg_nA8THKa6ZGNx7yYRJAqmru80IvRu8LvTXSDGEjXP_Qw0VnQbO9wm2j0Qwgtbpu-gyKyprmaMtO7RrI05cyWBqDwI0scIBXY1dGdzfpKTZGhBdgO7QfQFy0m12qbvzd35ks8YmKDhsZbV6O99rwJRo5luIfuzvw4MFVFxEsNFKLX1VBSHzLLERPyjJ-Tt4RhLm7AhfYNWFlRuUu9-gMnPEDf1OdOKU_QKu0bHvsF1fA",
  product4: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2oZaJ8M5WBxLQ9jEFNAxybePIFo2vC20PzwiH95Ph1ydz9nCD8MO9XLsdRvIitUggEK78bI0t2zx1lPMRDhY5X9gfWtNcz0XYb1ocT9l8HwR8sI6rUHSAfBOXr9CpgFlIsFilY9S9hUsraKwwrgMSEW-ohGdwYqvTXpEAXk7yr7W16p1WKYLz_XjGx8AfeOkw4ql-QBgIGMlPpoAS91vHImF8gRbDwLJagRAi6eUp6mYs2s29R0QmPw",
  testimonial: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3NCRAuUWYblWcgFDHzmo-pRtHCiD7uR3ALr3gjsF67gWJdLaC2op9NSfUCkzfyiowNf7fTBc8VMm18jqEDUK_bVqFy5zo1jJKQmcDZ3d6SjrPPtH5pfEYztBa4RGtBQdPmFnglNyUpr0cd67sSxe-BxTdeekvubaZudIp2qMMgVN3ZHsUCbor09t4um7rKnQL4cHVxg3yKNgqC68rUzQRsj5zbhu8yo-lJqUO34wZavX7Pm8PW4f8gQ",
  gallery1: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZp42J38M15ZVY_yJUi7LTGFCP_5wimegpZwMCIZhvRW1heY7_YzvUc9g2YIik6gmxFp92AQXmUquvcbOmA68ZVnJ-YbmUM9mUKC3ik_gQzUleDzZ5q-kH9K3-OklKUdprxaIvCg8aOOMLTvP1uepkAgrIlWI31_xPAUcxCTIzWav5rQ7ADDGhMdhJE2-f548TG4TMXpc4q0Z4ACWZnXMIh1IRYOZztdxpaLdUkWvDkmqr2XNIgZ-M_w",
  gallery2: "https://lh3.googleusercontent.com/aida-public/AB6AXuClxummn7VnqQ4-cX71XXazvWSGO_kP0-zs2b4SSk2W2HD1ezamGq37BOJZf_qywEVW9eXzXjbhjqEctDzLYxBcN2pPlALVmo1Oh7vpaJWNfcDKiIMpQIXNwA63dPrfmxVmpM1dWOQNgpgftNnT0jJkM-g_fwLUmZbLr29J-1xm7zplimJE3-ekIaE-j7Ut-i9fcxnXQllPKcYT8SJMWUq7-kvU4Wz9RNU1TrBo3nX09edyPixv-a5m2w",
  gallery3: "https://lh3.googleusercontent.com/aida-public/AB6AXuCaubzgXS6Cb3A7ZMT7FdaL0zU1YhKuJ6J2yszX1tZp16fGQ06REe1AGmIbLIDL3bVWFT_rpisvAkTQJlBvPEk9TdGyXu5g7c1FQ1xdpg8PGF-gvl2rTxVv2si1fCiXvP9jHr_0tPAxx4qcUo-4bZ3vvUq66-rBLL0-ZlT-rs4A0SR3e4iBRmp8Cil37mfKpIKabW79vMx01Ng7Z9u8w6t7VA2SR-x218tPRrW1SQvrCBoetWtS--cuUw",
  gallery4: "https://lh3.googleusercontent.com/aida-public/AB6AXuCy--q5nKepmR3Vqmhy5P_viT67wGd-e-nKYlAP8i3gDy6p09B8oeWg5R8tCUUl31ZNgXyHywa6tq6sj04vYLwpVZZ9WQgl_73ceSlmScNo53a7jZmJXErp1OfUKU6x_QNTaTH0YfVwbWlXmzHjZhNspg3vSPE2T-_AMmJLamvrRqVSlSars6WpYeAphQNHLB17_7Uo5RkXR3KEKPgCWCjd8IOCiVF2lGwhdtDHl7H6DGbAFoQ1S6fcBA",
};

const collections = [
  {
    number: "01 / BAGUES",
    title: "Rings",
    subtitle: "Symbol of eternal love",
    description: "Solitaires, hand-carved organic vine bands, and bespoke gemstone halos.",
    image: ASSETS.rings,
    path: "/products?category=rings",
    shape: "organic-a",
  },
  {
    number: "02 / COLLIERS",
    title: "Necklaces",
    subtitle: "Elegant layering pieces",
    description: "From whisper-light diamond stations to sculptural choker talismans.",
    image: ASSETS.necklaces,
    path: "/products?category=necklaces",
    shape: "organic-b",
  },
  {
    number: "03 / BOUCLES",
    title: "Earrings",
    subtitle: "Frame your face with brilliance",
    description: "Sculptural silhouettes and luminous details for every occasion.",
    image: ASSETS.earrings,
    path: "/products?category=earrings",
    shape: "organic-c",
  },
  {
    number: "04 / FAVORITES",
    title: "Best Sellers",
    subtitle: "Curated patron favorites",
    description: "The pieces our collectors return to, season after season.",
    image: ASSETS.favorites,
    path: "/products?sort=popular",
    shape: "organic-d",
  },
];

const products = [
  {
    name: "The Celestial Pear Solitaire",
    detail: "18K White Gold · Aquamarine & Diamond",
    price: "$380",
    badge: "New Arrival",
    image: ASSETS.product1,
    path: "/products/celestial-pear-solitaire",
  },
  {
    name: "Aura Floating Diamond Pendant",
    detail: "14K Warm Rose Gold · Bezel-set Brilliant",
    price: "$295",
    badge: "Best Seller",
    image: ASSETS.product2,
    path: "/products/aura-floating-diamond-pendant",
  },
  {
    name: "Blossom Pink Tourmaline Studs",
    detail: "18K Rose Gold · Pink Tourmaline & Diamond",
    price: "$245",
    badge: "Earrings",
    image: ASSETS.product3,
    path: "/products/blossom-pink-tourmaline-studs",
  },
  {
    name: "The Verdant Moss Agate Ring",
    detail: "18K Yellow Gold · Moss Agate & Marquise Halo",
    price: "$420",
    badge: "Artisan Icon",
    image: ASSETS.product4,
    path: "/products/verdant-moss-agate-ring",
  },
];

const metalDetails = {
  "rose-gold": {
    label: "18K Rose Gold",
    description:
      "Alloy composition: 75% fine gold, 21% copper, 4% silver for romantic blush warmth.",
  },
  "yellow-gold": {
    label: "18K Warm Yellow Gold",
    description:
      "Alloy composition: 75% pure gold, 15% silver, 10% copper for timeless imperial lustre.",
  },
  platinum: {
    label: "950 Pure Platinum",
    description:
      "Alloy composition: 95% pure platinum with 5% ruthenium for hypoallergenic, enduring white brilliance.",
  },
};

function EditorialLink({ to, children, className = "" }) {
  return (
    <Link className={`diva-editorial-link ${className}`} to={to}>
      <span>{children}</span>
      <ArrowRight aria-hidden="true" size={15} strokeWidth={1.5} />
    </Link>
  );
}

function HeroSection() {
  return (
    <section className="diva-hero">
      <div className="diva-hero__copy">
        <p className="diva-eyebrow">Maison de Haute Joaillerie · Paris &amp; New York</p>
        <h1>Handcrafted Brilliance,<br /><em>Timeless Devotion.</em></h1>
        <p className="diva-hero__description">
          Discover exclusive, ethically-sourced jewelry designs. From classic solitaires to modern
          architectural statements, find your perfect sparkle crafted with timeless artisan devotion.
        </p>
        <div className="diva-hero__actions">
          <Link className="diva-button diva-button--primary" to="/products">
            Explore the Collection <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link className="diva-button diva-button--secondary" to="/bespoke-consultations">
            Private Consultation <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
        {/* <div className="diva-hero__note">
          <span className="diva-hero__note-icon"><ShieldCheck size={18} /></span>
          <span>
            <strong>Complimentary express shipping</strong>
            <small>On all orders over $200</small>
          </span>
        </div> */}
        <div className="mt-10 max-w-[670px] border-t border-[#2a211a]/10 pt-7">
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 -mt-4 shrink-0 place-items-center overflow-hidden rounded-full border border-[#2a211a]/10 bg-white/60 shadow-sm">
              <img
                src={"/DIVA_LightCut-removebg-preview.png"}
                alt="DIVA"
                className="h-8 w-8 object-contain"
              />
            </span>

            <p className="m-0">
              <span className="block font-['Playfair_Display',serif] text-[11px] italic leading-snug text-[#3b2f26] lg:text-[16px]">
                “Crafting memories with elegance and shine. Jewellery that defines timeless beauty.”
              </span>
              <span className="mt-1 block font-['DM_Sans',sans-serif] text-[8px] font-medium uppercase tracking-[0.2em] text-[#6b5d50] lg:text-[11px]">
                Complimentary express shipping on all orders over $200
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="diva-hero__visual">
        <div className="diva-hero__image-wrap mt-10 lg:mt-14">
          <img src={ASSETS.hero} alt="DIVA signature fine jewellery in a warm editorial setting" />
        </div>
        <div className="diva-hero__seal" aria-hidden="true">
          <span>MADE WITH INTENTION</span>
          <Diamond size={20} strokeWidth={1.2} />
          <span>WORN FOREVER</span>
        </div>
        <div className="diva-hero-product">
          <span className="diva-hero-product__kicker">Maison Signature</span>
          <strong>Solitaire &amp; South Sea Luminescence</strong>
          <span>18K Recycled Rose Gold · Natural Diamond</span>
          <div className="diva-hero-product__bottom">
            <span>$1,850</span>
            <span className="diva-certified"><Check size={13} /> Ethical origin</span>
          </div>
        </div>
      </div>
      <a className="diva-scroll-cue" href="#collections" aria-label="Scroll to collections">
        <span>Discover DIVA</span>
        <ArrowDownRight size={16} aria-hidden="true" />
      </a>
    </section>
  );
}

function ValuePropositionsSection() {
  const values = [
    { icon: "✧", title: "Ethically Sourced", description: "Conflict-free certified brilliance" },
    { icon: "⌘", title: "Bespoke Atelier", description: "Handcrafted to custom measure" },
    { icon: "↗", title: "Insured Delivery", description: "Complimentary insured delivery" },
    { icon: "♡", title: "Lifetime Care", description: "Considered care for every heirloom" },
  ];

  return (
    <section className="diva-values -mt-12" aria-label="The DIVA promise">
      <div className="diva-values__inner">
        {values.map((item) => (
          <div className="diva-value" key={item.title}>
            <span className="diva-value__icon" aria-hidden="true">{item.icon}</span>
            <span className="diva-value__copy">
              <strong>{item.title}</strong>
              <small>{item.description}</small>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function CollectionsSection() {
  return (
    <section className="diva-collections diva-section" id="collections">
      <div className="diva-section-heading">
        <div>
          <p className="diva-eyebrow">Les Collections</p>
          <h2>The Atelier Curations</h2>
        </div>
        <p>
          Explore iconic jewellery categories conceived to transition seamlessly from daily intimacy
          to gala splendour.
        </p>
      </div>

      <div className="diva-collection-grid">
        {collections.map((collection) => (
          <Link className="diva-collection-card" to={collection.path} key={collection.number}>
            <div className={`diva-collection-card__image ${collection.shape}`}>
              <img src={collection.image} alt={collection.title} loading="lazy" />
              <span className="diva-collection-card__number">{collection.number}</span>
              <span className="diva-round-arrow" aria-hidden="true"><ArrowUpRight size={19} /></span>
            </div>
            <div className="diva-collection-card__copy">
              <div>
                <h3>{collection.title}</h3>
                <p className="diva-collection-card__subtitle">{collection.subtitle}</p>
              </div>
              <p className="diva-collection-card__description">{collection.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function AtelierSection() {
  const [metal, setMetal] = useState("rose-gold");
  const currentMetal = metalDetails[metal];

  return (
    <section className="diva-atelier diva-section" id="atelier">
      
      <div className="diva-atelier__visual">
        <img src={ASSETS.atelier} alt="A glimpse into the meticulous craft of the DIVA atelier" loading="lazy" />
        <div className="diva-atelier__image-caption">
          <span className="diva-eyebrow">Atelier Métier d'Art</span>
          <p>Over 40 hours of hand-forged dedication per master jewel.</p>
        </div>
        <div className="diva-atelier__seal"><Diamond size={22} /><span>100%<br />RECYCLED GOLD</span></div>
      </div>
      
      {/* <div className="diva-hero-product">
        <span className="diva-hero-product__kicker">Maison Signature</span>
        <strong>Solitaire &amp; South Sea Luminescence</strong>
        <span>18K Recycled Rose Gold · Natural Diamond</span>
        <div className="diva-hero-product__bottom">
          <span>$1,850</span>
          <span className="diva-certified"><Check size={13} /> Ethical origin</span>
        </div>
      </div> */}

      <div className="diva-atelier__copy">
        <p className="diva-eyebrow">Our Philosophy</p>
        <h2>The Art of <em>Ethical Radiance.</em></h2>
        <p className="diva-atelier__intro">
          At DIVA, every creation is an intimate dialogue between timeless Parisian artistry and
          modern ecological consciousness.
        </p>
        <p>
          We source exclusively non-invasive gemstones, conflict-free stones, and certified circular
          gold alloys. Our master stone-setters sculpt settings that amplify natural refraction
          without compromising structural endurance, ensuring your heirloom endures across generations.
        </p>

        <div className="diva-metal-selector">
          <p className="diva-eyebrow">Explore precious alloys &amp; finish</p>
          <div className="diva-metal-selector__options" role="group" aria-label="Choose metal finish">
            {Object.entries(metalDetails).map(([key, value]) => (
              <button
                type="button"
                key={key}
                className={`diva-metal-pill${metal === key ? " is-selected" : ""}`}
                aria-pressed={metal === key}
                onClick={() => setMetal(key)}
              >
                <span className={`diva-metal-swatch diva-metal-swatch--${key}`} />
                {value.label}
              </button>
            ))}
          </div>
          <p className="diva-metal-selector__description" aria-live="polite">{currentMetal.description}</p>
        </div>

        <EditorialLink to="/about">Read the Atelier Chronicle</EditorialLink>
      </div>
    </section>
  );
}

// function ProductCard({ product, onAddToWishlist, isSaved }) {
//   return (
//     <article className="diva-product-card">
//       <Link to={product.path} className="diva-product-card__image">
//         <img src={product.image} alt={product.name} loading="lazy" />
//         <span className="diva-product-card__badge">{product.badge}</span>
//       </Link>
//       <button
//         className={`diva-product-card__wishlist${isSaved ? " is-saved" : ""}`}
//         type="button"
//         aria-label={isSaved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
//         aria-pressed={isSaved}
//         onClick={() => onAddToWishlist(product.name)}
//       >
//         <Heart size={18} fill={isSaved ? "currentColor" : "none"} strokeWidth={1.5} />
//       </button>
//       <div className="diva-product-card__details">
//         <Link to={product.path} className="diva-product-card__name">{product.name}</Link>
//         <p>{product.detail}</p>
//         <div className="diva-product-card__bottom">
//           <strong>{product.price}</strong>
//           <Link to={product.path} aria-label={`View ${product.name}`}><ArrowUpRight size={17} /></Link>
//         </div>
//       </div>
//     </article>
//   );
// }

// function FeaturedProductsSection() {
//   const [category, setCategory] = useState("All Pieces");
//   const [saved, setSaved] = useState([]);

//   const filteredProducts = useMemo(() => {
//     if (category === "All Pieces") return products;
//     if (category === "Rings") return products.filter((product) => /ring|solitaire/i.test(product.name));
//     if (category === "Necklaces") return products.filter((product) => /pendant/i.test(product.name));
//     return products.filter((product) => /studs/i.test(product.name));
//   }, [category]);

//   const toggleWishlist = (name) => {
//     setSaved((current) => current.includes(name)
//       ? current.filter((item) => item !== name)
//       : [...current, name]);
//   };

//   return (
//     <section className="diva-featured diva-section" id="featured">
//       <div className="diva-section-heading diva-section-heading--center">
//         <div>
//           <p className="diva-eyebrow">Haute Curations</p>
//           <h2>Featured Icons <em>&amp; New Arrivals</em></h2>
//         </div>
//         <p>Considered forms. Exceptional materials. Treasures to be passed on.</p>
//       </div>

//       <div className="diva-product-toolbar">
//         <div className="diva-product-tabs" role="group" aria-label="Filter featured products">
//           {["All Pieces", "Rings", "Necklaces", "Earrings"].map((item) => (
//             <button
//               type="button"
//               key={item}
//               className={category === item ? "is-active" : ""}
//               aria-pressed={category === item}
//               onClick={() => setCategory(item)}
//             >
//               {item}
//             </button>
//           ))}
//         </div>
//         <Link className="diva-product-toolbar__all" to="/products">View all pieces <ArrowUpRight size={15} /></Link>
//       </div>

//       <div className="diva-product-grid">
//         {filteredProducts.map((product) => (
//           <ProductCard
//             key={product.name}
//             product={product}
//             isSaved={saved.includes(product.name)}
//             onAddToWishlist={toggleWishlist}
//           />
//         ))}
//       </div>

//       <div className="diva-featured__footer">
//         <EditorialLink to="/products">Discover the complete 2026 collection (48 pieces)</EditorialLink>
//       </div>
//       {saved.length > 0 && (
//         <p className="diva-saved-feedback" role="status">
//           {saved.length} {saved.length === 1 ? "piece" : "pieces"} saved for this browsing session.
//           Sign in to keep your wishlist across devices.
//         </p>
//       )}
//     </section>
//   );
// }


const FILTERS = ["All Pieces", "Rings", "Necklaces", "Earrings"];

function ProductCard({ product, isSaved, onAddToWishlist, onAddToCart }) {
  return (
    <article className="diva-pcard">
      <div className="diva-pcard__frame">
        <div className="diva-pcard__image">
          <img src={product.image} alt={product.name} loading="lazy" />

          <button
            type="button"
            className={`diva-pcard__heart ${isSaved ? "is-saved" : ""}`}
            aria-pressed={isSaved}
            aria-label={isSaved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
            onClick={() => onAddToWishlist(product.name)}
          >
            <Heart size={17} fill={isSaved ? "currentColor" : "none"} />
          </button>

          {product.badge && <span className="diva-pcard__tag">{product.badge}</span>}
        </div>
      </div>

      <div className="diva-pcard__body">
        <h3>{product.name}</h3>
        <p>{product.detail}</p>
        <p className="diva-pcard__material">{product.material}</p>

        <div className="diva-pcard__bottom">
          <span className="diva-pcard__price">{product.price}</span>
          <button type="button" className="diva-pcard__add text-white" onClick={() => onAddToCart?.(product)}>
            <ShoppingBag size={14} aria-hidden="true" className="text-white" /> <span className="text-white"> Add </span>
          </button>
        </div>
      </div>
    </article>
  );
}

function FeaturedProductsSection() {
  const [category, setCategory] = useState("All Pieces");
  const [saved, setSaved] = useState([]);

  const filteredProducts = useMemo(() => {
    if (category === "All Pieces") return products;
    if (category === "Rings") return products.filter((p) => /ring|solitaire/i.test(p.name));
    if (category === "Necklaces") return products.filter((p) => /pendant/i.test(p.name));
    return products.filter((p) => /studs/i.test(p.name));
  }, [category]);

  const toggleWishlist = (name) => {
    setSaved((current) =>
      current.includes(name) ? current.filter((i) => i !== name) : [...current, name]
    );
  };

  return (
    <section className="diva-featured diva-section" id="featured">
      <div className="diva-featured__head">
        <div>
          <p className="diva-eyebrow">Haute Curations</p>
          <h2>Featured Icons &amp; New Arrivals</h2>
        </div>

        <div className="diva-pills" role="group" aria-label="Filter featured products">
          {FILTERS.map((item) => (
            <button
              type="button"
              key={item}
              className={category === item ? "is-active" : ""}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="diva-pgrid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.name}
            product={product}
            isSaved={saved.includes(product.name)}
            onAddToWishlist={toggleWishlist}
          />
        ))}
      </div>

      <div className="diva-featured__footer">
        <Link className="diva-outline-cta" to="/products">
          Discover complete 2026 collection (48 pieces) <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>

      {saved.length > 0 && (
        <p className="diva-saved-feedback" role="status">
          {saved.length} {saved.length === 1 ? "piece" : "pieces"} saved for this browsing session.
          Sign in to keep your wishlist across devices.
        </p>
      )}
    </section>
  );
}





function BespokeSection() {
  const steps = [
    {
      number: "01 / CONCEPT",
      title: "Design Salon",
      description: "One-on-one virtual or in-person consultation with a lead gemologist.",
    },
    {
      number: "02 / VISUALIZATION",
      title: "3D Wax Casting",
      description: "Photorealistic 3D render preview followed by a precision hand mock-up.",
    },
    {
      number: "03 / CREATION",
      title: "Master Forging",
      description: "Artisanal hand-setting, micro-pavé detailing, and hallmarking.",
    },
  ];

  return (
    <section className="diva-bespoke diva-section" id="bespoke">
      <div className="diva-bespoke__panel">
        <p className="diva-eyebrow">Custom Commissions</p>
        <h2>Your Narrative, Cast in<br />Timeless Gold.</h2>
        <p className="diva-bespoke__intro">
          Collaborate directly with our master jewellers to envision custom engagement rings,
          anniversary talismans, or reincarnate heirloom gemstones into breathtaking contemporary silhouettes.
        </p>
        <div className="diva-bespoke-steps">
          {steps.map((step) => (
            <article key={step.number}>
              <span className="diva-bespoke-steps__eyebrow">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
        <div className="diva-bespoke__actions">
          <Link className="diva-button diva-button--gold" to="/bespoke-consultations">
            Begin your custom piece <ArrowUpRight size={16} />
          </Link>
          <p className="diva-bespoke__timeline"><Check size={14} /> Typical timeline: 3–4 weeks from sketch to delivery</p>
        </div>
      </div>
    </section>
  );
}

function PressSection() {
  return (
    <section className="diva-press diva-section" aria-label="Press and collector testimonial">
      <div className="diva-press__quotes">
        <div><span>VOGUE</span><p>“A modern renaissance of ethical high jewellery that places quiet elegance over excess.”</p></div>
        <div><span>VANITY FAIR</span><p>“DIVA transforms precious metals into poetry. Every silhouette feels uniquely personal.”</p></div>
        <div><span>ELLE HAUTE</span><p>“Ethical sourcing meets Paris atelier finesse. A triumph in conscious luxury.”</p></div>
      </div>
      <article className="diva-testimonial">
        <img className="diva-testimonial__avatar" src={ASSETS.testimonial} alt="DIVA verified collector" loading="lazy" />
        <div className="diva-testimonial__content">
          <div className="diva-testimonial__stars" aria-label="5 out of 5 stars">★★★★★</div>
          <blockquote>
            “My bespoke ring arrived in magnificent velvet packaging with an authenticated certificate of origin.
            The craftsmanship is breathtaking — catching light in the softest, most enchanting way.”
          </blockquote>
          <p>— Hélène de Montmirail, Genève <span>· Verified Collector</span></p>
        </div>
      </article>
    </section>
  );
}

function GallerySection() {
  const gallery = [
    [ASSETS.gallery1, "A collector wearing a DIVA jewellery piece"],
    [ASSETS.gallery2, "An editorial detail of a DIVA jewellery look"],
    [ASSETS.gallery3, "A DIVA jewellery piece styled for an occasion"],
    [ASSETS.gallery4, "A close-up of a DIVA jewellery creation"],
  ];

  return (
    <section className="diva-gallery diva-section">
      <div className="diva-section-heading">
        <div>
          <p className="diva-eyebrow">The Living Gallery</p>
          <h2>Styled by <em>discerning collectors.</em></h2>
        </div>
        <a className="diva-social-link" href="https://www.instagram.com/" target="_blank" rel="noreferrer">
          <Instagram size={17} /> @DIVA.HAUTEJOAILLERIE <ArrowUpRight size={14} />
        </a>
      </div>
      <div className="diva-gallery-grid">
        {gallery.map(([image, alt], index) => (
          <a
            className={`diva-gallery-card diva-gallery-card--${index + 1}`}
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            key={image}
            aria-label={`${alt}; open Instagram`}
          >
            <img src={image} alt={alt} loading="lazy" />
            <span><Instagram size={18} /></span>
          </a>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="diva-home">
      <div className="diva-home__content">
        <HeroSection />
        <ValuePropositionsSection />
        <CollectionsSection />
        <AtelierSection />
        <FeaturedProductsSection />
        <BespokeSection />
        <PressSection />
        <GallerySection />
      </div>
      <ChatButton />
    </div>
  );
}
