import { ChartLineUp, House, Key, MagnifyingGlass } from '@ds/icons';
import { Button, Display, Eyebrow } from '@ds/index';
import { useCopy } from '@shared/i18n/LocaleProvider';
import { useReveal } from '@shared/hooks/useReveal';
import { useDevelopmentFilter, type DevelopmentFilter } from '@features/developments';
import { servicesCopy } from '../services.i18n';
import styles from './ServicesSection.module.css';

/** Where each service leads, in the same order as the copy. */
const TARGETS: Array<{ icon: typeof House; href: string; filter?: DevelopmentFilter }> = [
  { icon: MagnifyingGlass, href: '#desarrollos', filter: 'all' },
  { icon: Key, href: '#contacto' },
  // Lease inventory is the commercial stock (offices, retail).
  { icon: House, href: '#desarrollos', filter: 'com' },
  { icon: ChartLineUp, href: '#zonas' },
];

export function ServicesSection() {
  const t = useCopy(servicesCopy);
  const { setFilter, setZone } = useDevelopmentFilter();
  const introReveal = useReveal();
  const gridReveal = useReveal<HTMLUListElement>(120);

  const pick = (filter?: DevelopmentFilter) => {
    if (!filter) return;
    setFilter(filter);
    setZone(null);
  };

  return (
    <section id="servicios" className={styles.section} aria-labelledby="servicios-title">
      <div className={styles.head} {...introReveal}>
        <div>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <Display id="servicios-title" size="sm" balance className={styles.title}>
            {t.title}
          </Display>
          <p className={styles.sub}>{t.sub}</p>
        </div>
        {/* The button carries the header's right column: an action, not a floating paragraph. */}
        <Button href="#desarrollos" variant="outline" className={styles.cta} onClick={() => pick('all')}>
          {t.cta}
        </Button>
      </div>
      <ul className={styles.grid} {...gridReveal}>
        {t.services.map((service, i) => {
          const { icon: Icon, href, filter } = TARGETS[i]!;
          return (
            <li key={service.title}>
              <a className={styles.card} href={href} onClick={() => pick(filter)}>
                <Icon className={styles.icon} weight="light" aria-hidden="true" />
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardBody}>{service.body}</p>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
