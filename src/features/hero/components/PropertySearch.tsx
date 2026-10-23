import { useState, type FormEvent } from 'react';
import { CurrencyDollar, MagnifyingGlass, MapPin, Ruler } from '@ds/icons';
import { Button, SegmentedControl, SelectField } from '@ds/index';
import { useCopy } from '@shared/i18n/LocaleProvider';
import { scrollToSection } from '@shared/utils/scrollToSection';
import { useDevelopmentFilter, type DevelopmentFilter } from '@features/developments';
import { heroCopy } from '../hero.i18n';
import styles from './PropertySearch.module.css';

/** Tab index → developments filter (Preventa → pre, Oficinas/Locales → comercial). */
const TAB_TO_FILTER: DevelopmentFilter[] = ['pre', 'com', 'com'];

/** Zone, budget, size: same order as the copy. */
const FIELD_ICONS = [MapPin, CurrencyDollar, Ruler];

export function PropertySearch() {
  const t = useCopy(heroCopy);
  const { setFilter, setZone } = useDevelopmentFilter();
  const [tab, setTab] = useState(0);
  const [selection, setSelection] = useState([0, 0, 0]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFilter(TAB_TO_FILTER[tab] ?? 'all');
    // Option 0 is "all zones"; the rest are zone names shared with the inventory.
    const zoneIndex = selection[0] ?? 0;
    setZone(zoneIndex > 0 ? (t.fields[0].options[zoneIndex] ?? null) : null);
    scrollToSection('desarrollos');
  };

  return (
    <form className={styles.search} onSubmit={onSubmit} role="search" aria-label={t.searchLabel}>
      <SegmentedControl
        className={styles.tabs}
        label={t.tabsLabel}
        value={tab}
        onChange={setTab}
        activeTone="accent"
        track={false}
        options={t.tabs.map((label, i) => ({ value: i, label }))}
      />
      <div className={styles.row}>
        {t.fields.map((field, i) => {
          const Icon = FIELD_ICONS[i]!;
          return (
            <SelectField
              key={i}
              variant="bare"
              icon={<Icon weight="light" />}
              className={styles.field}
              label={field.label}
              options={field.options}
              value={selection[i] ?? 0}
              onChange={(v) => setSelection((prev) => prev.map((old, j) => (j === i ? v : old)))}
            />
          );
        })}
        <Button type="submit" size="lg" icon={<MagnifyingGlass weight="bold" />} className={styles.submit}>
          {t.search}
        </Button>
      </div>
    </form>
  );
}
