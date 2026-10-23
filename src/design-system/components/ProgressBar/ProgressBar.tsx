import styles from './ProgressBar.module.css';

type ProgressBarProps = {
  /** 0–100 */
  value: number;
  label: string;
};

/** Labeled progress readout, e.g. “Vendido 68%”. */
export function ProgressBar({ value, label }: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className={styles.root}>
      <div className={styles.head}>
        <span>{label}</span>
        <span>{pct}%</span>
      </div>
      <div className={styles.track} role="progressbar" aria-label={label} aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div className={styles.fill} style={{ transform: `scaleX(${pct / 100})` }} />
      </div>
    </div>
  );
}
