import { FormEvent, useEffect, useRef, useState } from "react";
import { X, ShieldCheck } from "lucide-react";
import { Button } from "../ui/Button";
import { submitInquiry, emailUrl, InquiryPayload } from "../../lib/inquiry";

const REQUIREMENT_TYPES = [
  "Hospital / Clinic Procurement",
  "Wholesale Distribution",
  "OEM / Private Label",
  "General Inquiry",
];

interface Props {
  open: boolean;
  product?: string;
  onClose: () => void;
}

export function InquiryModal({ open, product, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setStatus("idle");
      setError(null);
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const payload: InquiryPayload = {
      requirementType: String(data.get("requirementType")),
      name: String(data.get("name")),
      organization: String(data.get("organization")),
      email: String(data.get("email")),
      phone: String(data.get("phone")),
      product,
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
      setError(`Could not send automatically. Email us at the link below, or call us directly.`);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Request a quote or catalog"
    >
      <div
        ref={dialogRef}
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-200 bg-white p-8 shadow-2xl"
      >
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-ink"
        >
          <X className="h-4 w-4" />
        </button>

        {status === "done" ? (
          <div className="py-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-trust/10 text-trust">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold tracking-tight text-ink">Inquiry received</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Thank you — our sales team will respond within one business day.
            </p>
            <Button variant="secondary" className="mt-6" onClick={onClose}>
              Close
            </Button>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-semibold tracking-tight text-ink">
              {product ? `Inquire — ${product}` : "Request Catalog / Quote"}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Tell us your requirement and we will respond with pricing and availability.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="inq-type" className="input-label">
                  Requirement Type
                </label>
                <select id="inq-type" name="requirementType" className="input-field" required>
                  {REQUIREMENT_TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="inq-name" className="input-label">
                    Full Name
                  </label>
                  <input id="inq-name" name="name" required className="input-field" placeholder="Dr. Jane Doe" />
                </div>
                <div>
                  <label htmlFor="inq-org" className="input-label">
                    Organization
                  </label>
                  <input
                    id="inq-org"
                    name="organization"
                    required
                    className="input-field"
                    placeholder="Hospital / Clinic / Company"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="inq-email" className="input-label">
                    Email
                  </label>
                  <input id="inq-email" name="email" type="email" required className="input-field" placeholder="you@organization.com" />
                </div>
                <div>
                  <label htmlFor="inq-phone" className="input-label">
                    Phone
                  </label>
                  <input id="inq-phone" name="phone" type="tel" required className="input-field" placeholder="+91 98765 43210" />
                </div>
              </div>
              <div>
                <label htmlFor="inq-message" className="input-label">
                  Requirement Details
                </label>
                <textarea
                  id="inq-message"
                  name="message"
                  rows={3}
                  required
                  className="input-field"
                  placeholder="Products, quantities, target timelines…"
                />
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <Button type="submit" size="lg" className="w-full" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Send Inquiry"}
              </Button>
              <p className="text-center text-xs text-slate-400">
                Submissions open in your WhatsApp if no server endpoint is configured.{" "}
                <a
                  href={emailUrl({
                    requirementType: "General Inquiry",
                    name: "",
                    organization: "",
                    email: "",
                    phone: "",
                    message: "",
                  })}
                  className="underline decoration-slate-300 underline-offset-2 hover:text-clinical"
                >
                  Or email us directly
                </a>
                .
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
