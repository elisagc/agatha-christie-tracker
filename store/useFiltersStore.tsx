import { DetectiveOption, SortOption, StatusOption } from '@/interfaces';
import React, { createContext, useCallback, useContext, useState } from 'react';

interface Filters {
  search: string;
  detective: DetectiveOption;
  status: StatusOption;
  sort: SortOption;
}

interface FiltersContextType {
  filters: Filters;
  filterIsDirty: boolean;
  onResetFilters: () => void;
  onUpdateFilter: (
    key: keyof Filters
  ) => (value: Filters[keyof Filters]) => void;
}

const initialFilters: Filters = {
  search: '',
  detective: 'all',
  status: 'all',
  sort: 'id-asc',
};

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export const FiltersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const filterIsDirty =
    filters.search !== initialFilters.search ||
    filters.detective !== initialFilters.detective ||
    filters.status !== initialFilters.status ||
    filters.sort !== initialFilters.sort;

  const onUpdateFilter = useCallback(
    (key: keyof Filters) => (value: Filters[typeof key]) => {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [key]: value,
      }));
    },
    []
  );

  const onResetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  return (
    <FiltersContext.Provider
      value={{
        filters,
        filterIsDirty,
        onUpdateFilter,
        onResetFilters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error('useFilters must be used within a FiltersProvider');
  }
  return context;
};
