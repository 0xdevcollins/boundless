'use client';

import React, { useState } from 'react';
import BoundlessSheet from '../sheet/boundless-sheet';
import { Stepper } from '../stepper';
import Initialize from './Initialize';
import ValidationFlow from './ValidationFlow';
import LaunchCampaignFlow from './LaunchCampaignFlow';
import { useProjectSheetStore } from '@/lib/stores/project-sheet-store';

type StepState = 'pending' | 'active' | 'completed';

type Step = {
  title: string;
  description: string;
  state: StepState;
};

const initialSteps: Step[] = [
  {
    title: 'Initialize',
    description:
      'Submit your project idea and define milestones to begin your campaign journey.',
    state: 'active',
  },
  {
    title: 'Validate',
    description: 'Get admin approval and gather public support through voting.',
    state: 'pending',
  },
  {
    title: 'Launch Campaign',
    description:
      'Finalize campaign details and deploy smart escrow to go live and receive funding.',
    state: 'pending',
  },
];

interface ProjectSheetFlowProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProjectSheetFlow: React.FC<ProjectSheetFlowProps> = ({
  open,
  onOpenChange,
}) => {
  const [steps, setSteps] = useState<Step[]>(initialSteps);
  const [currentStep, setCurrentStep] = useState<
    'initialize' | 'validate' | 'launch'
  >('initialize');
  const [projectId, setProjectId] = useState<string | null>(null);
  const sheet = useProjectSheetStore();

  const handleFormSuccess = (projectId: string) => {
    setProjectId(projectId);
    setSteps(prevSteps =>
      prevSteps.map((step, index) => {
        if (index === 0) {
          return { ...step, state: 'completed' };
        }
        if (index === 1) {
          return { ...step, state: 'active' };
        }
        return step;
      })
    );
    setCurrentStep('validate');
  };

  const handleValidationSuccess = () => {
    setSteps(prevSteps =>
      prevSteps.map((step, index) => {
        if (index === 1) {
          return { ...step, state: 'completed' };
        }
        if (index === 2) {
          return { ...step, state: 'active' };
        }
        return step;
      })
    );
    setCurrentStep('launch');
  };

  const handleLaunchComplete = () => {
    handleClose();
  };

  const handleBackToValidation = () => {
    setCurrentStep('validate');
    setSteps(prevSteps =>
      prevSteps.map((step, index) => {
        if (index === 1) {
          return { ...step, state: 'active' };
        }
        if (index === 2) {
          return { ...step, state: 'pending' };
        }
        return step;
      })
    );
  };

  const handleClose = () => {
    onOpenChange(false);
    sheet.reset();
    setSteps(initialSteps);
    setCurrentStep('initialize');
    setProjectId(null);
  };

  const renderContent = () => {
    if (currentStep === 'launch' && projectId) {
      return (
        <LaunchCampaignFlow
          projectId={projectId}
          onBack={handleBackToValidation}
          onComplete={handleLaunchComplete}
        />
      );
    }

    if (currentStep === 'validate' && sheet.project) {
      return (
        <ValidationFlow
          project={sheet.project}
          onSuccess={handleValidationSuccess}
        />
      );
    }

    return <Initialize onSuccess={handleFormSuccess} />;
  };

  return (
    <BoundlessSheet open={open} setOpen={handleClose} contentClassName='h-full'>
      <div className='flex justify-between'>
        <div className='flex-1 sticky top-0'>
          <Stepper steps={steps} />
        </div>
        <div className='flex-1'>{renderContent()}</div>
      </div>
    </BoundlessSheet>
  );
};

export default ProjectSheetFlow;
