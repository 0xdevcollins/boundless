'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SortOption {
  value: string;
  label: string;
}

interface SortByFilterProps<T extends string> {
  sortOption: T;
  setSortOption: (option: T) => void;
  options: SortOption[];
  className?: string;
}

export default function SortByFilter<T extends string>({
  sortOption,
  setSortOption,
  options,
  className = 'w-full sm:w-[150px]',
}: SortByFilterProps<T>) {
  return (
    <Select value={sortOption} onValueChange={(value) => setSortOption(value as T)}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
