import { BookList } from '@/components/book/BookList';
import { Filters } from '@/components/filters/Filters';
import { Header } from '@/components/layout/Header';

export default function App() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <Filters />
        <BookList />
      </div>
    </div>
  );
}
