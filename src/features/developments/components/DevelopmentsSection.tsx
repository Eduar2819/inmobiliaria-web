import { useEffect, useRef, useState, type RefObject } from 'react';
import { Button, Display, IconButton, SegmentedControl } from '@ds/index';
import { useCopy } from '@shared/i18n/LocaleProvider';
import { useReveal } from '@shared/hooks/useReveal';
import { prefersReducedMotion } from '@shared/hooks/prefersReducedMotion';
import { DEVELOPMENTS } from '../developments.data';
import { developmentsCopy } from '../developments.i18n';
import { useDevelopmentFilter, type DevelopmentFilter } from '../DevelopmentFilterProvider';
import { DevelopmentCard } from './DevelopmentCard';
import styles from './DevelopmentsSection.module.css';

const FILTER_KEYS: DevelopmentFilter[] = ['all', 'pre', 'com'];

/** Tracks whether the rail can still scroll back / forward, via IntersectionObserver on its edge cards. */
function useRailEdges(railRef: RefObject<HTMLDivElement | null>, key: string) {
  const [edges, setEdges] = useState({ start: true, end: true });

  useEffect(() => {
    const rail = railRef.current;
    const first = rail?.firstElementChild;
    const last = rail?.lastElementChild;
    if (!rail || !first || !last) {
      setEdges({ start: true, end: true });
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        setEdges((prev) => {
          const next = { ...prev };
          for (const entry of entries) {
            const visible = entry.intersectionRatio > 0.9;
            if (entry.target === first) next.start = visible;
            if (entry.target === last) next.end = visible;
          }
          return next;
        });
      },
      { root: rail, threshold: [0.9, 1] },
    );
    io.observe(first);
    io.observe(last);
    return () => io.disconnect();
  }, [railRef, key]);

  return edges;
}

export function DevelopmentsSection() {
  const t = useCopy(developmentsCopy);
  const { filter, zone, setFilter, setZone } = useDevelopmentFilter();
  const railRef = useRef<HTMLDivElement>(null);
  const headReveal = useReveal();
  const railReveal = useReveal(120);

  const items = DEVELOPMENTS.filter((d) => (filter === 'all' || d.type === filter) && (!zone || d.zone === zone));
  const listKey = `${filter}-${zone ?? 'all'}`;
  const edges = useRailEdges(railRef, listKey);

  // A new filter starts the rail from the first card.
  useEffect(() => {
    railRef.current?.scrollTo({ left: 0 });
  }, [listKey]);

  const scrollRail = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({
      left: direction * Math.min(460, rail.clientWidth * 0.86),
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  };

  const resetFilters = () => {
    setFilter('all');
    setZone(null);
  };

  return (
    <section id="desarrollos" className={styles.section} aria-labelledby="desarrollos-title">
      <div className={styles.head} {...headReveal}>
        <div>
          <Display id="desarrollos-title" size="sm">
            {t.title}
          </Display>
          {zone && (
            <p className={styles.zone}>
              {t.inZone} <strong>{zone}</strong>
              <button type="button" className={styles.clear} onClick={() => setZone(null)}>
                {t.clearZone}
              </button>
            </p>
          )}
        </div>
        <div className={styles.controls}>
          <SegmentedControl
            label={t.filterLabel}
            value={filter}
            onChange={setFilter}
            options={FILTER_KEYS.map((key, i) => ({ value: key, label: t.filters[i]! }))}
          />
          <div className={styles.arrows}>
            <IconButton aria-label={t.prev} aria-controls="desarrollos-rail" disabled={edges.start} onClick={() => scrollRail(-1)}>
              ←
            </IconButton>
            <IconButton aria-label={t.next} aria-controls="desarrollos-rail" variant="accent" disabled={edges.end} onClick={() => scrollRail(1)}>
              →
            </IconButton>
          </div>
        </div>
      </div>

      <div {...railReveal}>
        {items.length > 0 && (
          <div
            id="desarrollos-rail"
            ref={railRef}
            className={styles.rail}
            role="region"
            aria-label={t.railLabel}
            aria-live="polite"
            tabIndex={0}
          >
            {items.map((development, i) => (
              <DevelopmentCard key={`${listKey}-${development.id}`} development={development} index={i} />
            ))}
          </div>
        )}
        {items.some((d) => d.illustrative) && <p className={styles.disclaimer}>{t.illustrativeNote}</p>}
        {items.length === 0 && (
          <div className={styles.empty} role="status">
            <Display as="p" size="title">
              {t.emptyTitle}
            </Display>
            <p className={styles.emptySub}>{t.emptySub}</p>
            <div className={styles.emptyActions}>
              <Button size="sm" onClick={resetFilters}>
                {t.emptyReset}
              </Button>
              <a className={styles.emptyLink} href="#contacto">
                {t.emptyContact}
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
