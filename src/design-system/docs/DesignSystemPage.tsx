import { useEffect, useState, type ReactNode } from 'react';
import {
  Button,
  Chip,
  Display,
  DisplayAccent,
  Eyebrow,
  IconButton,
  Logo,
  MediaFrame,
  ProgressBar,
  SegmentedControl,
  SelectField,
  Tag,
  TextField,
  cx,
} from '../index';
import { CONTRAST_PAIRS, PALETTE, TYPE_SCALE } from '../tokens/catalog';
import { contrastRatio, grade } from '../utils/contrast';
import styles from './DesignSystemPage.module.css';

function useTokenValues(names: string[]) {
  const [values, setValues] = useState<Record<string, string>>({});
  useEffect(() => {
    const cs = getComputedStyle(document.documentElement);
    setValues(Object.fromEntries(names.map((n) => [n, cs.getPropertyValue(n).trim()])));
  }, [names]);
  return values;
}

const ALL_TOKENS = [
  ...PALETTE.flatMap((g) => g.tokens.map((t) => t.name)),
  ...CONTRAST_PAIRS.flatMap((p) => [p.fg, p.bg]),
];

export default function DesignSystemPage() {
  const v = useTokenValues(ALL_TOKENS);
  const [seg, setSeg] = useState('all');
  const [chip, setChip] = useState(0);
  const [sel, setSel] = useState(0);

  useEffect(() => {
    document.title = 'Terranova · Design System';
  }, []);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <a href="/" className={styles.back}>
          ← Landing
        </a>
        <Logo />
      </header>

      <section className={styles.intro}>
        <Eyebrow>Terranova · Design System v1</Eyebrow>
        <Display as="h1" size="xl" className={styles.h1}>
          Pino, concreto y bronce.
        </Display>
        <p className={styles.lead}>
          Tokens, tipografía y componentes de la landing. Cada par de colores que se usa para texto está medido contra WCAG 2.2;
          los valores se leen en vivo de <code>tokens.css</code>.
        </p>
      </section>

      <section className={styles.block} aria-labelledby="ds-color">
        <Eyebrow index={1}>Color</Eyebrow>
        <Display id="ds-color" size="md" className={styles.h2}>
          Paleta
        </Display>
        {PALETTE.map((group) => (
          <div key={group.group} className={styles.group}>
            <h3 className={styles.groupTitle}>{group.group}</h3>
            <div className={styles.swatches}>
              {group.tokens.map((t) => (
                <figure key={t.name} className={styles.swatch}>
                  <div className={styles.chipColor} style={{ background: `var(${t.name})` }} />
                  <figcaption>
                    <code className={styles.token}>{t.name}</code>
                    <span className={styles.hex}>{v[t.name]}</span>
                    <span className={styles.role}>{t.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className={styles.block} aria-labelledby="ds-contrast">
        <Eyebrow index={2}>Auditoría</Eyebrow>
        <Display id="ds-contrast" size="md" className={styles.h2}>
          Contraste
        </Display>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Muestra</th>
                <th scope="col">Uso</th>
                <th scope="col">Texto / Fondo</th>
                <th scope="col">Ratio</th>
                <th scope="col">WCAG</th>
              </tr>
            </thead>
            <tbody>
              {CONTRAST_PAIRS.map((p) => {
                const ratio = v[p.fg] && v[p.bg] ? contrastRatio(v[p.fg]!, v[p.bg]!) : null;
                const g = ratio ? grade(ratio) : null;
                const pass = g && (g === 'AAA' || g === 'AA' || (p.large && g === 'AA large'));
                return (
                  <tr key={`${p.fg}-${p.bg}`}>
                    <td>
                      <span className={styles.sample} style={{ color: `var(${p.fg})`, background: `var(${p.bg})` }}>
                        Aa
                      </span>
                    </td>
                    <td>{p.usage}</td>
                    <td>
                      <code className={styles.token}>{p.fg}</code>
                      <br />
                      <code className={styles.token}>{p.bg}</code>
                    </td>
                    <td className={styles.ratio}>{ratio ? `${ratio.toFixed(2)}:1` : '—'}</td>
                    <td>
                      <span className={cx(styles.badge, pass ? styles.pass : styles.fail)}>{g ?? '—'}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.block} aria-labelledby="ds-type">
        <Eyebrow index={3}>Tipografía</Eyebrow>
        <Display id="ds-type" size="md" className={styles.h2}>
          Escala
        </Display>
        <p className={styles.note}>
          Una sola familia, <strong>Archivo</strong> variable, en dos anchos: comprimida (68%, peso 780-800) para titulares, como
          las lonas de obra y el cuadro de títulos de un plano; ancho normal para UI y lectura. Cifras con números tabulares. Etiquetas
          en minúsculas, sin monoespaciada. Mínimo legible: 12px. Autoalojada con @fontsource-variable (un archivo, 90 kB).
        </p>
        <div className={styles.typeList}>
          {TYPE_SCALE.map((row) => (
            <div key={row.token} className={styles.typeRow}>
              <div className={styles.typeMeta}>
                <code className={styles.token}>{row.token}</code>
                <span className={styles.role}>{row.usage}</span>
              </div>
              <div
                className={cx(styles.typeSample, styles[`family-${row.family}`])}
                style={{ fontSize: `min(var(${row.token}), 96px)` }}
              >
                {row.sample}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.block} aria-labelledby="ds-components">
        <Eyebrow index={4}>Componentes</Eyebrow>
        <Display id="ds-components" size="md" className={styles.h2}>
          Biblioteca
        </Display>

        <div className={styles.grid}>
          <Specimen title="Button">
            <div className={styles.row}>
              <Button size="sm" dot="accent">
                Primary
              </Button>
              <Button size="sm" variant="accent">
                Accent
              </Button>
              <Button size="sm" variant="outline" arrow>
                Outline
              </Button>
            </div>
            <Button size="lg" arrow>
              Buscar
            </Button>
          </Specimen>

          <Specimen title="SegmentedControl">
            <SegmentedControl
              label="Demo"
              value={seg}
              onChange={setSeg}
              options={[
                { value: 'all', label: 'Todos' },
                { value: 'pre', label: 'Preventa' },
                { value: 'com', label: 'Comercial' },
              ]}
            />
            <SegmentedControl
              label="Demo accent"
              value={seg}
              onChange={setSeg}
              activeTone="accent"
              track={false}
              options={[
                { value: 'all', label: 'Preventa' },
                { value: 'pre', label: 'Oficinas' },
                { value: 'com', label: 'Locales' },
              ]}
            />
          </Specimen>

          <Specimen title="IconButton · Tag · Chip">
            <div className={styles.row}>
              <IconButton aria-label="Anterior">←</IconButton>
              <IconButton aria-label="Siguiente" variant="accent">
                →
              </IconButton>
              <Tag dot="accent">Preventa</Tag>
              <Tag dot="brand">Comercial</Tag>
            </div>
            <div className={styles.row}>
              {['Preventa', 'Oficinas', 'Locales'].map((l, i) => (
                <Chip key={l} selected={chip === i} onClick={() => setChip(i)}>
                  {l}
                </Chip>
              ))}
            </div>
          </Specimen>

          <Specimen title="Fields">
            <SelectField label="Zona" options={['Todas las zonas', 'San Pedro', 'Valle Oriente']} value={sel} onChange={setSel} />
            <TextField label="Nombre" placeholder="Tu nombre" />
          </Specimen>

          <Specimen title="MediaFrame · ProgressBar">
            <MediaFrame className={styles.media} alt="Placeholder" placeholder="Render torre residencial">
              <div className={styles.mediaProgress}>
                <ProgressBar value={68} label="Vendido" />
              </div>
            </MediaFrame>
          </Specimen>

          <Specimen title="Eyebrow · Display" inverse>
            <Eyebrow index={2} tone="inverse">
              Zonas
            </Eyebrow>
            <Display size="sm">
              Dónde crece <DisplayAccent>Monterrey</DisplayAccent>
            </Display>
            <Logo variant="lockup" />
          </Specimen>
        </div>
      </section>

      <section className={styles.block} aria-labelledby="ds-motion">
        <Eyebrow index={5}>Motion</Eyebrow>
        <Display id="ds-motion" size="md" className={styles.h2}>
          Movimiento
        </Display>
        <ul className={styles.motionList}>
          <li>
            <code className={styles.token}>--ease-out</code> cubic-bezier(.2,.8,.2,1) — entradas, hovers, reveals.
          </li>
          <li>
            <code className={styles.token}>--ease-in-out</code> cubic-bezier(.7,0,.2,1) — apertura del hero (clip-path).
          </li>
          <li>
            Duraciones: 250 / 300 / 500 / 1000ms. Reveal por scroll: fade-up 40px, escalonado 0 / 120ms.
          </li>
          <li>
            <code className={styles.token}>prefers-reduced-motion</code>: se desactivan marquee, spin, pulse, ken-burns y
            count-up; el contenido aparece sin desplazamiento.
          </li>
        </ul>
      </section>
    </div>
  );
}

function Specimen({ title, inverse, children }: { title: string; inverse?: boolean; children: ReactNode }) {
  return (
    <div className={cx(styles.specimen, inverse && styles.inverse)} data-surface={inverse ? 'inverse' : undefined}>
      <span className={styles.specimenTitle}>{title}</span>
      <div className={styles.specimenBody}>{children}</div>
    </div>
  );
}
