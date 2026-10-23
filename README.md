# Terranova · Landing

Landing page for Terranova Inmobiliaria (pre-sale developments and commercial space in Monterrey), originally built from the Claude Design handoff **“Terranova B”**, since re-branded on the logo's own palette: pino green, cool concreto grey and bronce as the single accent, Archivo variable as the only typeface, and a full-bleed Monterrey hero with the property search built in.

- **React 19** + **Vite 8** + TypeScript, CSS Modules on top of design tokens
- Bilingual ES / EN (remembers your choice), responsive from 320px to 1440px+
- Living style guide at **`/design-system`**

```bash
npm install
npm run dev        # http://localhost:5173  ·  /design-system for the style guide
npm run build      # type-check + production build to dist/
npm run preview
```

Optional `.env.local`:

```bash
VITE_WHATSAPP_NUMBER=5218112345678   # digits only; without it wa.me opens the contact picker

# Map tiles (zones section, react-leaflet). Defaults to OpenStreetMap, fine for dev and low traffic.
# For production use a keyed provider, e.g. MapTiler:
VITE_MAP_TILES_URL=https://api.maptiler.com/maps/dataviz-dark/{z}/{x}/{y}.png?key=YOUR_KEY
VITE_MAP_TILES_ATTRIBUTION='&copy; MapTiler &copy; OpenStreetMap contributors'
```

## Architecture (screaming)

The top level says **what the site does**, not which framework it uses.

```
src/
├── app/                      # Composition only: entry point, page assembly
│   ├── main.tsx
│   └── LandingPage.tsx
├── features/                 # One folder per business capability
│   ├── site-navigation/      # Sticky nav, language switch, skip link
│   ├── hero/                 # Full-bleed hero, property search bar, key stats
│   ├── why-terranova/        # “¿Por qué elegir Terranova?” band (#nosotros)
│   ├── services/             # Buy / sell / lease / invest cards (#servicios)
│   ├── services-marquee/     # Scrolling services band
│   ├── developments/         # Portfolio carousel, filters, inventory data
│   ├── zones/                # Zone accordion + react-leaflet map (lazy chunk), market data
│   ├── lead-capture/         # Contact form, WhatsApp CTA + floating button
│   └── site-footer/
├── design-system/            # Brand-agnostic UI kit (see its README)
│   ├── tokens/               # tokens.css (single source of truth) + catalog
│   ├── styles/               # global reset, fonts, keyframes, reduced motion
│   ├── components/           # Button, SegmentedControl, SelectField, …
│   ├── icons.ts              # Phosphor icons, per-file imports (never the package root)
│   ├── docs/                 # /design-system style guide page
│   └── utils/
└── shared/                   # Cross-feature infrastructure, no UI
    ├── i18n/                 # LocaleProvider, useCopy, Dictionary type
    ├── hooks/                # useReveal, useCountUp, useScrolled
    ├── config/               # contact channels (WhatsApp)
    ├── utils/
    └── assets/               # logo lockup, monogram, hero photo
```

Rules:

- Each feature exposes a **public API through `index.ts`**; other features import only from there (for example, `hero` drives the `developments` filter via `useDevelopmentFilter`).
- Each feature **owns its copy** (`*.i18n.ts`) and **its data** (`*.data.ts`). To swap sample data for a CMS or API, change only the `*.data.ts` files.
- Components use **semantic tokens only** (`--color-text-accent`, not `#b93d0c`).
- Path aliases: `@app`, `@features`, `@ds`, `@shared`.

## Changes from the prototype (design and accessibility audit)

The visual design follows the handoff. What changed, and why:

| Area | Prototype | Now |
|---|---|---|
| **“NOVA” wordmark** (14px) | `#a97c50` on cream, **3.17:1** ✗ | `bronze-600 #86603a`, **4.81:1** AA |
| **Link hover / accent text** | `#e8501a` on cream, **3.22:1** ✗ small text | `ember-700 #b93d0c`, **4.82:1** AA. `#e8501a` stays for display text ≥ 56px (AA large) |
| **WhatsApp button** | white “WA” on `#25d366`, **1.98:1** ✗ | Ink WhatsApp icon, **8.92:1** AAA, plus an accessible name |
| **Muted labels on dark** | 10px at 50–55% opacity | 11px floor, ≥ 62% opacity (6.47:1) |
| Fonts | Google Fonts, every subset | Self-hosted with @fontsource, Latin subset only (CSS 58 kB → 32 kB) |
| Motion | Always on | `prefers-reduced-motion` turns off marquee, spin, pulse, Ken Burns and count-up |
| Keyboard | No visible focus | `:focus-visible` in ember-700 (light surfaces) or cream/ink (dark and ember), skip link, 44px hit area on map pins |
| Semantics | Divs and buttons | `role="search"`, `aria-pressed` on toggles, accordion with `aria-expanded`/`aria-controls`, `dl` for stats, `fieldset/legend`, `role="status"` on success |
| Search | Only scrolled the page | Also applies the matching filter (Pre-sale → pre-sale; Offices/Retail → commercial) |
| Nav “Commercial” | Plain anchor | Filters the carousel to commercial listings |
| Form | Fake `setState` | React 19 `useActionState` + `useFormStatus` (pending state, error path), `autocomplete`, phone validation |
| Logo | Cropped with `background-position` on the full PNG | Optimized monogram (3 kB) and lockup with a real transparent background (9 kB), plus favicon and apple-touch-icon |

## Pending before production

- **Map tiles:** set `VITE_MAP_TILES_URL` to a keyed provider before launch; the OpenStreetMap default is not meant for production traffic.
- **Zone data vs. inventory:** zones list project counts (Centro: 2, Santa Catarina: 2…) that the sample inventory does not contain, so “Ver proyectos en Centro” lands on the empty state. Align `zones.data.ts` with `developments.data.ts`.

- **Photos:** developments use illustrative CC0 stock (provenance in `features/developments/assets/CREDITS.md`), disclosed on the page and in the alt text. Swap in the official renders and set `illustrative: false` in `developments.data.ts`.
- **Sample data:** prices, zones, stats and development names are placeholders from the handoff.
- **Leads:** `features/lead-capture/submitLead.ts` simulates the submission. Connect it to the CRM.
- **WhatsApp:** set `VITE_WHATSAPP_NUMBER`.
- **Privacy notice:** the footer link points to `#top`.
- The search form's budget and size selects are not connected to inventory yet (property type and zone are).
- `og:image` and `<link rel="canonical">` are missing in `index.html` until the production domain exists.
- Dark mode is not implemented (the brand is light-only); tokens are ready for a `prefers-color-scheme` layer if wanted.

The original handoff (HTML prototypes and the chat transcript) is kept in `design-handoff/`.
