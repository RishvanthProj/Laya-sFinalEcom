import catStationery from "@/assets/cat-stationery.jpg";
import catDaily from "@/assets/cat-daily.jpg";
import catJewellery from "@/assets/cat-jewellery.jpg";
import catSale from "@/assets/cat-sale.jpg";

const categories = [
  {
    label: "Stationery",
    href: "/category/stationery",
    img: catStationery,
    color: "#B8D4E8",
  },
  {
    label: "Daily Essentials",
    href: "/category/daily-essentials",
    img: catDaily,
    color: "#D4E8B8",
  },
  {
    label: "Resin Art",
    href: "/category/resin-art",
    img: null,
    color: "#E8C8B8",
    gradient: "linear-gradient(135deg, #F4A261 0%, #C1602B 50%, #9B3E15 100%)",
  },
  {
    label: "Accessories & Jewellery",
    href: "/category/accessories",
    img: catJewellery,
    color: "#E8D4B8",
  },
  {
    label: "Clearance Sale",
    href: "/category/clearance",
    img: catSale,
    color: "#E8B8D4",
    badge: "Up to 70% off",
  },
];

const ShopAllCategories = () => (
  <section className="py-12 md:py-24 bg-secondary/30">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="text-center mb-8 md:mb-12">
        <p className="eyebrow mb-3">Browse</p>
        <h2 className="font-serif text-3xl md:text-5xl">Shop All Categories</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-5">
        {categories.map((cat) => (
          <a
            key={cat.label}
            href={cat.href}
            className="group relative aspect-[5/3] overflow-hidden block rounded-sm sm:aspect-[3/4]"
            aria-label={`Shop ${cat.label}`}
          >
            {cat.img ? (
              <img
                src={cat.img}
                alt={cat.label}
                loading="lazy"
                width={600}
                height={800}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                style={{ background: cat.gradient ?? cat.color }}
              />
            )}
            <div className="absolute inset-0 bg-foreground/25 group-hover:bg-foreground/38 transition-colors" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              {cat.badge && (
                <span className="block text-[10px] text-[#FFD600] uppercase tracking-[0.18em] mb-1 font-semibold">
                  {cat.badge}
                </span>
              )}
              <span className="text-white text-[11px] md:text-[12px] uppercase tracking-[0.13em] md:tracking-[0.18em] leading-tight">
                {cat.label}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default ShopAllCategories;
