import { Link } from "react-router-dom";
import notebook from "@/assets/p-notebook.jpg";
import earrings from "@/assets/p-earrings.jpg";
import pouch from "@/assets/p-pouch.jpg";
import highlighters from "@/assets/p-highlighters.jpg";

const bestsellers = [
  { name: "Linen Bound Journal", price: "₹ 649", img: notebook },
  { name: "Pearl Stud Earrings", price: "₹ 499", img: earrings },
  { name: "Floral Pencil Pouch", price: "₹ 299", img: pouch },
  { name: "Pastel Highlighter Set", price: "₹ 349", img: highlighters },
  { name: "Gold-Plated Bangle", price: "₹ 899", img: earrings },
  { name: "Floral Sticker Sheet", price: "₹ 149", img: notebook },
];

const TopSelling = ({ onAddToCart }: { onAddToCart?: () => void }) => (
  <section className="py-12 md:py-24 bg-background">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="flex items-end justify-between mb-8 md:mb-10">
        <div>
          <p className="eyebrow mb-2">Most Loved</p>
          <h2 className="font-serif text-3xl md:text-5xl">Top Selling</h2>
        </div>
        <a
          href="#"
          className="text-[11px] uppercase tracking-[0.18em] border-b border-foreground/40 pb-0.5 hover:text-accent hover:border-accent transition-colors hidden sm:block"
        >
          View all
        </a>
      </div>

      {/* Scrollable row on mobile, 4-col grid on lg */}
      <div className="scroll-row lg:grid lg:grid-cols-4 lg:gap-6">
        {bestsellers.map((p, i) => (
          <article
            key={p.name + i}
            className="group w-[72vw] max-w-[280px] sm:w-64 lg:w-auto lg:max-w-none"
          >
            <div className="relative overflow-hidden aspect-square bg-secondary/40">
              <Link to={`/product/${p.name.toLowerCase().replace(/\s+/g, '-')}`} state={{ img: p.img, price: p.price }}>
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </Link>
              {/* Best Seller badge */}
              <span className="absolute top-3 left-3 flex items-center gap-1 bg-[#C1602B] text-white text-[10px] font-semibold uppercase tracking-[0.12em] px-2.5 py-1 leading-none">
                Best Seller
              </span>
              <button
                onClick={onAddToCart}
                aria-label={`Add ${p.name} to cart`}
                className="absolute inset-x-3 bottom-3 bg-background/95 text-foreground text-[11px] uppercase tracking-[0.14em] py-2.5 opacity-100 transition-all sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100"
              >
                Add to Cart
              </button>
            </div>
            <div className="mt-3">
              <Link to={`/product/${p.name.toLowerCase().replace(/\s+/g, '-')}`} state={{ img: p.img, price: p.price }}>
                <h3 className="text-[14px] text-foreground hover:underline">{p.name}</h3>
              </Link>
              <p className="text-[13px] text-muted-foreground mt-1">{p.price}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default TopSelling;
