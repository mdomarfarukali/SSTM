import React from "react";
import { FileText, Scale, ShoppingBag, CreditCard, Truck, RefreshCcw, ShieldCheck } from "lucide-react";

export default function TermsConditions() {
  return (
    <div className="bg-pink-50 dark:bg-gray-900 min-h-screen px-6 md:px-16 py-32">
      {/* Page Title */}
      <h1 className="text-5xl font-extrabold text-pink-700 dark:text-pink-400 mb-16 text-center tracking-wide font-serif">
        Terms & Conditions
      </h1>

      <div className="max-w-5xl mx-auto space-y-16">
        {/* 1. Introduction */}
        <section className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-xl hover:shadow-2xl transition relative group">
          <div className="absolute -top-8 left-8 bg-pink-100 dark:bg-pink-700 p-4 rounded-full shadow-md">
            <FileText className="text-pink-600 dark:text-white w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-pink-600 dark:text-pink-300 mb-4 font-serif">
            1. Introduction
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            Welcome to <strong>DIVA Jewellery</strong>. By accessing or using our website or making a purchase from us, you agree to be bound by these Terms & Conditions. Please read them carefully.
          </p>
        </section>

        {/* 2. Use of Our Website */}
        <section className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-xl hover:shadow-2xl transition relative group">
          <div className="absolute -top-8 left-8 bg-pink-100 dark:bg-pink-700 p-4 rounded-full shadow-md">
            <Scale className="text-pink-600 dark:text-white w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-pink-600 dark:text-pink-300 mb-4 font-serif">
            2. Use of Our Website
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            You must be at least 18 years old (or have legal guardian consent) to use our website. You agree not to misuse our site or make any attempt to interfere with security or functionality.
          </p>
        </section>

        {/* 3. Product Descriptions & Pricing */}
        <section className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-xl hover:shadow-2xl transition relative group">
          <div className="absolute -top-8 left-8 bg-pink-100 dark:bg-pink-700 p-4 rounded-full shadow-md">
            <ShoppingBag className="text-pink-600 dark:text-white w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-pink-600 dark:text-pink-300 mb-4 font-serif">
            3. Product Descriptions & Pricing
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            We aim to make all product descriptions, weights, images and prices accurate. However, errors may occur. If we find an error after your order, we will contact you and give you the option to confirm or cancel your order.
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mt-4">
            All prices are in INR and inclusive of applicable taxes unless stated otherwise. We reserve the right to change prices without notice.
          </p>
        </section>

        {/* 4. Orders & Payment */}
        <section className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-xl hover:shadow-2xl transition relative group">
          <div className="absolute -top-8 left-8 bg-pink-100 dark:bg-pink-700 p-4 rounded-full shadow-md">
            <CreditCard className="text-pink-600 dark:text-white w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-pink-600 dark:text-pink-300 mb-4 font-serif">
            4. Orders & Payments
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            After you place an order, you will receive a confirmation email. This does not mean your order is accepted—acceptance happens when the items are shipped or dispatched.
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mt-4">
            Payment must be cleared before shipment. We accept secure payment methods including cards, UPI, wallets. If payment fails, we reserve the right to refuse or cancel the order.
          </p>
        </section>

        {/* 5. Shipping & Delivery */}
        <section className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-xl hover:shadow-2xl transition relative group">
          <div className="absolute -top-8 left-8 bg-pink-100 dark:bg-pink-700 p-4 rounded-full shadow-md">
            <Truck className="text-pink-600 dark:text-white w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-pink-600 dark:text-pink-300 mb-4 font-serif">
            5. Shipping & Delivery
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            We aim to dispatch goods within the timeline mentioned on the product/checkout. Delivery times vary by location, product availability and courier service. While we aim for best efforts, delays caused by circumstances beyond our control are possible.
          </p>
        </section>

        {/* 6. Returns & Refunds */}
        <section className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-xl hover:shadow-2xl transition relative group">
          <div className="absolute -top-8 left-8 bg-pink-100 dark:bg-pink-700 p-4 rounded-full shadow-md">
            <RefreshCcw className="text-pink-600 dark:text-white w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-pink-600 dark:text-pink-300 mb-4 font-serif">
            6. Returns & Refunds
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            Unless specified otherwise, items must be returned within 7 days of delivery in original condition, with all packaging and certificates. We inspect items before refunding. Refunds typically happen within 5-7 business days after approval.
          </p>
        </section>

        {/* 7. Intellectual Property */}
        <section className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-xl hover:shadow-2xl transition relative group">
          <div className="absolute -top-8 left-8 bg-pink-100 dark:bg-pink-700 p-4 rounded-full shadow-md">
            <ShieldCheck className="text-pink-600 dark:text-white w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-pink-600 dark:text-pink-300 mb-4 font-serif">
            7. Intellectual Property
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            All content on this website, including images, text, logos and designs, is owned by DIVA Jewellery or its licensors. No part may be reproduced without written consent.
          </p>
        </section>

        {/* 8. Limitation of Liability */}
        <section className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-xl hover:shadow-2xl transition relative group">
          <div className="absolute -top-8 left-8 bg-pink-100 dark:bg-pink-700 p-4 rounded-full shadow-md">
            <Scale className="text-pink-600 dark:text-white w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-pink-600 dark:text-pink-300 mb-4 font-serif">
            8. Limitation of Liability
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            DIVA Jewellery shall not be liable for any indirect, incidental or consequential damages arising from use of our site or products. Our maximum liability in any case will be the total purchase amount of the goods you ordered from us.
          </p>
        </section>

        {/* 9. Governing Law & Disputes */}
        <section className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-xl hover:shadow-2xl transition relative group">
          <div className="absolute -top-8 left-8 bg-pink-100 dark:bg-pink-700 p-4 rounded-full shadow-md">
            <Scale className="text-pink-600 dark:text-white w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-pink-600 dark:text-pink-300 mb-4 font-serif">
            9. Governing Law & Disputes
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            These Terms & Conditions are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.
          </p>
        </section>
      </div>
    </div>
  );
}
