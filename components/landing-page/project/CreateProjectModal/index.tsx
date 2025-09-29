import BoundlessSheet from '@/components/sheet/boundless-sheet';
import React, { useState, useRef, useCallback } from 'react';
import Header from './Header';
import Footer from './Footer';
import Basic, { BasicFormData } from './Basic';
import Details, { DetailsFormData } from './Details';
import Milestones, { MilestonesFormData } from './Milestones';
import Team, { TeamFormData } from './Team';
import Contact, { ContactFormData } from './Contact';

interface CreateProjectModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export interface ProjectFormData {
  basic: Partial<BasicFormData>;
  details: Partial<DetailsFormData>;
  milestones: Partial<MilestonesFormData>;
  team: Partial<TeamFormData>;
  contact: Partial<ContactFormData>;
}

const CreateProjectModal = ({ open, setOpen }: CreateProjectModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form data state
  const [formData, setFormData] = useState<ProjectFormData>({
    basic: {},
    details: {},
    milestones: {},
    team: {},
    contact: {},
  });

  // Refs for step components to access validation methods
  const stepRefs = {
    basic: useRef<{ validate: () => boolean }>(null),
    details: useRef<{ validate: () => boolean }>(null),
    milestones: useRef<{ validate: () => boolean }>(null),
    team: useRef<{ validate: () => boolean }>(null),
    contact: useRef<{ validate: () => boolean }>(null),
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const validateCurrentStep = (): boolean => {
    const stepRef = stepRefs[getStepKey(currentStep)];
    return stepRef?.current?.validate() ?? true;
  };

  const getStepKey = (step: number): keyof typeof stepRefs => {
    switch (step) {
      case 1:
        return 'basic';
      case 2:
        return 'details';
      case 3:
        return 'milestones';
      case 4:
        return 'team';
      case 5:
        return 'contact';
      default:
        return 'basic';
    }
  };

  const handleContinue = async () => {
    // Validate current step before proceeding
    if (!validateCurrentStep()) {
      return;
    }

    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle final submission
      await handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // TODO: Implement actual API call to submit project
      // console.log('Submitting project data:', formData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Reset form and close modal on success
      setFormData({
        basic: {},
        details: {},
        milestones: {},
        team: {},
        contact: {},
      });
      setCurrentStep(1);
      setOpen(false);

      // TODO: Show success notification
      alert('Project submitted successfully!');
    } catch {
      // console.error('Error submitting project:', error);
      // TODO: Show error notification
      alert('Error submitting project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDataChange = useCallback(
    (step: keyof ProjectFormData, data: unknown) => {
      setFormData(prev => ({
        ...prev,
        [step]: { ...prev[step], ...data },
      }));
    },
    []
  );

  const isStepValid = validateCurrentStep();

  const renderStepContent = () => {
    const commonProps = {
      onDataChange: (data: unknown) =>
        handleDataChange(getStepKey(currentStep), data),
      initialData: formData[getStepKey(currentStep)],
    };

    switch (currentStep) {
      case 1:
        return <Basic ref={stepRefs.basic} {...commonProps} />;
      case 2:
        return <Details ref={stepRefs.details} {...commonProps} />;
      case 3:
        return <Milestones ref={stepRefs.milestones} {...commonProps} />;
      case 4:
        return <Team ref={stepRefs.team} {...commonProps} />;
      case 5:
        return <Contact ref={stepRefs.contact} {...commonProps} />;
      default:
        return <Basic ref={stepRefs.basic} {...commonProps} />;
    }
  };

  return (
    <BoundlessSheet
      contentClassName='h-[80vh] overflow-y-auto !overflow-x-hidden'
      open={open}
      setOpen={setOpen}
    >
      <Header currentStep={currentStep} onBack={handleBack} />
      <div className='min-h-[calc(55vh)] px-4 md:px-[50px] lg:px-[75px] xl:px-[150px]'>
        {renderStepContent()}
      </div>
      <Footer
        currentStep={currentStep}
        onContinue={handleContinue}
        isStepValid={isStepValid}
        isSubmitting={isSubmitting}
      />
    </BoundlessSheet>
  );
};

export default CreateProjectModal;
