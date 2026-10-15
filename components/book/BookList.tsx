'use client';

import { filterAndSortBooks } from '@/helpers/utils';
import { useFilters } from '@/store/useFiltersStore';
import { useMemo } from 'react';
import { useUserBooks } from '../../services/userBooks/queries';
import { BookCard } from './BookCard';

export function BookList() {
  const {
    filters: { search, status, detective, sort },
  } = useFilters();
  const { data: books, error, isLoading } = useUserBooks();

  const filteredBooks = useMemo(
    () =>
      books ? filterAndSortBooks(books, search, status, detective, sort) : [],
    [books, search, status, detective, sort]
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(min(300px,100%),1fr))] gap-5">
      {filteredBooks.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
