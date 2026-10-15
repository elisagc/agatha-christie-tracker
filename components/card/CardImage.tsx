'use client';

import { UserBook } from '@/interfaces';
import Image from 'next/image';

interface Props {
  book: UserBook;
}
const BookImage = ({ book }: Props) => {
  return (
    <div className="relative overflow-hidden aspect-square w-24">
      <Image
        src={book.coverUrl}
        alt={book.title}
        fill
        sizes="96px"
        className="w-full h-full object-cover scale-[1.6] object-bottom transition-all duration-300 group-hover:scale-[1.2] group-hover:object-[0px_-9px]"
      />
    </div>
  );
};

export default BookImage;
