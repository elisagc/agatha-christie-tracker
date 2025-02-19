import { UserBook, DetectiveOption, StatusOption } from '@/interfaces';

const getComparisonValue = (
  field: string,
  a: UserBook,
  b: UserBook
): number => {
  if (field === 'title') return a.title.localeCompare(b.title);
  if (field === 'year') return a.year - b.year;
  if (field === 'id') return a.id - b.id;
  return 0;
};

export const filterAndSortBooks = (
  books: UserBook[],
  search: string,
  filterType: StatusOption,
  detectiveFilter: DetectiveOption,
  sort: string
): UserBook[] => {
  return books
    .filter(
      ({ title, read, detective }) =>
        title.toLowerCase().includes(search.toLowerCase()) &&
        (filterType === 'all' || (filterType === 'read' ? read : !read)) &&
        (detectiveFilter === 'all' || detective === detectiveFilter)
    )
    .sort((a, b) => {
      const [field, direction] = sort.split('-');
      return (direction === 'asc' ? 1 : -1) * getComparisonValue(field, a, b);
    });
};
