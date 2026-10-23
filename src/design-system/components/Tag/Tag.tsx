import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import styles from './Tag.module.css';

type TagProps = {
  children: ReactNode;
  /** Color of the leading status dot. */
  dot?: 'accent' | 'brand';
  className?: string;
};

/** Small mono label that floats over media (e.g. “Preventa”, “Comercial”). */
export function Tag({ children, dot, className }: TagProps) {
  return (
    <span className={cx(styles.tag, className)}>
      {dot && <span className={cx(styles.dot, styles[dot])} aria-hidden="true" />}
      {children}
    </span>
  );
}
