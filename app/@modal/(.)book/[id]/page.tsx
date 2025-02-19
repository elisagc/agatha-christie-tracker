'use client';

import BookDetail from '@/components/book/BookDetail';
import { Modal } from '@/components/ui/Modal';
import { UserBook } from '@/interfaces';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

type Params = {
  id: string;
};

const Book = () => {
  const { id } = useParams<Params>();

  const { data: books = [] } = useQuery<UserBook[]>({
    queryKey: ['userBooks'],
  });
  const book =
    books.find((book) => book.id === +id) ??
    ({
      id: 0,
      title: 'Book not found',
      coverUrl: '',
      comment: '',
    } as UserBook);

  console.log('update books query');
  return (
    <Modal title={`#${book.id} - ${book.title}`}>
      <BookDetail book={book} />
    </Modal>
  );
};

export default Book;
