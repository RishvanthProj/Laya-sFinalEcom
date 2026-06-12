import { StarIcon } from "@/components/icons";

const reviews = [
  {
    name: "Aanya R.",
    location: "Mumbai",
    stars: 5,
    text: "The notebook is absolutely gorgeous — the linen feels expensive and the paper is dreamy to write on. Worth every rupee.",
  },
  {
    name: "Meera S.",
    location: "Bangalore",
    stars: 5,
    text: "Packaging alone made me smile. You can feel the love in every tiny detail. My new favourite shop without a doubt.",
  },
  {
    name: "Priya K.",
    location: "Delhi",
    stars: 5,
    text: "Bought the gold-plated studs for everyday wear and haven't taken them off. Beautifully crafted and so affordable.",
  },
  {
    name: "Divya M.",
    location: "Chennai",
    stars: 5,
    text: "The resin keychains are absolutely stunning — my daughter won't stop showing them off to everyone at school!",
  },
  {
    name: "Kavya T.",
    location: "Hyderabad",
    stars: 5,
    text: "Ordered the pencil pouch and highlighter set together. Both are incredible quality. Will definitely be ordering again.",
  },
  {
    name: "Sneha L.",
    location: "Pune",
    stars: 5,
    text: "The clearance sale prices are unbelievable. Got so much for so little and everything arrived perfectly packed.",
  },
];

const Reviews = () => (
  <section className="py-12 md:py-24 bg-background">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="text-center mb-8 md:mb-12">
        <p className="eyebrow mb-3">Customer Love</p>
        <h2 className="font-serif text-3xl md:text-5xl">Reviews</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-5">
        {reviews.map((r) => (
          <div
            key={r.name}
            className="bg-[#FDFAF6] border border-border p-5 rounded-sm hover:shadow-sm transition-shadow md:p-7"
          >
            {/* Stars */}
            <div className="flex gap-0.5 text-[#C1602B] mb-4">
              {Array.from({ length: r.stars }).map((_, i) => (
                <StarIcon key={i} className="h-3.5 w-3.5" />
              ))}
            </div>
            {/* Quote */}
            <p className="font-serif text-[16px] italic leading-relaxed text-foreground/85 md:text-[17px]">
              "{r.text}"
            </p>
            {/* Author */}
            <div className="mt-5 pt-4 border-t border-border/60">
              <p className="text-[12px] uppercase tracking-[0.14em] font-medium text-foreground">
                {r.name}
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{r.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Reviews;
