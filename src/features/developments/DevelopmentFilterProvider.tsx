import { createContext, use, useMemo, useState, type ReactNode } from 'react';
import type { DevelopmentType } from './developments.data';

export type DevelopmentFilter = 'all' | DevelopmentType;

type FilterContextValue = {
  filter: DevelopmentFilter;
  /** Zone name to narrow the list to, or null for every zone. */
  zone: string | null;
  setFilter: (filter: DevelopmentFilter) => void;
  setZone: (zone: string | null) => void;
};

const FilterContext = createContext<FilterContextValue | null>(null);

/** Lets other features (hero search, nav, zones) drive the developments filter. */
export function DevelopmentFilterProvider({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState<DevelopmentFilter>('all');
  const [zone, setZone] = useState<string | null>(null);
  const value = useMemo(() => ({ filter, zone, setFilter, setZone }), [filter, zone]);
  return <FilterContext value={value}>{children}</FilterContext>;
}

export function useDevelopmentFilter(): FilterContextValue {
  const ctx = use(FilterContext);
  if (!ctx) throw new Error('useDevelopmentFilter must be used inside <DevelopmentFilterProvider>');
  return ctx;
}
