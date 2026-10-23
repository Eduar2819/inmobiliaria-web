/**
 * Contact channels. Set VITE_WHATSAPP_NUMBER in `.env.local` (international
 * format, digits only, e.g. 5218112345678). Without it, wa.me opens the
 * WhatsApp contact picker with the message prefilled.
 */
export const WHATSAPP_NUMBER: string = import.meta.env.VITE_WHATSAPP_NUMBER ?? '';

export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
