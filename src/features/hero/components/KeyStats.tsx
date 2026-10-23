import { useCopy } from '@shared/i18n/LocaleProvider';
import { useCountUp } from '@shared/hooks/useCountUp';
import { useReveal } from '@shared/hooks/useReveal';
import { heroCopy } from '../hero.i18n';
import styles from './KeyStats.module.css';

function Stat({ n, suffix, label }: { n: number; suffix: string; label: string }) {
  const reveal = useReveal();
  const count = useCountUp(n);
  return (
    <div className={styles.stat} {...reveal}>
      <dt className={styles.label}>{label}</dt>
      <dd className={styles.value}>
        {/* Screen readers get the final figure, not every animation frame. */}
        <span className="visually-hidden">
          {n.toLocaleString('en-US')}
          {suffix}
        </span>
        <span aria-hidden="true">
          <span ref={count.ref}>{count.value}</span>
          <span className={styles.suffix}>{suffix}</span>
        </span>
      </dd>
    </div>
  );
}

export function KeyStats() {
  const t = useCopy(heroCopy);
  return (
    <dl className={styles.stats} aria-label={t.statsLabel}>
      {t.stats.map((s) => (
        <Stat key={s.label} {...s} />
      ))}
    </dl>
  );
}
