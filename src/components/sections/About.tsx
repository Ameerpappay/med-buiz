import { MapPin, BadgeCheck } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { SITE } from "../../lib/site";

export function About() {
  return (
    <section id="about" className="scroll-mt-20 border-t border-slate-200 bg-ice py-20 sm:py-24">
      <div className="section-container grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="About MediDosth"
            title="A supply partner built for healthcare"
            lede="MediDosth was founded on a simple observation: healthcare providers lose too much time to uncertain supply. Our role is to make medical and dental consumables predictable — genuine products, clear pricing, documented quality, and delivery that keeps pace with clinical demand."
          />
          <div className="mt-8 flex flex-col gap-4 text-sm text-slate-600 sm:flex-row">
            <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-3">
              <MapPin className="h-4 w-4 shrink-0 text-clinical" aria-hidden />
              Based in {SITE.region}, serving providers across India
            </div>
            <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-3">
              <BadgeCheck className="h-4 w-4 shrink-0 text-trust" aria-hidden />
              Verified sourcing, batch-documented supply
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <p className="text-lg font-medium leading-relaxed tracking-tight text-ink">
            “Institutional buyers do not buy products — they buy confidence. Every stage of our
            sourcing and handling is built to be verified.”
          </p>
          <div className="mt-6 border-t border-slate-100 pt-6">
            <p className="text-sm font-semibold text-ink">{SITE.name}</p>
            <p className="text-xs text-slate-500">{SITE.tagline}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
