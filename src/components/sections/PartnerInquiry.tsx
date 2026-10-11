import { FormEvent, useState } from "react";
import { Building2, Globe2, Factory } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { submitInquiry, InquiryPayload } from "../../lib/inquiry";

const SEGMENTS = [
  {
    id: "Hospital / Clinic Procurement",
    icon: Building2,
    title: "Hospital / Clinic Procurement",
    text: "Regular supply for departments and practices",
  },
  {
    id: "Wholesale Distribution",
    icon: Globe2,
    title: "Wholesale Distribution",
    text: "Territory and channel partnerships",
  },
  {
    id: "OEM / Private Label",
    icon: Factory,
    title: "OEM / Private Label",
    text: "Custom sourcing and specification programs",
  },
] as const;

export function PartnerInquiry() {
  const [segment, setSegment] = useState<string>(SEGMENTS[0].id);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const payload: InquiryPayload = {
      requirementType: segment,
      name: String(data.get("name")),
      organization: String(data.get("organization")),
      email: String(data.get("email")),
      phone: String(data.get("phone")),
      message: String(data.get("message")),
    };

    setStatus("sending");
    setError(null);
    try {
      const result = await submitInquiry(payload);
      if (result.kind === "whatsapp") {
        window.open(result.url, "_blank", "noopener");
      }
      setStatus("done");
      form.reset();
    } catch {
      setStatus("idle");
      setError("Could not send automatically. Please email us or call directly — contacts are in the footer.");
    }
  };

  return (
    <section className="border-t border-slate-200 bg-ice py-20 sm:py-24">
      <div className="section-container">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <SectionHeading
              eyebrow="Partner With Us"
              title="Streamlined inquiry for institutional buyers"
              lede="Select your requirement type so your inquiry reaches the right desk — procurement, distribution, or custom sourcing."
            />
            <ul className="mt-8 space-y-3 text-sm text-slate-600">
              <li className="flex gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-trust" aria-hidden />
                Pricing and stock confirmation within one business day
              </li>
              <li className="flex gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-trust" aria-hidden />
                Specification sheets and batch documents supplied with quotes
              </li>
              <li className="flex gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-trust" aria-hidden />
                Bulk, contract, and recurring-supply arrangements available
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              {status === "done" ? (
                <div className="py-10 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-trust/10 text-trust">
                    <Building2 className="h-6 w-6" aria-hidden />
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight text-ink">Inquiry received</h3>
                  <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate-600">
                    Thank you — our team will respond within one business day with next steps.
                  </p>
                  <Button
                    variant="secondary"
                    className="mt-6"
                    onClick={() => setStatus("idle")}
                  >
                    Send another inquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Requirement type">
                    {SEGMENTS.map(({ id, icon: Icon, title, text }) => (
                      <button
                        key={id}
                        type="button"
                        role="radio"
                        aria-checked={segment === id}
                        onClick={() => setSegment(id)}
                        className={`rounded-xl border p-4 text-left transition-all ${
                          segment === id
                            ? "border-clinical bg-clinical/5 ring-1 ring-clinical"
                            : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                      >
                        <Icon
                          className={`h-5 w-5 ${segment === id ? "text-clinical" : "text-slate-400"}`}
                          aria-hidden
                        />
                        <p className="mt-2 text-xs font-semibold leading-snug text-ink">{title}</p>
                        <p className="mt-1 text-[11px] leading-snug text-slate-500">{text}</p>
                      </button>
                    ))}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="pi-name" className="input-label">
                        Full Name
                      </label>
                      <input id="pi-name" name="name" required className="input-field" placeholder="Dr. Jane Doe" />
                    </div>
                    <div>
                      <label htmlFor="pi-org" className="input-label">
                        Organization
                      </label>
                      <input
                        id="pi-org"
                        name="organization"
                        required
                        className="input-field"
                        placeholder={
                          segment === "Wholesale Distribution"
                            ? "Distribution company"
                            : segment === "OEM / Private Label"
                              ? "Brand / company"
                              : "Hospital / clinic"
                        }
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="pi-email" className="input-label">
                        Email
                      </label>
                      <input id="pi-email" name="email" type="email" required className="input-field" placeholder="you@organization.com" />
                    </div>
                    <div>
                      <label htmlFor="pi-phone" className="input-label">
                        Phone
                      </label>
                      <input id="pi-phone" name="phone" type="tel" required className="input-field" placeholder="+91 98765 43210" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="pi-message" className="input-label">
                      Requirement Details
                    </label>
                    <textarea
                      id="pi-message"
                      name="message"
                      rows={4}
                      required
                      className="input-field"
                      placeholder={
                        segment === "Wholesale Distribution"
                          ? "Territory, channels, target product lines, annual volume…"
                          : segment === "OEM / Private Label"
                            ? "Product category, target specifications, volumes…"
                            : "Products, quantities, delivery schedule…"
                      }
                    />
                  </div>

                  {error && <p className="text-sm text-red-600">{error}</p>}

                  <Button type="submit" size="lg" className="w-full" disabled={status === "sending"}>
                    {status === "sending" ? "Sending…" : "Submit Inquiry"}
                  </Button>
                  <p className="text-center text-xs text-slate-400">
                    Routed directly to our sales desk. No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
