const AnnouncementBar = () => {
  const message =
    "Free shipping on orders above ₹599  ·  New arrivals every week  ·  Handcrafted with love";
  // duplicate enough times for seamless loop
  const items = Array.from({ length: 6 }, () => message);

  return (
    <div className="w-full bg-[hsl(60_4%_10%)] text-white overflow-hidden">
      <div className="relative flex whitespace-nowrap py-2">
        <div className="flex animate-marquee min-w-max">
          {items.map((m, i) => (
            <span
              key={`a-${i}`}
              className="px-8 text-[12px] tracking-[0.08em] uppercase font-light"
            >
              {m}
            </span>
          ))}
          {items.map((m, i) => (
            <span
              key={`b-${i}`}
              className="px-8 text-[12px] tracking-[0.08em] uppercase font-light"
              aria-hidden="true"
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
