import type { Dictionary } from '@shared/i18n/LocaleProvider';

export const developmentsCopy: Dictionary<{
  title: string;
  filters: [string, string, string];
  filterLabel: string;
  tagPre: string;
  tagCom: string;
  sold: string;
  prev: string;
  next: string;
  railLabel: string;
  inZone: string;
  clearZone: string;
  emptyTitle: string;
  emptySub: string;
  emptyReset: string;
  emptyContact: string;
  illustrativeNote: string;
  illustrativeAlt: string;
  requestInfo: string;
}> = {
  es: {
    title: 'Desarrollos destacados',
    filters: ['Todos', 'Preventa', 'Comercial'],
    filterLabel: 'Filtrar desarrollos',
    tagPre: 'Preventa',
    tagCom: 'Comercial',
    sold: 'vendido',
    prev: 'Desarrollo anterior',
    next: 'Siguiente desarrollo',
    railLabel: 'Carrusel de desarrollos',
    inZone: 'Mostrando proyectos en',
    clearZone: 'Ver todas las zonas',
    emptyTitle: 'Por ahora no hay proyectos con ese filtro.',
    emptySub: 'Tenemos inventario fuera de catálogo. Cuéntanos qué buscas y te mandamos opciones.',
    emptyReset: 'Ver todos',
    emptyContact: 'Hablar con un asesor',
    illustrativeNote: 'Imágenes ilustrativas: no corresponden a los desarrollos. Pide los renders oficiales a tu asesor.',
    illustrativeAlt: 'Imagen ilustrativa: ',
    requestInfo: 'Pedir información',
  },
  en: {
    title: 'Featured developments',
    filters: ['All', 'Pre-sale', 'Commercial'],
    filterLabel: 'Filter developments',
    tagPre: 'Pre-sale',
    tagCom: 'Commercial',
    sold: 'sold',
    prev: 'Previous development',
    next: 'Next development',
    railLabel: 'Developments carousel',
    inZone: 'Showing projects in',
    clearZone: 'See all areas',
    emptyTitle: 'Nothing matches that filter yet.',
    emptySub: 'We have off-market inventory. Tell us what you need and we will send options.',
    emptyReset: 'See all',
    emptyContact: 'Talk to an advisor',
    illustrativeNote: 'Illustrative images, not the actual developments. Ask your advisor for the official renders.',
    illustrativeAlt: 'Illustrative image: ',
    requestInfo: 'Request info',
  },
};
