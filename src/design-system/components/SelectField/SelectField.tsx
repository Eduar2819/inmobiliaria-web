import { useId, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import styles from './SelectField.module.css';

type SelectFieldProps = {
  label: string;
  options: ReadonlyArray<string>;
  /** Index of the selected option. Options are localized, so we store the index. */
  value: number;
  onChange: (index: number) => void;
  name?: string;
  /** `tile`: filled box (forms). `bare`: no box, for fields that sit inside a shared bar. */
  variant?: 'tile' | 'bare';
  /** Decorative leading icon. */
  icon?: ReactNode;
  className?: string;
};

/** Tile-style select: mono label on top, value in bold below. */
export function SelectField({ label, options, value, onChange, name, variant = 'tile', icon, className }: SelectFieldProps) {
  const id = useId();
  return (
    <div className={cx(styles.field, styles[variant], Boolean(icon) && styles.withIcon, className)}>
      {icon && (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <select id={id} name={name} className={styles.select} value={value} onChange={(e) => onChange(Number(e.target.value))}>
        {options.map((option, i) => (
          <option key={option} value={i}>
            {option}
          </option>
        ))}
      </select>
      <svg className={styles.chevron} viewBox="0 0 12 8" aria-hidden="true">
        <path d="M1 1.5 6 6.5l5-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
