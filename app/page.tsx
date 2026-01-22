"use client";

import HeroSection from "./components/HeroSection";
import CategoriesSection from "./components/CategoriesSection";
import TrendingSection from "./components/TrendingSection";
import CollectionsSection from "./components/CollectionsSection";
import AdSection from "./components/AdSection";
import MagazineSection from "./components/MagazineSection";
import FAQSection from "./components/FAQSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="bg-white"> 
      <HeroSection />
      <CategoriesSection />
      <TrendingSection />
      <CollectionsSection />
      <AdSection />
      <MagazineSection />
      <FAQSection />
      <Footer />
    </div>
  );
}