// src/components/Layout.jsx
import React from "react";
import "./Layout.css";
import Footer from "./Footer/Footer";
import Header from "./Header/index";
import HeroSection from "./HeroSection/HeroSection";

function Layout({ children }) {
  return (
    <div className="content">
      <div className="overlay">
        <Header />
        <HeroSection />
      </div>
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
