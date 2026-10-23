import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import styles from './IconButton.module.css';

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Required: icon-only controls need an accessible name. */
  'aria-label': string;
  variant?: 'outline' | 'accent';
  children: ReactNode;
};

export function IconButton({ variant = 'outline', className, children, type = 'button', ...rest }: IconButtonProps) {
  return (
    <button type={type} className={cx(styles.iconButton, styles[variant], className)} {...rest}>
      <span aria-hidden="true">{children}</span>
    </button>
  );
}
