import { FacebookIcon, InstagramIcon, PinterestIcon } from "@/components/icons";

const Footer = () => (
  <footer data-theme="home" className="bg-[hsl(60_4%_17%)] text-[hsl(33_27%_94%)]">
    <div className="container mx-auto px-4 lg:px-8 py-12 md:py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
      <div className="sm:col-span-2 md:col-span-1">
        <p className="font-serif text-2xl">Laya's Little Shop</p>
        <p className="mt-4 text-[13px] leading-relaxed opacity-70 max-w-sm md:max-w-[240px]">
          Handcrafted artisan stationery, daily essentials & jewellery — made
          with love, in India.
        </p>
        <div className="flex gap-4 mt-6">
          <a href="#" aria-label="Instagram" className="hover:text-accent transition-colors">
            <InstagramIcon className="h-5 w-5" />
          </a>
          <a href="#" aria-label="Facebook" className="hover:text-accent transition-colors">
            <FacebookIcon className="h-5 w-5" />
          </a>
          <a href="#" aria-label="Pinterest" className="hover:text-accent transition-colors">
            <PinterestIcon className="h-5 w-5" />
          </a>
        </div>
      </div>

      <div>
        <h4 className="text-[11px] uppercase tracking-[0.18em] opacity-70 mb-4">Quick Links</h4>
        <ul className="space-y-2.5 text-[13px]">
          {["About", "Contact", "Shipping & Returns", "FAQ"].map((l) => (
            <li key={l}><a href="#" className="opacity-90 hover:text-accent transition-colors">{l}</a></li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-[11px] uppercase tracking-[0.18em] opacity-70 mb-4">Shop</h4>
        <ul className="space-y-2.5 text-[13px]">
          {["Stationery", "Daily Essentials", "Accessories & Jewellery", "Clearance Sale"].map((l) => (
            <li key={l}><a href="#" className="opacity-90 hover:text-accent transition-colors">{l}</a></li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-[11px] uppercase tracking-[0.18em] opacity-70 mb-4">Contact</h4>
        <ul className="space-y-2.5 text-[13px] opacity-90">
          <li>hello@layaslittleshop.in</li>
          <li>Mon – Sat, 10am – 6pm IST</li>
          <li>Made in India</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-white/10">
      <p className="container mx-auto px-4 lg:px-8 py-5 text-[10px] uppercase tracking-[0.12em] opacity-60 sm:text-[11px] sm:tracking-[0.16em]">
        © 2025 Laya's Little Shop. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
