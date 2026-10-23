import type { Locale } from '@shared/i18n/LocaleProvider';
// Illustrative CC0 stock (see assets/CREDITS.md). Replace with the official renders before launch.
import torreAlbaImg from './assets/torre-alba.webp';
import nodo45Img from './assets/nodo-45.webp';
import cedroLivingImg from './assets/cedro-living.webp';
import aristaPlazaImg from './assets/arista-plaza.webp';

export type DevelopmentType = 'pre' | 'com';

export type Development = {
  id: string;
  name: string;
  zone: string;
  type: DevelopmentType;
  /** % of units sold — pre-sale only. */
  sold?: number;
  /** Photo URL. Empty → branded placeholder showing `placeholder`. */
  image?: string;
  /** Describes what the photo actually shows (not the project name). */
  imageAlt?: Record<Locale, string>;
  /** True while the photo is stock, not the project: the UI discloses it. */
  illustrative?: boolean;
  placeholder: Record<Locale, string>;
  price: Record<Locale, string>;
  meta: Record<Locale, string>;
  when: Record<Locale, string>;
};

// Sample inventory from the design handoff — replace with CMS / API data.
export const DEVELOPMENTS: Development[] = [
  {
    id: 'torre-alba',
    image: torreAlbaImg,
    imageAlt: { es: 'Torre residencial con balcones de vidrio', en: 'Residential tower with glass balconies' },
    illustrative: true,
    name: 'Torre Alba',
    zone: 'Valle Oriente',
    type: 'pre',
    sold: 68,
    placeholder: { es: 'Render torre residencial', en: 'Residential tower render' },
    price: { es: 'Desde $4.2M', en: 'From $4.2M' },
    meta: { es: '2-3 rec · 98-164 m²', en: '2-3 bed · 98-164 m²' },
    when: { es: 'Entrega Q4 2027', en: 'Delivery Q4 2027' },
  },
  {
    id: 'nodo-45',
    image: nodo45Img,
    imageAlt: { es: 'Fachada de vidrio de un edificio corporativo', en: 'Glass facade of an office building' },
    illustrative: true,
    name: 'Nodo 45',
    zone: 'San Pedro',
    type: 'com',
    placeholder: { es: 'Fachada corporativo', en: 'Office building facade' },
    price: { es: '$385/m² renta', en: '$385/m² lease' },
    meta: { es: 'Oficinas 120-1,400 m²', en: 'Offices 120-1,400 m²' },
    when: { es: 'Inmediata', en: 'Available now' },
  },
  {
    id: 'cedro-living',
    image: cedroLivingImg,
    imageAlt: { es: 'Alberca en azotea con palmeras y vista a la montaña', en: 'Rooftop pool with palm trees and a mountain view' },
    illustrative: true,
    name: 'Cedro Living',
    zone: 'Cumbres',
    type: 'pre',
    sold: 41,
    placeholder: { es: 'Amenidades / roof garden', en: 'Amenities / roof garden' },
    price: { es: 'Desde $2.9M', en: 'From $2.9M' },
    meta: { es: '1-3 rec · 62-130 m²', en: '1-3 bed · 62-130 m²' },
    when: { es: 'Entrega Q2 2027', en: 'Delivery Q2 2027' },
  },
  {
    id: 'arista-plaza',
    image: aristaPlazaImg,
    imageAlt: { es: 'Local comercial con vitrina a la calle', en: 'Storefront with a street-facing display window' },
    illustrative: true,
    name: 'Arista Plaza',
    zone: 'Santa Catarina',
    type: 'com',
    placeholder: { es: 'Plaza comercial / locales', en: 'Retail plaza / storefronts' },
    price: { es: 'Desde $3.6M', en: 'From $3.6M' },
    meta: { es: 'Locales 45-220 m²', en: 'Retail 45-220 m²' },
    when: { es: 'Apertura 2026', en: 'Opens 2026' },
  },
];
