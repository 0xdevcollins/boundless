'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CampaignModal } from '@/components/campaign/campaign-modal';

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className='min-h-screen bg-black flex items-center justify-center'>
      <Button
        onClick={() => setIsModalOpen(true)}
        className='bg-[#00ff00] hover:bg-[#00dd00] text-black font-semibold px-8 py-3'
      >
        Create Campaign
      </Button>

      <CampaignModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
