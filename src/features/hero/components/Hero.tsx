import { Fragment } from 'react';
import heroImage from '@shared/assets/hero-monterrey.webp';
import heroImageSquare from '@shared/assets/hero-monterrey-sm.webp';
import { Eyebrow, MediaFrame } from '@ds/index';
import { useCopy } from '@shared/i18n/LocaleProvider';
import { heroCopy } from '../hero.i18n';
import { PropertySearch } from './PropertySearch';
import styles from './Hero.module.css';

// Phones get a square crop that keeps the Cerro de la Silla in frame.
const HERO_SOURCES = [{ media: '(max-width: 640px)', srcSet: heroImageSquare }];

export function Hero() {
  const t = useCopy(heroCopy);
  // Two set lines; the second carries the accent, as in the brand reference.
  const lines = [[t.h1a, t.h1b], [t.h1c]];

  return (
    <header id="top" className={styles.hero} data-surface="inverse">
      <div className={styles.media}>
        <MediaFrame className={styles.frame} src={heroImage} sources={HERO_SOURCES} alt={t.imageAlt} priority />
      </div>
      <div className={styles.scrim} aria-hidden="true" />

      <div className={styles.content}>
        <Eyebrow tone="inverse" className={styles.eyebrow}>
          {t.lead}
        </Eyebrow>
        {/* The page's one orchestrated moment: each phrase rises out of its own mask. */}
        <h1 className={styles.title}>
          {lines.map((line, l) => (
            <span key={l} className={l === 1 ? `${styles.line} ${styles.accent}` : styles.line}>
              {line.map((phrase, i) => {
                const order = lines.slice(0, l).flat().length + i;
                return (
                  <Fragment key={phrase}>
                    {i > 0 && ' '}
                    {/* The space stays outside the inline-block mask, where it can't collapse. */}
                    <span className={styles.mask}>
                      <span className={styles.word} style={{ animationDelay: `${200 + order * 120}ms` }}>
                        {phrase}
                      </span>
                    </span>
                  </Fragment>
                );
              })}
            </span>
          ))}
        </h1>
        <p className={styles.sub}>{t.sub}</p>
        <PropertySearch />
      </div>
    </header>
  );
}
