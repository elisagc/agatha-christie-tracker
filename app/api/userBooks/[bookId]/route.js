import { NextResponse } from 'next/server';
import {
  validateRequestBody,
  checkIfBookExists,
  updateBook,
  createBook,
} from '@/app/api/libs/bookService';
import { handleErrors } from '@/app/api/libs/errorHandler';

export async function PUT(request, { params }) {
  const { bookId } = await params;
  try {
    const updates = await validateRequestBody(request);
    const existUserBook = await checkIfBookExists(bookId);
    console.log(updates, existUserBook);
    if (existUserBook) {
      await updateBook(bookId, updates);
    } else {
      await createBook(bookId, updates);
    }
    return NextResponse.json({ message: 'Libro actualizado correctamente!' });
  } catch (error) {
    return handleErrors(error);
  }
}
