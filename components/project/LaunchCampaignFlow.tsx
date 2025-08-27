'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { launchCampaign } from '@/lib/api/project';
import { CampaignDetails } from '@/lib/api/types';
import ReviewCampaign from './ReviewCampaign';
import CampaignLiveSuccess from './CampaignLiveSuccess';
import LoadingSpinner from '../LoadingSpinner';
import { Stepper } from '../stepper';
import { mockCampaignDetails } from '@/lib/mock';
import { useWalletProtection } from '@/hooks/use-wallet-protection';
import WalletRequiredModal from '../wallet/WalletRequiredModal';

interface LaunchCampaignFlowProps {
  projectId: string;
  onBack: () => void;
  onComplete: () => void;
}

type FlowStep = 'review' | 'launching' | 'success';

const LaunchCampaignFlow: React.FC<LaunchCampaignFlowProps> = ({
  projectId,
  onBack,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState<FlowStep>('review');
  const [campaignDetails, setCampaignDetails] =
    useState<CampaignDetails | null>(null);

  // Wallet protection hook
  const {
    requireWallet,
    showWalletModal,
    handleWalletConnected,
    closeWalletModal,
  } = useWalletProtection({
    actionName: 'launch campaign',
  });

  // Define the steps for the stepper
  const steps = [
    {
      title: 'Initialize',
      description:
        'Submit your project idea and define milestones to begin your campaign journey.',
      state: 'completed' as const,
    },
    {
      title: 'Validate',
      description:
        'Get admin approval and gather public support through voting.',
      state: 'completed' as const,
    },
    {
      title: 'Launch Campaign',
      description:
        'Finalize campaign details and deploy smart escrow to go live and receive funding.',
      state: 'active' as const,
    },
  ];

  const handleLaunch = async () => {
    requireWallet(async () => {
      try {
        setCurrentStep('launching');

        // Launch the campaign
        const response = (await launchCampaign(projectId)) as {
          data: { campaignId: string };
        };

        // mock campaign details
        setCampaignDetails(mockCampaignDetails as CampaignDetails);

        // Update campaign details with the response
        if (campaignDetails) {
          setCampaignDetails({
            ...campaignDetails,
            id: response.data.campaignId,
          });
        }

        toast.success('Campaign launched successfully!');
        setCurrentStep('success');
      } catch {
        toast.error('Failed to launch campaign. Please try again.');
        setCurrentStep('review');
      }
    });
  };

  const handleBackToDashboard = () => {
    onComplete();
  };

  const handleLoading = () => {
    // Handle loading state if needed
  };

  const renderContent = () => {
    switch (currentStep) {
      case 'review':
        return (
          <ReviewCampaign
            projectId={projectId}
            onBack={onBack}
            onLaunch={handleLaunch}
            onLoading={handleLoading}
          />
        );

      case 'launching':
        return (
          <div className='flex flex-col items-center justify-center h-64 space-y-4'>
            <LoadingSpinner size='lg' color='white' />
            <div className='text-center'>
              <h3 className='text-[#F5F5F5] text-lg font-medium mb-2'>
                Launching Campaign...
              </h3>
              <p className='text-[#B5B5B5] text-sm'>
                Please wait while we deploy your campaign and set up the smart
                escrow.
              </p>
            </div>
          </div>
        );

      case 'success':
        return campaignDetails ? (
          <CampaignLiveSuccess
            campaignDetails={campaignDetails}
            onBackToDashboard={handleBackToDashboard}
          />
        ) : (
          <div className='text-center py-8'>
            <p className='text-red-500 mb-4'>Campaign details not available</p>
            <button
              onClick={handleBackToDashboard}
              className='text-[#F5F5F5] hover:text-[#B5B5B5]'
            >
              Back to Dashboard
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className='flex h-full'>
        {/* Left Sidebar with Stepper */}
        <div className='flex-1 sticky top-0'>
          <Stepper steps={steps} />
        </div>

        {/* Right Content Area */}
        <div className='flex-1'>{renderContent()}</div>
      </div>

      {/* Wallet Required Modal */}
      <WalletRequiredModal
        open={showWalletModal}
        onOpenChange={closeWalletModal}
        actionName='launch campaign'
        onWalletConnected={handleWalletConnected}
      />
    </>
  );
};

export default LaunchCampaignFlow;
