import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'accent' | 'outline' | 'inverse';
export type ButtonSize = 'sm' | 'md' | 'lg';

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Small colored dot before the label (brand accent by default). */
  dot?: 'accent' | 'whatsapp';
  /** Leading icon (decorative, sized to 1.15em). */
  icon?: ReactNode;
  /** Trailing arrow that nudges on hover. */
  arrow?: boolean;
  block?: boolean;
  children: ReactNode;
  className?: string;
};

type AsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type AsLink = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export type ButtonProps = AsButton | AsLink;

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', dot, icon, arrow, block, children, className, ...rest } = props;
  const classes = cx(styles.button, styles[variant], styles[size], block && styles.block, className);
  const content = (
    <>
      {dot && <span className={cx(styles.dot, styles[`dot-${dot}`])} aria-hidden="true" />}
      {icon && (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}
      <span>{children}</span>
      {arrow && (
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
      )}
    </>
  );

  if (rest.href !== undefined) {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    );
  }
  const { type = 'button', ...buttonRest } = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={type} className={classes} {...buttonRest}>
      {content}
    </button>
  );
}
