import React from "react";
import { Shield, Gift, Settings, Cookie, CheckCircle, Lock } from "lucide-react";

export default function PrivacyPolicy_() {
  return (
    <div className="bg-pink-50 dark:bg-gray-900 min-h-screen px-6 md:px-16 py-32">
      {/* Page Heading */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-pink-700 dark:text-pink-400 mb-16 text-center tracking-wide font-serif">
        Privacy Policy
      </h1>

      <div className="max-w-5xl mx-auto space-y-14">
        {/* Introduction */}
        <section className="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-3xl shadow-xl hover:shadow-2xl transition relative group">
          <div className="absolute -top-8 left-8 bg-pink-100 dark:bg-pink-700 p-3 md:p-4 rounded-full shadow-md">
            <Shield className="text-pink-600 dark:text-white w-6 md:w-8 h-6 md:h-8" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-pink-600 dark:text-pink-300 mb-4 font-serif">
            Introduction
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg">
            At <strong>DIVA Jewellery</strong>, protecting your privacy is our highest priority.
            This Privacy Policy explains the types of information we collect, how we use it, and
            the measures we take to safeguard your personal data while you browse or shop on our website.
          </p>
        </section>

        {/* Information Collection */}
        <section className="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-3xl shadow-xl hover:shadow-2xl transition relative group">
          <div className="absolute -top-8 left-8 bg-pink-100 dark:bg-pink-700 p-3 md:p-4 rounded-full shadow-md">
            <Gift className="text-pink-600 dark:text-white w-6 md:w-8 h-6 md:h-8" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-pink-600 dark:text-pink-300 mb-4 font-serif">
            Information We Collect
          </h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 md:space-y-3 text-base md:text-lg leading-relaxed">
            <li><strong>Personal Details:</strong> Name, email, address, and phone number required for orders and communication.</li>
            <li><strong>Payment Data:</strong> Secure processing of your orders including credit card or alternative payment details.</li>
            <li><strong>Browsing Behavior:</strong> Cookies and analytics help us understand your preferences and improve your shopping experience.</li>
            <li><strong>Feedback & Reviews:</strong> Any reviews, testimonials, or surveys you submit to help us enhance our services.</li>
          </ul>
        </section>

        {/* Use of Information */}
        <section className="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-3xl shadow-xl hover:shadow-2xl transition relative group">
          <div className="absolute -top-8 left-8 bg-pink-100 dark:bg-pink-700 p-3 md:p-4 rounded-full shadow-md">
            <Settings className="text-pink-600 dark:text-white w-6 md:w-8 h-6 md:h-8" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-pink-600 dark:text-pink-300 mb-4 font-serif">
            How We Use Your Information
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg mb-4">
            We use your information responsibly to provide an exceptional shopping experience:
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 md:space-y-2 text-base md:text-lg leading-relaxed">
            <li>Process orders quickly and accurately.</li>
            <li>Send you important updates about your orders and promotions (with consent).</li>
            <li>Improve website functionality, personalization, and customer support.</li>
            <li>Ensure compliance with legal obligations and prevent fraudulent activities.</li>
          </ul>
        </section>

        {/* Data Security */}
        <section className="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-3xl shadow-xl hover:shadow-2xl transition relative group">
          <div className="absolute -top-8 left-8 bg-pink-100 dark:bg-pink-700 p-3 md:p-4 rounded-full shadow-md">
            <Lock className="text-pink-600 dark:text-white w-6 md:w-8 h-6 md:h-8" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-pink-600 dark:text-pink-300 mb-4 font-serif">
            Data Security
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg">
            Your trust is vital to us. We implement industry-standard security measures, including encryption,
            secure servers, and restricted access, to protect your personal information from unauthorized access,
            loss, or disclosure.
          </p>
        </section>

        {/* Cookies & Analytics */}
        <section className="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-3xl shadow-xl hover:shadow-2xl transition relative group">
          <div className="absolute -top-8 left-8 bg-pink-100 dark:bg-pink-700 p-3 md:p-4 rounded-full shadow-md">
            <Cookie className="text-pink-600 dark:text-white w-6 md:w-8 h-6 md:h-8" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-pink-600 dark:text-pink-300 mb-4 font-serif">
            Cookies & Analytics
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg">
            Our website uses cookies and analytics tools to personalize your experience and analyze traffic.
            You can disable cookies in your browser settings, but some features may not work as intended.
          </p>
        </section>

        {/* Your Consent */}
        <section className="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-3xl shadow-xl hover:shadow-2xl transition relative group">
          <div className="absolute -top-8 left-8 bg-pink-100 dark:bg-pink-700 p-3 md:p-4 rounded-full shadow-md">
            <CheckCircle className="text-pink-600 dark:text-white w-6 md:w-8 h-6 md:h-8" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-pink-600 dark:text-pink-300 mb-4 font-serif">
            Your Consent
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg">
            By using our website, you consent to this Privacy Policy and agree to its terms.
            We may occasionally update this policy, and any changes will be clearly posted on this page.
          </p>
        </section>
      </div>
    </div>
  );
}
