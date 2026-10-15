import { NextResponse } from 'next/server';
import { ValidationError } from '@/app/api/libs/bookService';

export function handleErrors(error) {
  if (error instanceof ValidationError) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  } else if (error.message === 'Libro no encontrado') {
    return NextResponse.json({ error: error.message }, { status: 404 });
  } else if (error instanceof SyntaxError) {
    return NextResponse.json(
      { error: 'Error en el formato del JSON' },
      { status: 400 }
    );
  } else if (error.code === 'ER_BAD_FIELD_ERROR') {
    return NextResponse.json(
      { error: 'Error en la base de datos: campo incorrecto' },
      { status: 500 }
    );
  } else if (error.code === 'ER_NO_SUCH_TABLE') {
    return NextResponse.json(
      { error: 'Error en la base de datos: tabla no encontrada' },
      { status: 500 }
    );
  } else {
    return NextResponse.json(
      { error: 'Error al actualizar el libro', details: error.message },
      { status: 500 }
    );
  }
}
