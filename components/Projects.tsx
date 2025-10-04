'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { RecentProjectsProps } from '@/types/project';
import { Plus, ChevronDown } from 'lucide-react';
import ProjectCard from './project-card';
import EmptyState from './EmptyState';
import { BoundlessButton } from './buttons';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/motion';
import { Button } from './ui/button';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import Pagination from './ui/pagination';

import { getProjects } from '@/lib/api/project';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/use-auth';
import { useProjectSheetStore } from '@/lib/stores/project-sheet-store';
import { ProjectsSkeleton } from './skeleton/ProjectsSkeleton';

// Strongly typed shape for the project objects returned by the API
type ProjectApi = {
  _id: string;
  title: string;
  description: string;
  whitepaperUrl?: string;
  tags?: string[];
  category?: string;
  type?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  owner?: {
    type?: {
      _id?: string;
      profile?: {
        firstName?: string;
        lastName?: string;
        username?: string;
        avatar?: string;
      } | null;
    } | null;
  } | null;
};

type StatusFilter =
  | 'all'
  | 'idea'
  | 'under_review'
  | 'approved'
  | 'funding'
  | 'funded'
  | 'completed';
type TabFilter = 'mine' | 'others';

const Projects = () => {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [tabFilter, setTabFilter] = useState<TabFilter>('mine');
  const [projects, setProjects] = useState<RecentProjectsProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const { user, isAuthenticated } = useAuth(false);
  const sheet = useProjectSheetStore();

  const ITEMS_PER_PAGE = 9;

  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'idea', label: 'Ideas' },
    { value: 'under_review', label: 'Under Review' },
    { value: 'approved', label: 'Approved' },
    { value: 'funding', label: 'Funding' },
    { value: 'funded', label: 'Funded' },
    { value: 'completed', label: 'Completed' },
  ];

  const fetchProjects = useCallback(
    async (pageNum = 1) => {
      try {
        setLoading(true);
        setError(null);

        // Build filters based on current state
        const filters: { status?: string; owner?: string } = {};

        if (statusFilter !== 'all') {
          filters.status = statusFilter;
        }

        // Add owner filter for "mine" tab
        if (tabFilter === 'mine' && isAuthenticated && user) {
          filters.owner = user.id;
        }

        const response = await getProjects(pageNum, ITEMS_PER_PAGE, filters);

        const apiProjects = (response.projects ??
          []) as unknown as ProjectApi[];
        const transformedProjects: RecentProjectsProps[] = apiProjects.map(
          project => ({
            id: project._id,
            name: project.title,
            description: project.description,
            image: project.whitepaperUrl || '/banner.png',
            link: `/projects/${project._id}`,
            tags: project.tags || [],
            category: project.category ?? 'unknown',
            type: project.type ?? 'unknown',
            amount: 0,
            status: project.status,
            createdAt: project.createdAt,
            updatedAt: project.updatedAt,
            // Add owner information for filtering
            owner: project.owner?.type?._id || null,
            ownerName: project.owner?.type?.profile
              ? `${project.owner.type.profile.firstName} ${project.owner.type.profile.lastName}`
              : 'Anonymous',
            ownerUsername:
              project.owner?.type?.profile?.username || 'anonymous',
            ownerAvatar: project.owner?.type?.profile?.avatar || '',
          })
        );

        setProjects(transformedProjects);

        // Update pagination state
        if (response.pagination) {
          setTotalPages(response.pagination.totalPages || 1);
          setTotalItems(response.pagination.totalItems || 0);
        }
      } catch {
        setError('Failed to fetch projects');
        toast.error('Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    },
    [isAuthenticated, statusFilter, tabFilter, user]
  );

  useEffect(() => {
    setCurrentPage(1);
    fetchProjects(1);
  }, [statusFilter, tabFilter, isAuthenticated, user?.id, fetchProjects]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchProjects(page);
  };

  if (loading) {
    return (
      <motion.div
        className='flex w-full flex-col gap-6 rounded-[12px] bg-[#1C1C1C] p-4 sm:gap-8 sm:p-6'
        initial='hidden'
        animate='visible'
        variants={fadeInUp}
      >
        <ProjectsSkeleton />
      </motion.div>
    );
  }

  return (
    <motion.div
      className='flex w-full flex-col gap-6 rounded-[12px] bg-[#1C1C1C] p-4 sm:gap-8 sm:p-6'
      initial='hidden'
      animate='visible'
      variants={fadeInUp}
    >
      <motion.div
        className='flex flex-col items-start justify-between gap-3 sm:gap-4 xl:flex-row xl:items-center xl:gap-0'
        variants={fadeInUp}
      >
        <div className='flex items-center gap-2 sm:gap-3 xl:gap-5'>
          <Tabs
            value={tabFilter}
            onValueChange={value => setTabFilter(value as TabFilter)}
            className='w-full sm:w-auto'
          >
            <TabsList className='gap-2 rounded-none border-b border-[#484848] bg-transparent p-0'>
              <TabsTrigger
                value='mine'
                className='border-primary data-[state=active]:border-primary flex-1 rounded-none border-0 px-0 py-0 text-xs text-[#B5B5B5] transition-all duration-200 data-[state=active]:border-b-2 data-[state=active]:bg-transparent data-[state=active]:text-white sm:flex-none sm:text-sm'
              >
                My Projects
              </TabsTrigger>
              <TabsTrigger
                value='others'
                className='border-primary data-[state=active]:border-primary flex-1 rounded-none border-0 px-0 py-0 text-xs text-[#B5B5B5] transition-all duration-200 data-[state=active]:border-b-2 data-[state=active]:bg-transparent data-[state=active]:text-white sm:flex-none sm:text-sm'
              >
                Explore ({totalItems})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className='flex w-full flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3 xl:w-auto'>
          <Tabs
            value={statusFilter}
            onValueChange={value => setStatusFilter(value as StatusFilter)}
            className='w-full sm:w-auto'
          >
            <TabsList className='h-10 w-full gap-1 rounded-[12px] border border-[#2B2B2B] bg-[#101010] p-1 text-sm sm:h-11 sm:w-auto'>
              <TabsTrigger
                value='all'
                className='flex-1 rounded-[8px] px-2 py-2 text-xs text-[#B5B5B5] transition-all duration-200 data-[state=active]:bg-[#2B2B2B] data-[state=active]:text-white sm:flex-none sm:px-3 sm:text-sm xl:px-4'
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value='funding'
                className='flex-1 rounded-[8px] px-2 py-2 text-xs text-[#B5B5B5] transition-all duration-200 data-[state=active]:bg-[#2B2B2B] data-[state=active]:text-white sm:flex-none sm:px-3 sm:text-sm xl:px-4'
              >
                Funding
              </TabsTrigger>
              <TabsTrigger
                value='funded'
                className='flex-1 rounded-[8px] px-2 py-2 text-xs text-[#B5B5B5] transition-all duration-200 data-[state=active]:bg-[#2B2B2B] data-[state=active]:text-white sm:flex-none sm:px-3 sm:text-sm xl:px-4'
              >
                Funded
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <BoundlessButton
                variant='outline'
                className='h-10 w-full border-[#2B2B2B] px-3 text-xs transition-colors duration-200 hover:border-[#374151] sm:h-9 sm:w-auto sm:px-4 sm:text-sm'
              >
                {
                  filterOptions.find(option => option.value === statusFilter)
                    ?.label
                }{' '}
                <ChevronDown className='h-3 w-3 sm:h-4 sm:w-4' />
              </BoundlessButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align='end'
              className='w-[200px] gap-1 rounded-[16px] border-none bg-[#101010] p-2 shadow-[0_1px_4px_0_rgba(72,72,72,0.14),_0_0_4px_1px_#484848] sm:w-[250px]'
            >
              {filterOptions.map(option => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setStatusFilter(option.value as StatusFilter)}
                  className='cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:!bg-[#2B2B2B] hover:!text-white hover:shadow-[0_1px_4px_0_rgba(40,45,40,0.04),_0_0_24px_1px_rgba(10,15,10,0.14)]'
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.div>

      {/* Authentication Notice */}
      {!isAuthenticated && (
        <motion.div
          className='mb-4 w-full rounded-lg border border-yellow-600/30 bg-yellow-900/20 p-3'
          variants={fadeInUp}
        >
          <p className='text-sm text-yellow-400'>
            🔐 You're not signed in. Sign in to see your projects in the "Mine"
            tab.
          </p>
        </motion.div>
      )}

      {/* Projects Grid */}
      <motion.div
        className='lg:grid-cols- grid grid-cols-1 gap-4 sm:grid-cols-1 sm:gap-6 md:grid-cols-2 xl:grid-cols-3'
        variants={staggerContainer}
      >
        {error ? (
          <motion.div className='col-span-full' variants={fadeInUp}>
            <div className='flex items-center justify-center py-12'>
              <div className='text-center'>
                <p className='mb-2 text-red-400'>{error}</p>
                <Button
                  onClick={() => fetchProjects(1)}
                  variant='outline'
                  className='border-[#2B2B2B] hover:border-[#374151]'
                >
                  Try Again
                </Button>
              </div>
            </div>
          </motion.div>
        ) : (
          (() => {
            // Since filtering is now handled at the API level, we just use the projects as-is
            let filteredProjects = projects;

            // For the "explore" tab, we need to filter out user's own projects client-side
            // since the API doesn't support "not owner" filtering
            if (tabFilter === 'others' && isAuthenticated && user) {
              filteredProjects = projects.filter(
                project =>
                  project.owner !== user?.id &&
                  project.ownerUsername !== user?.email &&
                  project.ownerName !==
                    (user?.profile?.firstName && user?.profile?.lastName
                      ? `${user.profile.firstName} ${user.profile.lastName}`
                      : user?.profile?.firstName || user?.profile?.lastName)
              );
            }

            // Handle empty state for "mine" tab when not authenticated
            if (tabFilter === 'mine' && !isAuthenticated) {
              return (
                <motion.div className='col-span-full' variants={fadeInUp}>
                  <div className='mx-auto w-full max-w-md'>
                    <EmptyState
                      title='Sign in to see your projects'
                      description='Sign in to view and manage your projects.'
                      type='default'
                    />
                  </div>
                </motion.div>
              );
            }

            if (filteredProjects.length > 0) {
              return filteredProjects.map((project, index) => (
                <motion.div key={project.id} variants={fadeInUp} custom={index}>
                  <ProjectCard
                    project={project}
                    showEllipsisMenu={true}
                    currentUserId={user?.id}
                    currentUserEmail={user?.email}
                    currentUserName={
                      user?.profile?.firstName && user?.profile?.lastName
                        ? `${user.profile.firstName} ${user.profile.lastName}`
                        : user?.profile?.firstName || user?.profile?.lastName
                    }
                  />
                </motion.div>
              ));
            } else {
              return (
                <motion.div className='col-span-full' variants={fadeInUp}>
                  <div className='mx-auto w-full max-w-md'>
                    <EmptyState
                      title={
                        tabFilter === 'mine'
                          ? isAuthenticated
                            ? 'No projects yet'
                            : 'Sign in to see your projects'
                          : 'No projects found'
                      }
                      description={
                        tabFilter === 'mine'
                          ? isAuthenticated
                            ? 'Start by sharing your first project idea with the Boundless community. Once submitted, your projects will appear here for easy tracking.'
                            : 'Sign in to view and manage your projects.'
                          : 'No projects match the current filters. Try adjusting your search criteria.'
                      }
                      type='default'
                      action={
                        tabFilter === 'mine' && isAuthenticated ? (
                          <BoundlessButton
                            variant='default'
                            size='lg'
                            icon={<Plus className='h-5 w-5' />}
                            iconPosition='right'
                            onClick={() => {
                              sheet.openInitialize();
                            }}
                          >
                            New Project
                          </BoundlessButton>
                        ) : undefined
                      }
                    />
                  </div>
                </motion.div>
              );
            }
          })()
        )}
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          className='mt-8 flex w-full justify-end'
          variants={fadeInUp}
        >
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default Projects;
