import { Handshake, HouseLine, ShieldCheck, Star } from '@ds/icons';
import { Button, Display, Eyebrow } from '@ds/index';
import { useCopy } from '@shared/i18n/LocaleProvider';
import { useReveal } from '@shared/hooks/useReveal';
import { whyCopy } from '../why-terranova.i18n';
import styles from './WhyTerranova.module.css';

/** Same order as `reasons` in the copy. */
const ICONS = [ShieldCheck, Handshake, HouseLine, Star];

export function WhyTerranova() {
  const t = useCopy(whyCopy);
  const reveal = useReveal();

  return (
    <section id="nosotros" className={styles.section} data-surface="inverse" aria-labelledby="nosotros-title">
      <div className={styles.inner} {...reveal}>
        <div className={styles.intro}>
          <Eyebrow tone="inverse">{t.eyebrow}</Eyebrow>
          <Display id="nosotros-title" size="sm" className={styles.title}>
            {t.title}
          </Display>
          <p className={styles.sub}>{t.sub}</p>
          <Button href="#contacto" variant="accent" className={styles.cta}>
            {t.cta}
          </Button>
        </div>
        <ul className={styles.reasons}>
          {t.reasons.map((reason, i) => {
            const Icon = ICONS[i]!;
            return (
              <li key={reason.title} className={styles.reason}>
                <Icon className={styles.icon} weight="light" aria-hidden="true" />
                <h3 className={styles.reasonTitle}>{reason.title}</h3>
                <p className={styles.reasonBody}>{reason.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
