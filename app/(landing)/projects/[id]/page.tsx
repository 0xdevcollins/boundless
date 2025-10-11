import { ProjectLayout } from '@/components/project-details/project-layout';
import { ProjectLoading } from '@/components/project-details/project-loading';
import { notFound } from 'next/navigation';
import { getCrowdfundingProject } from '@/lib/api/project';
import type { CrowdfundingProject, CrowdfundData } from '@/lib/api/types';
import { Suspense } from 'react';

interface ProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

function transformCrowdfundingProject(
  project: CrowdfundingProject,
  crowdfund: CrowdfundData
) {
  const creatorName = project.creator?.profile
    ? `${project.creator.profile.firstName} ${project.creator.profile.lastName}`
    : 'Unknown Creator';

  const deadlineDate = crowdfund.voteDeadline || project.funding?.endDate;
  const daysToDeadline = deadlineDate
    ? Math.max(
        0,
        Math.ceil(
          (new Date(deadlineDate).getTime() - new Date().getTime()) /
            (1000 * 60 * 60 * 24)
        )
      )
    : 0;

  return {
    project: {
      ...project,
      daysToDeadline,
      additionalCreator: {
        name: creatorName,
        role: 'OWNER',
        avatar: '/user.png',
      },
      links: [
        ...(project.githubUrl
          ? [{ type: 'github', url: project.githubUrl, icon: 'github' }]
          : []),
        ...(project.projectWebsite
          ? [{ type: 'website', url: project.projectWebsite, icon: 'globe' }]
          : []),
        ...(project.demoVideo
          ? [{ type: 'youtube', url: project.demoVideo, icon: 'youtube' }]
          : []),
        ...(project.socialLinks?.map(link => ({
          type: link.platform,
          url: link.url,
          icon: link.platform.toLowerCase(),
        })) || []),
      ],
      votes: crowdfund.totalVotes || 0,
    },
    crowdfund,
  };
}

async function ProjectContent({ id }: { id: string }) {
  let projectData;
  let error: string | null = null;

  try {
    const response = await getCrowdfundingProject(id);

    if (response.success && response.data) {
      projectData = transformCrowdfundingProject(
        response.data.project,
        response.data.crowdfund
      );
      console.log(projectData);
    } else {
      throw new Error(response.message || 'Failed to fetch project');
    }
  } catch (err) {
    console.error('Error fetching project:', err);
    error = 'Failed to fetch project data';
  }

  if (error || !projectData) {
    notFound();
  }

  return (
    <div className='mx-auto flex min-h-screen max-w-[1440px] flex-col space-y-[60px] bg-[#030303] px-5 py-5 md:space-y-[80px] md:px-[50px] lg:px-[100px]'>
      <div className='flex-1'>
        <ProjectLayout
          project={projectData.project}
          crowdfund={projectData.crowdfund}
        />
      </div>
    </div>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;

  return (
    <Suspense fallback={<ProjectLoading />}>
      <ProjectContent id={id} />
    </Suspense>
  );
}
