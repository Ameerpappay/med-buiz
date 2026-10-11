import { useState } from "react";
import { ChevronDown, FileText } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { useInquiry } from "../inquiry/InquiryContext";

const FAQS = [
  {
    q: "Which regulatory documents do you provide with orders?",
    a: "Product-specific documentation — batch records, certificates of analysis, and manufacturer quality documents where applicable — is supplied with quotes and orders on request. Share your documentation checklist during inquiry and we will confirm availability per product line.",
  },
  {
    q: "What are your minimum order quantities and lead times?",
    a: "MOQs vary by product line and pack configuration. Standard catalog items are typically dispatched promptly from available stock; volume or non-stock items are confirmed with a firm lead time in your quote.",
  },
  {
    q: "Do you support recurring or contract supply for institutions?",
    a: "Yes. Hospitals, clinic chains, and distributors can arrange scheduled recurring supply with agreed pricing. Contact us with your consumption pattern and we will propose a supply plan.",
  },
  {
    q: "Do you offer OEM or private-label programs?",
    a: "Custom sourcing and private-label arrangements are evaluated case by case, depending on product category, volumes, and documentation requirements. Use the OEM inquiry type and include your target specifications.",
  },
  {
    q: "How do you assure product quality and authenticity?",
    a: "We source only through verified, manufacturer-authorized channels, verify batches at intake against documentation, store under controlled conditions, and retain batch-level traceability records for every order.",
  },
  {
    q: "Which regions do you serve?",
    a: "We currently serve healthcare providers and partners across India from our Kerala base, and evaluate international distributor inquiries case by case. Reach out with your territory and product lines of interest.",
  },
];

export function ComplianceFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { openInquiry } = useInquiry();

  return (
    <section id="compliance" className="scroll-mt-20 border-t border-slate-200 bg-white py-20 sm:py-24">
      <div className="section-container grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <SectionHeading
            eyebrow="Compliance & FAQ"
            title="Answers for institutional buyers"
            lede="The questions procurement teams, hospital buyers, and distributors ask us most — answered directly."
          />

          <div className="mt-8 rounded-xl border border-slate-200 bg-ice p-6">
            <div className="flex items-start gap-3.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-clinical shadow-sm">
                <FileText className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-ink">Need a specific document?</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  Certification copies, specification sheets, or batch-format samples — request
                  them with your inquiry.
                </p>
                <button
                  onClick={() => openInquiry()}
                  className="mt-3 text-sm font-semibold text-clinical underline decoration-clinical/30 underline-offset-2 hover:text-blue-800"
                >
                  Request documentation
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="divide-y divide-slate-200 rounded-xl border border-slate-200">
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={faq.q}>
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-ice/60"
                  >
                    <span className="text-sm font-semibold text-ink sm:text-base">{faq.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden
                    />
                  </button>
                  {isOpen && (
                    <p className="px-6 pb-5 text-sm leading-relaxed text-slate-600">{faq.a}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
