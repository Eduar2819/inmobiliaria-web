import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import styles from './Display.module.css';

type DisplayProps = {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'div' | 'p';
  size?: 'hero' | 'xl' | 'lg' | 'md' | 'sm' | 'title' | 'titleSm';
  italic?: boolean;
  balance?: boolean;
  className?: string;
  id?: string;
};

/** Instrument Serif headline in one of the fluid display sizes. */
export function Display({ children, as: Tag = 'h2', size = 'lg', italic, balance, className, id }: DisplayProps) {
  return (
    <Tag id={id} className={cx(styles.display, styles[size], italic && styles.italic, balance && styles.balance, className)}>
      {children}
    </Tag>
  );
}

/** Accent word inside a display headline (e.g. the orange italic “antes que”). */
export function DisplayAccent({ children }: { children: ReactNode }) {
  return <em className={styles.accent}>{children}</em>;
}
