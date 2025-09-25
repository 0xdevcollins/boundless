'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProjectSidebar } from './project-sidebar';
import { ProjectDetails } from './project-details';
import { ProjectAbout } from './project-about';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProjectLayoutProps {
  project: {
    id: string;
    name: string;
    description: string;
    logo: string;
    category: string;
    validation: string;
    date: string;
    votes: number;
    totalVotes: number;
    daysToDeadline: number;
    creator: {
      name: string;
      role: string;
      avatar: string;
    };
    links: Array<{
      type: string;
      url: string;
      icon: string;
    }>;
  };
}

/**
 * Desktop: Two columns with proper spacing - sidebar left (400px), tabs+content right
 * Mobile: Single column - project info, tabs (including About), content
 */
export function ProjectLayout({ project }: ProjectLayoutProps) {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('details'); // Start with about tab on mobile

  if (isMobile) {
    return (
      <div className='min-h-screen overflow-x-hidden bg-[#030303]'>
        <div className='w-full'>
          {/* Project info section  */}
          <div className='px-4 py-6'>
            <ProjectSidebar project={project} isMobile={true} />
          </div>

          {/* Mobile Tabs section  */}
          <div className='w-full border-b border-gray-800'>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className='w-full'
            >
              <TabsList className='h-auto w-full justify-start rounded-none bg-transparent p-0'>
                <div className='scrollbar-hide flex w-full overflow-x-auto px-4'>
                  <TabsTrigger
                    value='about'
                    className='rounded-none bg-transparent px-6 py-4 text-sm font-medium text-gray-400 transition-colors hover:text-gray-300 data-[state=active]:border-x-0 data-[state=active]:border-t-0 data-[state=active]:border-b-2 data-[state=active]:border-green-500 data-[state=active]:text-white'
                  >
                    About
                  </TabsTrigger>
                  <TabsTrigger
                    value='details'
                    className='rounded-none bg-transparent px-6 py-4 text-sm font-medium text-gray-400 transition-colors hover:text-gray-300 data-[state=active]:border-x-0 data-[state=active]:border-t-0 data-[state=active]:border-b-2 data-[state=active]:border-green-500 data-[state=active]:text-white'
                  >
                    Details
                  </TabsTrigger>
                  <TabsTrigger
                    value='team'
                    className='rounded-none bg-transparent px-6 py-4 text-sm font-medium text-gray-400 transition-colors hover:text-gray-300 data-[state=active]:border-x-0 data-[state=active]:border-t-0 data-[state=active]:border-b-2 data-[state=active]:border-green-500 data-[state=active]:text-white'
                  >
                    Team
                  </TabsTrigger>
                  <TabsTrigger
                    value='milestones'
                    className='rounded-none bg-transparent px-6 py-4 text-sm font-medium text-gray-400 transition-colors hover:text-gray-300 data-[state=active]:border-x-0 data-[state=active]:border-t-0 data-[state=active]:border-b-2 data-[state=active]:border-green-500 data-[state=active]:text-white'
                  >
                    Milestones
                  </TabsTrigger>
                  <TabsTrigger
                    value='voters'
                    className='rounded-none bg-transparent px-6 py-4 text-sm font-medium text-gray-400 transition-colors hover:text-gray-300 data-[state=active]:border-x-0 data-[state=active]:border-t-0 data-[state=active]:border-b-2 data-[state=active]:border-green-500 data-[state=active]:text-white'
                  >
                    Voters
                  </TabsTrigger>
                  <TabsTrigger
                    value='comments'
                    className='rounded-none bg-transparent px-6 py-4 text-sm font-medium text-gray-400 transition-colors hover:text-gray-300 data-[state=active]:border-x-0 data-[state=active]:border-t-0 data-[state=active]:border-b-2 data-[state=active]:border-green-500 data-[state=active]:text-white'
                  >
                    Comments
                  </TabsTrigger>
                </div>
              </TabsList>
            </Tabs>
          </div>

          {/* Content area */}
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
                <div className='text-white'>Team content coming soon...</div>
              </TabsContent>
              <TabsContent value='milestones' className='mt-0'>
                <div className='text-white'>
                  Milestones content coming soon...
                </div>
              </TabsContent>
              <TabsContent value='voters' className='mt-0'>
                <div className='text-white'>Voters content coming soon...</div>
              </TabsContent>
              <TabsContent value='comments' className='mt-0'>
                <div className='text-white'>
                  Comments content coming soon...
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }

  // Desktop layout
  return (
    <div className='min-h-screen bg-[#030303]'>
      <div className='mx-auto max-w-[1400px] px-6 py-8'>
        <div className='grid grid-cols-[400px_1fr] gap-12'>
          {/* Left Column - Project Sidebar with fixed width */}
          <div className='w-full'>
            <ProjectSidebar project={project} isMobile={false} />
          </div>

          {/* Right Column - Tabs and content with proper spacing */}
          <div className='min-h-0 w-full'>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className='w-full'
            >
              <TabsList className='mb-8 h-auto w-full justify-start rounded-none border-b border-gray-800 bg-transparent p-0'>
                <TabsTrigger
                  value='details'
                  className='rounded-none bg-transparent px-6 py-4 text-sm font-medium text-gray-400 transition-colors hover:text-gray-300 data-[state=active]:border-x-0 data-[state=active]:border-t-0 data-[state=active]:border-b-2 data-[state=active]:border-green-500 data-[state=active]:text-white'
                >
                  Details
                </TabsTrigger>
                <TabsTrigger
                  value='team'
                  className='rounded-none bg-transparent px-6 py-4 text-sm font-medium text-gray-400 transition-colors hover:text-gray-300 data-[state=active]:border-x-0 data-[state=active]:border-t-0 data-[state=active]:border-b-2 data-[state=active]:border-green-500 data-[state=active]:text-white'
                >
                  Team
                </TabsTrigger>
                <TabsTrigger
                  value='milestones'
                  className='rounded-none bg-transparent px-6 py-4 text-sm font-medium text-gray-400 transition-colors hover:text-gray-300 data-[state=active]:border-x-0 data-[state=active]:border-t-0 data-[state=active]:border-b-2 data-[state=active]:border-green-500 data-[state=active]:text-white'
                >
                  Milestones
                </TabsTrigger>
                <TabsTrigger
                  value='voters'
                  className='rounded-none bg-transparent px-6 py-4 text-sm font-medium text-gray-400 transition-colors hover:text-gray-300 data-[state=active]:border-x-0 data-[state=active]:border-t-0 data-[state=active]:border-b-2 data-[state=active]:border-green-500 data-[state=active]:text-white'
                >
                  Voters
                </TabsTrigger>
                <TabsTrigger
                  value='comments'
                  className='rounded-none bg-transparent px-6 py-4 text-sm font-medium text-gray-400 transition-colors hover:text-gray-300 data-[state=active]:border-x-0 data-[state=active]:border-t-0 data-[state=active]:border-b-2 data-[state=active]:border-green-500 data-[state=active]:text-white'
                >
                  Comments
                </TabsTrigger>
              </TabsList>

              {/* Content area */}
              <div>
                <TabsContent value='details' className='mt-0'>
                  <ProjectDetails project={project} />
                </TabsContent>
                <TabsContent value='team' className='mt-0'>
                  <div className='text-white'>Team content coming soon...</div>
                </TabsContent>
                <TabsContent value='milestones' className='mt-0'>
                  <div className='text-white'>
                    Milestones content coming soon...
                  </div>
                </TabsContent>
                <TabsContent value='voters' className='mt-0'>
                  <div className='text-white'>
                    Voters content coming soon...
                  </div>
                </TabsContent>
                <TabsContent value='comments' className='mt-0'>
                  <div className='text-white'>
                    Comments content coming soon...
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
