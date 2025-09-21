'use client';

import { useState } from 'react';
import { BoundlessButton } from '@/components/buttons';
import { ProjectSubmissionSuccess } from '@/components/project';
import BoundlessSheet from '@/components/sheet/boundless-sheet';
import { ProjectSubmissionLoading } from './project-submission-loading';
import { BackProjectForm } from './back-project-form';

type BackProjectState = 'form' | 'loading' | 'success';

interface BackProjectData {
  amount: string;
  currency: string;
  token: string;
  network: string;
  walletAddress: string;
  keepAnonymous: boolean;
}

const BackProject = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [backProjectState, setBackProjectState] =
    useState<BackProjectState>('form');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleBackProject = (data: BackProjectData) => {
    setBackProjectState('loading');
    // TODO: Send data to actual API endpoint when backend is ready

    // Simulate API call - data will be used when API is implemented
    setTimeout(() => {
      setBackProjectState('success');
    }, 2000);
  };

  //   const handleContinue = () => {
  //     setIsSheetOpen(false)
  //     setBackProjectState("form")
  //   }

  //   const handleViewHistory = () => {
  //     // Navigate to history page or open history modal
  //     setIsSheetOpen(false)
  //     // TODO: Implement backing history modal or navigation
  //   }

  //   const handleBack = () => {
  //     if (backProjectState === "success") {
  //       setBackProjectState("form")
  //     }
  //   }

  const renderSheetContent = () => {
    if (backProjectState === 'success') {
      return (
        <div className='absolute inset-0 flex h-full w-full flex-col items-center justify-center'>
          <div className='mb-4 flex w-full max-w-[500px] items-center'>
            {/* <Button variant="ghost" size="icon" onClick={handleBack} className="text-white hover:bg-gray-800">
              <ArrowLeft className="w-5 h-5" />
            </Button> */}
          </div>
          <ProjectSubmissionSuccess
            title="You've Backed this Campaign!"
            description="Your funds have been securely locked in escrow. You'll be notified when milestones are completed."
            linkSection='You can see funding history for this campaign'
            linkName='Here'
            url='/'
            // onContinue={handleContinue}
            // onViewHistory={handleViewHistory}
          />
        </div>
      );
    }

    return (
      <div className='relative flex min-h-full flex-col items-center justify-start px-4'>
        <BackProjectForm
          onSubmit={handleBackProject}
          isLoading={backProjectState === 'loading'}
        />

        {backProjectState === 'loading' && (
          <div className='absolute inset-0 flex h-full w-full items-center justify-center bg-black/50 backdrop-blur-sm'>
            <ProjectSubmissionLoading />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className='min-h-screen w-full space-x-2 bg-black text-white'>
      <BoundlessSheet
        open={isSheetOpen}
        setOpen={setIsSheetOpen}
        // title="Back Project"
        showCloseButton={true}
        contentClassName={`h-[100vh]`}
        className='mx-4'
      >
        {renderSheetContent()}
      </BoundlessSheet>

      <BoundlessButton onClick={() => setIsSheetOpen(true)}>
        Back Project
      </BoundlessButton>
    </div>
  );
};

export default BackProject;
