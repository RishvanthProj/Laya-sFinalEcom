import s from "@/assets/cat-stationery.jpg";
import d from "@/assets/cat-daily.jpg";
import j from "@/assets/cat-jewellery.jpg";
import sale from "@/assets/cat-sale.jpg";

const cats = [
  { label: "Stationery", img: s },
  { label: "Daily Essentials", img: d },
  { label: "Accessories & Jewellery", img: j },
  { label: "Clearance Sale", img: sale },
];

const Categories = () => (
  <section className="container mx-auto px-4 lg:px-8 py-12 md:py-16">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
      {cats.map((c) => (
        <a
          key={c.label}
          href="#"
          className="group relative aspect-square overflow-hidden block"
        >
          <img
            src={c.img}
            alt={c.label}
            loading="lazy"
            width={800}
            height={800}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/30 transition-colors" />
          <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
            <span className="text-white text-[11px] md:text-[12px] uppercase tracking-[0.18em]">
              {c.label}
            </span>
          </div>
        </a>
      ))}
    </div>
  </section>
);

export default Categories;
