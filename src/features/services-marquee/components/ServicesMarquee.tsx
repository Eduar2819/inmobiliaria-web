import { useCopy, type Dictionary } from '@shared/i18n/LocaleProvider';
import styles from './ServicesMarquee.module.css';

const copy: Dictionary<{ label: string; items: string[] }> = {
  es: {
    label: 'Servicios',
    items: ['Preventa', 'Oficinas corporativas', 'Locales comerciales', 'Plusvalía', 'Asesoría patrimonial'],
  },
  en: {
    label: 'Services',
    items: ['Pre-sale', 'Corporate offices', 'Retail space', 'Appreciation', 'Wealth advisory'],
  },
};

/** A continuous band of the property types and services Terranova handles. */
export function ServicesMarquee() {
  const t = useCopy(copy);

  // Two identical strips side by side; the track slides by exactly one strip, so the loop has no seam.
  const strip = (
    <ul className={styles.list}>
      {t.items.map((item) => (
        <li key={item} className={styles.item}>
          {item}
          <span className={styles.sep} />
        </li>
      ))}
    </ul>
  );

  return (
    <section className={styles.band} data-surface="accent" aria-label={t.label}>
      {/* Read once by assistive tech; the moving strip is decorative. */}
      <ul className="visually-hidden">
        {t.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className={styles.track} aria-hidden="true">
        {strip}
        {strip}
      </div>
    </section>
  );
}
