import { ShieldCheck } from "lucide-react";
import { Button, ButtonLink } from "../ui/Button";
import { useInquiry } from "../inquiry/InquiryContext";

export function Hero() {
  const { openInquiry } = useInquiry();

  return (
    <section id="top" className="bg-white">
      <div className="section-container grid items-center gap-12 py-16 lg:grid-cols-12 lg:py-24">
        <div className="space-y-7 lg:col-span-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-trust/25 bg-trust/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-trust">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
            Trusted Medical &amp; Dental Supply Partner
          </span>

          <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
            Precision-grade medical consumables for hospitals, clinics, and distribution
            partners.
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            MediDosth supplies genuine restorative materials, endodontic systems, impression
            materials, and clinical disposables — batch-documented, competitively priced, and
            dispatched promptly.
          </p>

          <div className="flex flex-col gap-3 pt-1 sm:flex-row">
            <ButtonLink size="lg" href="#products" withArrow>
              Explore Product Portfolio
            </ButtonLink>
            <Button size="lg" variant="secondary" onClick={() => openInquiry()}>
              Request Bulk Quote
            </Button>
          </div>

          <dl className="grid grid-cols-3 gap-6 border-t border-slate-200 pt-6">
            {[
              ["4", "Product categories"],
              ["24 h", "Quote response"],
              ["100%", "Genuine stock"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd className="text-2xl font-semibold tracking-tight text-ink">{value}</dd>
                <dd className="mt-0.5 text-xs font-medium text-slate-500">{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative lg:col-span-6">
          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
            <img
              src="/images/hero.png"
              alt="Precision medical supply warehouse with organized clinical inventory"
              className="aspect-[3/2] w-full object-cover"
              loading="eager"
            />
          </div>

          <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-lg sm:left-8">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-trust/10 text-trust">
              <ShieldCheck className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">Genuine, batch-documented supply</p>
              <p className="text-xs text-slate-500">Quality records available on request</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
