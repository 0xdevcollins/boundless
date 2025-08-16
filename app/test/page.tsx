'use client';

import { useState } from 'react';
import LaunchCampaignFlow from '@/components/project/LaunchCampaignFlow';
import BoundlessSheet from '@/components/sheet/boundless-sheet';
import { Button } from '@/components/ui/button';
import { Rocket } from 'lucide-react';

export default function TestPage() {
  const [showLaunchFlow, setShowLaunchFlow] = useState(false);

  const handleOpenModal = () => {
    setShowLaunchFlow(true);
  };

  const handleCloseModal = () => {
    setShowLaunchFlow(false);
  };

  return (
    <div className='min-h-screen bg-gray-900 flex items-center justify-center'>
      <div className='text-center space-y-6'>
        <h1 className='text-4xl font-bold text-white mb-8'>
          Launch Campaign Test
        </h1>

        <p className='text-gray-300 mb-8'>
          Click the button below to test the Launch Campaign feature
        </p>

        <Button
          onClick={handleOpenModal}
          size='lg'
          className='bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg'
        >
          <Rocket className='mr-2 h-6 w-6' />
          Test Launch Campaign
        </Button>

        {/* Debug info */}
        <div className='text-white text-sm'>
          Modal state: {showLaunchFlow ? 'Open' : 'Closed'}
        </div>

        {/* Launch Campaign Flow Modal */}
        <BoundlessSheet
          open={showLaunchFlow}
          setOpen={handleCloseModal}
          contentClassName='h-full'
          title='Review Campaign'
        >
          <LaunchCampaignFlow
            projectId='test-project-123'
            onBack={handleCloseModal}
            onComplete={handleCloseModal}
          />
        </BoundlessSheet>
      </div>
    </div>
  );
}
