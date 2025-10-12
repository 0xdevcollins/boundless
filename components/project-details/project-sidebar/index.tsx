'use client';

import { useState } from 'react';
import { ProjectSidebarHeader } from './ProjectSidebarHeader';
import { ProjectSidebarProgress } from './ProjectSidebarProgress';
import { ProjectSidebarActions } from './ProjectSidebarActions';
import { ProjectSidebarCreator } from './ProjectSidebarCreator';
import { ProjectSidebarLinks } from './ProjectSidebarLinks';
import { voteProject } from '@/lib/api/project';
import { getProjectStatus } from './utils';
import { ProjectSidebarProps } from './types';

export function ProjectSidebar({
  project,
  crowdfund,
  isMobile = false,
}: ProjectSidebarProps) {
  const [isVoting, setIsVoting] = useState(false);
  const [userVote, setUserVote] = useState<1 | -1 | null>(null);

  const projectStatus = getProjectStatus(project, crowdfund);

  const handleVote = async (value: 1 | -1) => {
    if (isVoting) return;

    setIsVoting(true);
    try {
      await voteProject(project._id, value);
      setUserVote(value);
    } catch {
      // Handle error silently or show user-friendly message
      // You can add toast notifications here if needed
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div className='w-full space-y-6'>
      <ProjectSidebarHeader project={project} projectStatus={projectStatus} />

      <p className='text-sm leading-relaxed text-white'>{project.vision}</p>

      <ProjectSidebarProgress
        project={project}
        crowdfund={crowdfund}
        projectStatus={projectStatus}
      />

      <ProjectSidebarActions
        project={project}
        crowdfund={crowdfund}
        projectStatus={projectStatus}
        isVoting={isVoting}
        userVote={userVote}
        onVote={handleVote}
      />

      {!isMobile && (
        <>
          <ProjectSidebarCreator project={project} />
          <ProjectSidebarLinks project={project} />
        </>
      )}
    </div>
  );
}
