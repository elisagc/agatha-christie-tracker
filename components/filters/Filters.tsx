'use client';

import { SearchBar } from '@/components/ui/SearchBar';
import { Select } from '@/components/ui/Select';
import {
  sortOptions,
  detectiveOptions,
  statusOptions,
} from '@/helpers/constants';
import { StatusOption, Option } from '@/interfaces';
import { useFilters } from '@/store/useFiltersStore';
import clsx from 'clsx';
import { RotateCcw } from 'lucide-react';

export function Filters() {
  const {
    filters: { search, detective, sort, status },
    filterIsDirty,
    onUpdateFilter,
    onResetFilters,
  } = useFilters();

  const StatusButton = (option: Option<StatusOption>) => {
    const { label, value, Icon, color } = option;
    return (
      <div key={value}>
        <button
          onClick={() => onUpdateFilter('status')(value)}
          className={clsx(
            'px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2',
            status === value
              ? `${color} text-white`
              : 'bg-gray-100 text-gray-700'
          )}
        >
          {Icon && <Icon className="size-4 md:size-5" />} {label}
        </button>
      </div>
    );
  };

  const ClearButton = () => {
    return (
      <button
        disabled={!filterIsDirty}
        onClick={onResetFilters}
        className="px-4 py-2 rounded-lg flex items-center gap-2 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors disabled:text-gray-400"
        title="Reset filters"
      >
        <RotateCcw size={18} />
        <span className="hidden sm:block">Clear</span>
      </button>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
      <div className="flex flex-col md:flex-row md:flex-wrap gap-2">
        <div className="flex-1 min-w-[250px]">
          <SearchBar value={search} onChange={onUpdateFilter('search')} />
        </div>

        <div className="flex flex-1 flex-wrap md:flex-nowrap gap-2">
          <Select
            options={sortOptions}
            value={sort}
            onChange={onUpdateFilter('sort')}
            className="flex-1 min-w-[225px]"
          />

          <Select
            options={detectiveOptions}
            value={detective}
            onChange={onUpdateFilter('detective')}
            className="flex-1 min-w-[225px]"
          />
        </div>

        <div className="flex flex-wrap md:flex-nowrap gap-2">
          {statusOptions.map((option) => (
            <StatusButton key={option.value} {...option} />
          ))}
          <ClearButton />
        </div>
      </div>
    </div>
  );
}
