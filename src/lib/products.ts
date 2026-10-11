export type CategoryId = "restorative" | "endodontic" | "impression" | "disposables";

export interface Category {
  id: CategoryId;
  label: string;
  short: string;
}

export const CATEGORIES: Category[] = [
  { id: "restorative", label: "Restorative Materials & Cements", short: "Restorative" },
  { id: "endodontic", label: "Endodontics & RCT", short: "Endodontics" },
  { id: "impression", label: "Impression Materials", short: "Impression" },
  { id: "disposables", label: "Clinical Disposables & PPE", short: "Disposables" },
];

export interface Product {
  id: number;
  name: string;
  category: CategoryId;
  description: string;
  specs: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Universal Composite Resin",
    category: "restorative",
    description:
      "High-radiopacity restorative composite syringe for anterior and posterior restorations.",
    specs: ["Shades: A1, A2, A3, B1", "Pack size: 4 g syringe", "ISO 4049 compliant"],
  },
  {
    id: 2,
    name: "Rotary Ni-Ti Files Set",
    category: "endodontic",
    description:
      "Flexible nickel-titanium root canal shaping files with high resistance to fatigue.",
    specs: ["Lengths: 21 mm, 25 mm", "Pack: 6 files", "Autoclavable"],
  },
  {
    id: 3,
    name: "High-Precision Alginate",
    category: "impression",
    description:
      "Dust-free fast-setting alginate impression material with chromatic indicator.",
    specs: ["Fast set (1 min 30 s)", "453 g pack", "Mint flavor"],
  },
  {
    id: 4,
    name: "3-Ply Patient Bibs",
    category: "disposables",
    description:
      "Waterproof absorbent bibs featuring 2-ply tissue plus 1-ply poly backing.",
    specs: ["Colors: blue, green, white", "125 pcs/box", "33 cm × 45 cm"],
  },
  {
    id: 5,
    name: "Glass Ionomer Luting Cement",
    category: "restorative",
    description:
      "Self-curing radiopaque glass ionomer luting cement for crowns and bridges.",
    specs: ["15 g powder + 10 g liquid", "Fluoride releasing", "Low film thickness"],
  },
  {
    id: 6,
    name: "Gutta Percha Points",
    category: "endodontic",
    description: "Hand-rolled uniform taper points for precise root canal obturation.",
    specs: ["Taper: .04 / .06", "Sizes: #15 – #40", "60 points/box"],
  },
];

export const categoryLabel = (id: CategoryId): string =>
  CATEGORIES.find((c) => c.id === id)?.short ?? id;
