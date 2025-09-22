import React from 'react';
import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata('projects');

const ProjectsPage = () => {
  return (
    <div className='mt-10 text-center text-4xl font-bold text-white'>
      <h1 className='mb-10'>Projects</h1>
      <div className='flex flex-wrap justify-center gap-8'>
        {/* Project cards will be rendered here */}
      </div>
    </div>
  );
};

export default ProjectsPage;
