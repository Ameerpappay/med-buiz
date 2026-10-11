export const SITE = {
  name: "MediDosth",
  domain: "https://medidosth.com",
  email: "contact@medidosth.com",
  phoneDisplay: "+91 98765 43210",
  phoneIntl: "919876543210",
  region: "Kerala, India",
  tagline: "Your Trusted Medical Partner",
} as const;

export const NAV_LINKS = [
  { label: "Products", href: "#products" },
  { label: "Manufacturing & Quality", href: "#quality" },
  { label: "Compliance", href: "#compliance" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export function whatsappUrl(message: string): string {
  return `https://wa.me/${SITE.phoneIntl}?text=${encodeURIComponent(message)}`;
}
