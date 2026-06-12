import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Heart, Star, ShoppingCart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import clearanceSale from "@/assets/hero-clearance-sale.png";
import resinArt from "@/assets/hero-resin-art.png";
import schoolSupplies from "@/assets/hero-school-supplies.png";
import goldJewellery from "@/assets/hero-gold-plated-jewellery.webp";

type ThemeName = "home" | "stationery" | "luxury" | "clearance";

const collections = {
  "clearance-sale": {
    theme: "clearance" as ThemeName,
    title: "Clearance Sale",
    eyebrow: "Limited Time Offers",
    copy: "Festival-ready picks, stationery bundles, and last-piece deals at happy prices.",
    img: clearanceSale,
    alt: "Clearance sale banner",
    accentClass: "text-[#FFD600]",
    buttonClass: "bg-[#FFD600] text-[#1A0533] hover:bg-white",
    backHref: "/category/clearance/stationery-clearance",
    products: ["Pens & Pencils", "Erasers & Sharpeners", "Highlighters", "Stationery Clearance"],
  },
  "resin-art": {
    theme: "home" as ThemeName,
    title: "Resin Art",
    eyebrow: "Handmade Keepsakes",
    copy: "Glossy handmade keychains, frames, coasters, trays, and return gifts with a personal touch.",
    img: resinArt,
    alt: "Handmade artistic craft decor",
    accentClass: "text-accent",
    buttonClass: "bg-[#2C2C2A] text-white hover:bg-[#C1602B]",
    backHref: "/category/resin-art/keychains",
    products: ["Keychains", "Fridge Magnets", "Photo Frames", "Coasters", "Cake Trays", "Return Gifts"],
  },
  "school-essentials": {
    theme: "stationery" as ThemeName,
    title: "School Essentials",
    eyebrow: "Daily Essentials + Stationery",
    copy: "School bags, pencil pouches, notebooks, pens, pencils, and cheerful desk basics for everyday routines.",
    img: schoolSupplies,
    alt: "School supplies and stationery",
    accentClass: "text-[#0077CC]",
    buttonClass: "bg-[#0077CC] text-white hover:bg-[#005FA3]",
    backHref: "/category/stationery/writing-supplies/pens",
    products: ["School Pouches", "Pens", "Pencils", "Lunch Boxes", "Bottles", "Notebooks"],
  },
  "gold-plated-jewellery": {
    theme: "luxury" as ThemeName,
    title: "Gold-Plated Jewellery",
    eyebrow: "Luxury Jewellery",
    copy: "Gold-toned necklaces, rings, earrings, bangles, anklets, watches, and brooches for everyday occasion dressing.",
    img: goldJewellery,
    alt: "Gold-plated jewellery campaign",
    accentClass: "text-[#C9A84C]",
    buttonClass: "border border-[#C9A84C] bg-transparent text-[#C9A84C] hover:bg-[#C9A84C] hover:text-black",
    backHref: "/category/accessories/gold-plated-jewellery/necklaces",
    products: ["Necklaces", "Bracelets & Bangles", "Rings", "Earrings & Studs", "Watches", "Anklets", "Brooches"],
  },
};

const PromoCollectionPage = () => {
  const { collection = "clearance-sale" } = useParams<{ collection?: string }>();
  const page = collections[collection as keyof typeof collections] ?? collections["clearance-sale"];

  useEffect(() => {
    document.body.setAttribute("data-theme", page.theme);
    return () => {
      document.body.setAttribute("data-theme", "home");
    };
  }, [page.theme]);

  return (
    <div className="min-h-screen flex flex-col" data-page-theme={page.theme}>
      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden">
          <img src={page.img} alt={page.alt} className="h-[280px] w-full object-cover md:h-[430px]" />
          <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0">
            <div className="container mx-auto px-4 py-8 lg:px-8 md:py-12">
              <p className={`text-[11px] font-bold uppercase tracking-[0.18em] ${page.accentClass}`}>{page.eyebrow}</p>
              <h1 className="mt-3 max-w-3xl font-serif text-3xl leading-tight text-white md:text-6xl">{page.title}</h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/85 md:text-base">{page.copy}</p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-10 lg:px-8 md:py-16">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="eyebrow mb-3">Shop The Edit</p>
              <h2 className="font-serif text-3xl leading-tight md:text-4xl">{page.title} Picks</h2>
            </div>
            <Link
              to={page.backHref}
              className={`inline-flex min-h-11 items-center justify-center rounded-sm px-6 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors md:px-7 md:text-[12px] md:tracking-[0.18em] ${page.buttonClass}`}
            >
              Shop Now
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-5">
            {page.products.map((product, index) => {
              const colorClass = page.theme === "clearance" ? "bg-[#FFD600]" : page.theme === "stationery" ? (index % 2 === 0 ? "bg-[#EAF6FF]" : "bg-[#FFF3E0]") : page.theme === "luxury" ? "bg-[#111111]" : "bg-secondary/50";
              
              return (
                <article key={product} className="group relative">
                  <div className="relative overflow-hidden aspect-[4/5] bg-secondary/40 mb-4 rounded-sm">
                    <Link to={`/product/${product.toLowerCase().replace(/\s+/g, '-')}`} state={{ color: colorClass }}>
                      <div className={`w-full h-full ${colorClass}`} aria-hidden="true" />
                    </Link>

                    <span className="absolute top-3 left-3 bg-[#C18F76] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm">
                      {index % 2 === 0 ? "Bestseller" : "New"}
                    </span>

                    <button className="absolute top-3 right-3 bg-white/80 hover:bg-white text-gray-700 p-1.5 rounded-full shadow-sm transition-colors">
                      <Heart size={14} />
                    </button>

                    <button className="absolute inset-x-3 bottom-3 bg-background/95 text-foreground text-[11px] font-bold uppercase tracking-[0.14em] py-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all rounded-sm flex items-center justify-center gap-2">
                      <ShoppingCart size={14} /> Add to Cart
                    </button>
                  </div>
                  
                  <div>
                    <Link to={`/product/${product.toLowerCase().replace(/\s+/g, '-')}`} state={{ color: colorClass }}>
                      <h3 className="text-[14px] text-foreground hover:underline">{product}</h3>
                    </Link>
                    <p className="text-[12px] text-muted-foreground mt-1 line-clamp-1">Beautifully crafted and designed.</p>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-bold text-[14px] text-foreground">From ₹199</span>
                    </div>
                    
                    <div className="flex items-center gap-1 mt-1">
                      <Star size={10} fill="#C18F76" className="text-[#C18F76]" />
                      <span className="text-[10px] text-gray-500">4.5 (89)</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PromoCollectionPage;
