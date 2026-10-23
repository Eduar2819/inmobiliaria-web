import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import styles from './Eyebrow.module.css';

type EyebrowProps = {
  children: ReactNode;
  /** Section index rendered as “(01)”. */
  index?: number;
  tone?: 'default' | 'inverse' | 'onAccent';
  size?: 'md' | 'sm' | 'xs';
  as?: 'div' | 'span' | 'p';
  className?: string;
};

/** Monospaced uppercase kicker that sits above headings and form fields. */
export function Eyebrow({ children, index, tone = 'default', size = 'md', as: Tag = 'div', className }: EyebrowProps) {
  return (
    <Tag className={cx(styles.eyebrow, styles[tone], styles[size], className)}>
      {index !== undefined && <span aria-hidden="true">({String(index).padStart(2, '0')}) </span>}
      {children}
    </Tag>
  );
}
