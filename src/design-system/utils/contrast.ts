type RGB = [number, number, number];

function parse(color: string): { rgb: RGB; alpha: number } | null {
  const c = color.trim();
  // #rgb, #rgba, #rrggbb, #rrggbbaa (minifiers turn rgb(… / a) into 8-digit hex).
  const hex = c.match(/^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i);
  if (hex) {
    let h = hex[1]!;
    if (h.length <= 4) h = [...h].map((ch) => ch + ch).join('');
    const byte = (i: number) => parseInt(h.slice(i, i + 2), 16);
    return { rgb: [byte(0), byte(2), byte(4)], alpha: h.length === 8 ? byte(6) / 255 : 1 };
  }
  const fn = c.match(/^rgba?\(([^)]+)\)$/i);
  if (fn) {
    const parts = fn[1]!.split(/[\s,/]+/).filter(Boolean).map(Number);
    const [r = 0, g = 0, b = 0, a = 1] = parts;
    return { rgb: [r, g, b], alpha: a };
  }
  return null;
}

function luminance([r, g, b]: RGB): number {
  const lin = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

/** WCAG 2.x contrast ratio. Translucent foregrounds are composited over the background. */
export function contrastRatio(fg: string, bg: string): number | null {
  const f = parse(fg);
  const b = parse(bg);
  if (!f || !b) return null;
  const mixed = f.rgb.map((v, i) => v * f.alpha + b.rgb[i]! * (1 - f.alpha)) as RGB;
  const [hi, lo] = [luminance(mixed), luminance(b.rgb)].sort((x, y) => y - x) as [number, number];
  return (hi + 0.05) / (lo + 0.05);
}

export type WcagGrade = 'AAA' | 'AA' | 'AA large' | 'Fail';

export function grade(ratio: number): WcagGrade {
  if (ratio >= 7) return 'AAA';
  if (ratio >= 4.5) return 'AA';
  if (ratio >= 3) return 'AA large';
  return 'Fail';
}
