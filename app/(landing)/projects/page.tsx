import React from 'react';
import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import ProjectPageHero from '@/components/Project-Page-Hero';

export const metadata: Metadata = generatePageMetadata('projects');

const ProjectsPage = () => {
  return (
    <div className=''>
      <ProjectPageHero />
      <h1 className='mb-10'>Projects</h1>
      <div className='flex flex-wrap justify-center gap-8'></div>
    </div>
  );
};

export default ProjectsPage;
