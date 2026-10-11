import { Mail, Phone, MapPin, FileText, MessageCircle } from "lucide-react";
import { NAV_LINKS, SITE, whatsappUrl } from "../../lib/site";
import { useInquiry } from "../inquiry/InquiryContext";

export function Footer() {
  const { openInquiry } = useInquiry();

  return (
    <footer id="contact" className="border-t border-slate-800 bg-ink text-slate-400">
      <div className="section-container grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <img
            src="/logo.png"
            alt={`${SITE.name} logo`}
            className="h-12 w-auto object-contain brightness-0 invert"
          />
          <p className="max-w-xs text-sm leading-relaxed">
            {SITE.name} supplies genuine medical and dental consumables directly to verified
            healthcare providers and distribution partners.
          </p>
          <p className="text-xs text-slate-500">{SITE.tagline}</p>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white">
            Company
          </h4>
          <ul className="space-y-2.5 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white">
            Resources
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <button
                onClick={() => openInquiry()}
                className="inline-flex items-center gap-2 transition-colors hover:text-white"
              >
                <FileText className="h-4 w-4" aria-hidden />
                Request Product Catalog
              </button>
            </li>
            <li>
              <a
                href={whatsappUrl(`Hello ${SITE.name}, please share your product catalog and price list.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-white"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                Catalog via WhatsApp
              </a>
            </li>
            <li>
              <a href="#compliance" className="transition-colors hover:text-white">
                Compliance &amp; Documentation
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white">
            Contact &amp; Support
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-2.5 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4 shrink-0 text-trust" aria-hidden />
                {SITE.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:+${SITE.phoneIntl}`}
                className="flex items-center gap-2.5 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4 shrink-0 text-trust" aria-hidden />
                {SITE.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin className="h-4 w-4 shrink-0 text-trust" aria-hidden />
              {SITE.region}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800/80">
        <div className="section-container flex flex-col gap-2 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p>Products are supplied in compliance with applicable regulatory requirements.</p>
        </div>
      </div>
    </footer>
  );
}
