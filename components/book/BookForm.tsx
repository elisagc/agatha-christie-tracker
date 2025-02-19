import { optionColors } from '@/helpers/constants';
import { useUpdateUserBook } from '@/services/userBooks/mutations';
import { UserBook } from '@/interfaces';
import { BookOpenCheck as Check, BookOpen as Uncheck } from 'lucide-react';
import { MouseEvent, useState } from 'react';
import CardButton from '../card/CardButton';
import Rating from '../ui/Rating';

interface BookFormProps {
  book: UserBook;
}

const BookForm = ({ book }: BookFormProps) => {
  const [values, setValues] = useState<Partial<UserBook>>({
    read: book.read,
    rating: book.rating,
    comment: book.comment,
  });

  const disabled =
    book.comment === values.comment &&
    book.rating === values.rating &&
    book.read === values.read;

  const toggleUserBookMutation = useUpdateUserBook();

  const { isPending } = toggleUserBookMutation;

  const handleOnSubmit = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    await toggleUserBookMutation.mutateAsync({
      id: book.id,
      updates: values,
    });
  };
  return (
    <form className="flex flex-col rounded-lg" onSubmit={handleOnSubmit}>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5 ">
          <textarea
            value={values.comment ?? ''}
            onChange={(e) => {
              setValues({ ...values, comment: e.target.value });
            }}
            placeholder="Write your notes about the book here..."
            className="w-full p-3 border rounded-lg h-32 focus:border-blue-500 text-sm no-scrollbar resize-none"
          />
        </div>
        <div className="flex flex-col space-y-1.5 ">
          <div className="flex justify-between">
            <Rating
              rating={values.rating}
              onClick={(rating) => {
                setValues({ ...values, rating });
              }}
            />

            <CardButton
              label={values.read ? 'Read' : 'Unread'}
              className={`${
                values.read ? optionColors.read : optionColors.unread
              } disabled:opacity-50`}
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                setValues((prev) => ({ ...values, read: !prev.read }));
              }}
              icon={values.read ? <Check size={14} /> : <Uncheck size={14} />}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end pt-4 mt-4 border-t border-gray-300 rounded-b">
        <button
          disabled={disabled || isPending}
          type="submit"
          className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5
          disabled:opacity-50
          "
        >
          {isPending ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default BookForm;
