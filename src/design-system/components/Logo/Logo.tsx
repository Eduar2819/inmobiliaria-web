import monogram from '@shared/assets/terranova-monogram.webp';
import lockup from '@shared/assets/terranova-lockup.webp';
import { cx } from '../../utils/cx';
import styles from './Logo.module.css';

type LogoProps = {
  /** `inline`: monogram + TERRANOVA wordmark (nav). `lockup`: full stacked logo (footer, dark surfaces). */
  variant?: 'inline' | 'lockup';
  className?: string;
};

export function Logo({ variant = 'inline', className }: LogoProps) {
  if (variant === 'lockup') {
    return <img className={cx(styles.lockup, className)} src={lockup} alt="Terranova Inmobiliaria" width={180} height={120} />;
  }
  return (
    <span className={cx(styles.inline, className)}>
      <img className={styles.monogram} src={monogram} alt="" width={40} height={40} />
      <span className={styles.wordmark} data-logo-wordmark>
        TERRA<span className={styles.nova}>NOVA</span>
      </span>
    </span>
  );
}
