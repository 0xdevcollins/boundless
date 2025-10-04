'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import ProjectPageHero from '@/components/Project-Page-Hero';
import ExploreHeader from '@/components/projects/ExploreHeader';
import ProjectCard from '@/components/landing-page/project/ProjectCard';
import { getCrowdfundingProjects } from '@/lib/api/project';
import { CrowdfundingProject } from '@/lib/api/types';
import LoadingSpinner from '@/components/LoadingSpinner';
// import { useDebounce } from '@/hooks/use-debounce';

// Types for sorting and filtering
type SortOption =
  | 'newest'
  | 'oldest'
  | 'funding_goal_high'
  | 'funding_goal_low'
  | 'deadline_soon'
  | 'deadline_far';

interface ProjectFilters {
  category?: string;
  status?: string;
  search?: string;
  sort?: SortOption;
}

function ProjectsPage() {
  const [projects, setProjects] = useState<CrowdfundingProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState<ProjectFilters>({});
  const [searchTerm, setSearchTerm] = useState('');

  // Debounce search term to avoid excessive API calls
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Get project deadline in days
  const getProjectDeadline = useCallback(
    (project: CrowdfundingProject): number => {
      if (project.status === 'idea') {
        return new Date(project.voting.endDate).getTime();
      } else if (
        project.status === 'active' ||
        project.status === 'completed'
      ) {
        return new Date(project.funding.endDate).getTime();
      }
      return 0;
    },
    []
  );

  // Sort projects based on sort option
  const sortProjects = useCallback(
    (
      projects: CrowdfundingProject[],
      sortOption: SortOption
    ): CrowdfundingProject[] => {
      const sorted = [...projects];

      switch (sortOption) {
        case 'newest':
          return sorted.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case 'oldest':
          return sorted.sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case 'funding_goal_high':
          return sorted.sort((a, b) => b.funding.goal - a.funding.goal);
        case 'funding_goal_low':
          return sorted.sort((a, b) => a.funding.goal - b.funding.goal);
        case 'deadline_soon':
          return sorted.sort((a, b) => {
            const aDeadline = getProjectDeadline(a);
            const bDeadline = getProjectDeadline(b);
            return aDeadline - bDeadline;
          });
        case 'deadline_far':
          return sorted.sort((a, b) => {
            const aDeadline = getProjectDeadline(a);
            const bDeadline = getProjectDeadline(b);
            return bDeadline - aDeadline;
          });
        default:
          return sorted;
      }
    },
    [getProjectDeadline]
  );

  const fetchProjects = useCallback(
    async (page = 1, newFilters: ProjectFilters = {}) => {
      try {
        setLoading(true);
        setError(null);

        const response = await getCrowdfundingProjects(page, 9, {
          category: newFilters.category,
          status: newFilters.status,
        });

        let fetchedProjects = response.data.projects;

        // Apply client-side search filtering
        if (newFilters.search) {
          const searchLower = newFilters.search.toLowerCase();
          fetchedProjects = fetchedProjects.filter(
            project =>
              project.title.toLowerCase().includes(searchLower) ||
              project.vision.toLowerCase().includes(searchLower) ||
              project.details.toLowerCase().includes(searchLower) ||
              project.category.toLowerCase().includes(searchLower) ||
              `${project.creator.profile.firstName} ${project.creator.profile.lastName}`
                .toLowerCase()
                .includes(searchLower)
          );
        }

        // Apply client-side sorting
        if (newFilters.sort) {
          fetchedProjects = sortProjects(fetchedProjects, newFilters.sort);
        }

        setProjects(fetchedProjects);
        setTotalPages(response.data.pagination.pages);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Error fetching projects:', err);
        setError('Failed to fetch projects. Please try again.');
      } finally {
        setLoading(false);
      }
    },
    [sortProjects]
  );

  // Update filters when debounced search term changes
  useEffect(() => {
    setFilters(prev => ({ ...prev, search: debouncedSearchTerm }));
  }, [debouncedSearchTerm]);

  // Fetch projects when filters or page changes
  useEffect(() => {
    fetchProjects(currentPage, filters);
  }, [currentPage, filters, fetchProjects]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const handleSearch = useCallback((searchTerm: string) => {
    setSearchTerm(searchTerm);
  }, []);

  const handleSort = useCallback((sortType: string) => {
    setFilters(prev => ({ ...prev, sort: sortType as SortOption }));
  }, []);

  const handleStatus = useCallback((status: string) => {
    setFilters(prev => ({
      ...prev,
      status: status === 'all' ? undefined : status,
    }));
  }, []);

  const handleCategory = useCallback((category: string) => {
    setFilters(prev => ({
      ...prev,
      category: category === 'all' ? undefined : category,
    }));
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Transform project data for ProjectCard component
  const transformProjectForCard = useCallback(
    (project: CrowdfundingProject) => {
      let deadlineInDays: number | null = null;

      try {
        if (project.status === 'idea') {
          const now = new Date();
          const end = new Date(project.voting.endDate);
          deadlineInDays = Math.ceil(
            (end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
          );
        } else if (
          project.status === 'active' ||
          project.status === 'completed'
        ) {
          const now = new Date();
          const end = new Date(project.funding.endDate);
          deadlineInDays = Math.ceil(
            (end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
          );
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(
          'Error calculating deadline for project:',
          project._id,
          error
        );
        deadlineInDays = null;
      }

      // Map project status to card status
      let cardStatus: 'Validation' | 'Funding' | 'Funded' | 'Completed' =
        'Funding';
      if (project.status === 'draft' || project.status === 'idea') {
        cardStatus = 'Validation';
      } else if (project.status === 'active') {
        cardStatus = 'Funding';
      } else if (project.status === 'completed') {
        cardStatus = 'Completed';
      }

      return {
        projectId: project._id,
        creatorName: `${project.creator.profile.firstName} ${project.creator.profile.lastName}`,
        creatorLogo: '/avatar.png', // Default avatar, should be from project.creator.avatar
        projectImage:
          project.media?.logo ||
          project.logo ||
          '/landing/explore/project-placeholder-1.png',
        projectTitle: project.title,
        projectDescription: project.vision || project.details,
        status: cardStatus,
        deadlineInDays: deadlineInDays || 0,
        funding: {
          current: project.funding?.raised || 0,
          goal: project.funding?.goal || project.fundingAmount || 0,
          currency: project.funding?.currency || 'USDC',
        },
        votes:
          project.status === 'idea'
            ? {
                current: project.votes || 0,
                goal: project.voting?.totalVotes || 100,
              }
            : undefined,
      };
    },
    []
  );

  // Memoized project cards to prevent unnecessary re-renders
  const projectCards = useMemo(() => {
    return projects.map(project => {
      const cardData = transformProjectForCard(project);
      return <ProjectCard key={project._id} {...cardData} />;
    });
  }, [projects, transformProjectForCard]);

  // Pagination component
  const Pagination = useMemo(() => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisiblePages / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
            i === currentPage
              ? 'bg-primary text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className='mt-8 flex items-center justify-center gap-2'>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className='rounded-md bg-gray-800 px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50'
        >
          Previous
        </button>
        {pages}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className='rounded-md bg-gray-800 px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50'
        >
          Next
        </button>
      </div>
    );
  }, [currentPage, totalPages, handlePageChange]);

  return (
    <div className='relative min-h-screen bg-black'>
      <ProjectPageHero />
      <ExploreHeader
        onSearch={handleSearch}
        onSortChange={handleSort}
        onStatusChange={handleStatus}
        onCategoryChange={handleCategory}
      />

      <main className='container mx-auto px-4 py-8'>
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
                onClick={() => setSearchTerm('')}
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
                onClick={() => fetchProjects(currentPage, filters)}
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
                  onClick={() => {
                    setSearchTerm('');
                    setFilters({});
                  }}
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
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {projectCards}
            </div>
            {Pagination}
          </>
        )}
      </main>
    </div>
  );
}

export default ProjectsPage;
