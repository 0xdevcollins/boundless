import { ProjectLayout } from '@/components/project-details/project-layout';
import { ProjectLoading } from '@/components/project-details/project-loading';
import { notFound } from 'next/navigation';
import { getCrowdfundingProject, getProjectDetails } from '@/lib/api/project';
import { CrowdfundingProject, CrowdfundData } from '@/lib/api/types';
import { Suspense } from 'react';
interface ProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Transform crowdfunding project data to match ProjectLayout interface
function transformCrowdfundingProject(
  project: CrowdfundingProject,
  crowdfund: CrowdfundData
) {
  const creatorName = project.creator?.profile
    ? `${project.creator.profile.firstName} ${project.creator.profile.lastName}`
    : 'Unknown Creator';

  const daysToDeadline = project.funding?.endDate
    ? Math.max(
        0,
        Math.ceil(
          (new Date(project.funding.endDate).getTime() - new Date().getTime()) /
            (1000 * 60 * 60 * 24)
        )
      )
    : 0;

  return {
    project: {
      ...project,
      daysToDeadline: Math.max(0, daysToDeadline),
      // Add additional fields without overriding the original creator
      additionalCreator: {
        name: creatorName,
        role: 'OWNER',
        avatar: '/user.png', // Default avatar, could be enhanced with actual user avatar
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
    },
    crowdfund,
  };
}

async function ProjectContent({ id }: { id: string }) {
  let projectData;
  let error: string | null = null;

  try {
    // Try to fetch as crowdfunding project first
    try {
      const response = await getCrowdfundingProject(id);

      if (response.success && response.data) {
        projectData = transformCrowdfundingProject(
          response.data.project,
          response.data.crowdfund
        );
      } else {
        throw new Error('Failed to fetch crowdfunding project');
      }
    } catch {
      // If crowdfunding project fails, try regular project
      try {
        const regularProject = await getProjectDetails(id);

        // Transform regular project data if needed
        // For regular projects, we need to create a mock CrowdfundingProject structure
        const mockProject: CrowdfundingProject = {
          _id: regularProject.id || regularProject._id,
          title: regularProject.title,
          description: regularProject.description,
          category: regularProject.category,
          owner: {
            type: 'individual',
          },
          vision: regularProject.description,
          githubUrl: regularProject.githubUrl,
          projectWebsite: regularProject.projectWebsite,
          demoVideo: regularProject.demoVideo,
          socialLinks: regularProject.socialLinks,
          status: regularProject.status,
          creator: {
            _id: 'unknown',
            profile: {
              firstName: regularProject.ownerName?.split(' ')[0] || 'Unknown',
              lastName: regularProject.ownerName?.split(' ')[1] || 'Unknown',
              username: regularProject.ownerUsername || 'unknown',
            },
          },
          contact: {
            primary: '',
            backup: '',
          },
          createdAt: regularProject.createdAt,
          updatedAt: regularProject.updatedAt || regularProject.createdAt,
          funding: {
            goal: 0,
            raised: 0,
            currency: 'USD',
            endDate: new Date(
              Date.now() + 30 * 24 * 60 * 60 * 1000
            ).toISOString(),
            contributors: [],
          },
          voting: {
            startDate: new Date().toISOString(),
            endDate: new Date(
              Date.now() + 30 * 24 * 60 * 60 * 1000
            ).toISOString(),
            totalVotes: 0,
            positiveVotes: 0,
            negativeVotes: 0,
            voters: [],
          },
          milestones: [],
          team: [],
          media: {
            banner: regularProject.image,
            logo: regularProject.image,
            thumbnail: regularProject.image,
          },
          documents: {
            whitepaper: '',
            pitchDeck: '',
          },
          tags: [],
          grant: {
            isGrant: false,
            totalBudget: 0,
            totalDisbursed: 0,
            proposalsReceived: 0,
            proposalsApproved: 0,
            status: 'pending',
            applications: [],
          },
          summary: regularProject.description,
          type: 'crowdfund',
          votes: 0,
          stakeholders: {
            serviceProvider: '',
            approver: '',
            releaseSigner: '',
            disputeResolver: '',
            receiver: '',
            platformAddress: '',
          },
          trustlessWorkStatus: 'pending',
          escrowType: 'pending',
          __v: 0,
        };

        const mockCrowdfund: CrowdfundData = {
          _id: 'mock-crowdfund',
          projectId: regularProject.id || regularProject._id,
          thresholdVotes: 0,
          voteDeadline: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000
          ).toISOString(),
          totalVotes: 0,
          voteProgress: 0,
          status: regularProject.status,
          createdAt: regularProject.createdAt,
          updatedAt: regularProject.updatedAt || regularProject.createdAt,
          __v: 0,
          isVotingActive: false,
          id: 'mock-crowdfund',
        };

        projectData = {
          project: {
            ...mockProject,
            daysToDeadline: 30,
            additionalCreator: {
              name: regularProject.ownerName || 'Unknown Creator',
              role: 'OWNER',
              avatar: regularProject.ownerAvatar || '/user.png',
            },
            links: [],
          },
          crowdfund: mockCrowdfund,
        };
      } catch {
        error = 'Project not found';
      }
    }
  } catch {
    error = 'Failed to fetch project data';
  }

  if (error || !projectData) {
    notFound();
  }

  return (
    <div className='mx-auto flex min-h-screen max-w-[1440px] flex-col space-y-[60px] overflow-x-hidden bg-[#030303] px-5 py-5 md:space-y-[80px] md:px-[50px] lg:px-[100px]'>
      {/* <header className='sticky top-0 z-50 border-b border-gray-800 bg-[#030303]'>
        <div className='w-full px-4 sm:px-6'>
          <div className='mx-auto flex max-w-[1400px] items-center justify-between py-3'>
            <Link href='/projects' passHref>
              <Button
                variant='outline'
                className='h-9 gap-2 border border-gray-700 bg-transparent px-3 text-white transition-colors hover:border-gray-600'
              >
                <ArrowLeft className='h-4 w-4' />
                <span className='hidden sm:inline'>Back</span>
              </Button>
            </Link>

            <Link href={projectUrl} passHref target='_blank'>
              <Button
                variant='outline'
                className='h-9 gap-2 border border-gray-700 bg-transparent px-3 text-white transition-colors hover:border-gray-600'
              >
                <span className='hidden sm:inline'>Open</span>
                <ExternalLink className='h-4 w-4' />
              </Button>
            </Link>
          </div>
        </div>
      </header> */}

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
