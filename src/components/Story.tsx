import story from "@/assets/story.jpg";

const Story = () => (
  <section className="bg-secondary/50 py-16 md:py-24">
    <div className="container mx-auto px-4 lg:px-8 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
      <div>
        <p className="eyebrow mb-4">Our Story</p>
        <h2 className="font-serif text-4xl md:text-5xl leading-tight">
          Handcrafted with love, by hands that care.
        </h2>
        <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground max-w-md">
          Laya's Little Shop began as a love letter to slow craft — to notebooks
          you want to keep, jewellery worn every day, and the small daily
          essentials that make life feel a little softer. Each piece is gathered
          from artisans across India and packed with care.
        </p>
        <a
          href="#"
          className="inline-block mt-7 text-[12px] uppercase tracking-[0.18em] border-b border-foreground pb-1 hover:text-accent hover:border-accent transition-colors"
        >
          Read more
        </a>
      </div>
      <img
        src={story}
        alt="Hands wrapping a handcrafted gift"
        loading="lazy"
        width={1200}
        height={900}
        className="w-full aspect-[4/3] object-cover"
      />
    </div>
  </section>
);

export default Story;
