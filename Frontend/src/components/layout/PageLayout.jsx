import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PageLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-brand-light">
      {/* Navbar always on top */}
      <Navbar />

      {/* Main content */}
      <main 
        // className="flex-1"
        className="flex-grow min-h-[calc(100vh-80px)] mt-16 md:mt-12"
      >
        {/* {children} */}
        <Outlet /> {/* 👈 This renders nested route content */}
      </main>

      {/* Footer always at bottom */}
      <Footer />
    </div>
  );
}
