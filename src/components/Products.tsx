import { Link } from "react-router-dom";
import notebook from "@/assets/p-notebook.jpg";
import earrings from "@/assets/p-earrings.jpg";
import pouch from "@/assets/p-pouch.jpg";
import highlighters from "@/assets/p-highlighters.jpg";

type P = { name: string; price: string; img: string; badge?: "New" | "Sale" };
const products: P[] = [
  { name: "Linen Bound Journal", price: "₹ 649", img: notebook, badge: "New" },
  { name: "Pearl Stud Earrings", price: "₹ 499", img: earrings },
  { name: "Floral Pencil Pouch", price: "₹ 299", img: pouch, badge: "Sale" },
  { name: "Pastel Highlighter Set", price: "₹ 349", img: highlighters, badge: "New" },
];

const Products = ({ onAddToCart }: { onAddToCart?: () => void }) => (
  <section id="products" className="container mx-auto px-4 lg:px-8 py-16 md:py-24">
    <div className="text-center mb-12">
      <p className="eyebrow mb-3">Curated Edit</p>
      <h2 className="font-serif text-4xl md:text-5xl">Our Favourites</h2>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {products.map((p) => (
        <article key={p.name} className="group">
          <div className="relative overflow-hidden aspect-square bg-secondary/40">
            <Link to={`/product/${p.name.toLowerCase().replace(/\s+/g, '-')}`} state={{ img: p.img, price: p.price }}>
              <img
                src={p.img}
                alt={p.name}
                loading="lazy"
                width={800}
                height={800}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </Link>
            {p.badge && (
              <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-[10px] uppercase tracking-[0.16em] px-2.5 py-1">
                {p.badge}
              </span>
            )}
            <button 
              onClick={onAddToCart}
              className="absolute inset-x-3 bottom-3 bg-background/95 text-foreground text-[11px] uppercase tracking-[0.16em] py-2.5 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all"
            >
              Add to Cart
            </button>
          </div>
          <div className="mt-4">
            <Link to={`/product/${p.name.toLowerCase().replace(/\s+/g, '-')}`} state={{ img: p.img, price: p.price }}>
              <h3 className="text-[14px] text-foreground hover:underline">{p.name}</h3>
            </Link>
            <p className="text-[13px] text-muted-foreground mt-1">{p.price}</p>
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default Products;
