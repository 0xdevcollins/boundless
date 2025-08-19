import { PriceDisplay } from '@/components/PriceDisplay';
import EmptyState from '@/components/EmptyState';
import { BoundlessButton } from '@/components/buttons';
import { Coins, History, Plus } from 'lucide-react';
import Card from '@/components/card';
import RecentProjects from '@/components/overview/RecentProjects';
import RecentContributions from '@/components/overview/ReecntContributions';
import GrantHistory from '@/components/overview/GrantHistory';

export default function Components() {
  return (
    <div className='font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20'>
      <main className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start'>
        <div className='bg-[#1C1C1C] rounded-lg p-4 w-full max-w-[550px]'>
          <PriceDisplay price={100} className='text-2xl font-bold' />
          <EmptyState
            title='No comments yet'
            description='Start by sharing your first project idea with the Boundless community. Once submitted, your projects will appear here for easy tracking.'
            type='default'
            action={
              <BoundlessButton
                variant='default'
                size='lg'
                icon={<Plus className='w-5 h-5' />}
                iconPosition='right'
              >
                Add comment
              </BoundlessButton>
            }
          />
        </div>
        <div className='flex gap-4'>
          <Card
            title='Active Campaigns'
            value='10'
            bottomText={
              <div className='flex items-center gap-2'>
                <Coins className='w-4 h-4 text-white/60' />
                <PriceDisplay
                  price={0}
                  className='!text-xs !tracking-[-0.06px]'
                />
              </div>
            }
          />
          <Card
            title='Pending Submissions'
            value='0'
            bottomText={
              <div className='flex items-center gap-2'>
                <History className='w-4 h-4 text-white/60' />
                <span className='text-white/60'>No recent submissions</span>
              </div>
            }
          />
          <Card
            title='Active Projects'
            value='0'
            bottomText={
              <div className='flex items-center gap-2'>
                <span className='text-white/90'>0</span>
                Approved Submissions
              </div>
            }
          />
          <Card
            title='Available Grants'
            value={<PriceDisplay price={0} className='!tracking-[-0.06px]' />}
            bottomText={
              <div className='flex items-center gap-2 text-white/90'>
                6 grants available
              </div>
            }
          />
        </div>
        <RecentProjects />
        <div className='flex gap-4'>
          <RecentContributions projects={[]} />
          <GrantHistory projects={[]} />
        </div>
      </main>
    </div>
  );
}
