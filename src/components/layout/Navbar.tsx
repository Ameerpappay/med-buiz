import { useEffect, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { NAV_LINKS, SITE, whatsappUrl } from "../../lib/site";
import { Button, ButtonLink } from "../ui/Button";
import { useInquiry } from "../inquiry/InquiryContext";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { openInquiry } = useInquiry();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="section-container flex h-16 items-center justify-between">
        <a href="#top" className="flex shrink-0 items-center" aria-label={`${SITE.name} home`}>
          <img src="/logo.png" alt={`${SITE.name} logo`} className="h-10 w-auto object-contain" />
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-clinical"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ButtonLink
            variant="ghost"
            href={whatsappUrl(`Hello ${SITE.name}, I would like to inquire about your products.`)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="h-4 w-4 text-trust" aria-hidden />
            WhatsApp
          </ButtonLink>
          <Button onClick={() => openInquiry()}>Request Catalog</Button>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-700 transition-colors hover:bg-slate-100 lg:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 top-16 z-30 flex flex-col bg-white lg:hidden">
          <nav className="section-container flex flex-1 flex-col gap-1 py-6" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-medium text-ink transition-colors hover:bg-ice hover:text-clinical"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="section-container space-y-3 border-t border-slate-200 pb-8 pt-5">
            <ButtonLink
              variant="secondary"
              size="lg"
              className="w-full"
              onClick={() => setMenuOpen(false)}
              href={whatsappUrl(`Hello ${SITE.name}, I would like to inquire about your products.`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-4 w-4 text-trust" aria-hidden />
              Chat on WhatsApp
            </ButtonLink>
            <Button
              size="lg"
              className="w-full"
              onClick={() => {
                setMenuOpen(false);
                openInquiry();
              }}
            >
              Request Catalog
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
