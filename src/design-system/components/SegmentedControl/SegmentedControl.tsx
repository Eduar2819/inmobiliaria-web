import { cx } from '../../utils/cx';
import styles from './SegmentedControl.module.css';

export type SegmentOption<T extends string | number> = { value: T; label: string };

type SegmentedControlProps<T extends string | number> = {
  options: ReadonlyArray<SegmentOption<T>>;
  value: T;
  onChange: (value: T) => void;
  /** Accessible name of the group. */
  label: string;
  /** Which fill marks the selected option. */
  activeTone?: 'ink' | 'accent';
  /** `mono` is the compact uppercase variant used for the language switch. */
  size?: 'md' | 'mono';
  /** Draw the tinted pill track behind the options. */
  track?: boolean;
  className?: string;
};

export function SegmentedControl<T extends string | number>({
  options,
  value,
  onChange,
  label,
  activeTone = 'ink',
  size = 'md',
  track = true,
  className,
}: SegmentedControlProps<T>) {
  return (
    <div role="group" aria-label={label} className={cx(styles.group, track && styles.track, styles[size], className)}>
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={String(option.value)}
            type="button"
            aria-pressed={selected}
            className={cx(styles.option, selected && styles[`active-${activeTone}`])}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
