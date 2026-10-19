import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search, Heart, ShoppingBag, UserRound, Menu, X, MapPin,
  Phone, ChevronDown, Sparkles,
} from "lucide-react";
import { useCartContext } from "../../context/CartContext.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";
import lightLogo from "/DIVA_LightCut-removebg-preview.png";
import darkLogo from "/DIVA_Cut-removebg-preview.png";
import "./Navbar.css";

const navigation = [
  { label: "Collections", to: "/products", hasMenu: true },
  { label: "High Jewellery", to: "/products?category=high-jewellery", hasMenu: true },
  { label: "Atelier", to: "/#atelier" },
  { label: "Our Story", to: "/about" },
  { label: "Concierge", to: "/contact" },
];

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { totalItems = 0 } = useCartContext();
  const { theme } = useTheme();

  useEffect(() => {
    if (!mobileOpen && !searchOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [mobileOpen, searchOpen]);

  const submitSearch = (event) => {
    event.preventDefault();
    const query = searchQuery.trim();
    setSearchOpen(false);
    setMobileOpen(false);
    navigate(query ? `/products?search=${encodeURIComponent(query)}` : "/products");
  };

  const logo = theme === "dark" ? darkLogo : lightLogo;

  return (
    <header className="diva-header">
      <div className="diva-utility" aria-label="Store information">
        <div className="diva-header-inner diva-utility-inner">
          <span className="diva-utility-item"><MapPin size={12} aria-hidden="true" /> <span>JEWELLERY, CONSIDERED</span></span>
          <span className="diva-utility-separator" aria-hidden="true" />
          <Link className="diva-utility-item diva-utility-link" to="/contact"><Sparkles size={12} aria-hidden="true" /> <span>PERSONALISED SERVICE</span></Link>
          <Link className="diva-utility-bespoke" to="/contact">BESPOKE ENQUIRIES <span aria-hidden="true">↗</span></Link>
        </div>
      </div>

      <div className="diva-header-inner diva-main-row">
        <Link to="/" className="diva-wordmark" aria-label="DIVA home" onClick={() => setMobileOpen(false)}>
          <img src={logo} alt="" className="diva-logo-mark" />
          <span className="diva-wordmark-divider" aria-hidden="true" />
          <span className="diva-wordmark-copy">
            <span className="diva-wordmark-name">DIVA</span>
            <span className="diva-wordmark-subtitle">MAISON DE JOAILLERIE</span>
          </span>
        </Link>

        <nav className="diva-desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link key={item.label} to={item.to} className="diva-nav-link">
              {item.label}
              {item.hasMenu && <ChevronDown size={11} strokeWidth={1.5} aria-hidden="true" />}
            </Link>
          ))}
        </nav>

        <div className="diva-header-actions">
          <form className={`diva-search ${searchOpen ? "is-open" : ""}`} role="search" onSubmit={submitSearch}>
            <button type="button" className="diva-search-toggle" aria-label={searchOpen ? "Close search" : "Open search"} onClick={() => setSearchOpen((open) => !open)}>
              {searchOpen ? <X size={17} /> : <Search size={17} strokeWidth={1.5} />}
            </button>
            <input
              aria-label="Search jewellery"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search jewellery…"
            />
            {searchOpen && <button className="diva-search-submit" type="submit">Search</button>}
          </form>

          <Link to="/wishlist" className="diva-icon-link diva-desktop-action" aria-label="Wishlist">
            <Heart size={20} strokeWidth={1.5} />
          </Link>
          <Link to="/cart" className="diva-icon-link" aria-label={`Shopping bag, ${totalItems} items`}>
            <ShoppingBag size={20} strokeWidth={1.5} />
            {totalItems > 0 && <span className="diva-count-badge">{totalItems > 99 ? "99+" : totalItems}</span>}
          </Link>

          <span className="diva-action-divider" aria-hidden="true" />
          <Link to="/account" className="diva-account-link" aria-label="My account">
            <span className="diva-account-icon"><UserRound size={17} strokeWidth={1.5} /></span>
            <span className="diva-account-copy"><strong>MY ACCOUNT</strong><small>Sign in / Register</small></span>
          </Link>

          <button type="button" className="diva-mobile-menu-toggle" aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen} onClick={() => setMobileOpen((open) => !open)}>
            {mobileOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <>
          <button type="button" className="diva-mobile-backdrop" aria-label="Close navigation menu" onClick={() => setMobileOpen(false)} />
          <nav className="diva-mobile-panel" aria-label="Mobile navigation">
            <div className="diva-mobile-panel-heading"><span>DISCOVER DIVA</span><button type="button" aria-label="Close menu" onClick={() => setMobileOpen(false)}><X size={20} /></button></div>
            <form className="diva-mobile-search" role="search" onSubmit={submitSearch}>
              <Search size={17} aria-hidden="true" />
              <input aria-label="Search jewellery" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search jewellery…" />
              <button type="submit">Search</button>
            </form>
            {navigation.map((item) => <Link key={item.label} to={item.to} className="diva-mobile-nav-link" onClick={() => setMobileOpen(false)}>{item.label}<span aria-hidden="true">↗</span></Link>)}
            <div className="diva-mobile-secondary-links">
              <Link to="/wishlist" onClick={() => setMobileOpen(false)}><Heart size={17} /> Wishlist</Link>
              <Link to="/cart" onClick={() => setMobileOpen(false)}><ShoppingBag size={17} /> Shopping bag ({totalItems})</Link>
              <Link to="/account" onClick={() => setMobileOpen(false)}><UserRound size={17} /> My account</Link>
            </div>
            <Link to="/contact" className="diva-mobile-concierge" onClick={() => setMobileOpen(false)}><Phone size={15} /> Speak with our concierge</Link>
          </nav>
        </>
      )}
    </header>
  );
}
