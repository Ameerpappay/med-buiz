import { SITE, whatsappUrl } from "./site";

export interface InquiryPayload {
  requirementType: string;
  name: string;
  organization: string;
  email: string;
  phone: string;
  product?: string;
  message: string;
}

export type InquiryResult = { kind: "endpoint" } | { kind: "whatsapp"; url: string };

export async function submitInquiry(payload: InquiryPayload): Promise<InquiryResult> {
  const endpoint = import.meta.env.VITE_INQUIRY_ENDPOINT as string | undefined;

  if (endpoint) {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Inquiry submit failed: ${res.status}`);
    return { kind: "endpoint" };
  }

  const lines = [
    `New inquiry — ${payload.requirementType}`,
    `Name: ${payload.name}`,
    `Organization: ${payload.organization}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    payload.product ? `Product: ${payload.product}` : "",
    `Details: ${payload.message}`,
  ].filter(Boolean);

  return { kind: "whatsapp", url: whatsappUrl(lines.join("\n")) };
}

export function emailUrl(payload: InquiryPayload): string {
  const subject = encodeURIComponent(
    `Inquiry — ${payload.requirementType}${payload.product ? ` — ${payload.product}` : ""}`,
  );
  const body = encodeURIComponent(
    [
      `Name: ${payload.name}`,
      `Organization: ${payload.organization}`,
      `Email: ${payload.email}`,
      `Phone: ${payload.phone}`,
      payload.product ? `Product: ${payload.product}` : "",
      "",
      payload.message,
    ]
      .filter(Boolean)
      .join("\n"),
  );
  return `mailto:${SITE.email}?subject=${subject}&body=${body}`;
}
