import type { Dictionary, Locale } from '@shared/i18n/LocaleProvider';

export type Zone = {
  id: string;
  name: string;
  /** Approximate center of the zone (WGS84). */
  lat: number;
  lng: number;
  growth: string;
  m2: string;
  devs: number;
  desc: Record<Locale, string>;
};

// Sample market figures from the design handoff — replace with real data.
export const ZONES: Zone[] = [
  { id: 'cumbres', name: 'Cumbres', lat: 25.7352, lng: -100.4047, growth: '14%', m2: '$38k', devs: 3, desc: { es: 'Zona residencial consolidada al poniente, con alta demanda familiar y nuevos corredores comerciales.', en: 'Established residential area to the west, strong family demand and new retail corridors.' } },
  { id: 'valle-oriente', name: 'Valle Oriente', lat: 25.6425, lng: -100.3372, growth: '21%', m2: '$72k', devs: 4, desc: { es: 'El distrito financiero de mayor crecimiento: torres mixtas, corporativos y vida urbana a pie.', en: 'The fastest-growing financial district: mixed-use towers, offices and walkable city life.' } },
  { id: 'san-pedro', name: 'San Pedro', lat: 25.6573, lng: -100.4020, growth: '17%', m2: '$85k', devs: 3, desc: { es: 'El municipio con mayor plusvalía del país; ideal para oficinas premium y residencial de alto nivel.', en: 'The highest-value municipality in the country; ideal for premium offices and upscale living.' } },
  { id: 'centro', name: 'Centro', lat: 25.6694, lng: -100.3099, growth: '12%', m2: '$41k', devs: 2, desc: { es: 'Regeneración urbana con incentivos para vivienda vertical y locales a nivel de calle.', en: 'Urban regeneration with incentives for vertical housing and street-level retail.' } },
  { id: 'santa-catarina', name: 'Santa Catarina', lat: 25.6733, lng: -100.4585, growth: '15%', m2: '$29k', devs: 2, desc: { es: 'Polo logístico e industrial en expansión; fuerte demanda de locales y oficinas de soporte.', en: 'Expanding logistics and industrial hub; strong demand for retail and support offices.' } },
];

export const zonesCopy: Dictionary<{
  title: string;
  sub: string;
  m2: string;
  growth: string;
  devs: string;
  cta: string;
  mapLabel: string;
  pin: (name: string) => string;
  mapLoading: string;
}> = {
  es: {
    title: 'Dónde crece Monterrey',
    sub: 'Selecciona una zona para ver precio promedio y plusvalía.',
    m2: 'Precio m²',
    growth: 'Plusvalía',
    devs: 'Proyectos',
    cta: 'Ver proyectos en',
    mapLabel: 'Mapa de zonas de Monterrey',
    mapLoading: 'Cargando mapa',
    pin: (name) => `Ver ${name} en el mapa`,
  },
  en: {
    title: 'Where Monterrey is growing',
    sub: 'Pick an area to see average price and appreciation.',
    m2: 'Price m²',
    growth: 'Growth',
    devs: 'Projects',
    cta: 'See projects in',
    mapLabel: 'Map of Monterrey areas',
    mapLoading: 'Loading map',
    pin: (name) => `Show ${name} on the map`,
  },
};

