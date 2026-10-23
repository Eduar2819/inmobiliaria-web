import type { Dictionary } from '@shared/i18n/LocaleProvider';

export const leadCopy: Dictionary<{
  title: string;
  sub: string;
  wa: string;
  waMessage: string;
  name: string;
  phone: string;
  interest: string;
  interests: string[];
  send: string;
  sending: string;
  sentTitle: string;
  sentSub: string;
  error: string;
  fab: string;
}> = {
  es: {
    title: 'Hablemos de tu próxima inversión.',
    sub: 'Un asesor te responde en menos de 15 minutos en horario hábil.',
    wa: 'Escríbenos por WhatsApp',
    waMessage: 'Hola Terranova, me interesa recibir información de sus desarrollos.',
    name: 'Nombre',
    phone: 'WhatsApp / Teléfono',
    interest: 'Me interesa',
    interests: ['Preventa', 'Oficinas', 'Locales', 'Inversión'],
    send: 'Quiero que me contacten',
    sending: 'Enviando…',
    sentTitle: 'Listo. Te contactamos pronto.',
    sentSub: 'Revisa tu WhatsApp en los próximos minutos.',
    error: 'No pudimos enviar tus datos. Intenta de nuevo o escríbenos por WhatsApp.',
    fab: 'Escríbenos por WhatsApp',
  },
  en: {
    title: "Let's talk about your next investment.",
    sub: 'An advisor replies in under 15 minutes during business hours.',
    wa: 'Message us on WhatsApp',
    waMessage: "Hi Terranova, I'd like information about your developments.",
    name: 'Name',
    phone: 'WhatsApp / Phone',
    interest: "I'm interested in",
    interests: ['Pre-sale', 'Offices', 'Retail', 'Investment'],
    send: 'Contact me',
    sending: 'Sending…',
    sentTitle: "Got it. We'll be in touch shortly.",
    sentSub: 'Check your WhatsApp in the next few minutes.',
    error: "We couldn't send your details. Try again or message us on WhatsApp.",
    fab: 'Message us on WhatsApp',
  },
};
