import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NAV, slugifyNavLabel, type NavCategory, type SubItem } from "@/data/nav";
import {
  BagIcon, ChevronDown, ChevronRight, CloseIcon, MenuIcon, SearchIcon, UserIcon,
} from "@/components/icons";

const subcategoryPath = (catHref: string, groupLabel: string, childLabel?: string) => {
  const groupSlug = slugifyNavLabel(groupLabel);
  return childLabel
    ? `${catHref}/${groupSlug}/${slugifyNavLabel(childLabel)}`
    : `${catHref}/${groupSlug}`;
};

type SearchItem = {
  label: string;
  category: string;
  group?: string;
  href: string;
  terms: string;
};

const buildSearchItems = (): SearchItem[] =>
  NAV.flatMap((cat) =>
    cat.groups.flatMap((group) => {
      if (group.children?.length) {
        return group.children.map((child) => ({
          label: child,
          category: cat.label,
          group: group.label,
          href: subcategoryPath(cat.href, group.label, child),
          terms: `${child} ${group.label} ${cat.label}`.toLowerCase(),
        }));
      }

      return {
        label: group.label,
        category: cat.label,
        href: subcategoryPath(cat.href, group.label),
        terms: `${group.label} ${cat.label}`.toLowerCase(),
      };
    })
  );

const MegaPanel = ({ cat }: { cat: NavCategory }) => {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  return (
    <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3 z-50">
      <div className="mega-enter bg-white border border-border shadow-[0_20px_40px_-20px_rgba(0,0,0,0.15)] rounded-sm min-w-[260px] py-3">
        <ul className="flex flex-col" aria-label={`${cat.label} submenu`}>
          {cat.groups.map((g, i) => {
            const hasChildren = Boolean(g.children?.length);

            return (
              <li
                key={g.label}
                className="relative"
                onMouseEnter={() => setHoverIdx(i)}
                onMouseLeave={() => setHoverIdx(null)}
              >
                {hasChildren ? (
                  <a
                    href="#"
                    aria-haspopup="menu"
                    aria-expanded={hoverIdx === i}
                    onClick={(event) => {
                      event.preventDefault();
                      setHoverIdx(i);
                    }}
                    onFocus={() => setHoverIdx(i)}
                    className="flex items-center justify-between gap-6 px-5 py-2 text-[12px] uppercase tracking-[0.12em] text-foreground/80 hover:text-accent hover:bg-secondary/40 transition-colors"
                  >
                    <span>{g.label}</span>
                    <ChevronRight className="h-3 w-3 opacity-60" aria-hidden="true" />
                  </a>
                ) : (
                  <Link
                    to={subcategoryPath(cat.href, g.label)}
                    className="flex items-center justify-between gap-6 px-5 py-2 text-[12px] uppercase tracking-[0.12em] text-foreground/80 hover:text-accent hover:bg-secondary/40 transition-colors"
                  >
                    <span>{g.label}</span>
                  </Link>
                )}

                {g.children && hoverIdx === i && (
                  <div className="absolute left-full top-0 pl-1">
                    <div className="mega-enter bg-white border border-border shadow-[0_20px_40px_-20px_rgba(0,0,0,0.15)] rounded-sm min-w-[220px] py-3">
                      <ul aria-label={`${g.label} options`}>
                        {g.children.map((c) => (
                          <li key={c}>
                            <Link
                              to={subcategoryPath(cat.href, g.label, c)}
                              className="block px-5 py-2 text-[12px] uppercase tracking-[0.12em] text-foreground/80 hover:text-accent hover:bg-secondary/40 transition-colors"
                            >
                              {c}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const MobileItem = ({ item, catHref }: { item: SubItem; catHref: string }) => {
  const [open, setOpen] = useState(false);
  const hasChildren = Boolean(item.children?.length);

  if (!hasChildren) {
    return (
      <Link to={subcategoryPath(catHref, item.label)} className="block min-h-11 py-3 pl-6 pr-4 text-[13px] uppercase tracking-[0.1em] text-foreground/80">
        {item.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-label={`${open ? "Collapse" : "Expand"} ${item.label}`}
        onClick={(event) => {
          event.preventDefault();
          setOpen((v) => !v);
        }}
        className="flex min-h-11 w-full items-center justify-between gap-4 py-3 pl-6 pr-4 text-left text-[13px] uppercase tracking-[0.1em] text-foreground/80"
      >
        <span>{item.label}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      {open && (
        <ul className="pb-2" aria-label={`${item.label} options`}>
          {item.children?.map((c) => (
            <li key={c}>
              <Link to={subcategoryPath(catHref, item.label, c)} className="block min-h-10 py-2 pl-10 pr-4 text-[12px] uppercase tracking-[0.1em] text-foreground/60">
                {c}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Navbar = ({ cartCount = 0 }: { cartCount?: number }) => {
  const [hover, setHover] = useState<string | null>(null);
  const [openCat, setOpenCat] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchItems = useMemo(buildSearchItems, []);
  const normalizedSearchQuery = searchQuery.trim().toLowerCase();
  const searchResults = useMemo(() => {
    if (!normalizedSearchQuery) return searchItems.slice(0, 8);

    return searchItems
      .filter((item) => item.terms.includes(normalizedSearchQuery))
      .slice(0, 8);
  }, [normalizedSearchQuery, searchItems]);

  useEffect(() => {
    document.body.style.overflow = drawer || searchOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawer, searchOpen]);

  // Close drawer on route change
  useEffect(() => {
    setDrawer(false);
    setSearchOpen(false);
    setSearchQuery("");
  }, [location.pathname]);

  useEffect(() => {
    if (!searchOpen) return;

    const timer = window.setTimeout(() => searchInputRef.current?.focus(), 0);
    return () => window.clearTimeout(timer);
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSearchOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen]);

  const goToSearchResult = (href: string) => {
    navigate(href);
    setSearchOpen(false);
    setSearchQuery("");
  };

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchResults[0]) goToSearchResult(searchResults[0].href);
  };

  const openDrawer = () => {
    setSearchOpen(false);
    setDrawer(true);
  };

  const toggleSearch = () => {
    setDrawer(false);
    setSearchOpen((open) => !open);
  };

  return (
    <header data-theme="home" className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border transition-none">
      <nav role="navigation" aria-label="Main" className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Mobile: hamburger */}
        <button
          aria-label="Open menu"
          onClick={openDrawer}
          className="md:hidden -ml-2 flex h-11 w-11 items-center justify-center"
        >
          <MenuIcon className="h-5 w-5" />
        </button>

        {/* Logo */}
        <Link to="/" className="min-w-0 flex-1 truncate text-center font-serif text-[20px] leading-none tracking-tight text-foreground md:flex-none md:text-left md:text-[26px]">
          Laya<span className="text-accent">'</span>s Little Shop
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV.map((cat) => (
            <li
              key={cat.label}
              className="relative"
              onMouseEnter={() => setHover(cat.label)}
              onMouseLeave={() => setHover(null)}
            >
              <a
                href="#"
                className="nav-link"
                aria-haspopup="menu"
                aria-expanded={hover === cat.label}
                aria-label={`Open ${cat.label} menu`}
                onClick={(event) => {
                  event.preventDefault();
                  setHover(cat.label);
                }}
                onFocus={() => setHover(cat.label)}
              >
                {cat.highlight ? (
                  <span className="relative inline-block group/clearance">
                    <span className="absolute -top-1 -right-6 bg-[#E53935] text-white font-bold text-[8px] uppercase tracking-normal px-[4px] py-[2px] rounded-[2px] leading-none shadow-sm">
                      TOP
                    </span>
                    <span className="text-rgb-gradient font-bold tracking-widest pointer-events-none">{cat.label}</span>
                  </span>
                ) : (
                  cat.label
                )}
              </a>
              {hover === cat.label && <MegaPanel cat={cat} />}
            </li>
          ))}
        </ul>

        {/* Right icons */}
        <div className="flex items-center gap-1 md:gap-2">
          <button
            type="button"
            aria-label={searchOpen ? "Close search" : "Open search"}
            aria-expanded={searchOpen}
            aria-controls="site-search-panel"
            onClick={toggleSearch}
            className="flex h-11 w-11 items-center justify-center hover:text-accent transition-colors"
          >
            <SearchIcon className="h-[18px] w-[18px]" />
          </button>
          <button aria-label="Account" className="h-11 w-11 items-center justify-center hover:text-accent transition-colors hidden sm:inline-flex">
            <UserIcon className="h-[18px] w-[18px]" />
          </button>
          <Link to="/cart" aria-label="Cart" className="relative flex h-11 w-11 items-center justify-center hover:text-accent transition-colors">
            <BagIcon className="h-[18px] w-[18px]" />
            <span className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[10px] leading-none rounded-full h-4 w-4 flex items-center justify-center">
              {cartCount}
            </span>
          </Link>
        </div>
      </nav>

      {searchOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 top-16 z-40 cursor-default bg-foreground/20"
            aria-label="Close search"
            onClick={() => setSearchOpen(false)}
          />
          <div
            id="site-search-panel"
            data-theme="home"
            className="absolute inset-x-0 top-full z-50 max-h-[calc(100svh-4rem)] overflow-y-auto border-b border-border bg-background shadow-[0_24px_60px_-36px_rgba(0,0,0,0.35)]"
          >
            <div className="container mx-auto px-4 py-4 lg:px-8">
              <form onSubmit={submitSearch} role="search" className="relative">
                <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  ref={searchInputRef}
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search stationery, jewellery, decor..."
                  aria-label="Search products"
                  className="h-12 w-full rounded-sm border border-border bg-white pl-11 pr-11 text-[14px] text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/15"
                />
                <button
                  type="button"
                  aria-label="Close search"
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <CloseIcon className="h-4 w-4" />
                </button>
              </form>

              <div className="mt-3 overflow-hidden rounded-sm border border-border bg-white">
                {searchResults.length > 0 ? (
                  <ul className="divide-y divide-border/70" aria-label="Search suggestions">
                    {searchResults.map((item) => (
                      <li key={`${item.href}-${item.label}`}>
                        <button
                          type="button"
                          onClick={() => goToSearchResult(item.href)}
                          className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left transition-colors hover:bg-secondary/45 focus:bg-secondary/45 focus:outline-none"
                        >
                          <span>
                            <span className="block text-[13px] font-medium text-foreground">{item.label}</span>
                            <span className="mt-1 block text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                              {item.group ? `${item.category} / ${item.group}` : item.category}
                            </span>
                          </span>
                          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="px-4 py-5 text-sm text-muted-foreground">
                    No matches found for "{searchQuery.trim()}".
                  </p>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Mobile drawer */}
      {drawer && (
        <>
          <div
            className="fixed inset-0 bg-foreground/40 z-50 md:hidden"
            onClick={() => setDrawer(false)}
            aria-hidden
          />
          <aside className="fixed top-0 left-0 h-[100svh] w-[92%] max-w-[390px] bg-background z-50 md:hidden flex flex-col animate-fade-in shadow-xl">
            <div className="flex items-center justify-between h-16 px-4 border-b border-border">
              <span className="font-serif text-[20px]">Menu</span>
              <button aria-label="Close menu" onClick={() => setDrawer(false)} className="p-2 -mr-2">
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
            <nav className="overflow-y-auto py-2 pb-8" aria-label="Mobile menu">
              {NAV.map((cat) => {
                const open = openCat === cat.label;
                return (
                  <div key={cat.label} className="border-b border-border/60">
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-label={`${open ? "Collapse" : "Expand"} ${cat.label}`}
                      onClick={(event) => {
                        event.preventDefault();
                        setOpenCat(open ? null : cat.label);
                      }}
                      className="flex min-h-14 w-full items-center justify-between gap-4 px-4 py-4 text-left text-[13px] uppercase tracking-[0.12em] text-foreground"
                    >
                      <span className="relative inline-block">
                        {cat.highlight ? (
                          <>
                            <span className="absolute -top-1.5 -right-7 bg-[#E53935] text-white font-bold text-[10px] uppercase tracking-normal px-[6px] py-[3px] rounded-[2px] leading-none shadow-sm">
                              TOP
                            </span>
                            <span className="text-rgb-gradient font-bold tracking-widest pointer-events-none">{cat.label}</span>
                          </>
                        ) : (
                          cat.label
                        )}
                      </span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
                    </button>
                    {open && (
                      <div className="pb-2 bg-secondary/30">
                        {cat.groups.map((g) => (
                          <MobileItem key={g.label} item={g} catHref={cat.href} />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </aside>
        </>
      )}
    </header>
  );
};

export default Navbar;
