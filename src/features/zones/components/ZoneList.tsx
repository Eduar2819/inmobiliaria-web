import { cx } from '@ds/index';
import { useLocale } from '@shared/i18n/LocaleProvider';
import { useDevelopmentFilter } from '@features/developments';
import { ZONES, zonesCopy } from '../zones.data';
import styles from './ZoneList.module.css';

type ZoneListProps = { active: number; onSelect: (index: number) => void };

/** Single-open accordion: one zone expanded at a time. */
export function ZoneList({ active, onSelect }: ZoneListProps) {
  const { locale } = useLocale();
  const t = zonesCopy[locale];
  const { setFilter, setZone } = useDevelopmentFilter();

  return (
    <ul className={styles.list}>
      {ZONES.map((zone, i) => {
        const open = i === active;
        const panelId = `zone-panel-${zone.id}`;
        return (
          <li key={zone.id} className={styles.item}>
            <h3 className={styles.heading}>
              <button
                type="button"
                className={cx(styles.trigger, open && styles.open)}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => onSelect(i)}
              >
                <span className={styles.name}>{zone.name}</span>
                <span className={styles.growth}>
                  <span className="visually-hidden">{t.growth} </span>+{zone.growth}
                </span>
              </button>
            </h3>
            {open && (
              <div id={panelId} className={styles.panel}>
                <p className={styles.desc}>{zone.desc[locale]}</p>
                <div className={styles.facts}>
                  <dl className={styles.factList}>
                    <div>
                      <dt className={styles.factLabel}>{t.m2}</dt>
                      <dd className={styles.factValue}>{zone.m2}</dd>
                    </div>
                    <div>
                      <dt className={styles.factLabel}>{t.devs}</dt>
                      <dd className={styles.factValue}>{zone.devs}</dd>
                    </div>
                  </dl>
                  <a
                    href="#desarrollos"
                    className={styles.cta}
                    onClick={() => {
                      setFilter('all');
                      setZone(zone.name);
                    }}
                  >
                    {t.cta} {zone.name}
                  </a>
                </div>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
