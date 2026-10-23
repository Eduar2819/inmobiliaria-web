import type { Dictionary } from '@shared/i18n/LocaleProvider';

export type Reason = { title: string; body: string };

export const whyCopy: Dictionary<{
  eyebrow: string;
  title: string;
  sub: string;
  cta: string;
  reasons: [Reason, Reason, Reason, Reason];
}> = {
  es: {
    eyebrow: 'Nuestra diferencia',
    title: '¿Por qué elegir Terranova?',
    sub: 'No solo vendemos propiedades, construimos relaciones a largo plazo.',
    cta: 'Habla con un asesor',
    reasons: [
      { title: 'Seguridad en cada proceso', body: 'Documentación clara y sin complicaciones.' },
      { title: 'Asesoría personalizada', body: 'Te acompañamos en todo momento.' },
      { title: 'Amplia cartera de propiedades', body: 'Residenciales, comerciales e inversión.' },
      { title: 'Experiencia y confianza', body: 'Años de trayectoria en el sector.' },
    ],
  },
  en: {
    eyebrow: 'What sets us apart',
    title: 'Why choose Terranova?',
    sub: "We don't just sell property, we build long-term relationships.",
    cta: 'Talk to an advisor',
    reasons: [
      { title: 'Safe at every step', body: 'Clear paperwork, no surprises.' },
      { title: 'Personal advice', body: 'We are with you the whole way.' },
      { title: 'A broad portfolio', body: 'Residential, commercial and investment.' },
      { title: 'Experience you can trust', body: 'Years of track record in the market.' },
    ],
  },
};
