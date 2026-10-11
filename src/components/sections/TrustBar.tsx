import { PackageCheck, ClipboardCheck, Truck, Landmark } from "lucide-react";

const ITEMS = [
  {
    icon: PackageCheck,
    title: "Authentic Stock",
    text: "Sourced through verified channels only",
  },
  {
    icon: ClipboardCheck,
    title: "Documented QA",
    text: "Batch records and quality documents on request",
  },
  {
    icon: Truck,
    title: "Prompt Dispatch",
    text: "Reliable fulfillment to clinics and institutions",
  },
  {
    icon: Landmark,
    title: "Institutional Pricing",
    text: "Transparent bulk and contract rates",
  },
];

export function TrustBar() {
  return (
    <section className="border-y border-slate-200 bg-ice">
      <div className="section-container grid grid-cols-2 gap-8 py-10 lg:grid-cols-4">
        {ITEMS.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-start gap-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-clinical">
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-ink">{title}</h3>
              <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
