'use client';

import * as React from 'react';
import { getCrowdfundingProjects } from '@/lib/api/project';
import type { CrowdfundingProject } from '@/lib/api/types';

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

interface UseProjectsOptions {
  initialPage?: number;
  pageSize?: number;
  initialFilters?: ProjectFilters;
}

interface UseProjectsReturn {
  projects: CrowdfundingProject[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  hasMore: boolean;
  currentPage: number;
  filters: ProjectFilters;
  setFilters: React.Dispatch<React.SetStateAction<ProjectFilters>>;
  loadMore: () => void;
  refetch: () => void;
}

export function useProjects(
  options: UseProjectsOptions = {}
): UseProjectsReturn {
  const { initialPage = 1, pageSize = 9, initialFilters = {} } = options;

  const [projects, setProjects] = React.useState<CrowdfundingProject[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [currentPage, setCurrentPage] = React.useState(initialPage);
  const [hasMore, setHasMore] = React.useState(true);
  const [filters, setFilters] = React.useState<ProjectFilters>(initialFilters);

  // Get project deadline in milliseconds
  const getProjectDeadline = React.useCallback(
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
  const sortProjects = React.useCallback(
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

  const fetchProjects = React.useCallback(
    async (page: number, currentFilters: ProjectFilters, append = false) => {
      try {
        if (append) {
          setLoadingMore(true);
        } else {
          setLoading(true);
        }
        setError(null);

        const response = await getCrowdfundingProjects(page, pageSize, {
          category: currentFilters.category,
          status: currentFilters.status,
        });

        let fetchedProjects = response.data.projects;

        // Apply client-side search filtering
        if (currentFilters.search) {
          const searchLower = currentFilters.search.toLowerCase();
          fetchedProjects = fetchedProjects.filter(
            project =>
              project.title.toLowerCase().includes(searchLower) ||
              project.vision.toLowerCase().includes(searchLower) ||
              project.description.toLowerCase().includes(searchLower) ||
              project.category.toLowerCase().includes(searchLower) ||
              `${project.creator.profile.firstName} ${project.creator.profile.lastName}`
                .toLowerCase()
                .includes(searchLower)
          );
        }

        // Apply client-side sorting
        if (currentFilters.sort) {
          fetchedProjects = sortProjects(fetchedProjects, currentFilters.sort);
        }

        if (append) {
          setProjects(prev => [...prev, ...fetchedProjects]);
        } else {
          setProjects(fetchedProjects);
        }

        setHasMore(response.data.pagination.pages > page);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to fetch projects. Please try again.');
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [pageSize, sortProjects]
  );

  // Fetch projects when filters change
  React.useEffect(() => {
    setCurrentPage(1);
    setHasMore(true);
    fetchProjects(1, filters);
  }, [filters, fetchProjects]);

  const loadMore = React.useCallback(() => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchProjects(nextPage, filters, true);
  }, [currentPage, filters, fetchProjects]);

  const refetch = React.useCallback(() => {
    fetchProjects(currentPage, filters);
  }, [currentPage, filters, fetchProjects]);

  return {
    projects,
    loading,
    loadingMore,
    error,
    hasMore,
    currentPage,
    filters,
    setFilters,
    loadMore,
    refetch,
  };
}
