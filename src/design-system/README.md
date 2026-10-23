# Terranova Design System

Live style guide: run `npm run dev` and open **`/design-system`** (palette, measured contrast, type scale, components, motion).

## Tokens: `tokens/tokens.css`

Two layers:

1. **Primitives** `--tn-{hue}-{step}`: raw brand values (`--tn-ink-900`, `--tn-ember-500`, …).
2. **Semantic** `--color-*`, `--text-*`, `--space-*`, `--radius-*`, `--shadow-*`, `--ease-*`, `--duration-*`: what the value is **for**. Components use only this layer.

### Color rules

| Use | Token | Why |
|---|---|---|
| Accent fills (CTA, pins, badge) | `--color-accent` (ember-500) | Ink on ember = 5.67:1 |
| Accent text < 24px on light | `--color-text-accent` (ember-700) | 4.82:1 |
| Accent text ≥ 24px on light | `--color-text-display-accent` (ember-600) | 3.22:1, **large text only** |
| Brand text on light | `--color-text-brand` (bronze-600) | 4.81:1. bronze-500 is decorative only |
| Muted text on dark | `--color-text-inverse-muted` | Never below 62% opacity |
| WhatsApp | `--color-whatsapp` + ink glyph | White on green = 1.98:1 ✗ |

Mark dark or ember containers with `data-surface="inverse"` or `data-surface="accent"` so that focus rings and `DisplayAccent` switch to the right color.

### Typography

- **Instrument Serif** for display (H1–H3, stats, zone names, marquee). Editorial feel, playing against the logo's geometric lines.
- **Instrument Sans** for UI and body text.
- **JetBrains Mono** for eyebrows, tags, figures and coordinates (uppercase, tracking 0.08–0.14em).
- Fluid scale with `clamp()` (`--text-hero` 56→176px … `--text-label-sm` 11px). **11px is the floor** for any readable text.

### Motion

- `--ease-out` for entrances and hovers; `--ease-in-out` for the hero clip-path.
- Keyframes live in `styles/motion.css` with a `tn-` prefix.
- Scroll reveal: `useReveal(delayMs)` from `@shared/hooks`.
- `prefers-reduced-motion: reduce` turns off all motion globally.

## Components (`components/`)

| Component | Purpose |
|---|---|
| `Button` | Button or link (`href`). Variants `primary · accent · outline · inverse`, sizes `sm · md · lg`, `dot`, `arrow` |
| `IconButton` | Round icon-only button, `aria-label` required |
| `SegmentedControl` | Pill group with `aria-pressed` (filters, tabs, language) |
| `Chip` | Toggleable pill for forms |
| `Eyebrow` | Mono kicker with optional `(01)` index |
| `Display` / `DisplayAccent` | Serif headline in the display sizes / ember accent word |
| `Tag` | Label with a dot over images |
| `ProgressBar` | Accessible percentage bar (`role="progressbar"`) |
| `SelectField` / `TextField` | Tile-style fields with an associated label |
| `MediaFrame` | `object-fit: cover` image, or a branded placeholder |
| `Logo` | `inline` (monogram + wordmark) or `lockup` (transparent background) |

Import from the barrel: `import { Button, Display } from '@ds/index'`.
