import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Globe2,
  ShieldCheck,
  CreditCard,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import "./Footer.css";

const footerGroups = [
  {
    title: "Client Care",
    links: [
      ["Contact the Maison", "/contact"],
      ["Care & Restoration", "/help-center"],
      ["Jewellery Sizing", "/help-center"],
      ["Shipping & Delivery", "/shipping-returns"],
      ["Returns & Exchanges", "/shipping-returns"],
      ["Frequently Asked Questions", "/faqs"],
    ],
  },
  {
    title: "The Collections",
    links: [
      ["High Jewellery", "/products?category=high-jewellery"],
      ["Rings", "/products?category=rings"],
      ["Earrings", "/products?category=earrings"],
      ["Necklaces & Pendants", "/products?category=necklaces"],
      ["Bracelets", "/products?category=bracelets"],
      ["View All Collections", "/products"],
    ],
  },
  {
    title: "The Maison",
    links: [
      ["Our Story", "/about"],
      ["The Art of Craftsmanship", "/about"],
      ["Gemstone Guide", "/help-center"],
      ["Bespoke Creations", "/contact"],
      ["Private Appointments", "/contact"],
    ],
  },
  {
    title: "Legal & Account",
    links: [
      ["My Account", "/account"],
      ["Order Tracking", "/track-order"],
      ["Privacy Policy", "/privacy-policy"],
      ["Terms & Conditions", "/terms-condition"],
      ["Cookie Preferences", "/privacy-policy"],
      ["Accessibility", "/contact"],
    ],
  },
];

function FooterLink({ to, children, className = "" }) {
  return (
    <Link className={className} to={to}>
      {children}
    </Link>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("success");

  function handleSubscribe(event) {
    event.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setFeedbackType("error");
      setFeedback("Please enter a valid email address.");
      return;
    }

    // Frontend-only until a newsletter endpoint is connected.
    setFeedbackType("success");
    setFeedback("Thank you. Newsletter signup will be available when the subscription service is connected.");
  }

  return (
    <footer className="diva-footer" aria-labelledby="diva-footer-heading">
      <h2 className="diva-footer-sr-only" id="diva-footer-heading">DIVA footer</h2>

      <div className="diva-footer-container">
        <section className="diva-footer-intro" aria-label="Brand and newsletter">
          <div className="diva-footer-brand">
            <div className="diva-footer-brand-lockup">
              <img
                className="diva-footer-emblem"
                src="/DIVA_LightCut-removebg-preview.png"
                alt=""
                aria-hidden="true"
              />
              <span className="diva-footer-brand-divider" aria-hidden="true" />
              <span className="diva-footer-brand-copy">
                <span className="diva-footer-wordmark">DIVA</span>
                <span className="diva-footer-brand-subtitle">Maison de Haute Joaillerie · Paris</span>
              </span>
            </div>
            <p className="diva-footer-description">
              Exceptional jewellery, rare gemstones and bespoke creations shaped by Parisian craftsmanship.
            </p>
            <p className="diva-footer-address">18 Place Vendôme, 75001 Paris · Salons Privés</p>
          </div>

          <div className="diva-footer-newsletter">
            <h3>Letters from the Maison</h3>
            <p>Discover new collections, exceptional stones and selected stories from the DIVA ateliers.</p>
            <form className="diva-footer-newsletter-form" onSubmit={handleSubscribe} noValidate>
              <label className="diva-footer-sr-only" htmlFor="diva-footer-email">Your email address</label>
              <div className="diva-footer-email-row">
                <input
                  id="diva-footer-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (feedback) setFeedback("");
                  }}
                  placeholder="Your email address"
                  aria-describedby="diva-footer-newsletter-feedback diva-footer-newsletter-privacy"
                />
                <button type="submit">
                  Subscribe <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
                </button>
              </div>
              <p
                id="diva-footer-newsletter-feedback"
                className={`diva-footer-feedback ${feedback ? `is-${feedbackType}` : ""}`}
                role="status"
                aria-live="polite"
              >
                {feedback}
              </p>
              <p className="diva-footer-privacy-note" id="diva-footer-newsletter-privacy">
                By subscribing, you agree to receive communications from DIVA. You may unsubscribe at any time.
              </p>
            </form>
          </div>
        </section>

        <div className="diva-footer-rule" aria-hidden="true" />

        <nav className="diva-footer-directory" aria-label="Footer navigation">
          <div className="diva-footer-directory-desktop">
            {footerGroups.map((group) => (
              <div className="diva-footer-group" key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.links.map(([label, to]) => (
                    <li key={label}><FooterLink to={to}>{label}</FooterLink></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="diva-footer-directory-mobile">
            {footerGroups.map((group) => (
              <details className="diva-footer-accordion" key={group.title}>
                <summary>
                  <span>{group.title}</span>
                  <ChevronDown size={15} strokeWidth={1.5} aria-hidden="true" />
                </summary>
                <ul>
                  {group.links.map(([label, to]) => (
                    <li key={label}><FooterLink to={to}>{label}</FooterLink></li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </nav>

        <div className="diva-footer-rule" aria-hidden="true" />

        <section className="diva-footer-trust" aria-label="Trust and payment information">
          <div className="diva-footer-trust-item">
            <Globe2 size={17} strokeWidth={1.5} aria-hidden="true" />
            <div>
              <h3>Personal Client Care</h3>
              <p>Assistance with jewellery and bespoke orders.</p>
              <FooterLink to="/contact" className="diva-footer-trust-link">
                Contact the Maison <ArrowRight size={12} aria-hidden="true" />
              </FooterLink>
            </div>
          </div>
          <div className="diva-footer-trust-item">
            <ShieldCheck size={17} strokeWidth={1.5} aria-hidden="true" />
            <div>
              <h3>Secure Shopping</h3>
              <p>Protected checkout and confidential customer information.</p>
            </div>
          </div>
          <div className="diva-footer-trust-item">
            <CreditCard size={17} strokeWidth={1.5} aria-hidden="true" />
            <div>
              <h3>Payment Options</h3>
              <p>Available payment methods are shown securely at checkout.</p>
            </div>
          </div>
        </section>

        <div className="diva-footer-rule" aria-hidden="true" />

        <div className="diva-footer-bottom">
          <div className="diva-footer-legal">
            <span>© {new Date().getFullYear()} DIVA. All rights reserved.</span>
            <span className="diva-footer-dot" aria-hidden="true">·</span>
            <FooterLink to="/privacy-policy">Privacy</FooterLink>
            <span className="diva-footer-dot" aria-hidden="true">·</span>
            <FooterLink to="/terms-condition">Terms</FooterLink>
            <span className="diva-footer-dot" aria-hidden="true">·</span>
            <FooterLink to="/privacy-policy">Cookies</FooterLink>
            <span className="diva-footer-dot" aria-hidden="true">·</span>
            <FooterLink to="/terms-condition">Legal Notice</FooterLink>
          </div>
          <div className="diva-footer-locale" aria-label="Regional preferences">
            <span>India (INR ₹)</span>
            <span className="diva-footer-locale-divider" aria-hidden="true" />
            <span>English</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
