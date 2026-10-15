'use client';

import { optionColors } from '@/helpers/constants';
import { UserBook } from '@/interfaces';
import { BookOpen } from 'lucide-react';
import { useEffect, useState } from 'react';
import Badge from '../ui/Badge';
import BookForm from './BookForm';

interface BookDetailProps {
  book: UserBook;
  fallbackSrc?: string;
}

const BookDetail = ({ book, fallbackSrc }: BookDetailProps) => {
  const [hasError, setHasError] = useState(!book.coverUrl);

  useEffect(() => {
    setHasError(!book.coverUrl);
  }, [book.coverUrl]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <span className="text-gray-500 text-xs md:text-md">
          Year of publication: {book.year}
        </span>

        <Badge
          className={optionColors[book.detective]}
          label={book.detective}
        />
      </div>
      <div className="flex gap-4">
        <div className="relative overflow-hidden h-48 w-32 flex-shrink-0 bg-gray-100 rounded flex items-center justify-center">
          {!hasError ? (
            <img
              src={book.coverUrl}
              alt={book.title}
              onError={() => {
                if (fallbackSrc) {
                  setHasError(false);
                } else {
                  setHasError(true);
                }
              }}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-400 p-2 text-center">
              <BookOpen className="w-10 h-10 text-gray-400 stroke-[1.5]" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="overflow-y-auto max-h-48 no-scrollbar">
            <span className="text-gray-800 text-sm text-pretty">
              ({book.description})
            </span>
          </div>
        </div>
      </div>

      <BookForm book={book} />
    </div>
  );
};

export default BookDetail;
