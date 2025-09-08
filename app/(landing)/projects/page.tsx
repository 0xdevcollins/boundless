import React from 'react';
import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata('projects');

const ProjectsPage = () => {
  return (
    <div className='text-white text-4xl font-bold text-center mt-10'>
      Projects Page
    </div>
  );
};

export default ProjectsPage;
