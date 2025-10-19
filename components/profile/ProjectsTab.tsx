'use client';

import { useState, useEffect, useCallback } from 'react';
import ProjectCard from '../ProjectCard';
import { Project } from '@/types/project';
import { mockProjects } from './mockData';

export default function ProjectsTab() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const itemsPerPage = 6;

  // Simulate API call
  const loadProjects = useCallback(async (pageNum: number) => {
    setLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const startIndex = (pageNum - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const newProjects = mockProjects.slice(startIndex, endIndex);

    if (pageNum === 1) {
      setProjects(newProjects);
    } else {
      setProjects(prev => [...prev, ...newProjects]);
    }

    setHasMore(endIndex < mockProjects.length);
    setLoading(false);
  }, []);

  // Load initial projects
  useEffect(() => {
    loadProjects(1);
  }, [loadProjects]);

  // Infinite scroll handler
  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;

      if (
        scrollHeight - scrollTop <= clientHeight + 100 &&
        !loading &&
        hasMore
      ) {
        const nextPage = page + 1;
        setPage(nextPage);
        loadProjects(nextPage);
      }
    },
    [loading, hasMore, page, loadProjects]
  );

  if (projects.length === 0 && !loading) {
    return (
      <div className='py-8 text-center'>
        <h3 className='mb-2 text-lg font-medium text-gray-300'>
          Your Projects
        </h3>
        <p className='text-sm text-gray-500'>No projects found</p>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-medium text-gray-300'>Your Projects</h3>
        <span className='text-sm text-gray-500'>
          {projects.length} projects
        </span>
      </div>

      <div
        className='grid max-h-[600px] gap-4 overflow-y-auto md:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2'
        onScroll={handleScroll}
      >
        {projects.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            creatorName={project.ownerName}
            creatorAvatar={project.ownerAvatar}
            isFullWidth={true}
          />
        ))}

        {loading && (
          <div className='col-span-full flex justify-center py-8'>
            <div className='flex items-center space-x-2'>
              <div className='border-primary h-6 w-6 animate-spin rounded-full border-b-2'></div>
              <span className='text-sm text-gray-400'>
                Loading more projects...
              </span>
            </div>
          </div>
        )}

        {!hasMore && projects.length > 0 && (
          <div className='col-span-full py-4 text-center'>
            <p className='text-sm text-gray-500'>No more projects to load</p>
          </div>
        )}
      </div>
    </div>
  );
}
