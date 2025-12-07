import React from 'react';

export default function ShippingReturns() {
  return (
    <div className="bg-pink-50 dark:bg-gray-900 min-h-screen px-6 md:px-16 py-32">
      {/* Page Heading */}
      <h1 className="text-5xl font-extrabold text-pink-700 dark:text-pink-400 mb-12 text-center tracking-wide font-serif">
        Shipping & Returns
      </h1>

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Shipping Section */}
        <section className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition">
          <h2 className="text-3xl font-semibold text-pink-600 dark:text-pink-300 mb-6 font-serif">
            Shipping
          </h2>
          <ul className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <li>
              <strong>Shipping Time:</strong> Orders are usually processed and shipped within 48 hours. Personalized items may take longer. If your order contains both personalized and non-personalized items, the order may be shipped separately.
            </li>
            <li>
              <strong>Shipping Charges:</strong> Free shipping on orders over Rs. 449. International orders and returns are not eligible for free shipping.
            </li>
            <li>
              <strong>Tracking:</strong> Tracking details are sent via WhatsApp, email, and SMS once the order is shipped.
            </li>
            <li>
              <strong>Multiple Shipments:</strong> If your order contains personalized or Gold jewellery along with other items, your order may arrive in multiple shipments.
            </li>
          </ul>
        </section>

        {/* Returns Section */}
        <section className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition">
          <h2 className="text-3xl font-semibold text-pink-600 dark:text-pink-300 mb-6 font-serif">
            Returns
          </h2>
          <ul className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <li>
              <strong>Return Policy:</strong> We offer a 30-day return policy for unused and unworn items. Personalized jewellery, perfumes, candles, coins, utensils, and God idols are exempt except for defective items. Refunds are processed after inspection of returned products.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
