import type { Dictionary } from '@shared/i18n/LocaleProvider';

export type ServiceCopy = { title: string; body: string };

export const servicesCopy: Dictionary<{
  eyebrow: string;
  title: string;
  sub: string;
  cta: string;
  services: [ServiceCopy, ServiceCopy, ServiceCopy, ServiceCopy];
}> = {
  es: {
    eyebrow: 'Nuestros servicios',
    title: 'Soluciones inmobiliarias a tu medida',
    sub: 'Te ofrecemos un servicio integral, desde la búsqueda hasta la entrega de llaves.',
    cta: 'Ver desarrollos',
    services: [
      { title: 'Compra', body: 'Encuentra la propiedad perfecta para ti.' },
      { title: 'Venta', body: 'Maximiza el valor de tu inmueble.' },
      { title: 'Renta', body: 'Opciones flexibles para cada necesidad.' },
      { title: 'Inversión', body: 'Haz crecer tu patrimonio con seguridad.' },
    ],
  },
  en: {
    eyebrow: 'Our services',
    title: 'Real estate solutions that fit you',
    sub: 'A full service, from the first search to handing over the keys.',
    cta: 'See developments',
    services: [
      { title: 'Buy', body: 'Find the right property for you.' },
      { title: 'Sell', body: 'Get the most value from your property.' },
      { title: 'Lease', body: 'Flexible options for every need.' },
      { title: 'Invest', body: 'Grow your wealth with confidence.' },
    ],
  },
};
