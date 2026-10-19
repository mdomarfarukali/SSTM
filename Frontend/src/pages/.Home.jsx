import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Diamond,
  Heart,
  Instagram,
  Menu,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import "./Home.css";

const ASSETS = {
  logo: "https://lh3.googleusercontent.com/aida/AEtjO1XZ-sy9-20S3OHxJh_LDy_ZSX6m5RslLsBeWhQeEDuGm97rdW289ZzQQPcXYVC_ZxWLuaS7YZjxQvotWQ3JE8G3kX_SwyvzwIn4VWbtdw-JCSwXqzSvxqw5RPyDb-kGA--gphG8V3P8O3aMfBLQCsYk0hn1ebBpYfCh_yy4L_nQBdYXTeAMJCncw73D97qROSkDAI2fz2CLKfxmjh8oQWKjk8uFpnw_NUFfkx0-dHMVeXzV1rlcSEd6hsqK",
  hero: "https://lh3.googleusercontent.com/aida/AEtjO1XZ-sy9-20S3OHxJh_LDy_ZSX6m5RslLsBeWhQeEDuGm97rdW289ZzQQPcXYVC_ZxWLuaS7YZjxQvotWQ3JE8G3kX_SwyvzwIn4VWbtdw-JCSwXqzSvxqw5RPyDb-kGA--gphG8V3P8O3aMfBLQCsYk0hn1ebBpYfCh_yy4L_nQBdYXTeAMJCncw73D97qROSkDAI2fz2CLKfxmjh8oQWKjk8uFpnw_NUFfkx0-dHMVeXzV1rlcSEd6hsqK",
  rings: "https://lh3.googleusercontent.com/aida-public/AB6AXuAf9k0MGVCzwOEvxTZdHuCFv5cOKzAISt0TiGfFPSY1pftgBtngG4FtLjiGJR3AH2QuQcTAR4jnIQ12zk4MaOZC-RJd2m6CP9VDYhotOclVhTzrB9lzwndg_SvlRbpLgi6AZR8LrsLSH0NtlVQPbqV-eHtyVfEOVP0sS0PzyUnl1_kzBn-95InetDlkIW2F7KWa3Bw_ZPOUTTmyJCLFl4lQZ0bYpQz3w0AmpyzdRjqNupPpe8XoRPGy5g",
  necklaces: "https://lh3.googleusercontent.com/aida-public/AB6AXuDa7jTqnukqHgEM4o7AJ9oaJI9FUJMtNDxCArAPAw89doTkAOVsg87cCmgwSWKOjrCY3k_sp_t-bUKyKHg5AKNiL4MC-D9SCgrrZWvALoSNh8yXeApGSLrk2saCZi1iCUMQVdGuZBUxDG_NgAwzZyUWNigaFifDH5vaybqvcwQhy6QZomzZyA9yEkHIQzNB99rwWlXdaa4PBtP467_J2LWkT4dHUeLEK3Ran0ebBdrek0lbxl2OVhgKEg",
  earrings: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRz0XcqR2846NO6KL2E7Y4gVFOxpHG6V5NAm0m08ot6-vzF-Osuf_Kicg7_sz4JjPR1uWyrs4RYcWaC-nQfiwCciSGXf8qQQstxM8TlZEQDUlox-4NAJgE0L37sFFmpMfPctW_UP4G3i2pXroVMoVOZp2P3Xt934vo4oeK2_FjoqfKy98AJ9xxA4VRXPTdNJwltVMbUxKY2eJtTb5UPTdmNXDUTxmmCO92157Y1Ri88WH29SJ84ViDnA",
  favorites: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0yNRykAn7ivRuF1KpKjuX7pXaKGgmZGUXcX4lxOlZGoBorZoMfcoBQpIZZXcD5ruAuimM7f38GZ2ByMH_CXlt8-sDlyalBT9VrW3I2pvKQe57LWMtYd0Ju4Gj5zoL5-f0hK_nWpIaIfp-IqU8wPcpzS6DqlS1MaKs_IjltqhP7w9qewEIpJM2utn3C3MMCZsjSlVLrCwo0NgsSAWamjHuH-YT8qcvysxaBPRs0ZmDWgHRpLTFrzHWYg",
  atelier: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdXevRZKxLfVSS2XZCS_J_cPlSXHsd15LS6EvvhEQkpVZ_8nIafha45IrOTqLtudxk0q9yO3QhLZnCwP5FDeaUCm83G1hNJ90eugVfyskJQ2Xh1es0gIrSKtNrfgybDxsnl6knNaBm4bd8ivXmnAxDjJ5sTWOOY4KdBYdkzZVMnzulrxwVO39ubcPQyTAuRTYJxg-ZOK-w214jbXKz6ln4HcxJeIuOP0n_rUlAwT42wtCaUL4Tr9p_Vw",
  product1: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnqgQkfjI4XXYK6kAdFwkODoTU0I76M_jJRyqY-E81Cah_5zNHvtTqumRdH8De8YOCxt4jch0mNDgOfGpiAfCzQcf9_4ot7foMNKQJmJQICu20SifmT1HIej8oTKf5VkbMGzFWIW2ylvdYMAKK3jhF9Az9B8Oifmn6Yj6lIY4S06Iwj5fh9Rjf8ZQZwhBAOyqW03fDJvg1-BBvQlNThD8SsppdO-qyLqxK5U8LJ0t-gkaUCg_lcXvP2A",
  product2: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVF55ITz8d5DWVqJo8pULo7QMlXbK4TkxfuNiSostniBKuCJWihhMn7EA4XltD8aJbLc8nxdjLFKFc571pA45dqJpKGlQpTlAFBTFcI6wuYK82fc98bk1RRFig-IdNOnIt0L3FE3FKmiQ4hTaTDeAET2U2LLEWRQ93cJbmY70MKuDpi3MDKkRRXShzM4JfTnSn0oQ4i8WmjQHsuBSv1lYM9o_e9Yb6wM52thYLgeH5RM8_WHp6CdaTYg",
  product3: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCMJ9O3Xu_0H_gaJm_7CdIz6iK2VxnpjkV5V4rVkvTpKmLpLkoylnI3FoMn8t5BcnoK-ZWVjUMDYPk-diyUBnoX7PnP_gWdfkreeF1E6idVC7y66NgDkNwwwa4Gv_h4lBNl1f5nitb6GDvPKai4KAlm27uZQgpxtQpIRryvbRr2bBSr2BZ9qvJayUZIIkmdEucG5n03GMsSAhT034_f2uTt_Hu54Yzd8s7hAggBjZZGEugoXlMdtCxcQ",
  product4: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8UIGoigmwnhg_nA8THKa6ZGNx7yYRJAqmru80IvRu8LvTXSDGEjXP_Qw0VnQbO9wm2j0Qwgtbpu-gyKyprmaMtO7RrI05cyWBqDwI0scIBXY1dGdzfpKTZGhBdgO7QfQFy0m12qbvzd35ks8YmKDhsZbV6O99rwJRo5luIfuzvw4MFVFxEsNFKLX1VBSHzLLERPyjJ-Tt4RhLm7AhfYNWFlRuUu9-gMnPEDf1OdOKU_QKu0bHvsF1fA",
  commission: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2oZaJ8M5WBxLQ9jEFNAxybePIFo2vC20PzwiH95Ph1ydz9nCD8MO9XLsdRvIitUggEK78bI0t2zx1lPMRDhY5X9gfWtNcz0XYb1ocT9l8HwR8sI6rUHSAfBOXr9CpgFlIsFilY9S9hUsraKwwrgMSEW-ohGdwYqvTXpEAXk7yr7W16p1WKYLz_XjGx8AfeOkw4ql-QBgIGMlPpoAS91vHImF8gRbDwLJagRAi6eUp6mYs2s29R0QmPw",
  testimonial: "https://lh3.googleusercontent.com/aida/AEtjO1XZ-sy9-20S3OHxJh_LDy_ZSX6m5RslLsBeWhQeEDuGm97rdW289ZzQQPcXYVC_ZxWLuaS7YZjxQvotWQ3JE8G3kX_SwyvzwIn4VWbtdw-JCSwXqzSvxqw5RPyDb-kGA--gphG8V3P8O3aMfBLQCsYk0hn1ebBpYfCh_yy4L_nQBdYXTeAMJCncw73D97qROSkDAI2fz2CLKfxmjh8oQWKjk8uFpnw_NUFfkx0-dHMVeXzV1rlcSEd6hsqK",
  gallery1: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3NCRAuUWYblWcgFDHzmo-pRtHCiD7uR3ALr3gjsF67gWJdLaC2op9NSfUCkzfyiowNf7fTBc8VMm18jqEDUK_bVqFy5zo1jJKQmcDZ3d6SjrPPtH5pfEYztBa4RGtBQdPmFnglNyUpr0cd67sSxe-BxTdeekvubaZudIp2qMMgVN3ZHsUCbor09t4um7rKnQL4cHVxg3yKNgqC68rUzQRsj5zbhu8yo-lJqUO34wZavX7Pm8PW4f8gQ",
  gallery2: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZp42J38M15ZVY_yJUi7LTGFCP_5wimegpZwMCIZhvRW1heY7_YzvUc9g2YIik6gmxFp92AQXmUquvcbOmA68ZVnJ-YbmUM9mUKC3ik_gQzUleDzZ5q-kH9K3-OklKUdprxaIvCg8aOOMLTvP1uepkAgrIlWI31_xPAUcxCTIzWav5rQ7ADDGhMdhJE2-f548TG4TMXpc4q0Z4ACWZnXMIh1IRYOZztdxpaLdUkWvDkmqr2XNIgZ-M_w",
  gallery3: "https://lh3.googleusercontent.com/aida-public/AB6AXuClxummn7VnqQ4-cX71XXazvWSGO_kP0-zs2b4SSk2W2HD1ezamGq37BOJZf_qywEVW9eXzXjbhjqEctDzLYxBcN2pPlALVmo1Oh7vpaJWNfcDKiIMpQIXNwA63dPrfmxVmpM1dWOQNgpgftNnT0jJkM-g_fwLUmZbLr29J-1xm7zplimJE3-ekIaE-j7Ut-i9fcxnXQllPKcYT8SJMWUq7-kvU4Wz9RNU1TrBo3nX09edyPixv-a5m2w",
  gallery4: "https://lh3.googleusercontent.com/aida-public/AB6AXuCaubzgXS6Cb3A7ZMT7FdaL0zU1YhKuJ6J2yszX1tZp16fGQ06REe1AGmIbLIDL3bVWFT_rpisvAkTQJlBvPEk9TdGyXu5g7c1FQ1xdpg8PGF-gvl2rTxVv2si1fCiXvP9jHr_0tPAxx4qcUo-4bZ3vvUq66-rBLL0-ZlT-rs4A0SR3e4iBRmp8Cil37mfKpIKabW79vMx01Ng7Z9u8w6t7VA2SR-x218tPRrW1SQvrCBoetWtS--cuUw",
};

const collections = [
  {
    number: "01 / BAGUES",
    title: "High Artistry Rings",
    subtitle: "Symbol of eternal love",
    description: "Solitaires, hand-carved organic vine bands, and bespoke gemstone halos.",
    image: ASSETS.rings,
    path: "/products?category=rings",
    shape: "organic-a",
  },
  {
    number: "02 / COLLIERS",
    title: "Layering Signature",
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

function BrandMark({ footer = false }) {
  return (
    <Link className={`diva-brand${footer ? " diva-brand--footer" : ""}`} to="/" aria-label="DIVA home">
      <span className="diva-brand__name">DIVA</span>
      <span className="diva-brand__sub">HAUTE JOAILLERIE</span>
    </Link>
  );
}

function EditorialLink({ to, children, className = "" }) {
  return (
    <Link className={`diva-editorial-link ${className}`} to={to}>
      <span>{children}</span>
      <ArrowRight aria-hidden="true" size={15} strokeWidth={1.5} />
    </Link>
  );
}

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="diva-header">
        <div className="diva-announcement">
          Complimentary insured delivery worldwide on orders over $200
          <span aria-hidden="true"> — </span>
          Ethical hand-set brilliance
        </div>
        <div className="diva-header__main">
          <button
            type="button"
            className="diva-icon-button diva-mobile-menu"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>

          <nav className="diva-nav diva-nav--left" aria-label="Primary navigation">
            <Link to="/products?category=collections">Collections</Link>
            <Link to="/products?category=rings">Rings</Link>
            <Link to="/products?category=necklaces">Necklaces</Link>
          </nav>

          <BrandMark />

          <nav className="diva-nav diva-nav--right" aria-label="Jewellery and atelier">
            <Link to="/products?category=earrings">Earrings</Link>
            <Link to="/products?category=high-jewelry">High Jewelry</Link>
            <Link to="/about">The Atelier</Link>
          </nav>

          <div className="diva-header__actions">
            <button
              type="button"
              className="diva-icon-button"
              aria-label="Search products"
              onClick={() => setSearchOpen((open) => !open)}
            >
              <Search size={19} strokeWidth={1.5} />
            </button>
            <Link className="diva-icon-button diva-header__optional" to="/wishlist" aria-label="Wishlist">
              <Heart size={19} strokeWidth={1.5} />
            </Link>
            <Link className="diva-icon-button diva-header__optional" to="/account" aria-label="Your account">
              <UserRound size={19} strokeWidth={1.5} />
            </Link>
            <Link className="diva-icon-button" to="/cart" aria-label="Shopping bag">
              <ShoppingBag size={19} strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {searchOpen && (
          <form
            className="diva-search-bar"
            onSubmit={(event) => {
              event.preventDefault();
              const query = searchTerm.trim();
              if (query) window.location.href = `/products?search=${encodeURIComponent(query)}`;
            }}
          >
            <Search size={17} aria-hidden="true" />
            <input
              autoFocus
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search fine jewellery..."
              aria-label="Search fine jewellery"
            />
            <button type="submit">Search</button>
          </form>
        )}
      </header>

      {menuOpen && (
        <div className="diva-mobile-drawer">
          <nav aria-label="Mobile navigation">
            {[
              ["Collections", "/products?category=collections"],
              ["Rings", "/products?category=rings"],
              ["Necklaces", "/products?category=necklaces"],
              ["Earrings", "/products?category=earrings"],
              ["High Jewelry", "/products?category=high-jewelry"],
              ["The Atelier", "/about"],
              ["Bespoke Consultations", "/bespoke-consultations"],
            ].map(([label, to]) => (
              <Link key={label} to={to} onClick={closeMenu}>
                {label}
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}

function HeroSection() {
  return (
    <section className="diva-hero">
      <div className="diva-hero__copy">
        <p className="diva-eyebrow">Maison de Haute Joaillerie · Paris &amp; New York</p>
        <h1>Handcrafted Brilliance, <em>Timeless Devotion.</em></h1>
        <p className="diva-hero__description">
          Discover exclusive, ethically sourced jewellery. From classic solitaires to modern
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
        <div className="diva-hero__note">
          <span className="diva-hero__note-icon"><ShieldCheck size={18} /></span>
          <span>
            <strong>Complimentary express shipping</strong>
            <small>On all orders over $200</small>
          </span>
        </div>
      </div>

      <div className="diva-hero__visual">
        <div className="diva-hero__image-wrap">
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

function CollectionsSection() {
  return (
    <section className="diva-collections diva-section" id="collections">
      <div className="diva-section-heading">
        <div>
          <p className="diva-eyebrow">Les Collections</p>
          <h2>Curations for <em>every chapter.</em></h2>
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

      <div className="diva-atelier__copy">
        <p className="diva-eyebrow">Our Philosophy</p>
        <h2>The art of <em>ethical radiance.</em></h2>
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

function ProductCard({ product, onAddToWishlist, isSaved }) {
  return (
    <article className="diva-product-card">
      <Link to={product.path} className="diva-product-card__image">
        <img src={product.image} alt={product.name} loading="lazy" />
        <span className="diva-product-card__badge">{product.badge}</span>
      </Link>
      <button
        className={`diva-product-card__wishlist${isSaved ? " is-saved" : ""}`}
        type="button"
        aria-label={isSaved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        aria-pressed={isSaved}
        onClick={() => onAddToWishlist(product.name)}
      >
        <Heart size={18} fill={isSaved ? "currentColor" : "none"} strokeWidth={1.5} />
      </button>
      <div className="diva-product-card__details">
        <Link to={product.path} className="diva-product-card__name">{product.name}</Link>
        <p>{product.detail}</p>
        <div className="diva-product-card__bottom">
          <strong>{product.price}</strong>
          <Link to={product.path} aria-label={`View ${product.name}`}><ArrowUpRight size={17} /></Link>
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
    if (category === "Rings") return products.filter((product) => /ring|solitaire/i.test(product.name));
    if (category === "Necklaces") return products.filter((product) => /pendant/i.test(product.name));
    return products.filter((product) => /studs/i.test(product.name));
  }, [category]);

  const toggleWishlist = (name) => {
    setSaved((current) => current.includes(name)
      ? current.filter((item) => item !== name)
      : [...current, name]);
  };

  return (
    <section className="diva-featured diva-section" id="featured">
      <div className="diva-section-heading diva-section-heading--center">
        <div>
          <p className="diva-eyebrow">Haute Curations</p>
          <h2>Featured icons <em>&amp; new arrivals.</em></h2>
        </div>
        <p>Considered forms. Exceptional materials. Treasures to be passed on.</p>
      </div>

      <div className="diva-product-toolbar">
        <div className="diva-product-tabs" role="group" aria-label="Filter featured products">
          {["All Pieces", "Rings", "Necklaces", "Earrings"].map((item) => (
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
        <Link className="diva-product-toolbar__all" to="/products">View all pieces <ArrowUpRight size={15} /></Link>
      </div>

      <div className="diva-product-grid">
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
        <EditorialLink to="/products">Discover the complete 2026 collection (48 pieces)</EditorialLink>
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
  return (
    <section className="diva-bespoke diva-section" id="bespoke">
      <div className="diva-bespoke__visual">
        <img src={ASSETS.commission} alt="An intimate view of a bespoke jewellery creation" loading="lazy" />
        <span className="diva-bespoke__stamp"><Sparkles size={17} /> Made for you</span>
      </div>
      <div className="diva-bespoke__copy">
        <p className="diva-eyebrow">Custom Commissions</p>
        <h2>Your narrative, cast in <em>timeless gold.</em></h2>
        <p className="diva-bespoke__intro">
          Collaborate directly with our master jewellers to envision custom engagement rings,
          anniversary talismans, or reincarnate heirloom gemstones into breathtaking contemporary silhouettes.
        </p>
        <div className="diva-bespoke-steps">
          <div><span>01</span><div><h3>Concept Design Salon</h3><p>One-on-one virtual or in-person consultation with a lead gemologist.</p></div></div>
          <div><span>02</span><div><h3>Visualisation &amp; 3D Wax Casting</h3><p>A photorealistic render preview followed by a precision hand mock-up.</p></div></div>
          <div><span>03</span><div><h3>Master Forging</h3><p>Artisanal hand-setting, micro-pavé detailing, and hallmarking.</p></div></div>
        </div>
        <Link className="diva-button diva-button--primary" to="/bespoke-consultations">
          Begin your custom piece <ArrowUpRight size={16} />
        </Link>
        <p className="diva-bespoke__timeline"><Check size={14} /> Typical timeline: 3–4 weeks from sketch to delivery</p>
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
      <div className="diva-testimonial">
        <div className="diva-testimonial__stars" aria-label="5 out of 5 stars">★★★★★</div>
        <blockquote>
          “My bespoke ring arrived in magnificent velvet packaging with an authenticated certificate
          of origin. The craftsmanship is breathtaking — catching light in the softest, most enchanting way.”
        </blockquote>
        <p>— Hélène de Montmirail, Genève <span>· Verified Collector</span></p>
      </div>
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

function SiteFooter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <footer className="diva-footer">
      <div className="diva-footer__main">
        <div className="diva-footer__brand">
          <BrandMark footer />
          <p>Crafting memories with elegance and shine. Jewellery that defines timeless beauty.</p>
          <p className="diva-footer__small">
            Each jewel is meticulously conceived in our atelier, uniting the poetry of precious
            materials with the devotion of master artisans.
          </p>
          <div className="diva-footer__socials">
            <a href="https://www.instagram.com/" aria-label="Instagram" target="_blank" rel="noreferrer"><Instagram size={17} /></a>
          </div>
        </div>

        <div className="diva-footer__links">
          <div><h3>Explore</h3><Link to="/products">All Jewellery</Link><Link to="/products?category=rings">Rings</Link><Link to="/products?category=necklaces">Necklaces</Link><Link to="/products?category=earrings">Earrings</Link><Link to="/about">About the Atelier</Link></div>
          <div><h3>Client Care</h3><Link to="/help-center">Contact &amp; Concierge</Link><Link to="/faqs">FAQs</Link><Link to="/shipping-returns">Shipping &amp; Returns</Link><Link to="/track-order">Track an Order</Link><Link to="/care-guide">Jewellery Care</Link></div>
          <div><h3>Maison DIVA</h3><Link to="/about">Our Story</Link><Link to="/bespoke-consultations">Bespoke Consultations</Link><Link to="/privacy-policy">Privacy Policy</Link><Link to="/terms-conditions">Terms &amp; Conditions</Link></div>
        </div>

        <div className="diva-footer__newsletter">
          <p className="diva-eyebrow">The DIVA Letter</p>
          <h3>Notes on the art of living beautifully.</h3>
          <p>Discover new collections, atelier stories, and considered gifts.</p>
          <form onSubmit={(event) => { event.preventDefault(); if (email.trim()) setSubmitted(true); }}>
            <label className="diva-sr-only" htmlFor="diva-newsletter-email">Email address</label>
            <input
              id="diva-newsletter-email"
              type="email"
              required
              value={email}
              onChange={(event) => { setEmail(event.target.value); setSubmitted(false); }}
              placeholder="Your email address"
            />
            <button type="submit" aria-label="Subscribe to the DIVA Letter"><ArrowRight size={18} /></button>
          </form>
          {submitted && <p className="diva-newsletter-success" role="status">Thank you. Newsletter integration is not connected yet.</p>}
          <small>By subscribing, you agree to receive occasional notes from DIVA.</small>
        </div>
      </div>
      <div className="diva-footer__bottom">
        <span>© {new Date().getFullYear()} DIVA Haute Joaillerie. All rights reserved.</span>
        <span>Crafted with intention <Diamond size={13} /> Worn forever</span>
        <div><Link to="/privacy-policy">Privacy</Link><Link to="/terms-conditions">Terms</Link></div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="diva-home">
      <SiteHeader />
      <main className="diva-home__main">
        <HeroSection />
        <CollectionsSection />
        <AtelierSection />
        <FeaturedProductsSection />
        <BespokeSection />
        <PressSection />
        <GallerySection />
      </main>
      <SiteFooter />
    </div>
  );
}
