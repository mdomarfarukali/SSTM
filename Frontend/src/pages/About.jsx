export default function About() {
  return (
    <div className="bg-brand min-h-screen px-6 md:px-16 py-20 font-serif">
      {/* 💖 Header Section */}
      <section className="text-center mb-20">
        <br></br>
        <br></br>
        <h1 className="text-5xl md:text-6xl font-extrabold text-pink-700 dark:text-pink-300 mb-4 tracking-wide">
          About <span className="text-pink-500">DIVA</span>
          <img src="/DIVA_Cut-removebg-preview.png" alt="DIVA Logo" className="w-25 h-25 inline-block mr-2 mb-1" />
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          <span className="font-semibold">DIVA Jewellery</span> embodies timeless luxury and
          modern femininity. Every masterpiece we create is a blend of
          artistry, precision, and emotion — crafted to make every woman feel
          extraordinary.
        </p>
      </section>

      {/* 💍 Our Story */}
      <section className="max-w-6xl mx-auto mb-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-pink-700 dark:text-pink-300">
            Our Story
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Established in <b>2020</b>, DIVA began as a dream to redefine
            jewellery design with sophistication and soul. Our artisans combine
            traditional craftsmanship with modern aesthetics, creating pieces
            that transcend trends and generations.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Each collection is inspired by the spirit of elegance and strength.
            For us, jewellery is not just an accessory — it’s a form of
            self-expression that captures beauty, power, and identity.
          </p>
        </div>

        <img
          src="/2.jpg"
          alt="Jewellery Collection"
          className="rounded-3xl shadow-2xl w-full border-4 border-pink-100 dark:border-gray-700 hover:scale-[1.02] transition-transform duration-500"
        />
      </section>

      {/* 👑 Founders Section */}
      <section className="max-w-7xl mx-auto text-center mb-24">
        <h2 className="text-4xl font-bold text-pink-700 dark:text-pink-300 mb-12">
          Meet Our Founders
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Founder Card */}
          {[
            {
              name: "Md. Omar Faruk Ali",
              title: "Managing Director & Founder",
              img: "/avatar.svg",
              desc: "Omar Faruk leads DIVA with a vision to blend classic craftsmanship with modern luxury, ensuring the brand embodies grace and trust in every creation.",
            },
            {
              name: "Tamanna Parvin",
              title: "Co-Founder & Lead Designer",
              img: "/avatar.svg",
              desc: "Tamanna channels creativity into each collection, designing timeless jewels that capture the essence of femininity and sophistication.",
            },
            {
              name: "Sohana Parvin",
              title: "Creative Director & Co-Founder",
              img: "/avatar.svg",
              desc: "Sohana curates DIVA’s artistic vision — shaping the aesthetics, storytelling, and brand experience that define elegance.",
            },
          ].map((founder, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-md hover:shadow-2xl border border-pink-100 dark:border-gray-700 transition-all duration-500"
            >
              <img
                src={founder.img}
                alt={founder.name}
                className="w-40 h-40 rounded-full mx-auto mb-5 object-cover border-4 border-pink-200 dark:border-pink-700 shadow-md hover:scale-105 transition-transform duration-500"
              />
              <h3 className="text-2xl font-bold text-pink-700 dark:text-pink-300 mb-1">
                {founder.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                {founder.title}
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                {founder.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ✨ Mission Section */}
      <section className="max-w-5xl mx-auto text-center bg-gradient-to-br from-pink-100 to-pink-50 dark:from-gray-800 dark:to-gray-900 px-10 py-16 rounded-3xl shadow-inner border border-pink-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-pink-700 dark:text-pink-300 mb-6">
          Our Mission
        </h2>
        <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          To create sustainable, handcrafted jewellery that celebrates
          individuality, empowers confidence, and inspires the divine glow
          within every woman who wears it.
        </p>
      </section>
    </div>
  );
}
