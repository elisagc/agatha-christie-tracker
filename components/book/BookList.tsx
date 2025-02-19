'use client';

import { useFilters } from '@/store/useFiltersStore';
import { useEffect } from 'react';
import { useUserBooks } from '../../services/userBooks/queries';
import { BookCard } from './BookCard';

export function BookList({}) {
  const { filteredBooks, setFilteredBooks, getFilteredBooks } = useFilters();
  const { data: books, error, isLoading } = useUserBooks();

  useEffect(() => {
    if (!books) return;

    setFilteredBooks(getFilteredBooks(books));
  }, [books, getFilteredBooks, setFilteredBooks]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
      {filteredBooks?.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
