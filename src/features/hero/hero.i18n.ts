import type { Dictionary } from '@shared/i18n/LocaleProvider';

type SearchField = { label: string; options: string[] };

export const heroCopy: Dictionary<{
  lead: string;
  h1a: string;
  h1b: string;
  h1c: string;
  sub: string;
  imageAlt: string;
  searchLabel: string;
  tabsLabel: string;
  tabs: [string, string, string];
  fields: [SearchField, SearchField, SearchField];
  search: string;
  statsLabel: string;
  stats: Array<{ n: number; suffix: string; label: string }>;
}> = {
  es: {
    lead: 'Preventa y espacios comerciales en Monterrey',
    h1a: 'Invierte',
    h1b: 'antes que',
    h1c: 'la ciudad.',
    sub: 'Elegimos las zonas de mayor plusvalía y te acompañamos desde el apartado hasta la escrituración.',
    imageAlt: 'Vista de Monterrey desde lo alto, con el Cerro de la Silla y la Sierra Madre detrás de la ciudad',
    searchLabel: 'Buscar propiedades',
    tabsLabel: 'Tipo de propiedad',
    tabs: ['Preventa', 'Oficinas', 'Locales'],
    fields: [
      { label: 'Zona', options: ['Todas las zonas', 'San Pedro', 'Valle Oriente', 'Cumbres', 'Centro', 'Santa Catarina'] },
      { label: 'Presupuesto', options: ['Cualquiera', 'Hasta $3M', '$3M-$6M', '$6M +'] },
      { label: 'Superficie', options: ['Cualquiera', '60-120 m²', '120-300 m²', '300 m² +'] },
    ],
    search: 'Buscar',
    statsLabel: 'Terranova en cifras',
    stats: [
      { n: 1200, suffix: '+', label: 'unidades colocadas' },
      { n: 14, suffix: '', label: 'desarrollos activos' },
      { n: 18, suffix: '%', label: 'plusvalía promedio anual' },
    ],
  },
  en: {
    lead: 'Pre-sale and commercial space in Monterrey',
    h1a: 'Invest',
    h1b: 'before',
    h1c: 'the city does.',
    sub: 'We pick the highest-appreciation areas and guide you from reservation to closing.',
    imageAlt: 'Monterrey seen from above, with the Cerro de la Silla and the Sierra Madre behind the city',
    searchLabel: 'Search properties',
    tabsLabel: 'Property type',
    tabs: ['Pre-sale', 'Offices', 'Retail'],
    fields: [
      { label: 'Area', options: ['All areas', 'San Pedro', 'Valle Oriente', 'Cumbres', 'Centro', 'Santa Catarina'] },
      { label: 'Budget', options: ['Any', 'Up to $3M', '$3M-$6M', '$6M +'] },
      { label: 'Size', options: ['Any', '60-120 m²', '120-300 m²', '300 m² +'] },
    ],
    search: 'Search',
    statsLabel: 'Terranova in numbers',
    stats: [
      { n: 1200, suffix: '+', label: 'units placed' },
      { n: 14, suffix: '', label: 'active developments' },
      { n: 18, suffix: '%', label: 'avg. yearly appreciation' },
    ],
  },
};
