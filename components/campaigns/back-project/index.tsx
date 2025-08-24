'use client';

import { useState } from 'react';
// import { BoundlessButton } from '@/components/buttons';
import { ProjectSubmissionSuccess } from '@/components/project';
import BoundlessSheet from '@/components/sheet/boundless-sheet';
import { ProjectSubmissionLoading } from '@/components/flows/back-project/project-submission-loading';
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

interface BackingProjectProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
const BackProject = ({ open, setOpen }: BackingProjectProps) => {
  // const [isSheetOpen, setIsSheetOpen] = useState(false);
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
        <div className='absolute inset-0 flex flex-col items-center justify-center w-full h-full'>
          <div className='flex items-center mb-4 w-full max-w-[500px]'>
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
      <div className='relative flex flex-col items-center justify-start min-h-full px-4'>
        <BackProjectForm
          onSubmit={handleBackProject}
          isLoading={backProjectState === 'loading'}
        />

        {backProjectState === 'loading' && (
          <div className='absolute inset-0 flex items-center justify-center w-full h-full bg-black/50 backdrop-blur-sm'>
            <ProjectSubmissionLoading />
          </div>
        )}
      </div>
    );
  };

  return (
    <BoundlessSheet
      open={open}
      setOpen={setOpen}
      // title="Back Project"
      showCloseButton={true}
      contentClassName={`h-[100vh]`}
      className='mx-4'
    >
      {renderSheetContent()}
    </BoundlessSheet>
  );
};

export default BackProject;
