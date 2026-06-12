import { Link } from "react-router-dom";
import heroImg from "@/assets/hero.jpg";

const Hero = () => {
  return (
    <section className="w-full bg-[#FAF9F6] flex flex-col md:flex-row min-h-[600px]" aria-label="Hero section">
      {/* Text Content Area */}
      <div className="flex-1 flex flex-col justify-center px-8 py-16 md:px-16 lg:px-24 xl:px-32">
        <div className="max-w-xl">
          <p className="text-[10px] md:text-xs tracking-[0.2em] text-[#B8866B] uppercase font-semibold mb-6">
            New Collection 2025
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#2C2C2A] mb-6 leading-[1.1] tracking-tight">
            Curated with intention.<br />
            <span className="italic">Crafted with love.</span>
          </h1>
          <p className="text-[#666] text-sm md:text-base leading-relaxed mb-10 max-w-md">
            Discover our handpicked collection of women's fashion, stationery, gifts and more — all thoughtfully made.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center bg-[#BE8A71] hover:bg-[#A6755D] text-white text-[11px] font-bold uppercase tracking-[0.15em] h-12 px-8 rounded-sm transition-colors"
            >
              Shop Now
            </Link>
            <Link
              to="/collections"
              className="inline-flex items-center justify-center bg-transparent border border-gray-300 hover:border-gray-800 text-gray-800 text-[11px] font-bold uppercase tracking-[0.15em] h-12 px-8 rounded-sm transition-colors"
            >
              Explore Collections
            </Link>
          </div>
        </div>
      </div>

      {/* Image Area */}
      <div className="flex-1 h-[400px] md:h-auto w-full relative">
        <img
          src={heroImg}
          alt="Curated collection of gifts and lifestyle items"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default Hero;
