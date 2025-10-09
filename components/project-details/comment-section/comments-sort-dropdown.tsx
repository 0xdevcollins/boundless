'use client';

import { ListFilter } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type SortBy = 'createdAt' | 'updatedAt' | 'totalReactions';
type SortOrder = 'asc' | 'desc';

interface CommentsSortDropdownProps {
  sortBy: SortBy;
  sortOrder: SortOrder;
  onSortChange: (sortBy: SortBy, sortOrder: SortOrder) => void;
}

const sortOptions = [
  {
    value: 'createdAt-desc',
    label: 'Latest',
    sortBy: 'createdAt' as SortBy,
    sortOrder: 'desc' as SortOrder,
  },
  {
    value: 'createdAt-asc',
    label: 'Oldest',
    sortBy: 'createdAt' as SortBy,
    sortOrder: 'asc' as SortOrder,
  },
  {
    value: 'totalReactions-desc',
    label: 'Most Reactions',
    sortBy: 'totalReactions' as SortBy,
    sortOrder: 'desc' as SortOrder,
  },
  {
    value: 'updatedAt-desc',
    label: 'Recently Updated',
    sortBy: 'updatedAt' as SortBy,
    sortOrder: 'desc' as SortOrder,
  },
];

export function CommentsSortDropdown({
  sortBy,
  sortOrder,
  onSortChange,
}: CommentsSortDropdownProps) {
  const currentValue = `${sortBy}-${sortOrder}`;
  const currentLabel =
    sortOptions.find(option => option.value === currentValue)?.label ||
    'Latest';

  const handleValueChange = (value: string) => {
    const option = sortOptions.find(opt => opt.value === value);
    if (option) {
      onSortChange(option.sortBy, option.sortOrder);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className='h-8 gap-2 border-[#22c55e]/30 bg-black px-3 text-[#22c55e] hover:bg-[#22c55e]/10 hover:text-[#22c55e] md:h-9 md:px-4'
        >
          <ListFilter className='size-4' />
          <span className='hidden md:inline'>{currentLabel}</span>
          <span className='md:hidden'>{currentLabel}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='start'
        className='w-48 border-zinc-800 bg-black'
      >
        <DropdownMenuRadioGroup
          value={currentValue}
          onValueChange={handleValueChange}
        >
          {sortOptions.map(option => (
            <DropdownMenuRadioItem
              key={option.value}
              value={option.value}
              className='text-white data-[state=checked]:text-[#22c55e]'
            >
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
