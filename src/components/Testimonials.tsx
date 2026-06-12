import { StarIcon } from "@/components/icons";

const reviews = [
  { name: "Aanya R.", text: "The notebook is gorgeous — the linen feels expensive and the paper is dreamy to write on." },
  { name: "Meera S.", text: "Packaging alone made me smile. You can feel the love in every detail. My new favourite shop." },
  { name: "Priya K.", text: "Bought the gold-plated studs for everyday wear and haven't taken them off. Beautifully made." },
];

const Testimonials = () => (
  <section className="container mx-auto px-4 lg:px-8 py-16 md:py-24">
    <div className="text-center mb-12">
      <p className="eyebrow mb-3">Kind Words</p>
      <h2 className="font-serif text-4xl md:text-5xl">Loved by you</h2>
    </div>
    <div className="grid md:grid-cols-3 gap-6">
      {reviews.map((r) => (
        <div key={r.name} className="bg-card border border-border p-7">
          <div className="flex gap-0.5 text-accent mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} className="h-3.5 w-3.5" />
            ))}
          </div>
          <p className="text-[14px] leading-relaxed text-foreground/85 font-serif text-lg italic">
            “{r.text}”
          </p>
          <p className="mt-5 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            — {r.name}
          </p>
        </div>
      ))}
    </div>
  </section>
);

export default Testimonials;
