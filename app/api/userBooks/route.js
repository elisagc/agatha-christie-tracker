import { NextResponse } from 'next/server';
import { connection } from '@/app/api/libs/db';

export async function GET() {
  try {
    const books = await connection.query('SELECT * FROM book');
    const userBooks = await connection.query(
      'SELECT * FROM user_book where user_id = ?',
      [1]
    );

    const allBooks = books.map((book) => {
      const userBook = userBooks.find(
        (userBook) => userBook.book_id === book.id
      );

      return {
        ...book,
        coverUrl: book.cover_url,
        read: userBook ? Boolean(userBook.is_read) : false,
        rating: userBook ? userBook.rating : 0,
        comment: userBook ? userBook.comment : '',
      };
    });

    return NextResponse.json(allBooks);
  } catch (error) {
    console.error('Error fetching books:', error.message);
    return NextResponse.json(
      { message: 'Error retrieving books' },
      { status: 500 }
    );
  }
}
