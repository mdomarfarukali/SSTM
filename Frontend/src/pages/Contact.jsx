import React, { useState } from "react";
import { Phone, Mail, Clock, Sparkles, Headphones, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for contacting DIVA! Our support team will respond shortly 💖");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="bg-gradient-to-b from-pink-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-950 dark:to-black min-h-screen px-6 md:px-16 py-28 relative overflow-hidden">
      {/* Floating sparkles */}
      <Sparkles className="absolute top-20 left-12 text-pink-200 dark:text-pink-700 w-24 h-24 opacity-30 animate-pulse" />
      <Sparkles className="absolute bottom-20 right-12 text-pink-200 dark:text-pink-700 w-16 h-16 opacity-40 animate-ping" />

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-6xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-500 dark:from-pink-400 dark:to-rose-300 mb-20 font-serif tracking-wide"
      >
        Contact DIVA
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-center text-gray-600 dark:text-gray-300 text-lg mb-16 max-w-3xl mx-auto"
      >
        Need help with your order, have a query about our jewellery, or just want to say hi?  
        Our support angels are always happy to assist — reach out and we’ll get back within 24 hours ✨
      </motion.p>

      {/* Main Grid */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14">
        {/* Contact Details */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-pink-100 dark:border-gray-700 p-10 rounded-3xl shadow-2xl hover:shadow-pink-200/40 transition"
        >
          <h2 className="text-3xl font-bold text-pink-600 dark:text-pink-300 mb-6 font-serif flex items-center gap-2">
            <Headphones className="w-7 h-7 text-pink-500" /> Customer Support
          </h2>

          <ul className="space-y-5 text-gray-700 dark:text-gray-300 text-lg">
            <li className="flex items-center space-x-3">
              <Phone className="text-pink-600 dark:text-pink-400 w-6 h-6" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="text-pink-600 dark:text-pink-400 w-6 h-6" />
              <span>support@divajewels.com</span>
            </li>
            <li className="flex items-center space-x-3">
              <Clock className="text-pink-600 dark:text-pink-400 w-6 h-6" />
              <span>Available: Mon – Sat, 10:00 AM – 7:00 PM</span>
            </li>
          </ul>

          <p className="mt-10 text-gray-700 dark:text-gray-300 leading-relaxed">
            💬 <strong>Response Time:</strong> Within 24 hours (usually much sooner!)  
            <br />
            ✨ <strong>Tip:</strong> Include your <em>Order ID</em> or <em>Registered Email</em> for faster help.
          </p>

          <div className="mt-10 flex items-center gap-3 text-pink-600 dark:text-pink-400">
            <HeartHandshake className="w-6 h-6" />
            <p className="font-medium">We’re here to make your DIVA experience shine brighter every day.</p>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-xl border border-pink-100 dark:border-gray-700 p-10 rounded-3xl shadow-2xl hover:shadow-pink-200/40 transition"
        >
          <h2 className="text-3xl font-bold text-pink-600 dark:text-pink-300 mb-6 font-serif">
            Send Us a Message
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-600 dark:text-gray-300 mb-2 font-medium">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 rounded-xl border border-pink-200 dark:border-gray-700 focus:ring-2 focus:ring-pink-400 outline-none dark:bg-gray-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 dark:text-gray-300 mb-2 font-medium">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-pink-200 dark:border-gray-700 focus:ring-2 focus:ring-pink-400 outline-none dark:bg-gray-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 dark:text-gray-300 mb-2 font-medium">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Write your subject"
                className="w-full px-4 py-3 rounded-xl border border-pink-200 dark:border-gray-700 focus:ring-2 focus:ring-pink-400 outline-none dark:bg-gray-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 dark:text-gray-300 mb-2 font-medium">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                placeholder="Type your message here..."
                className="w-full px-4 py-3 rounded-xl border border-pink-200 dark:border-gray-700 focus:ring-2 focus:ring-pink-400 outline-none dark:bg-gray-900 dark:text-white resize-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 w-full md:w-auto"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>

      {/* Online Help Section */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mt-28 text-center"
      >
        <h2 className="text-3xl font-bold text-pink-700 dark:text-pink-300 mb-6 font-serif">
          Reach Out to Us Online
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg">
          You can also connect with us instantly via our{" "}
          <span className="text-pink-600 font-semibold">Instagram DMs</span> or{" "}
          <span className="text-pink-600 font-semibold">Facebook messages</span> for quick updates and order help.  
          Our support angels are always one click away 💌
        </p>
      </motion.div>
    </div>
  );
}
