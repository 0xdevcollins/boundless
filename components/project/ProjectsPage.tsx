'use client';

import React from 'react';
import ProjectCard from '@/components/landing-page/project/ProjectCard';
import ExploreHeader from '@/components/projects/ExploreHeader';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useProjects } from '@/hooks/project/use-project';
import { useProjectFilters } from '@/hooks/project/use-project-filters';
import { useProjectTransform } from '@/hooks/project/use-project-transform';

export default function ProjectsClient() {
  const {
    filters,
    handleSearch,
    handleSort,
    handleStatus,
    handleCategory,
    clearSearch,
    clearAllFilters,
  } = useProjectFilters();

  const { projects, loading, loadingMore, error, hasMore, loadMore, refetch } =
    useProjects({ initialFilters: filters });

  const { transformProjectForCard } = useProjectTransform();

  // Memoized project cards to prevent unnecessary re-renders
  const projectCards = React.useMemo(() => {
    return projects.map(project => {
      const cardData = transformProjectForCard(project);
      return <ProjectCard key={project._id} {...cardData} />;
    });
  }, [projects, transformProjectForCard]);

  return (
    <>
      <ExploreHeader
        onSearch={handleSearch}
        onSortChange={handleSort}
        onStatusChange={handleStatus}
        onCategoryChange={handleCategory}
      />

      <main className='space-y-[40px] sm:space-y-[60px] md:space-y-[80px]'>
        {/* Results Summary */}
        {!loading && !error && (
          <div className='mb-6 flex items-center justify-between'>
            <div className='text-gray-400'>
              {projects.length > 0 ? (
                <span>
                  Showing {projects.length} project
                  {projects.length !== 1 ? 's' : ''}
                  {filters.search && ` for "${filters.search}"`}
                  {filters.category && ` in ${filters.category}`}
                  {filters.status && ` with status ${filters.status}`}
                </span>
              ) : (
                <span>No projects found</span>
              )}
            </div>
            {filters.search && (
              <button
                onClick={clearSearch}
                className='text-primary hover:text-primary/80 text-sm'
              >
                Clear search
              </button>
            )}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className='flex flex-col items-center justify-center py-16'>
            <LoadingSpinner
              size='lg'
              variant='dots'
              color='primary'
              className='mb-4'
            />
            <p className='text-gray-400'>Loading projects...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className='flex flex-col items-center justify-center py-16'>
            <div className='text-center'>
              <div className='mb-4 text-6xl'>⚠️</div>
              <h3 className='mb-2 text-xl font-semibold text-white'>
                Something went wrong
              </h3>
              <p className='mb-6 text-gray-400'>{error}</p>
              <button
                onClick={refetch}
                className='bg-primary hover:bg-primary/80 rounded-lg px-6 py-3 text-white transition-colors'
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && projects.length === 0 && (
          <div className='flex flex-col items-center justify-center py-16'>
            <div className='text-center'>
              <div className='mb-4 text-6xl'>🔍</div>
              <h3 className='mb-2 text-xl font-semibold text-white'>
                No projects found
              </h3>
              <p className='mb-6 text-gray-400'>
                {filters.search || filters.category || filters.status
                  ? 'Try adjusting your filters or search terms'
                  : 'No projects are available at the moment'}
              </p>
              {(filters.search || filters.category || filters.status) && (
                <button
                  onClick={clearAllFilters}
                  className='bg-primary hover:bg-primary/80 rounded-lg px-6 py-3 text-white transition-colors'
                >
                  Clear all filters
                </button>
              )}
            </div>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && projects.length > 0 && (
          <>
            <div className='grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3'>
              {projectCards}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className='mt-8 flex items-center justify-center'>
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  className='bg-primary hover:bg-primary/80 flex items-center gap-2 rounded-lg px-8 py-3 font-medium text-white transition-colors disabled:cursor-not-allowed disabled:bg-gray-600'
                >
                  {loadingMore && (
                    <div className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent'></div>
                  )}
                  {loadingMore ? 'Loading...' : 'Load More Projects'}
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
}
