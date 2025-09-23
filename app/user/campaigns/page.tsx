'use client';

import CampaignTable from '@/components/campaigns/CampaignTable';
import PageTransition from '@/components/PageTransition';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';

export default function CampaignsPage() {
  return (
    <PageTransition>
      <div className='min-h-screen'>
        <div className='mx-auto max-w-7xl p-4 pb-16 sm:p-6 lg:p-8'>
          {/* Header Section */}
          <div className='mb-8 flex items-center justify-between'>
            <div>
              <h1 className='text-2xl leading-[120%] font-medium tracking-[-0.64px] text-white sm:text-3xl lg:text-[32px]'>
                Campaigns
              </h1>
              <p className='mt-2 text-white/60'>
                Manage and track all your crowdfunding campaigns
              </p>
            </div>
            <Button
              onClick={() => {
                /* TODO: Implement create campaign modal */
              }}
              className='bg-primary hover:bg-primary/90 flex items-center gap-2 font-medium text-black'
            >
              <PlusIcon className='h-4 w-4' />
              Create Campaign
            </Button>
          </div>

          {/* Campaign Table Section */}
          <div className='rounded-[12px] bg-[#1C1C1C] p-4 pb-[5em] sm:p-6'>
            <CampaignTable limit={10} showPagination={true} />
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
