'use client';

import CampaignTable from '@/components/campaigns/CampaignTable';
import PageTransition from '@/components/PageTransition';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';

export default function CampaignsPage() {
  return (
    <PageTransition>
      <div className='min-h-screen'>
        <div className='p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto pb-16'>
          {/* Header Section */}
          <div className='mb-8 flex items-center justify-between'>
            <div>
              <h1 className='text-2xl sm:text-3xl lg:text-[32px] font-medium leading-[120%] tracking-[-0.64px] text-white'>
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
              className='bg-primary hover:bg-primary/90 text-black font-medium flex items-center gap-2'
            >
              <PlusIcon className='w-4 h-4' />
              Create Campaign
            </Button>
          </div>

          {/* Campaign Table Section */}
          <div className='bg-[#1C1C1C] p-4 sm:p-6 rounded-[12px] pb-[5em]'>
            <CampaignTable />
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
