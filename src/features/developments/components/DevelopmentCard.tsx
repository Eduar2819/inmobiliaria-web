import type { CSSProperties } from 'react';
import { Display, MediaFrame } from '@ds/index';
import { useLocale } from '@shared/i18n/LocaleProvider';
import type { Development } from '../developments.data';
import { developmentsCopy } from '../developments.i18n';
import styles from './DevelopmentCard.module.css';

type DevelopmentCardProps = { development: Development; index: number };

export function DevelopmentCard({ development: d, index }: DevelopmentCardProps) {
  const { locale } = useLocale();
  const t = developmentsCopy[locale];
  const isPre = d.type === 'pre';
  // Describe what the photo shows; stock must never pass as the actual project.
  const alt = d.imageAlt ? `${d.illustrative ? t.illustrativeAlt : ''}${d.imageAlt[locale]}` : `${d.name}, ${d.zone}`;

  return (
    <article className={styles.card} style={{ animationDelay: `${index * 70}ms` }}>
      <MediaFrame className={styles.media} src={d.image} alt={alt} placeholder={d.placeholder[locale]}>
        <div className={styles.overlay}>
          <a className={styles.cta} href="#contacto" aria-label={`${t.requestInfo}: ${d.name}`}>
            {t.requestInfo}
          </a>
        </div>
        {isPre && d.sold !== undefined && (
          // Grows to the sold share on hover; the figure itself is in the status line below.
          <span className={styles.soldBar} style={{ '--sold': d.sold / 100 } as CSSProperties} aria-hidden="true" />
        )}
      </MediaFrame>
      <div className={styles.body}>
        <div>
          <p className={styles.status}>
            <span>{isPre ? t.tagPre : t.tagCom}</span>
            {isPre && d.sold !== undefined && (
              <span className={styles.sold}>
                {d.sold}% {t.sold}
              </span>
            )}
          </p>
          <Display as="h3" size="title" className={styles.name}>
            {d.name}
          </Display>
          <p className={styles.meta}>
            <span className={styles.zone}>{d.zone}</span>
            <span>{d.meta[locale]}</span>
          </p>
        </div>
        <div className={styles.aside}>
          <p className={styles.price}>{d.price[locale]}</p>
          <p className={styles.when}>{d.when[locale]}</p>
        </div>
      </div>
    </article>
  );
}
