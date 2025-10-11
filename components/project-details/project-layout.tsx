'use client';

import { useEffect, useRef, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProjectSidebar } from './project-sidebar';
import { ProjectDetails } from './project-details';
import { ProjectAbout } from './project-about';
import { ProjectTeam } from './project-team';
import { useIsMobile } from '@/hooks/use-mobile';
import { CrowdfundingProject, CrowdfundData } from '@/lib/api/types';
import { ChevronLeftCircle, ChevronRightCircle } from 'lucide-react';
import { ProjectComments } from './comment-section/project-comments';
import ProjectMilestone from './project-milestone';
import ProjectVoters from './project-voters';
import ProjectBackers from './project-backers';
// import FundProject from '@/components/modals/fund-project';

interface ProjectLayoutProps {
  project: CrowdfundingProject & {
    // Additional fields that might be added during transformation
    daysToDeadline?: number;
    additionalCreator?: {
      name: string;
      role: string;
      avatar: string;
    };
    links?: Array<{
      type: string;
      url: string;
      icon: string;
    }>;
    // Legacy fields for backward compatibility
    name?: string;
    description?: string;
    logo?: string;
    validation?: string;
    date?: string;
    votes?: number;
    totalVotes?: number;
  };
  crowdfund?: CrowdfundData;
}

/**
 * Desktop: Two columns with proper spacing - sidebar left (400px), tabs+content right
 * Mobile: Single column - project info, tabs (including About), content
 */
export function ProjectLayout({ project, crowdfund }: ProjectLayoutProps) {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('details'); // Start with about tab on mobile
  const [isLeftScrollable, setIsLeftScrollable] = useState(true);
  const [isRightScrollable, setIsRightScrollable] = useState(true);
  const tabsListRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (tabsListRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsListRef.current;
      const canScrollLeft = scrollLeft > 0;
      const canScrollRight = scrollLeft < scrollWidth - clientWidth - 1;

      setIsLeftScrollable(canScrollLeft);
      setIsRightScrollable(canScrollRight);
    }
  };

  useEffect(() => {
    const tabsList = tabsListRef.current;
    if (tabsList) {
      const checkScroll = () => {
        handleScroll();
      };

      checkScroll();
      const timeoutId1 = setTimeout(checkScroll, 50);
      const timeoutId2 = setTimeout(checkScroll, 200);
      const timeoutId3 = setTimeout(checkScroll, 500);

      tabsList.addEventListener('scroll', handleScroll);

      const resizeObserver = new ResizeObserver(() => {
        handleScroll();
      });
      resizeObserver.observe(tabsList);

      const handleResize = () => {
        setTimeout(handleScroll, 100);
      };
      window.addEventListener('resize', handleResize);

      return () => {
        clearTimeout(timeoutId1);
        clearTimeout(timeoutId2);
        clearTimeout(timeoutId3);
        tabsList.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
        resizeObserver.disconnect();
      };
    }
  }, []);

  const scrollLeft = () => {
    if (tabsListRef.current) {
      tabsListRef.current.scrollBy({ left: -200, behavior: 'smooth' });
      setTimeout(handleScroll, 100);
    }
  };

  const scrollRight = () => {
    if (tabsListRef.current) {
      tabsListRef.current.scrollBy({ left: 200, behavior: 'smooth' });
      setTimeout(handleScroll, 100);
    }
  };

  if (isMobile) {
    return (
      <div className='min-h-screen overflow-x-hidden bg-[#030303]'>
        <div className='w-full'>
          <div className='px-4 py-6'>
            <ProjectSidebar
              project={project}
              crowdfund={crowdfund}
              isMobile={true}
            />
          </div>

          <div className='w-full border-b border-gray-800'>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className='w-full'
            >
              <TabsList className='relative h-auto w-full justify-start rounded-none bg-transparent p-0'>
                <div
                  className='scrollbar-hide flex w-full gap-4 overflow-x-auto px-4'
                  ref={tabsListRef}
                >
                  {isLeftScrollable && (
                    <ChevronLeftCircle
                      className='absolute top-1/2 left-0 z-10 -translate-y-1/2 cursor-pointer text-gray-400 transition-colors hover:text-white'
                      onClick={scrollLeft}
                      size={20}
                    />
                  )}

                  {isRightScrollable && (
                    <ChevronRightCircle
                      className='absolute top-1/2 right-0 z-10 -translate-y-1/2 cursor-pointer text-gray-400 transition-colors hover:text-white'
                      onClick={scrollRight}
                      size={20}
                    />
                  )}

                  <TabsTrigger
                    value='about'
                    className='data-[state=active]:border-primary rounded-none border-x-0 border-t-0 bg-transparent px-0 py-2 text-sm font-medium text-gray-400 transition-colors hover:text-gray-300 focus-visible:border-0 focus-visible:ring-0 focus-visible:outline-none data-[state=active]:border-x-0 data-[state=active]:border-t-0 data-[state=active]:border-b-2 data-[state=active]:text-white'
                  >
                    About
                  </TabsTrigger>
                  <TabsTrigger
                    value='details'
                    className='data-[state=active]:border-primary rounded-none border-x-0 border-t-0 bg-transparent px-0 py-2 text-sm font-medium text-gray-400 transition-colors hover:text-gray-300 focus-visible:border-0 focus-visible:ring-0 focus-visible:outline-none data-[state=active]:border-x-0 data-[state=active]:border-t-0 data-[state=active]:border-b-2 data-[state=active]:text-white'
                  >
                    Details
                  </TabsTrigger>
                  <TabsTrigger
                    value='team'
                    className='data-[state=active]:border-primary rounded-none border-x-0 border-t-0 bg-transparent px-0 py-2 text-sm font-medium text-gray-400 transition-colors hover:text-gray-300 focus-visible:border-0 focus-visible:ring-0 focus-visible:outline-none data-[state=active]:border-x-0 data-[state=active]:border-t-0 data-[state=active]:border-b-2 data-[state=active]:text-white'
                  >
                    Team
                  </TabsTrigger>
                  <TabsTrigger
                    value='milestones'
                    className='data-[state=active]:border-primary rounded-none border-x-0 border-t-0 bg-transparent px-0 py-2 text-sm font-medium text-gray-400 transition-colors hover:text-gray-300 focus-visible:border-0 focus-visible:ring-0 focus-visible:outline-none data-[state=active]:border-x-0 data-[state=active]:border-t-0 data-[state=active]:border-b-2 data-[state=active]:text-white'
                  >
                    Milestones
                  </TabsTrigger>
                  <TabsTrigger
                    value='voters'
                    className='data-[state=active]:border-primary rounded-none border-x-0 border-t-0 bg-transparent px-0 py-2 text-sm font-medium text-gray-400 transition-colors hover:text-gray-300 focus-visible:border-0 focus-visible:ring-0 focus-visible:outline-none data-[state=active]:border-x-0 data-[state=active]:border-t-0 data-[state=active]:border-b-2 data-[state=active]:text-white'
                  >
                    Voters
                  </TabsTrigger>
                  <TabsTrigger
                    value='comments'
                    className='data-[state=active]:border-primary rounded-none border-x-0 border-t-0 bg-transparent px-0 py-2 text-sm font-medium text-gray-400 transition-colors hover:text-gray-300 focus-visible:border-0 focus-visible:ring-0 focus-visible:outline-none data-[state=active]:border-x-0 data-[state=active]:border-t-0 data-[state=active]:border-b-2 data-[state=active]:text-white'
                  >
                    Comments
                  </TabsTrigger>
                </div>
              </TabsList>
            </Tabs>
          </div>

          <div className='px-4 py-6'>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className='w-full'
            >
              <TabsContent value='about' className='mt-0'>
                <ProjectAbout project={project} />
              </TabsContent>
              <TabsContent value='details' className='mt-0'>
                <ProjectDetails project={project} />
              </TabsContent>
              <TabsContent value='team' className='mt-0'>
                <ProjectTeam project={project} />
              </TabsContent>
              <TabsContent value='milestones' className='mt-0'>
                <ProjectMilestone />

                <div className='hidden space-y-6 text-white'>
                  <h2 className='text-2xl font-bold text-white'>Milestones</h2>
                  {project.milestones && project.milestones.length > 0 ? (
                    <div className='space-y-4'>
                      {project.milestones.map((milestone, index) => (
                        <div
                          key={index}
                          className='rounded-lg border border-gray-800 bg-[#1A1A1A] p-6'
                        >
                          <div className='flex items-start justify-between'>
                            <div className='flex-1'>
                              <h3 className='text-lg font-semibold text-white'>
                                {milestone.title}
                              </h3>
                              <p className='mt-2 text-gray-300'>
                                {milestone.description}
                              </p>
                              <div className='mt-4 flex flex-wrap gap-4 text-sm text-gray-400'>
                                <span>
                                  Start:{' '}
                                  {new Date(
                                    milestone.dueDate
                                  ).toLocaleDateString()}
                                </span>
                                <span>
                                  End:{' '}
                                  {new Date(
                                    milestone.dueDate
                                  ).toLocaleDateString()}
                                </span>
                                <span className='text-[#DBF936]'>
                                  ${milestone.amount.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className='text-gray-400'>No milestones available.</p>
                  )}
                </div>
              </TabsContent>
              <TabsContent value='voters' className='mt-0'>
                <div className='text-white'>
                  Voters content coming soon.rgngogogo5gmomo..
                </div>
              </TabsContent>
              <TabsContent value='comments' className='mt-0'>
                <ProjectComments projectId={project._id} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-[#030303]'>
      <div className=''>
        <div className='flex gap-12'>
          <div className='w-full max-w-[400px]'>
            <ProjectSidebar
              project={project}
              crowdfund={crowdfund}
              isMobile={false}
            />
          </div>

          <div className='min-h-0 w-full max-w-[calc(100%-400px)]'>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className='w-full'
            >
              <div className='border-b border-gray-800 py-0'>
                <TabsList className='mb-0 h-auto w-fit justify-start gap-6 rounded-none bg-transparent p-0'>
                  <TabsTrigger
                    value='details'
                    className='data-[state=active]:border-primary rounded-none border-x-0 border-t-0 bg-transparent px-0 py-2 text-sm font-medium text-gray-400 transition-colors hover:text-gray-300 focus-visible:border-0 focus-visible:ring-0 focus-visible:outline-none data-[state=active]:border-x-0 data-[state=active]:border-t-0 data-[state=active]:border-b-2 data-[state=active]:text-white'
                  >
                    Details
                  </TabsTrigger>
                  <TabsTrigger
                    value='team'
                    className='data-[state=active]:border-primary rounded-none border-x-0 border-t-0 bg-transparent px-0 py-2 text-sm font-medium text-gray-400 transition-colors hover:text-gray-300 focus-visible:border-0 focus-visible:ring-0 focus-visible:outline-none data-[state=active]:border-x-0 data-[state=active]:border-t-0 data-[state=active]:border-b-2 data-[state=active]:text-white'
                  >
                    Team
                  </TabsTrigger>
                  <TabsTrigger
                    value='milestones'
                    className='data-[state=active]:border-primary rounded-none border-x-0 border-t-0 bg-transparent px-0 py-2 text-sm font-medium text-gray-400 transition-colors hover:text-gray-300 focus-visible:border-0 focus-visible:ring-0 focus-visible:outline-none data-[state=active]:border-x-0 data-[state=active]:border-t-0 data-[state=active]:border-b-2 data-[state=active]:text-white'
                  >
                    Milestones
                  </TabsTrigger>
                  <TabsTrigger
                    value='voters'
                    className='data-[state=active]:border-primary rounded-none border-x-0 border-t-0 bg-transparent px-0 py-2 text-sm font-medium text-gray-400 transition-colors hover:text-gray-300 focus-visible:border-0 focus-visible:ring-0 focus-visible:outline-none data-[state=active]:border-x-0 data-[state=active]:border-t-0 data-[state=active]:border-b-2 data-[state=active]:text-white'
                  >
                    Voters
                  </TabsTrigger>
                  <TabsTrigger
                    value='backers'
                    className='data-[state=active]:border-primary rounded-none border-x-0 border-t-0 bg-transparent px-0 py-2 text-sm font-medium text-gray-400 transition-colors hover:text-gray-300 focus-visible:border-0 focus-visible:ring-0 focus-visible:outline-none data-[state=active]:border-x-0 data-[state=active]:border-t-0 data-[state=active]:border-b-2 data-[state=active]:text-white'
                  >
                    Backers
                  </TabsTrigger>
                  <TabsTrigger
                    value='comments'
                    className='data-[state=active]:border-primary rounded-none border-x-0 border-t-0 bg-transparent px-0 py-2 text-sm font-medium text-gray-400 transition-colors hover:text-gray-300 focus-visible:border-0 focus-visible:ring-0 focus-visible:outline-none data-[state=active]:border-x-0 data-[state=active]:border-t-0 data-[state=active]:border-b-2 data-[state=active]:text-white'
                  >
                    Comments
                  </TabsTrigger>
                </TabsList>
              </div>

              <div>
                <TabsContent value='details' className='mt-0'>
                  <ProjectDetails project={project} />
                </TabsContent>
                <TabsContent value='team' className='mt-0'>
                  <ProjectTeam project={project} />
                </TabsContent>
                <TabsContent value='milestones' className='mt-0'>
                  <ProjectMilestone projectId={project._id} />
                </TabsContent>
                <TabsContent value='voters' className='mt-0'>
                  <ProjectVoters />
                </TabsContent>
                <TabsContent value='backers' className='mt-0'>
                  <ProjectBackers />
                </TabsContent>
                <TabsContent value='comments' className='mt-0'>
                  <ProjectComments projectId={project._id} />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
      {/* <FundProject open={false} setOpen={() => {}} /> */}
    </div>
  );
}
