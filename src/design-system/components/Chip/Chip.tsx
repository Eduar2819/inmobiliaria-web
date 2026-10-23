import type { ButtonHTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import styles from './Chip.module.css';

type ChipProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
  selected: boolean;
};

/** Toggleable pill used for single- or multi-choice preferences in forms. */
export function Chip({ selected, className, children, ...rest }: ChipProps) {
  return (
    <button type="button" aria-pressed={selected} className={cx(styles.chip, selected && styles.selected, className)} {...rest}>
      {children}
    </button>
  );
}
