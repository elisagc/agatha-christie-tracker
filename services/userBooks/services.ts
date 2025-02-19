import { UserBook } from '@/interfaces';

const URL = '/api/userBooks';

export const getUserBooks = async (): Promise<UserBook[]> => {
  const response = await fetch(URL);
  if (!response.ok) throw new Error('Error fetching books');
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
  try {
    const response = await fetch(`${URL}/${bookId}`, {
      method: 'PUT',
      body: JSON.stringify({ [field]: value }),
    });

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const updateReadStatus = async (bookId: number, status: boolean) => {
  try {
    return updateBookField({ bookId, field: 'read', value: status });
  } catch (error) {
    throw error;
  }
};

export const updateUserBook = async (
  bookId: number,
  updates: Partial<UserBook>
) => {
  console.log('ebntras en update', updates);

  try {
    const response = await fetch(`${URL}/${bookId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
    return response.json();
  } catch (error) {
    throw error;
  }
};
