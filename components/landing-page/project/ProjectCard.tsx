import { Progress } from '@/components/ui/progress';
import { formatNumber } from '@/lib/utils';

type ProjectCardProps = {
  creatorName: string;
  creatorLogo: string;
  projectImage: string;
  projectTitle: string;
  projectDescription: string;
  status: 'Validation' | 'Funding' | 'Funded' | 'Completed';
  deadlineInDays: number;
  milestoneRejected?: boolean;
  votes?: {
    current: number;
    goal: number;
  };
  funding?: {
    current: number;
    goal: number;
    currency: string;
  };
  milestones?: {
    current: number;
    goal: number;
  };
};
function ProjectCard({
  creatorName,
  creatorLogo,
  projectImage,
  projectTitle,
  projectDescription,
  status,
  deadlineInDays,
  milestoneRejected,
  votes,
  funding,
  milestones,
}: ProjectCardProps) {
  const getStatusStyles = () => {
    switch (status) {
      case 'Funding':
        return 'bg-blue-ish border-blue-ish-darker text-blue-ish-darker';
      case 'Funded':
        return 'bg-transparent border-primary text-primary';
      case 'Completed':
        return 'bg-success-green border-success-green-darker text-success-green-darker';
      case 'Validation':
        return 'bg-warning-orange border-warning-orange-darker text-warning-orange-darker';
      default:
        return '';
    }
  };

  const getDeadlineInfo = () => {
    if (status === 'Completed' && milestoneRejected) {
      return {
        text: '1 Milestone Rejected',
        className: 'text-red-500',
      };
    }

    if (deadlineInDays <= 3) {
      return {
        text: `${deadlineInDays} days to deadline`,
        className: 'text-error-status',
      };
    }

    if (deadlineInDays <= 15) {
      return {
        text: `${deadlineInDays} days to deadline`,
        className: 'text-warning-orange-darker',
      };
    }

    return {
      text: `${deadlineInDays} days to deadline`,
      className: 'text-success-green-darker',
    };
  };

  const deadlineInfo = getDeadlineInfo();

  return (
    <main className='font-inter hover:bg-primary/5 hover:border-primary/25 flex w-[397px] cursor-pointer flex-col gap-4 rounded-[8px] border border-gray-900 bg-[#030303] p-5'>
      <header className='flex items-center justify-between'>
        <main className='flex items-center gap-2'>
          <div
            style={{ backgroundImage: `url(${creatorLogo})` }}
            className='size-6 rounded-full bg-white bg-cover bg-center'
          ></div>
          <h4 className='text-sm font-normal text-gray-500'>{creatorName}</h4>
        </main>
        <main className='flex items-center gap-3'>
          <div className='bg-office-brown border-office-brown-darker text-office-brown-darker flex w-[63px] items-center justify-center rounded-[4px] border px-1 py-0.5 text-xs font-semibold'>
            Category
          </div>
          <div
            className={`rounded-[4px] px-1 py-0.5 ${getStatusStyles()} flex items-center justify-center border text-xs font-semibold`}
          >
            {status}
          </div>
        </main>
      </header>
      <article className='flex items-center gap-5'>
        <main
          style={{ backgroundImage: `url(${projectImage})` }}
          className='h-[90px] w-[79.41px] rounded-[8px] bg-white bg-cover bg-center'
        ></main>
        <main className='flex w-[257px] flex-col gap-2'>
          <h2 className='text-left text-base font-semibold text-white'>
            {projectTitle}
          </h2>
          <div className='group relative h-[60px]'>
            <p className='line-clamp-3 cursor-pointer text-left text-sm font-normal text-white group-hover:absolute group-hover:z-10 group-hover:line-clamp-none group-hover:w-full group-hover:rounded-md group-hover:bg-[#030303]'>
              {projectDescription}
            </p>
          </div>
        </main>
      </article>
      <footer className='flex flex-col gap-2'>
        <main className='flex items-center justify-between'>
          {status === 'Validation' && votes && (
            <h3 className='text-sm font-medium text-[#f5f5f5]'>
              {formatNumber(votes.current)}/{formatNumber(votes.goal)}{' '}
              <span className='text-gray-500'>Votes</span>
            </h3>
          )}
          {status === 'Funding' && funding && (
            <h3 className='text-sm font-medium text-[#f5f5f5]'>
              {formatNumber(funding.current)}/{formatNumber(funding.goal)}{' '}
              <span className='text-gray-500'>{funding.currency} raised</span>
            </h3>
          )}
          {(status === 'Funded' || status === 'Completed') && milestones && (
            <h3 className='text-sm font-medium text-[#f5f5f5]'>
              {milestones.current}/{milestones.goal}{' '}
              <span className='text-gray-500'>Milestones Submitted</span>
            </h3>
          )}

          <h3 className={`text-sm font-medium ${deadlineInfo.className}`}>
            {deadlineInfo.text}
          </h3>
        </main>
        <div>
          <Progress
            value={
              status === 'Validation'
                ? votes
                  ? (votes.current / votes.goal) * 100
                  : 0
                : status === 'Funding'
                  ? funding
                    ? (funding.current / funding.goal) * 100
                    : 0
                  : milestones
                    ? (milestones.current / milestones.goal) * 100
                    : 0
            }
            className='h-2 w-[357px] rounded-full'
          />
        </div>
      </footer>
    </main>
  );
}

export default ProjectCard;
