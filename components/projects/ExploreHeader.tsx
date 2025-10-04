'use client';

import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface ExploreHeaderProps {
  onSearch?: (searchTerm: string) => void;
  onSortChange?: (sortType: string) => void;
  onStatusChange?: (status: string) => void;
  onCategoryChange?: (category: string) => void;
  className?: string;
}

const ExploreHeader = ({
  onSearch,
  onSortChange,
  onStatusChange,
  onCategoryChange,
  className,
}: ExploreHeaderProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSort, setSelectedSort] = useState('Sort');
  const [selectedStatus, setSelectedStatus] = useState('Status');
  const [selectedCategory, setSelectedCategory] = useState('Category');

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (onSearch) onSearch(value);
  };

  const handleSort = (sortType: string) => {
    setSelectedSort(sortType);
    if (onSortChange) onSortChange(sortType);
  };

  const handleStatus = (status: string) => {
    setSelectedStatus(status);
    if (onStatusChange) onStatusChange(status);
  };

  const handleCategory = (category: string) => {
    setSelectedCategory(category);
    if (onCategoryChange) onCategoryChange(category);
  };

  const sortOptions = [
    'Newest First',
    'Oldest First',
    'Most Funded',
    'Least Funded',
    'Ending Soon',
    'Recently Started',
  ];
  const statusOptions = [
    'All Status',
    'Active',
    'Completed',
    'Draft',
    'Under Review',
    'Validated',
    'Approved',
  ];
  const categoryOptions = [
    'All Categories',
    'Technology',
    'Art & Creative',
    'Environment',
    'Education',
    'Healthcare',
    'Community',
    'DeFi',
    'NFT',
    'Web3',
  ];

  return (
    <div
      className={cn(
        'sticky top-0 z-50 w-full bg-black px-4 py-12 text-white',
        className
      )}
    >
      <div className='mx-auto max-w-7xl'>
        <div className='mb-12'>
          <h1 className='font-inter text-center text-3xl text-white md:text-left md:text-4xl lg:text-5xl'>
            Explore Boundless Projects
          </h1>
        </div>

        <div className='bg-rsed-500 flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:gap-8'>
          <div className='flex-wrsap flex w-full items-center gap-3 lg:max-w-1/4 lg:gap-4'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='outline'
                  className='msin-w-[100px] justify-between rounded-lg border-white/24 bg-transparent px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 hover:text-white'
                >
                  <div className='flex items-center gap-2'>
                    <Image
                      src='/sort.svg'
                      alt='Sort'
                      width={16}
                      height={16}
                      className='h-4 w-4'
                    />
                    {selectedSort}
                  </div>
                  <ChevronDown className='ml-2 h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align='start'
                className='border-white/24 bg-black text-white'
              >
                {sortOptions.map(option => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() => handleSort(option)}
                    className='cursor-pointer hover:bg-gray-800'
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='outline'
                  className='min-sw-[100px] justify-between rounded-lg border-white/24 bg-transparent px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 hover:text-white'
                >
                  {selectedStatus}
                  <ChevronDown className='ml-2 h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align='start'
                className='border-white/24 bg-black text-white'
              >
                {statusOptions.map(option => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() => handleStatus(option)}
                    className='cursor-pointer hover:bg-gray-800'
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='outline'
                  className='min-sw-[100px] justify-between rounded-lg border-white/24 bg-transparent px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 hover:text-white'
                >
                  {selectedCategory}
                  <ChevronDown className='ml-2 h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align='start'
                className='border-white/24 bg-black text-white'
              >
                {categoryOptions.map(option => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() => handleCategory(option)}
                    className='cursor-pointer hover:bg-gray-800'
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className='relative ml-auto w-full lg:max-w-3/5'>
            <div className='relative'>
              <Search className='absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-white/40' />
              <Input
                type='text'
                placeholder='Search project or creator...'
                value={searchTerm}
                onChange={e => handleSearch(e.target.value)}
                className='bg-background w-full rounded-lg border-gray-900 py-3 pr-4 pl-10 text-base text-white placeholder-gray-400 focus:border-gray-400 focus:ring-1 focus:ring-gray-400'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreHeader;
