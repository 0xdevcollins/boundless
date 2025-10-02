'use client';

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { BlogPost } from '@/types/blog';
import {
  getBlogPosts,
  searchBlogPosts,
  getBlogCategories,
} from '@/lib/api/blog';
import BlogCard from './BlogCard';
import { Search, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import AuthLoadingState from '@/components/auth/AuthLoadingState';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface StreamingBlogGridProps {
  initialPosts: BlogPost[];
  hasMore: boolean;
  initialPage: number;
}

const StreamingBlogGrid: React.FC<StreamingBlogGridProps> = ({
  initialPosts,
  hasMore: initialHasMore,
  initialPage,
}) => {
  const [allPosts, setAllPosts] = useState<BlogPost[]>(initialPosts);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [visiblePosts, setVisiblePosts] = useState(12);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<'Latest' | 'Oldest' | ''>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoadingCategories(true);
      try {
        const categories = await getBlogCategories();
        const categoryNames = categories.map(cat => cat.name);
        setAvailableCategories(categoryNames);
      } catch {
        setAvailableCategories(['Web3', 'Community', 'Category']);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const filteredPosts = useMemo(() => {
    let filtered = allPosts;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(post =>
        selectedCategories.includes(post.category)
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        post =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    if (sortOrder) {
      filtered = [...filtered].sort((a, b) => {
        const dateA = new Date(a.publishedAt).getTime();
        const dateB = new Date(b.publishedAt).getTime();
        return sortOrder === 'Latest' ? dateB - dateA : dateA - dateB;
      });
    }

    return filtered;
  }, [allPosts, selectedCategories, searchQuery, sortOrder]);

  const displayPosts = filteredPosts.slice(0, visiblePosts);
  const hasMorePostsToShow = hasMore;

  const sortOptions: Array<'Latest' | 'Oldest'> = ['Latest', 'Oldest'];

  const handleLoadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    setError(null);

    try {
      const nextPage = currentPage + 1;

      let data;
      if (searchQuery.trim()) {
        data = await searchBlogPosts({
          q: searchQuery,
          page: nextPage,
          limit: 12,
          category:
            selectedCategories.length === 1 ? selectedCategories[0] : undefined,
          tags: selectedCategories.length > 1 ? selectedCategories : undefined,
        });
      } else {
        data = await getBlogPosts({
          page: nextPage,
          limit: 12,
          category:
            selectedCategories.length === 1 ? selectedCategories[0] : undefined,
          tags: selectedCategories.length > 1 ? selectedCategories : undefined,
          sort:
            sortOrder === 'Latest'
              ? 'latest'
              : sortOrder === 'Oldest'
                ? 'oldest'
                : 'latest',
        });
      }

      if (data.posts && data.posts.length > 0) {
        setAllPosts(prev => [...prev, ...data.posts]);
        setCurrentPage(nextPage);
        setHasMore(data.hasMore);
        setVisiblePosts(prev => prev + data.posts.length);
      } else {
        setHasMore(false);
      }
    } catch {
      setError('Failed to load more posts. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [
    isLoading,
    hasMore,
    currentPage,
    searchQuery,
    selectedCategories,
    sortOrder,
  ]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
    setVisiblePosts(12);
    setCurrentPage(1);
    setHasMore(true);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setVisiblePosts(12);
    setCurrentPage(1);
    setHasMore(true);
  };

  const handleCardClick = useCallback(() => {
    setIsNavigating(true);
    setTimeout(() => {
      setIsNavigating(false);
    }, 2000);
  }, []);

  return (
    <>
      {isNavigating && <AuthLoadingState message='Loading article...' />}
      <div className='min-h-screen bg-[#030303]'>
        <div>
          <div className='mx-auto max-w-6xl px-6 py-8'>
            <div className='flex gap-3 md:flex-row md:items-center md:justify-between lg:gap-16'>
              <div className='flex items-center gap-3'>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={cn(
                        'flex items-center gap-2 rounded-lg border px-2 py-2 text-sm font-medium transition-colors sm:px-4 sm:text-base',
                        sortOrder
                          ? 'border-[#A7F950]/30 bg-[#0F1A0B] text-[#A7F950]'
                          : 'border-white/24 text-white hover:bg-[#2A2A2A]'
                      )}
                    >
                      <svg
                        width='20'
                        height='20'
                        className={sortOrder ? 'text-[#A7F950]' : 'text-white'}
                        viewBox='0 0 20 20'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M9.16667 8.33333L15 8.33337M9.16667 11.6667H13.3333M9.16667 15H11.6667M9.16667 5H17.5M4.16667 17.5L4.16667 12.5M4.16667 17.5C3.69985 17.5 2.82769 16.0458 2.5 15.6771M4.16667 17.5C4.63348 17.5 5.50565 16.0458 5.83333 15.6771M4.16667 2.5V7.5M4.16667 2.5C4.63349 2.5 5.50565 3.95418 5.83333 4.32292M4.16667 2.5C3.69985 2.5 2.82769 3.95418 2.5 4.32292'
                          stroke='currentColor'
                          strokeWidth='1.4'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                      <span className='hidden md:block'>
                        {sortOrder || 'Sort'}
                      </span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align='start'
                    className='bg-background mt-2.5 w-[250px] rounded-[16px] border border-white/24 p-3 lg:w-[320px]'
                  >
                    <DropdownMenuRadioGroup
                      value={sortOrder}
                      onValueChange={value =>
                        setSortOrder(value as 'Latest' | 'Oldest')
                      }
                    >
                      {sortOptions.map((opt: 'Latest' | 'Oldest') => (
                        <DropdownMenuRadioItem
                          key={opt}
                          value={opt}
                          className='cursor-pointer rounded-md px-3 py-2 text-base font-medium text-white transition-colors duration-200 hover:!bg-transparent hover:!text-white data-[state=checked]:text-white [&>span:first-child]:hidden'
                        >
                          <span
                            className={cn(
                              'mr-3 inline-flex h-5 w-5 items-center justify-center rounded-full border-2',
                              opt === sortOrder
                                ? 'border-[#A7F950]'
                                : 'border-[#B5B5B5]'
                            )}
                          >
                            {opt === sortOrder && (
                              <span className='h-2.5 w-2.5 rounded-full bg-[#A7F950]' />
                            )}
                          </span>
                          <span className=''>{opt}</span>
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={cn(
                        'flex items-center gap-2 rounded-lg border border-white/24 px-2 py-2 text-sm font-medium text-white transition-colors sm:px-4 sm:text-base',
                        selectedCategories.length > 0 &&
                          'border-[#A7F950]/30 bg-[#0F1A0B] text-[#A7F950]'
                      )}
                      disabled={isLoadingCategories}
                    >
                      <svg
                        width='20'
                        height='20'
                        className='md:hidden'
                        viewBox='0 0 20 20'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M5 10H15M2.5 5H17.5M7.5 15H12.5'
                          stroke='currentColor'
                          strokeWidth='1.4'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                      <span className='hidden md:block'>Category</span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align='start'
                    className='bg-background mt-2.5 w-[220px] rounded-[16px] border border-white/24 p-3 sm:w-[250px] lg:w-[320px]'
                  >
                    <div className='space-y-1'>
                      {isLoadingCategories ? (
                        <div className='flex items-center justify-center py-4'>
                          <Loader2 className='h-4 w-4 animate-spin text-[#B5B5B5]' />
                          <span className='ml-2 text-sm text-[#B5B5B5]'>
                            Loading categories...
                          </span>
                        </div>
                      ) : (
                        availableCategories.map((cat: string) => (
                          <button
                            key={cat}
                            onClick={() => handleCategoryChange(cat)}
                            className='flex w-full cursor-pointer items-center rounded-md px-3 py-2 text-base font-medium text-white transition-colors duration-200 hover:bg-transparent hover:text-white'
                          >
                            <span
                              className={cn(
                                'mr-3 inline-flex h-5 w-5 items-center justify-center rounded-full border-2',
                                selectedCategories.includes(cat)
                                  ? 'border-[#A7F950]'
                                  : 'border-[#B5B5B5]'
                              )}
                            >
                              {selectedCategories.includes(cat) && (
                                <span className='h-2.5 w-2.5 rounded-full bg-[#A7F950]' />
                              )}
                            </span>
                            <span className=''>{cat}</span>
                          </button>
                        ))
                      )}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className='relative w-full md:min-w-[300px]'>
                <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#787878]' />
                <Input
                  type='text'
                  placeholder='Search article'
                  className='w-full rounded-lg border border-white/10 bg-[#101010] py-2 pr-4 pl-10 text-sm text-white placeholder:text-[#B5B5B5] focus:outline-none focus-visible:border-[#A7F950] focus-visible:ring-[3px] focus-visible:ring-[#A7F950]/30 md:h-[42px] md:text-base'
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className='mx-auto max-w-6xl px-6 py-12'>
          {error && (
            <div className='mb-6 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-red-400'>
              {error}
            </div>
          )}

          {displayPosts.length > 0 ? (
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'>
              {displayPosts.map(post => (
                <div key={post.id} className='w-full'>
                  <BlogCard post={post} onCardClick={handleCardClick} />
                </div>
              ))}
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center py-12 text-center'>
              <div className='mb-4 text-[#B5B5B5]'>
                <Search className='mx-auto h-12 w-12' />
              </div>
              <h3 className='mb-2 text-xl font-medium text-white'>
                No articles found
              </h3>
              <p className='text-[#B5B5B5]'>
                {searchQuery
                  ? `No articles match "${searchQuery}"`
                  : selectedCategories.length > 0
                    ? 'No articles in this category'
                    : 'No articles available'}
              </p>
            </div>
          )}

          {hasMorePostsToShow && !isLoading && (
            <div className='mt-12 flex justify-center'>
              <button
                onClick={handleLoadMore}
                className='flex items-center gap-2 rounded-lg border border-[#2B2B2B] bg-[#1A1A1A] px-6 py-3 text-white transition-colors hover:bg-[#2A2A2A] hover:text-white focus:ring-2 focus:ring-[#A7F950] focus:outline-none'
              >
                View More
              </button>
            </div>
          )}

          {isLoading && (
            <div className='mt-12 flex justify-center'>
              <div className='flex items-center gap-2 text-[#B5B5B5]'>
                <Loader2 className='h-5 w-5 animate-spin' />
                <span>Loading more posts...</span>
              </div>
            </div>
          )}

          {!hasMore && filteredPosts.length > 0 && !isLoading && (
            <div className='mt-12 text-center text-[#B5B5B5]'>
              <p>You've reached the end of the blog posts!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StreamingBlogGrid;
