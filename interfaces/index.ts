export interface Book {
  id: number;
  title: string;
  year: number;
  detective: 'poirot' | 'marple' | 'other';
  coverUrl: string;
  description: string;
}

export interface UserBook extends Book {
  read: boolean;
  rating?: number;
  comment?: string;
  dateRead?: string;
}

export type StatusOption = 'all' | 'read' | 'unread';
export type DetectiveOption = 'all' | 'poirot' | 'marple' | 'other';
export type SortOption =
  | 'id-asc'
  | 'id-desc'
  | 'title-asc'
  | 'title-desc'
  | 'year-asc'
  | 'year-desc';

export interface Option<T> {
  label: string;
  value: T;
  Icon?: React.ElementType;
  color?: string;
}
