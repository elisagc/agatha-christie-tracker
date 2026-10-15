import { UserBook } from '@/interfaces';

const URL = '/api/userBooks';

export const getUserBooks = async (): Promise<UserBook[]> => {
  const response = await fetch(URL);
  if (!response.ok) throw new Error('Error fetching books');
  return response.json();
};

const putUserBook = async (bookId: number, body: Partial<UserBook>) => {
  const response = await fetch(`${URL}/${bookId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error('Error updating book');
  return response.json();
};

const updateBookField = async ({
  bookId,
  field,
  value,
}: {
  bookId: number;
  field: string;
  value: string | number | boolean;
}) => {
  return putUserBook(bookId, { [field]: value });
};

export const updateReadStatus = async (bookId: number, status: boolean) => {
  return updateBookField({ bookId, field: 'read', value: status });
};

export const updateUserBook = async (
  bookId: number,
  updates: Partial<UserBook>
) => {
  return putUserBook(bookId, updates);
};
