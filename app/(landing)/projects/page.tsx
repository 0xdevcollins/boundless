import React from 'react';
import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata('projects');

const ProjectsPage = () => {
  return (
    <div className='text-white text-4xl font-bold text-center mt-10'>
      <h1 className='mb-10'>Projects</h1>
      <div className='flex flex-wrap gap-8 justify-center'>
        {/* Project cards will be rendered here */}
      </div>
    </div>
  );
};

export default ProjectsPage;
