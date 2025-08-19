'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { RecentProjectsProps } from '@/types/project';
import { Plus, ChevronRight, ChevronDown, Loader2 } from 'lucide-react';
import ProjectCard from '../project-card';
import EmptyState from '../EmptyState';
import { BoundlessButton } from '../buttons';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/motion';
import { Button } from '../ui/button';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import Link from 'next/link';
import { getProjects } from '@/lib/api/project';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/use-auth';

type StatusFilter =
  | 'all'
  | 'idea'
  | 'under_review'
  | 'approved'
  | 'funding'
  | 'funded'
  | 'completed';
type TabFilter = 'mine' | 'others';

const RecentProjects = () => {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [tabFilter, setTabFilter] = useState<TabFilter>('mine');
  const [projects, setProjects] = useState<RecentProjectsProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth(false);

  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'idea', label: 'Ideas' },
    { value: 'under_review', label: 'Under Review' },
    { value: 'approved', label: 'Approved' },
    { value: 'funding', label: 'Funding' },
    { value: 'funded', label: 'Funded' },
    { value: 'completed', label: 'Completed' },
  ];

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getProjects();

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
          ownerUsername: project.owner?.type?.profile?.username || 'anonymous',
          ownerAvatar: project.owner?.type?.profile?.avatar || '',
        })
      );

      setProjects(transformedProjects);
    } catch {
      setError('Failed to fetch projects');
      toast.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

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
          <h2 className='text-white text-base sm:text-lg xl:text-xl font-semibold leading-[120%] tracking-[-0.4px]'>
            {tabFilter === 'mine' ? 'My Projects' : 'All Projects'}
          </h2>
          <Link href='/projects' className='text-sm text-white'>
            <Button
              variant='ghost'
              className='text-white hover:bg-[#374151] transition-colors duration-200 h-8 sm:h-9 px-2 sm:px-3'
            >
              View All
              <ChevronRight className='w-3 h-3 sm:w-4 sm:h-4 ml-1' />
            </Button>
          </Link>
        </div>
        <div className='flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full xl:w-auto'>
          <Tabs
            value={tabFilter}
            onValueChange={value => setTabFilter(value as TabFilter)}
            className='w-full sm:w-auto'
          >
            <TabsList className='bg-[#101010] border border-[#2B2B2B] p-1 gap-1 rounded-[12px] h-10 sm:h-11 text-sm w-full sm:w-auto'>
              <TabsTrigger
                value='mine'
                className='data-[state=active]:text-white text-[#B5B5B5] rounded-[8px] data-[state=active]:bg-[#2B2B2B] px-2 sm:px-3 xl:px-4 py-2 transition-all duration-200 flex-1 sm:flex-none text-xs sm:text-sm'
              >
                Mine
              </TabsTrigger>
              <TabsTrigger
                value='others'
                className='data-[state=active]:text-white text-[#B5B5B5] rounded-[8px] data-[state=active]:bg-[#2B2B2B] px-2 sm:px-3 xl:px-4 py-2 transition-all duration-200 flex-1 sm:flex-none text-xs sm:text-sm'
              >
                Others
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
        {loading ? (
          <motion.div className='col-span-full' variants={fadeInUp}>
            <div className='flex items-center justify-center py-12'>
              <div className='flex items-center gap-3'>
                <Loader2 className='w-6 h-6 animate-spin text-[#1671D9]' />
                <span className='text-[#B5B5B5]'>Loading projects...</span>
              </div>
            </div>
          </motion.div>
        ) : error ? (
          <motion.div className='col-span-full' variants={fadeInUp}>
            <div className='flex items-center justify-center py-12'>
              <div className='text-center'>
                <p className='text-red-400 mb-2'>{error}</p>
                <Button
                  onClick={fetchProjects}
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
            // Filter projects based on tab selection
            let filteredProjects = projects;

            // Filter based on user ownership
            if (!isAuthenticated) {
              // If not authenticated, show all projects in both tabs
            } else if (tabFilter === 'mine') {
              // Show only user's own projects
              filteredProjects = projects.filter(
                project =>
                  project.owner === user?.id ||
                  project.ownerUsername === user?.email ||
                  project.ownerName === user?.name
              );
            } else {
              // Show all projects except user's own
              filteredProjects = projects.filter(
                project =>
                  project.owner !== user?.id &&
                  project.ownerUsername !== user?.email &&
                  project.ownerName !== user?.name
              );
            }

            // Additional filtering based on status if needed
            if (statusFilter !== 'all') {
              filteredProjects = filteredProjects.filter(
                project => project.status === statusFilter
              );
            }

            // Limit to maximum 3 projects
            filteredProjects = filteredProjects.slice(0, 3);

            if (filteredProjects.length > 0) {
              return filteredProjects.map((project, index) => (
                <motion.div key={project.id} variants={fadeInUp} custom={index}>
                  <ProjectCard project={project} showEllipsisMenu={true} />
                </motion.div>
              ));
            } else {
              return (
                <motion.div className='col-span-full' variants={fadeInUp}>
                  <div className='w-full max-w-md mx-auto'>
                    <EmptyState
                      title={
                        tabFilter === 'mine'
                          ? 'No projects yet'
                          : 'No projects found'
                      }
                      description={
                        tabFilter === 'mine'
                          ? 'Start by sharing your first project idea with the Boundless community. Once submitted, your projects will appear here for easy tracking.'
                          : 'No projects match the current filters. Try adjusting your search criteria.'
                      }
                      type='default'
                      action={
                        tabFilter === 'mine' ? (
                          <BoundlessButton
                            variant='default'
                            size='lg'
                            icon={<Plus className='w-5 h-5' />}
                            iconPosition='right'
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
    </motion.div>
  );
};

export default RecentProjects;
