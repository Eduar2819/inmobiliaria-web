import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import styles from './MediaFrame.module.css';

type MediaFrameProps = {
  /** Image URL. Leave empty to render the branded placeholder. */
  src?: string;
  alt: string;
  /** Shown inside the placeholder so content editors know what goes there. */
  placeholder?: string;
  /** Art direction: alternative crops per media query, checked in order before `src`. */
  sources?: ReadonlyArray<{ media: string; srcSet: string }>;
  /** Load eagerly (above-the-fold media). */
  priority?: boolean;
  className?: string;
  children?: ReactNode;
};

/**
 * Fills its container with an image (object-fit: cover), or with an on-brand
 * placeholder when no photo has been supplied yet.
 */
export function MediaFrame({ src, alt, placeholder, sources, priority, className, children }: MediaFrameProps) {
  return (
    <div className={cx(styles.frame, className)}>
      {src ? (
        <picture>
          {sources?.map((source) => <source key={source.media} media={source.media} srcSet={source.srcSet} />)}
          <img
            className={styles.img}
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding="async"
          />
        </picture>
      ) : (
        <div className={styles.placeholder} role="img" aria-label={alt}>
          <svg className={styles.glyph} viewBox="0 0 48 48" aria-hidden="true">
            <path d="M6 42V20l14-10 14 10v22M34 42V26h8v16M14 42V30h12v12M4 42h40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
          {placeholder && <span className={styles.caption}>{placeholder}</span>}
        </div>
      )}
      {children}
    </div>
  );
}
