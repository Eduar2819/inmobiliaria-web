import { Suspense, lazy, useState } from 'react';
import { Display } from '@ds/index';
import { useCopy } from '@shared/i18n/LocaleProvider';
import { useReveal } from '@shared/hooks/useReveal';
import { zonesCopy } from '../zones.data';
import { ZoneList } from './ZoneList';
import styles from './ZonesSection.module.css';

// Leaflet (~45 kB gzip) loads in its own chunk, only when this section renders.
const ZoneMap = lazy(() => import('./ZoneMap'));

export function ZonesSection() {
  const t = useCopy(zonesCopy);
  const [active, setActive] = useState(1);
  const headReveal = useReveal();
  const bodyReveal = useReveal(120);

  return (
    <section id="zonas" className={styles.section} data-surface="inverse" aria-labelledby="zonas-title">
      <div className={styles.head} {...headReveal}>
        <Display id="zonas-title" size="sm">
          {t.title}
        </Display>
        <p className={styles.sub}>{t.sub}</p>
      </div>
      <div className={styles.body} {...bodyReveal}>
        <ZoneList active={active} onSelect={setActive} />
        <Suspense fallback={<div className={styles.mapSkeleton} role="status" aria-label={t.mapLoading} />}>
          <ZoneMap active={active} onSelect={setActive} />
        </Suspense>
      </div>
    </section>
  );
}
