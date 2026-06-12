import story from "@/assets/story.jpg";

const AboutUs = () => (
  <section className="py-12 md:py-24" style={{ backgroundColor: "#F2EBE0" }}>
    <div className="container mx-auto px-4 lg:px-8 grid md:grid-cols-2 gap-8 md:gap-20 items-center">
      {/* Left: brand story */}
      <div>
        <p className="eyebrow mb-4">Our Story</p>
        <h2 className="font-serif text-3xl md:text-5xl leading-tight">
          About Us
        </h2>
        <div className="mt-5 space-y-4 text-[14px] leading-relaxed text-foreground/75 max-w-lg md:mt-7 md:text-[15px]">
          <p>
            Laya's Little Shop was born from a love of handcrafted things — the
            kind of objects that slow you down and make you notice beauty in the
            everyday. What started as a small collection of notebooks and
            stationery has grown into a thoughtfully curated world of
            handcrafted stationery, daily essentials, resin art, and jewellery.
          </p>
          <p>
            Every piece is sourced from skilled artisans across India — people
            who pour intention into their craft. We believe the little things
            matter: the notebook you reach for each morning, the earrings you
            wear without thinking, the pouch that makes your bag feel organised
            and lovely.
          </p>
          <p>
            Small batches. Quiet beauty. Made with love, in India.
          </p>
        </div>
        <a
          href="#"
          className="inline-block mt-7 text-[12px] uppercase tracking-[0.14em] border-b border-foreground pb-1 hover:text-accent hover:border-accent transition-colors md:tracking-[0.18em]"
        >
          Our full story →
        </a>
      </div>

      {/* Right: lifestyle image */}
      <div className="relative">
        <img
          src={story}
          alt="Hands wrapping a handcrafted gift — Laya's Little Shop"
          loading="lazy"
          width={1200}
          height={900}
          className="w-full aspect-[4/3] object-cover rounded-sm"
        />
        {/* Small accent badge */}
        <div className="absolute -bottom-5 -left-5 hidden md:flex items-center justify-center w-20 h-20 rounded-full bg-[#C1602B] text-white text-center">
          <p className="font-serif text-[11px] leading-tight px-2">
            Made<br />in<br />India
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default AboutUs;
