import { connection } from '@/app/api/libs/db';

export async function validateRequestBody(request) {
  const body = await request.json();
  const { read, comment, rating } = body;

  if (read !== undefined && typeof read !== 'boolean') {
    throw new Error('El campo "read" debe ser un booleano');
  }
  if (comment !== undefined && typeof comment !== 'string') {
    throw new Error('El campo "comment" debe ser un string');
  }
  if (
    rating !== undefined &&
    (typeof rating !== 'number' || rating < 0 || rating > 5)
  ) {
    throw new Error('El campo "rating" debe ser un número entre 0 y 5');
  }

  return { read, comment, rating };
}

export async function checkIfBookExists(bookId) {
  const rows = await connection.query(
    `SELECT * FROM user_book WHERE user_id = ? AND book_id = ?`,
    [1, bookId]
  );

  if (rows.length === 0) {
    return false;
  }

  return true;
}

export async function createBook(bookId, updates) {
  const fields = [];
  const values = [1, bookId]; // user_id fijo en 1

  for (const [key, value] of Object.entries(updates)) {
    if (value !== undefined) {
      fields.push(key === 'read' ? 'is_read' : key);
      values.push(value);
    }
  }

  if (!fields.length) {
    throw new Error('No se proporcionó ningún campo para actualizar');
  }

  const placeholders = new Array(fields.length).fill('?').join(', ');
  const query = `INSERT INTO user_book (user_id, book_id, ${fields.join(
    ', '
  )}) VALUES (${placeholders}, ?, ?)`;

  await connection.query(query, values);
}

export async function updateBook(bookId, updates) {
  const fields = [];
  const values = [];

  for (const [key, value] of Object.entries(updates)) {
    if (value !== undefined) {
      fields.push(`${key === 'read' ? 'is_read' : key} = ?`);
      values.push(value);
    }
  }

  if (!fields.length) {
    throw new Error('No se proporcionó ningún campo para actualizar');
  }

  values.push(1, bookId); // user_id fijo en 1 y el bookId

  const query = `UPDATE user_book SET ${fields.join(
    ', '
  )} WHERE user_id = ? AND book_id = ?`;
  await connection.query(query, values);
}
