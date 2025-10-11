import { ArrowRight, HandCoins, Triangle, Trophy } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface OrganizationCardProps {
  id: string;
  name: string;
  logo: string;
  createdAt: string;
  hackathons: {
    count: number;
    submissions: number;
  };
  grants: {
    count: number;
    applications: number;
  };
}

export default function OrganizationCard({
  id,
  name,
  logo,
  createdAt,
  hackathons,
  grants,
}: OrganizationCardProps) {
  return (
    <section className='cursor-pointer rounded-xl border border-zinc-800 bg-black transition-shadow duration-300 hover:shadow-lg hover:shadow-lime-500/10'>
      <div className='rounded-xl border border-zinc-800 bg-zinc-900 px-6 pt-6 pb-1'>
        <div className='mb-6 flex items-start gap-4'>
          <div className='flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg'>
            <Image
              src={logo || '/placeholder.svg'}
              alt={`${name} Logo`}
              width={56}
              height={56}
              className='rounded-lg object-contain'
            />
          </div>
          <div className='min-w-0 flex-1'>
            <h3 className='mb-1 text-lg font-semibold text-white'>{name}</h3>
            <p className='text-sm text-zinc-500'>Created {createdAt}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className='mb-6 grid grid-cols-2 gap-4'>
          {/* Hackathons */}
          <div className='rounded-lg border border-zinc-800 bg-black p-4'>
            <div className='mb-2 flex items-center gap-2'>
              <div className='grid h-7 w-7 place-content-center rounded-lg border-1 border-green-400/30 bg-lime-200/10 md:h-10 md:w-10'>
                <Trophy className='h-3 w-3 text-lime-500 md:h-4 md:w-4' />
              </div>
              <span className='text-sm font-medium text-white'>Hackathons</span>
            </div>
            <div className='my-2 text-2xl font-semibold text-white'>
              {hackathons.count}
            </div>
            <div className='mb-2 flex items-center gap-1 text-xs text-zinc-500'>
              {hackathons.submissions > 5 ? (
                <Triangle
                  className='h-3 w-3 border-0 text-[#40b869] md:h-4 md:w-4'
                  fill='#40b869'
                />
              ) : (
                <Triangle
                  className='h-3 w-3 rotate-180 border-0 text-[#dd514d] md:h-4 md:w-4'
                  fill='#dd514d'
                />
              )}
              <span>
                {hackathons.submissions} submission
                {hackathons.submissions !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* Grants */}
          <div className='rounded-lg border border-zinc-800 bg-black p-4'>
            <div className='mb-2 flex items-center gap-2'>
              <div className='grid h-7 w-7 place-content-center rounded-lg border-1 border-green-400/30 bg-lime-200/10 md:h-10 md:w-10'>
                <HandCoins className='h-3 w-3 text-lime-500 md:h-4 md:w-4' />
              </div>
              <span className='text-sm font-medium text-white'>Grants</span>
            </div>
            <div className='my-2 text-2xl font-semibold text-white'>
              {grants.count}
            </div>
            <div className='mb-2 flex items-center gap-1 text-xs text-zinc-500'>
              {grants.applications > 5 ? (
                <Triangle
                  className='h-3 w-3 border-0 text-[#40b869] md:h-4 md:w-4'
                  fill='#40b869'
                />
              ) : (
                <Triangle
                  className='h-3 w-3 rotate-180 border-0 text-[#dd514d] md:h-4 md:w-4'
                  fill='#dd514d'
                />
              )}
              <span>
                {grants.applications} application
                {grants.applications !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <Link
        href={`/organization/${id}`}
        className='flex items-center justify-end gap-2 px-10 py-5 text-sm font-medium text-lime-500 transition-colors hover:text-lime-400'
      >
        <span>Manage Organization</span>
        <ArrowRight className='h-4 w-4' />
      </Link>
    </section>
  );
}
