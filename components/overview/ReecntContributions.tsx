import React from 'react';
import { RecentProjectsProps } from '@/types/project';
import ProjectCard from '../project-card';
import EmptyState from '../EmptyState';
import { BoundlessButton } from '../buttons';

const RecentContributions = ({
  projects,
}: {
  projects: RecentProjectsProps[];
}) => {
  return (
    <div className='flex w-full flex-col gap-6 rounded-[12px] bg-[#1C1C1C] p-4 sm:gap-8 sm:p-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <h2 className='text-lg leading-[120%] font-medium tracking-[-0.4px] text-white sm:text-xl'>
          Recent Contributions
        </h2>
      </div>

      {/* Projects Grid */}
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3'>
        {projects.length > 0 ? (
          projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <div className='col-span-full'>
            <div className='mx-auto w-full max-w-md'>
              <EmptyState
                title='No contributions yet'
                description='Projects you vote on, comment on, or fund will appear here. Get involved and support ideas that matter to you.'
                type='default'
                action={
                  <BoundlessButton variant='secondary' size='lg'>
                    Explore Projects
                  </BoundlessButton>
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentContributions;
