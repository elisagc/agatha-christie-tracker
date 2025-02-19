'use client';

import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={20}
      />
      <input
        type="text"
        placeholder="Search books..."
        className="w-full pl-10 pr-4 py-2 border rounded-lg"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
