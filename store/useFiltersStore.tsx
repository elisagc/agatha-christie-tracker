import { filterAndSortBooks } from '@/helpers/utils';
import {
  DetectiveOption,
  SortOption,
  StatusOption,
  UserBook,
} from '@/interfaces';
import { useQueryClient } from '@tanstack/react-query';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

interface Filters {
  search: string;
  detective: DetectiveOption;
  status: StatusOption;
  sort: SortOption;
}

interface FiltersContextType {
  filters: Filters;
  filteredBooks: UserBook[];
  filterIsDirty: boolean;
  getFilteredBooks: (books: UserBook[]) => UserBook[];
  setFilteredBooks: React.Dispatch<React.SetStateAction<UserBook[]>>;
  onResetFilters: () => void;
  onUpdateFilter: (
    key: keyof Filters
  ) => (value: Filters[keyof Filters]) => void;
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export const FiltersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient();
  const [filteredBooks, setFilteredBooks] = useState<UserBook[]>([]);

  const initialFilters: Filters = {
    search: '',
    detective: 'all',
    status: 'all',
    sort: 'id-asc',
  };
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const filterIsDirty =
    filters.search !== initialFilters.search ||
    filters.detective !== initialFilters.detective ||
    filters.status !== initialFilters.status ||
    filters.sort !== initialFilters.sort;

  const onUpdateFilter =
    (key: keyof Filters) => (value: Filters[typeof key]) => {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [key]: value,
      }));
    };

  const onResetFilters = () => {
    setFilters({
      search: '',
      detective: 'all',
      status: 'all',
      sort: 'id-asc',
    });
  };
  const getFilteredBooks = useCallback(
    (books: UserBook[]) => {
      return filterAndSortBooks(
        books,
        filters.search,
        filters.status,
        filters.detective,
        filters.sort
      );
    },
    [filters]
  );

  useEffect(() => {
    const books = queryClient.getQueryData<UserBook[]>(['userBooks']);
    if (books) {
      setFilteredBooks(getFilteredBooks(books));
    }
  }, [filters, getFilteredBooks, queryClient]);

  return (
    <FiltersContext.Provider
      value={{
        filters,
        filteredBooks,
        filterIsDirty,
        onUpdateFilter,
        onResetFilters,
        setFilteredBooks,
        getFilteredBooks,
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
