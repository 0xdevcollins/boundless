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

        const transformedProjects = (response.projects || []).map(
          (project: any) => ({
            id: project._id,
            name: project.title,
            description: project.description,
            image: project.whitepaperUrl || '/banner.png',
            link: `/projects/${project._id}`,
            tags: project.tags || [],
            category: project.category,
            type: project.type,
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
        className='bg-[#1C1C1C] p-4 sm:p-6 rounded-[12px] flex flex-col gap-6 sm:gap-8 w-full'
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
      className='bg-[#1C1C1C] p-4 sm:p-6 rounded-[12px] flex flex-col gap-6 sm:gap-8 w-full'
      initial='hidden'
      animate='visible'
      variants={fadeInUp}
    >
      <motion.div
        className='flex flex-col xl:flex-row justify-between items-start xl:items-center gap-3 sm:gap-4 xl:gap-0'
        variants={fadeInUp}
      >
        <div className='flex items-center gap-2 sm:gap-3 xl:gap-5'>
          <Tabs
            value={tabFilter}
            onValueChange={value => setTabFilter(value as TabFilter)}
            className='w-full sm:w-auto'
          >
            <TabsList className='bg-transparent rounded-none border-b p-0 border-[#484848] gap-2'>
              <TabsTrigger
                value='mine'
                className=' border-0 rounded-none border-primary data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-white text-[#B5B5B5] data-[state=active]:bg-transparent px-0  py-0 transition-all duration-200 flex-1 sm:flex-none text-xs sm:text-sm'
              >
                My Projects
              </TabsTrigger>
              <TabsTrigger
                value='others'
                className='border-0 rounded-none border-primary data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-white text-[#B5B5B5] data-[state=active]:bg-transparent px-0  py-0 transition-all duration-200 flex-1 sm:flex-none text-xs sm:text-sm'
              >
                Explore ({totalItems})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className='flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full xl:w-auto'>
          <Tabs
            value={statusFilter}
            onValueChange={value => setStatusFilter(value as StatusFilter)}
            className='w-full sm:w-auto'
          >
            <TabsList className='bg-[#101010] border border-[#2B2B2B] p-1 gap-1 rounded-[12px] h-10 sm:h-11 text-sm w-full sm:w-auto'>
              <TabsTrigger
                value='all'
                className='data-[state=active]:text-white text-[#B5B5B5] rounded-[8px] data-[state=active]:bg-[#2B2B2B] px-2 sm:px-3 xl:px-4 py-2 transition-all duration-200 flex-1 sm:flex-none text-xs sm:text-sm'
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value='funding'
                className='data-[state=active]:text-white text-[#B5B5B5] rounded-[8px] data-[state=active]:bg-[#2B2B2B] px-2 sm:px-3 xl:px-4 py-2 transition-all duration-200 flex-1 sm:flex-none text-xs sm:text-sm'
              >
                Funding
              </TabsTrigger>
              <TabsTrigger
                value='funded'
                className='data-[state=active]:text-white text-[#B5B5B5] rounded-[8px] data-[state=active]:bg-[#2B2B2B] px-2 sm:px-3 xl:px-4 py-2 transition-all duration-200 flex-1 sm:flex-none text-xs sm:text-sm'
              >
                Funded
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <BoundlessButton
                variant='outline'
                className='border-[#2B2B2B] hover:border-[#374151] transition-colors duration-200 w-full sm:w-auto h-10 sm:h-9 px-3 sm:px-4 text-xs sm:text-sm'
              >
                {
                  filterOptions.find(option => option.value === statusFilter)
                    ?.label
                }{' '}
                <ChevronDown className='w-3 h-3 sm:w-4 sm:h-4' />
              </BoundlessButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align='end'
              className='w-[200px] sm:w-[250px] gap-1 bg-[#101010] border-none rounded-[16px] p-2 shadow-[0_1px_4px_0_rgba(72,72,72,0.14),_0_0_4px_1px_#484848]'
            >
              {filterOptions.map(option => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setStatusFilter(option.value as StatusFilter)}
                  className='text-white font-medium hover:!text-white text-sm py-2 px-3 rounded-md hover:!bg-[#2B2B2B] hover:shadow-[0_1px_4px_0_rgba(40,45,40,0.04),_0_0_24px_1px_rgba(10,15,10,0.14)] transition-colors duration-200 cursor-pointer'
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
          className='w-full mb-4 p-3 bg-yellow-900/20 border border-yellow-600/30 rounded-lg'
          variants={fadeInUp}
        >
          <p className='text-yellow-400 text-sm'>
            🔐 You're not signed in. Sign in to see your projects in the "Mine"
            tab.
          </p>
        </motion.div>
      )}

      {/* Projects Grid */}
      <motion.div
        className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols- xl:grid-cols-3 gap-4 sm:gap-6'
        variants={staggerContainer}
      >
        {error ? (
          <motion.div className='col-span-full' variants={fadeInUp}>
            <div className='flex items-center justify-center py-12'>
              <div className='text-center'>
                <p className='text-red-400 mb-2'>{error}</p>
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
                  project.ownerName !== user?.name
              );
            }

            // Handle empty state for "mine" tab when not authenticated
            if (tabFilter === 'mine' && !isAuthenticated) {
              return (
                <motion.div className='col-span-full' variants={fadeInUp}>
                  <div className='w-full max-w-md mx-auto'>
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
                    currentUserName={user?.name}
                  />
                </motion.div>
              ));
            } else {
              return (
                <motion.div className='col-span-full' variants={fadeInUp}>
                  <div className='w-full max-w-md mx-auto'>
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
                            icon={<Plus className='w-5 h-5' />}
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
          className='flex justify-end w-full mt-8'
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
