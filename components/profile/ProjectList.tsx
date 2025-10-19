'use client';

import { Project } from '@/types/project';
import ProjectCard from '../ProjectCard';

interface ProjectListProps {
  projects: Project[];
  activeTab: string;
}

export function ProjectList({ projects, activeTab }: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <div className='py-8 text-center text-gray-400'>
        No {activeTab.toLowerCase()} found matching your filters
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} isFullWidth={true} />
      ))}
    </div>
  );
}
