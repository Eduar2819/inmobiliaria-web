/**
 * Token catalog used by the style guide. Values are NOT duplicated here —
 * the page reads them from the CSS custom properties at runtime.
 */

export const PALETTE: Array<{ group: string; tokens: Array<{ name: string; role: string }> }> = [
  {
    group: 'Pino (tinta, del logo)',
    tokens: [
      { name: '--tn-pino-950', role: 'Texto principal' },
      { name: '--tn-pino-900', role: 'Footer' },
      { name: '--tn-pino-800', role: 'Secciones oscuras' },
      { name: '--tn-pino-700', role: 'Superficie elevada sobre oscuro (mapa)' },
    ],
  },
  {
    group: 'Concreto (fondos)',
    tokens: [
      { name: '--tn-concreto-50', role: 'Tarjetas, formularios' },
      { name: '--tn-concreto-100', role: 'Fondo de página' },
      { name: '--tn-concreto-200', role: 'Hover de campos' },
      { name: '--tn-concreto-300', role: 'Fondo de media' },
    ],
  },
  {
    group: 'Bronce (acento único, del logo)',
    tokens: [
      { name: '--tn-bronce-300', role: 'Acento: rellenos (botones, cinta, panel de contacto, marcador) con texto pino, y texto de acento sobre pino' },
      { name: '--tn-bronce-400', role: 'Bronce claro, reservado' },
      { name: '--tn-bronce-550', role: 'Bronce profundo, reservado (admite texto blanco)' },
      { name: '--tn-bronce-500', role: 'Logo, decorativo' },
      { name: '--tn-bronce-600', role: 'Wordmark “NOVA” e íconos sobre claro' },
      { name: '--tn-bronce-700', role: 'Texto de acento sobre claro (enlaces, % vendido)' },
    ],
  },
  {
    group: 'Neutros y utilitarios',
    tokens: [
      { name: '--tn-liquen-600', role: 'Texto secundario, etiquetas' },
      { name: '--tn-liquen-500', role: 'Texto atenuado' },
      { name: '--tn-rojo-700', role: 'Errores de formulario' },
      { name: '--tn-whatsapp', role: 'Canal WhatsApp, verde profundo con ícono blanco' },
    ],
  },
];

/** Every text/background pairing that ships on the landing, with its minimum requirement. */
export const CONTRAST_PAIRS: Array<{ fg: string; bg: string; usage: string; large?: boolean }> = [
  { fg: '--color-text', bg: '--color-bg', usage: 'Texto base' },
  { fg: '--color-text-secondary', bg: '--color-bg', usage: 'Subtítulo del hero' },
  { fg: '--color-text-muted', bg: '--color-bg', usage: 'Metadatos de tarjetas, cifras' },
  { fg: '--color-text-label', bg: '--color-bg', usage: 'Etiquetas de campos y estado' },
  { fg: '--color-text-brand', bg: '--color-bg', usage: 'Wordmark NOVA (14px)' },
  { fg: '--color-text-accent', bg: '--color-bg', usage: 'Hover de enlaces, errores' },
    { fg: '--color-text-on-accent', bg: '--color-surface-accent', usage: 'Texto pino sobre bronce (botones, cinta, panel)' },
  { fg: '--color-text-inverse', bg: '--color-surface-inverse', usage: 'Texto sobre pino' },
  { fg: '--color-text-inverse-secondary', bg: '--color-surface-inverse', usage: 'Descripciones sobre pino' },
  { fg: '--color-text-inverse-muted', bg: '--color-surface-inverse', usage: 'Números y etiquetas atenuadas' },
  { fg: '--color-text-inverse-label', bg: '--color-surface-inverse', usage: 'Etiquetas sobre pino' },
  { fg: '--color-text-inverse-accent', bg: '--color-surface-inverse', usage: 'Zona activa, CTA sobre pino' },
  { fg: '--color-text-danger', bg: '--color-surface', usage: 'Errores de formulario' },
  { fg: '--color-on-whatsapp', bg: '--color-whatsapp', usage: 'Ícono blanco del botón WhatsApp (gráfico: 3:1)', large: true },
];

export const TYPE_SCALE: Array<{ token: string; family: 'display' | 'body'; sample: string; usage: string }> = [
  { token: '--text-hero', family: 'display', sample: 'Invierte antes', usage: 'H1 del hero, Archivo 68% / 800 · 56-140px' },
  { token: '--text-display-xl', family: 'display', sample: 'Hablemos', usage: 'Título de contacto · 48-84px' },
  { token: '--text-display-lg', family: 'display', sample: 'Desarrollos destacados', usage: 'H2 de sección · 36-72px' },
  { token: '--text-display-md', family: 'display', sample: '1,200+', usage: 'Cifras · 36-60px' },
  { token: '--text-display-sm', family: 'display', sample: 'Valle Oriente', usage: 'Lista de zonas · 30-36px' },
  { token: '--text-title', family: 'display', sample: 'Torre Alba', usage: 'Título de tarjeta, Archivo 82% / 700 · 30px' },
  { token: '--text-lead', family: 'body', sample: 'Desarrollos en preventa y oficinas corporativas.', usage: 'Lead · 18-21px' },
  { token: '--text-md', family: 'body', sample: 'Te acompañamos desde el apartado hasta la escrituración.', usage: 'Cuerpo · 16px' },
  { token: '--text-xs', family: 'body', sample: 'Valle Oriente, 2-3 rec, 98-164 m²', usage: 'UI / metadatos · 14px' },
  { token: '--text-label-sm', family: 'body', sample: 'Entrega Q4 2027', usage: 'Etiqueta mínima · 12px' },
];
