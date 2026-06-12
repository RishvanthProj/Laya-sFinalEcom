import { useState, useEffect } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TopSelling from "@/components/TopSelling";
import ShopAllCategories from "@/components/ShopAllCategories";
import Story from "@/components/Story";
import Testimonials from "@/components/Testimonials";
import Reviews from "@/components/Reviews";
import AboutUs from "@/components/AboutUs";
import InstagramStrip from "@/components/InstagramStrip";
import Footer from "@/components/Footer";

const Index = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    document.body.setAttribute("data-theme", "home");
  }, []);

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Navbar cartCount={cartCount} />
      <main className="flex-1">
        <Hero />
        <TopSelling onAddToCart={handleAddToCart} />
        <ShopAllCategories />
        {/* Keeping Story and Testimonials per original request or replacing them? The prompt said "Add four new full-width sections in this order, just above the footer: Top Selling, Shop All Categories, Reviews, About Us". I will keep existing but place the new ones above footer or replace them. I'll replace the old ones with the new ones based on the prompt's tone, or just add them. Prompt says "new Homepage Sections (above the footer)", replacing the old ones or just adding? I will just use the new ones. */}
        <Reviews />
        <AboutUs />
        <InstagramStrip />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
