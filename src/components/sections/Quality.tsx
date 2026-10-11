import { Factory, ClipboardCheck, Warehouse, FileSearch } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";

const PROCESS = [
  {
    icon: Factory,
    title: "Verified sourcing",
    text: "Products procured only through manufacturer-authorized, auditable supply channels.",
  },
  {
    icon: ClipboardCheck,
    title: "Batch verification",
    text: "Incoming inspection against batch records, labeling, and shelf-life requirements.",
  },
  {
    icon: Warehouse,
    title: "Controlled storage",
    text: "Clean, organized storage with hygiene and temperature discipline throughout handling.",
  },
  {
    icon: FileSearch,
    title: "Full traceability",
    text: "Batch-level documentation retained and supplied with every order on request.",
  },
];

export function Quality() {
  return (
    <section id="quality" className="scroll-mt-20 bg-ink py-20 text-white sm:py-24">
      <div className="section-container">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              dark
              eyebrow="Manufacturing & Quality"
              title="A supply chain built on documentation and discipline"
              lede="Institutional buyers do not buy products — they buy confidence. Every stage of our sourcing and handling is built to be verified, audited, and documented."
            />

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {PROCESS.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-trust">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-400">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <img
                src="/images/quality.png"
                alt="Quality control inspection of medical consumables"
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-5 right-5 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-lg sm:right-8">
              <p className="text-sm font-semibold text-ink">Quality records on request</p>
              <p className="text-xs text-slate-500">Batch documents supplied with every quote</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
