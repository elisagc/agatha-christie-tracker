'use client';

import { UserBook } from '@/interfaces';

interface Props {
  book: UserBook;
}
const BookImage = ({ book }: Props) => {
  return (
    <div className="overflow-hidden aspect-square w-24">
      <img
        src={book.coverUrl}
        alt={book.title}
        className="w-full h-full object-cover scale-[1.6] object-bottom transition-all duration-300 group-hover:scale-[1.2] group-hover:object-[0px_-9px]"
      />
    </div>
  );
};

export default BookImage;
