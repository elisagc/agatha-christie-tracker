'use client';

import CardButton from '@/components/card/CardButton';
import CardImage from '@/components/card/CardImage';
import Badge from '@/components/ui/Badge';
import { optionColors } from '@/helpers/constants';
import { useUpdateReadStatus } from '@/services/userBooks/mutations';
import { UserBook } from '@/interfaces';
import { BookOpenCheck as Check, BookOpen as Uncheck } from 'lucide-react';
import Link from 'next/link';
import { MouseEvent } from 'react';

interface BookCardProps {
  book: UserBook;
}

export function BookCard({ book }: BookCardProps) {
  const toggleReadMutation = useUpdateReadStatus();
  const { isPending } = toggleReadMutation;

  const handleReadBook = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toggleReadMutation.mutate({
      id: book.id,
      read: !book.read,
    });
  };

  return (
    <Link
      href={`/book/${book.id}`}
      scroll={false}
      className="group bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
    >
      <div className="flex">
        <CardImage book={book} />
        <div className="flex-1 p-3 flex flex-col justify-between">
          <div className="flex gap-1 items-baseline justify-between w-full">
            <h1 className="font-semibold text-sm line-clamp-2 ">
              {book.title}
            </h1>
            <span className="text-gray-500 text-xs md:text-md">
              ({book.year})
            </span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <Badge
              label={book.detective}
              className={optionColors[book.detective]}
            />
            <CardButton
              disabled={isPending}
              label={book.read ? 'Read' : 'Mark as read'}
              className={`${
                book.read ? optionColors.read : optionColors.unread
              } disabled:opacity-50`}
              onClick={handleReadBook}
              icon={book.read ? <Check size={14} /> : <Uncheck size={14} />}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
