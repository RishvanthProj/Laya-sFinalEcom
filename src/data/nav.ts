export type SubItem = { label: string; children?: string[] };

export const slugifyNavLabel = (label: string) =>
  label
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
export type NavCategory = {
  label: string;
  href: string;
  highlight?: boolean;
  groups: SubItem[];
};

export const NAV: NavCategory[] = [
  {
    label: "Stationery",
    href: "/category/stationery",
    groups: [
      { label: "Writing Supplies", children: ["Pens", "Pencils", "Highlighters"] },
      { label: "Erasers & Sharpeners" },
      { label: "Notebooks & Journals" },
      { label: "Stickers & Labels" },
    ],
  },
  {
    label: "Daily Essentials",
    href: "/category/daily-essentials",
    groups: [
      { label: "Lunch Boxes & Bottles" },
      { label: "Bags" },
      { label: "Pencil Pouches" },
      { label: "Bag Charms" },
      { label: "Bag Brooches & Pins" },
      { label: "Thermal Bags" },
      { label: "Organizers" },
      { label: "Keychains" },
      { label: "Seasonal Decor", children: ["Christmas Ornaments"] },
    ],
  },
  {
    label: "Resin Art",
    href: "/category/resin-art",
    groups: [
      { label: "Keychains" },
      { label: "Fridge Magnets" },
      { label: "Photo Frames" },
      { label: "Coasters" },
      { label: "Spoon Stand" },
      { label: "Phone Stands" },
      { label: "Return Gifts" },
      { label: "Cake Trays" },
      { label: "Mobile Pop Sockets" },
      { label: "Brooches" },
    ],
  },
  {
    label: "Accessories & Jewellery",
    href: "/category/accessories",
    groups: [
      { label: "Hair Accessories", children: ["Kids", "Women's", "Festive & Party Wear"] },
      {
        label: "Everyday Jewellery",
        children: ["Studs & Earrings", "Anklets", "Bracelets & Bangles", "Necklaces", "Rings"],
      },
      {
        label: "Gold-Plated Jewellery",
        children: ["Necklaces", "Bracelets & Bangles", "Rings", "Earrings & Studs", "Watches", "Anklets", "Brooches"],
      },
    ],
  },
  {
    label: "Clearance Sale",
    href: "/category/clearance",
    highlight: true,
    groups: [
      { label: "Pens & Pencils" },
      { label: "Erasers & Sharpeners" },
      { label: "Highlighters" },
      { label: "Stationery Clearance" },
    ],
  },
];
