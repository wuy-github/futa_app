// src/components/pages/Homepage.jsx
import React from "react";
import HeroSection from "./HeroSection";
import PromotionsSection from "./PromotionsSection";
import PopularRoutesSection from "./PopularRoutesSection";
import CompanyStatsSection from "./CompanyStatsSection";
import NewsSection from "./NewsSection";
import ConnectFutaGroupSection from "./ConnectFutaGroupSection";
import Footer from "./Footer";

function Homepage() {
  return (
    <main>
      <HeroSection />
      <PromotionsSection />
      <PopularRoutesSection />
      <CompanyStatsSection />
      <NewsSection />
      <ConnectFutaGroupSection />
    </main>
  );
}

export default Homepage;
