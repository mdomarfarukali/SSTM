import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PageLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar always on top */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1">
        {/* {children} */}
        <Outlet /> {/* 👈 This renders nested route content */}
      </main>

      {/* Footer always at bottom */}
      <Footer />
    </div>
  );
}
