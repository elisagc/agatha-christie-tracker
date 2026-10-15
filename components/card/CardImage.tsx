'use client';

import { UserBook } from '@/interfaces';
import { BookOpen } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Props {
  book: UserBook;
  fallbackSrc?: string;
}

const BookImage = ({ book, fallbackSrc }: Props) => {
  const [hasError, setHasError] = useState(!book.coverUrl);

  useEffect(() => {
    setHasError(!book.coverUrl);
  }, [book.coverUrl]);

  return (
    <div className="overflow-hidden aspect-square w-24 bg-gray-100 flex items-center justify-center flex-shrink-0">
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
          className="w-full h-full object-cover scale-[1.6] object-bottom transition-all duration-300 group-hover:scale-[1.2] group-hover:object-[0px_-9px]"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-400">
          <BookOpen className="w-8 h-8 text-gray-400 stroke-[1.5]" />
        </div>
      )}
    </div>
  );
};

export default BookImage;
