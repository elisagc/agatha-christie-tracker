import { optionColors } from '@/helpers/constants';
import { UserBook } from '@/interfaces';
import Badge from '../ui/Badge';
import BookForm from './BookForm';
interface BookDetailProps {
  book: UserBook;
}
const BookDetail = ({ book }: BookDetailProps) => {
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
        <div className="relative overflow-hidden h-48">
          <img
            src={book.coverUrl}
            alt={book.title}
            className="w-full h-full object-cover"
          />
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
