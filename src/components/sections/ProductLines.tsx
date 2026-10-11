import { Layers, Waypoints, Box, Package, ArrowUpRight } from "lucide-react";
import { CATEGORIES, CategoryId } from "../../lib/products";
import { SectionHeading } from "../ui/SectionHeading";

const ICONS: Record<CategoryId, typeof Layers> = {
  restorative: Layers,
  endodontic: Waypoints,
  impression: Box,
  disposables: Package,
};

const DESCRIPTIONS: Record<CategoryId, string> = {
  restorative:
    "Composite resins, glass ionomer cements, bonding agents, and etching systems for everyday restorative procedures.",
  endodontic:
    "Rotary and manual NiTi files, gutta-percha points, sealers, and irrigation solutions for root canal therapy.",
  impression:
    "Alginate and silicone impression materials, trays, and accessories for precise dental impressions.",
  disposables:
    "Patient bibs, suction tips, gloves, and protective wear for daily clinical operations.",
};

interface Props {
  onSelect: (category: CategoryId) => void;
}

export function ProductLines({ onSelect }: Props) {
  return (
    <section id="products" className="scroll-mt-20 bg-white py-20 sm:py-24">
      <div className="section-container">
        <SectionHeading
          align="center"
          eyebrow="Product Lines"
          title="Core medical and dental categories"
          lede="Focused, high-demand product lines — each supplied with specification details and documentation on request."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((category) => {
            const Icon = ICONS[category.id];
            return (
              <div
                key={category.id}
                className="group flex flex-col rounded-xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-clinical/40 hover:shadow-md"
              >
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-ice text-clinical transition-colors group-hover:bg-clinical group-hover:text-white">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="text-base font-semibold tracking-tight text-ink">
                  {category.label}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {DESCRIPTIONS[category.id]}
                </p>
                <button
                  onClick={() => onSelect(category.id)}
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-clinical transition-colors hover:text-blue-800"
                >
                  View specifications
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
