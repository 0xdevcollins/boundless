import BoundlessSheet from '@/components/sheet/boundless-sheet';
import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Basic from './Basic';
import Details from './Details';
import Milestones from './Milestones';
import Team from './Team';
import Contact from './Contact';

const CreateProjectModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleContinue = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle final submission
      // TODO: Implement project submission logic
      // This could include API calls, form validation, etc.
    }
  };

  // Placeholder for step validation - you can implement actual validation logic here
  const isStepValid = true;

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Basic />;
      case 2:
        return <Details />;
      case 3:
        return <Milestones />;
      case 4:
        return <Team />;
      case 5:
        return <Contact />;
      default:
        return <Basic />;
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
      />
    </BoundlessSheet>
  );
};

export default CreateProjectModal;
