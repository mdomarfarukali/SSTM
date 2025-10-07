import Navbar from "../components/layout/Navbar";
import Hero from "../components/layout/Hero";
import FeaturedCollections from "../components/layout/FeaturedCollections";
import Footer from "../components/layout/Footer";
import ChatButton from "../components/common/ChatButton";

export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-500">
      <Navbar />
      <Hero />
      <FeaturedCollections />
      <Footer />
      <ChatButton />
    </div>
  );
}
