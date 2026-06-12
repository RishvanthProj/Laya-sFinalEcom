import { useEffect, type CSSProperties } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { NAV, slugifyNavLabel, type NavCategory, type SubItem } from "@/data/nav";

type ThemeName = "home" | "stationery" | "luxury" | "clearance";
type Product = { name: string; price: string; oldPrice?: string; color: string };

type CategoryContext = {
  category?: NavCategory;
  group?: SubItem;
  child?: string;
  categorySlug: string;
  isFinalLeaf: boolean;
  pageTitle: string;
  theme: ThemeName;
};

let activeTheme: ThemeName = "home";

const applyBodyTheme = (theme: ThemeName) => {
  activeTheme = theme;
  document.body.setAttribute("data-theme", activeTheme);
};

const getThemeForLeaf = (category: NavCategory, group: SubItem): ThemeName => {
  if (category.label === "Stationery") return "stationery";
  if (category.label === "Clearance Sale") return "clearance";
  if (
    category.label === "Accessories & Jewellery" &&
    (group.label === "Everyday Jewellery" || group.label === "Gold-Plated Jewellery")
  ) {
    return "luxury";
  }

  return "home";
};

const getCategoryContext = (categorySlug = "", subcategorySlug?: string, itemSlug?: string): CategoryContext => {
  const category = NAV.find((cat) => cat.href.split("/").pop() === categorySlug);
  const group = category?.groups.find((item) => slugifyNavLabel(item.label) === subcategorySlug);
  const child = group?.children?.find((item) => slugifyNavLabel(item) === itemSlug);
  const isLeafGroup = Boolean(group && !group.children?.length && subcategorySlug && !itemSlug);
  const isChildLeaf = Boolean(group?.children?.length && child);
  const isFinalLeaf = isLeafGroup || isChildLeaf;
  const theme = category && group && isFinalLeaf ? getThemeForLeaf(category, group) : "home";

  return {
    category,
    group,
    child,
    categorySlug: categorySlug || "shop",
    isFinalLeaf,
    pageTitle: child ?? group?.label ?? category?.label ?? "Shop",
    theme,
  };
};

const getProducts = (theme: ThemeName, pageTitle: string): Product[] => {
  if (theme === "stationery") {
    return [
      { name: `${pageTitle} Starter Set`, price: "₹149", color: "bg-blue-100" },
      { name: `Pastel ${pageTitle} Pack`, price: "₹199", color: "bg-emerald-100" },
      { name: `${pageTitle} Desk Duo`, price: "₹249", color: "bg-orange-100" },
      { name: `Classic ${pageTitle} Kit`, price: "₹299", color: "bg-sky-100" },
    ];
  }

  if (theme === "luxury") {
    return [
      { name: `Champagne ${pageTitle}`, price: "₹899", color: "bg-neutral-800" },
      { name: `Gold-Plated ${pageTitle} Set`, price: "₹1,299", color: "bg-neutral-900" },
      { name: `Evening ${pageTitle}`, price: "₹1,499", color: "bg-stone-900" },
      { name: `Heirloom ${pageTitle}`, price: "₹1,899", color: "bg-zinc-900" },
    ];
  }

  if (theme === "clearance") {
    return [
      { name: `${pageTitle} Flash Deal`, price: "₹99", oldPrice: "₹199", color: "bg-white" },
      { name: `${pageTitle} Saver Bundle`, price: "₹149", oldPrice: "₹299", color: "bg-white" },
      { name: `${pageTitle} Last Pieces`, price: "₹179", oldPrice: "₹349", color: "bg-white" },
      { name: `${pageTitle} Festival Pack`, price: "₹199", oldPrice: "₹399", color: "bg-white" },
    ];
  }

  return [
    { name: `${pageTitle} Pick 1`, price: "₹499", color: "bg-neutral-200" },
    { name: `${pageTitle} Pick 2`, price: "₹599", color: "bg-neutral-300" },
    { name: `${pageTitle} Pick 3`, price: "₹699", color: "bg-stone-200" },
    { name: `${pageTitle} Pick 4`, price: "₹799", color: "bg-stone-300" },
  ];
};

const StationeryDoodles = () => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
    <svg className="stationery-doodle stationery-doodle-pencil" width="104" height="104" viewBox="0 0 104 104" fill="none">
      <path d="M28 76L76 28L88 40L40 88H28V76Z" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />
      <path d="M68 36L80 48" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
    </svg>
    <svg className="stationery-doodle stationery-doodle-star" width="92" height="92" viewBox="0 0 92 92" fill="none">
      <path d="M46 10L55 34L81 35L60 51L67 77L46 62L25 77L32 51L11 35L37 34L46 10Z" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />
    </svg>
    <svg className="stationery-doodle stationery-doodle-ruler" width="144" height="56" viewBox="0 0 144 56" fill="none">
      <rect x="8" y="14" width="128" height="28" rx="5" stroke="currentColor" strokeWidth="6" />
      <path d="M28 14V28M48 14V36M68 14V28M88 14V36M108 14V28" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
    </svg>
  </div>
);

const clearanceStars = [
  [8, 18, "1.8s", "0s", "#FFFFFF"], [18, 42, "2.4s", "0.7s", "#FFF9C4"],
  [31, 24, "1.6s", "1.1s", "#FFFFFF"], [44, 12, "2.8s", "0.3s", "#FFF9C4"],
  [58, 31, "2.1s", "1.5s", "#FFFFFF"], [72, 16, "2.9s", "0.9s", "#FFF9C4"],
  [86, 38, "1.7s", "1.9s", "#FFFFFF"], [12, 66, "2.6s", "0.4s", "#FFF9C4"],
  [26, 78, "1.9s", "1.3s", "#FFFFFF"], [38, 58, "2.7s", "2.1s", "#FFF9C4"],
  [52, 72, "1.5s", "0.6s", "#FFFFFF"], [66, 63, "2.2s", "1.7s", "#FFF9C4"],
  [80, 82, "2.9s", "0.2s", "#FFFFFF"], [92, 68, "1.8s", "2.3s", "#FFF9C4"],
  [6, 88, "2.5s", "1.2s", "#FFFFFF"], [22, 8, "1.6s", "2.5s", "#FFF9C4"],
  [47, 44, "2.3s", "0.8s", "#FFFFFF"], [61, 89, "2.7s", "1.6s", "#FFF9C4"],
  [74, 51, "1.9s", "2.8s", "#FFFFFF"], [96, 22, "2.4s", "1.4s", "#FFF9C4"],
] as const;

const shootingStars = [
  [14, 20, "0s"],
  [46, 8, "1.4s"],
  [70, 30, "2.8s"],
] as const;

const ClearanceSky = () => (
  <div className="clearance-sky" aria-hidden="true">
    {clearanceStars.map(([left, top, duration, delay, color], index) => (
      <span
        key={`star-${index}`}
        className="twinkle-star"
        style={{
          left: `${left}%`,
          top: `${top}%`,
          "--duration": duration,
          "--delay": delay,
          "--star-color": color,
        } as CSSProperties}
      />
    ))}
    {shootingStars.map(([left, top, delay], index) => (
      <span
        key={`shooting-star-${index}`}
        className="shooting-star"
        style={{
          left: `${left}%`,
          top: `${top}%`,
          "--delay": delay,
        } as CSSProperties}
      />
    ))}
  </div>
);

const CategoryPage = () => {
  const { category, subcategory, item } = useParams<{ category?: string; subcategory?: string; item?: string }>();
  const location = useLocation();
  const context = getCategoryContext(category, subcategory, item);
  const { theme, pageTitle } = context;
  const products = getProducts(theme, pageTitle);

  useEffect(() => {
    applyBodyTheme(theme);
    return () => {
      applyBodyTheme("home");
    };
  }, [theme, location.pathname]);

  return (
    <div
      className="category-page relative isolate min-h-screen flex flex-col transition-colors"
      data-category={context.categorySlug}
      data-page-theme={theme}
    >
      <Navbar />
      {theme === "clearance" && <ClearanceSky />}

      <div className="category-page-content relative z-[1] flex flex-1 flex-col">
        {theme === "stationery" && (
          <div className="stationery-page-header w-full py-8 px-4 flex items-center justify-center gap-3 text-center md:py-10 md:px-8">
            <h1 className="text-3xl font-bold text-[#1A1A2E] md:text-4xl">{pageTitle}</h1>
            <svg className="w-7 h-7 text-[#0077CC]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </div>
        )}

        {theme === "luxury" && (
          <div className="luxury-page-header w-full py-10 px-4 text-center md:py-12 md:px-8">
            <h1 className="font-serif text-3xl tracking-[0.12em] text-[#F5E6C8] md:text-4xl md:tracking-[0.15em]">{pageTitle}</h1>
          </div>
        )}

        {theme === "clearance" && (
          <div className="bg-[#1A0533] overflow-hidden whitespace-nowrap py-2 border-b border-[#FFD600]">
            <div className="inline-block animate-marquee-fast text-[#FFD600] text-[13px] font-bold">
              Limited Time Only · Grab It Before It's Gone · Festival Offers Live Now &nbsp;
              Limited Time Only · Grab It Before It's Gone · Festival Offers Live Now &nbsp;
            </div>
          </div>
        )}

        <main className="category-page-main flex-1">
          <section className={`category-product-section ${theme === "stationery" ? "stationery-section-block" : ""}`}>
            {theme === "stationery" && <StationeryDoodles />}

            <div className="container relative z-[1] mx-auto px-4 lg:px-8 py-10 md:py-16">
              {theme === "home" && (
                <div className="text-center mb-10">
                  <p className="eyebrow mb-3">Laya's Edit</p>
                  <h1 className="font-serif text-3xl md:text-5xl">{pageTitle}</h1>
                </div>
              )}

              {theme === "clearance" && (
                <h1 className="text-3xl font-bold text-[#FFD600] mb-8 section-heading-clearance md:text-4xl">
                  {pageTitle}
                </h1>
              )}

              {theme === "luxury" && <div className="category-divider mb-10" aria-hidden="true" />}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
                {products.map((p, i) => (
                  <article
                    key={`${p.name}-${i}`}
                    className={`
                      category-product-card p-6
                      ${theme === "stationery" ? "bg-white rounded-[12px] border-2 border-dashed border-[#0077CC]" : ""}
                      ${theme === "luxury" ? "bg-[#1A1A1A] border border-[#C9A84C] rounded-sm" : ""}
                      ${theme === "clearance" ? `bg-white border-l-4 ${i % 2 === 0 ? "border-[#FF4D6D]" : "border-[#00E5CC]"}` : ""}
                      ${theme === "home" ? "bg-white rounded-sm border border-border" : ""}
                    `}
                  >
                    <Link to={`/product/${p.name.toLowerCase().replace(/\s+/g, '-')}`} state={{ price: p.price, color: p.color }}>
                      <div className={`aspect-square mb-4 ${p.color} flex items-center justify-center rounded-sm`} aria-hidden="true" />
                    </Link>
                    <Link to={`/product/${p.name.toLowerCase().replace(/\s+/g, '-')}`} state={{ price: p.price, color: p.color }}>
                      <h3 className={`
                        text-lg mb-2 hover:underline
                        ${theme === "stationery" ? "font-bold text-[#1A1A2E]" : ""}
                        ${theme === "luxury" ? "font-serif tracking-[0.08em] text-[#F5E6C8]" : ""}
                        ${theme === "clearance" ? "font-bold text-[#1A0533]" : ""}
                        ${theme === "home" ? "text-foreground" : ""}
                      `}>
                        {p.name}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-2 mb-4">
                      <span className={`
                        font-bold
                        ${theme === "stationery" ? "text-[#0077CC]" : ""}
                        ${theme === "luxury" ? "text-[#C9A84C]" : ""}
                        ${theme === "clearance" ? "text-[#E53935]" : ""}
                        ${theme === "home" ? "text-accent" : ""}
                      `}>
                        {p.price}
                      </span>
                      {p.oldPrice && (
                        <span className="text-gray-400 line-through text-sm">{p.oldPrice}</span>
                      )}
                    </div>
                    <button
                      type="button"
                      aria-label={`Add ${p.name} to cart`}
                      className={`
                        w-full py-2 px-4 transition-colors duration-300
                        ${theme === "stationery" ? "bg-[#0077CC] text-white rounded-sm font-bold" : ""}
                        ${theme === "luxury" ? "bg-transparent border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-black" : ""}
                        ${theme === "clearance" ? "bg-[#FFD600] text-[#1A0533] font-bold" : ""}
                        ${theme === "home" ? "bg-[#2C2C2A] text-white" : ""}
                      `}
                    >
                      Add to Cart
                    </button>
                  </article>
                ))}
              </div>

              {theme === "luxury" && <div className="category-divider mt-12" aria-hidden="true" />}
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default CategoryPage;
