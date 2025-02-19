import {
  SortOption,
  DetectiveOption,
  StatusOption,
  Option,
} from '@/interfaces';
import { BookOpenCheck as Check, BookOpen as Uncheck } from 'lucide-react';

export const optionColors = {
  poirot: 'bg-blue-100 text-blue-800',
  marple: 'bg-pink-100 text-pink-800',
  other: 'bg-gray-100 text-gray-800',
  read: 'bg-green-100 text-green-800 hover:bg-green-200',
  unread: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
};

export const sortOptions: Option<SortOption>[] = [
  { label: 'Delivery Number (1-84)', value: 'id-asc' },
  { label: 'Delivery Number (84-1)', value: 'id-desc' },
  { label: 'Title (A-Z)', value: 'title-asc' },
  { label: 'Title (Z-A)', value: 'title-desc' },
  { label: 'Year (Oldest)', value: 'year-asc' },
  { label: 'Year (Newest)', value: 'year-desc' },
];

export const detectiveOptions: Option<DetectiveOption>[] = [
  { label: 'All Detectives', value: 'all' },
  { label: 'Hercules Poirot', value: 'poirot' },
  { label: 'Miss Marple', value: 'marple' },
  { label: 'Other', value: 'other' },
];

export const statusOptions: Option<StatusOption>[] = [
  { label: 'All', value: 'all', color: 'bg-gray-900' },
  { label: 'Read', value: 'read', Icon: Check, color: 'bg-green-500' },
  { label: 'Unread', value: 'unread', Icon: Uncheck, color: 'bg-blue-500' },
];
