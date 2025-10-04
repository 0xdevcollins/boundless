'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { RecentProjectsProps, Project } from '@/types/project';
import { Plus, ChevronDown } from 'lucide-react';
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
import { getProjects } from '@/lib/api/project';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/use-auth';
import { RecentProjectsSkeleton } from '../skeleton/UserPageSkeleton';
import Link from 'next/link';

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

      // Define API project interface locally since it's different from our UI Project type
      interface ApiProject {
        _id: string;
        title: string;
        description: string;
        whitepaperUrl?: string;
        tags?: string[];
        category?: string;
        type?: string;
        amount?: number;
        status?: string;
        createdAt?: string;
        updatedAt?: string;
        owner?: {
          type?: {
            _id?: string;
            profile?: {
              firstName?: string;
              lastName?: string;
              username?: string;
              avatar?: string;
            };
          };
        };
      }

      const apiProjects = (response.projects as unknown as ApiProject[]) || [];
      const transformedProjects = apiProjects.map(
        (project: ApiProject): Project => ({
          id: project._id,
          name: project.title,
          description: project.description,
          image: project.whitepaperUrl || '/banner.png',
          link: `/projects/${project._id}`,
          tags: project.tags || [],
          category: project.category || 'uncategorized',
          type: project.type || 'unknown',
          amount: project.amount || 0,
          status: project.status || 'draft',
          createdAt: project.createdAt || new Date().toISOString(),
          updatedAt: project.updatedAt || new Date().toISOString(),
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

  if (loading) {
    return (
      <motion.div
        className='flex w-full flex-col gap-6 rounded-[12px] bg-[#1C1C1C] p-4 sm:gap-8 sm:p-6'
        initial='hidden'
        animate='visible'
        variants={fadeInUp}
      >
        <RecentProjectsSkeleton />
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
                Explore ({projects.length})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className='flex w-full flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3 xl:w-auto'>
          {/* <Tabs
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
          </Tabs> */}
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
            if (tabFilter === 'mine') {
              if (isAuthenticated && user) {
                // Show only user's own projects when authenticated
                filteredProjects = projects.filter(
                  project =>
                    project.owner === user?.id ||
                    project.ownerUsername === user?.email ||
                    project.ownerName ===
                      (user?.profile?.firstName && user?.profile?.lastName
                        ? `${user.profile.firstName} ${user.profile.lastName}`
                        : user?.profile?.firstName || user?.profile?.lastName)
                );
              } else {
                // If not authenticated, show empty for "mine" tab
                filteredProjects = [];
              }
            } else {
              // Show all projects except user's own in "explore" tab
              if (isAuthenticated && user) {
                filteredProjects = projects.filter(
                  project =>
                    project.owner !== user?.id &&
                    project.ownerUsername !== user?.email &&
                    project.ownerName !==
                      (user?.profile?.firstName && user?.profile?.lastName
                        ? `${user.profile.firstName} ${user.profile.lastName}`
                        : user?.profile?.firstName || user?.profile?.lastName)
                );
              } else {
                // If not authenticated, show all projects in explore tab
                filteredProjects = projects;
              }
            }

            // Additional filtering based on status
            if (statusFilter !== 'all') {
              filteredProjects = filteredProjects.filter(
                project => project.status === statusFilter
              );
            }

            // Limit to maximum 3 projects
            filteredProjects = filteredProjects.slice(0, 3);

            if (filteredProjects.length > 0) {
              return (
                <>
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      variants={fadeInUp}
                      custom={index}
                    >
                      <ProjectCard
                        project={project}
                        showEllipsisMenu={true}
                        currentUserId={user?.id}
                        currentUserEmail={user?.email}
                        currentUserName={
                          user?.profile?.firstName && user?.profile?.lastName
                            ? `${user.profile.firstName} ${user.profile.lastName}`
                            : user?.profile?.firstName ||
                              user?.profile?.lastName
                        }
                      />
                    </motion.div>
                  ))}
                  {/* Show "View All" button when there are projects */}
                  <div className='col-span-full flex items-center justify-center'>
                    <Link href='/projects'>
                      <BoundlessButton variant='outline' className=''>
                        View All
                      </BoundlessButton>
                    </Link>
                  </div>
                </>
              );
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
