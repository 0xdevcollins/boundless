import { cn } from '@/lib/utils';
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface HeaderProps {
  currentStep?: number;
  onBack?: () => void;
  stepCompletion?: Record<
    number,
    {
      isCompleted: boolean;
      isPartiallyCompleted: boolean;
      completionPercentage: number;
    }
  >;
}

const Header = ({ currentStep = 1, onBack, stepCompletion }: HeaderProps) => {
  const steps = [
    { id: 1, name: 'Basics' },
    { id: 2, name: 'Details' },
    { id: 3, name: 'Milestones' },
    { id: 4, name: 'Team' },
    { id: 5, name: 'Contact' },
  ];

  return (
    <div className='bg-background sticky top-0 z-10 space-y-[50px] overflow-x-hidden px-4 md:px-[50px] lg:px-[75px] xl:px-[150px]'>
      <div className='flex items-center gap-4'>
        {currentStep > 1 && onBack && (
          <button
            onClick={onBack}
            className='absoluste top-0 -left-[50px] z-[9999] flex h-8 w-8 items-center justify-center rounded-full border border-[#484848] transition-colors duration-200 hover:border-white'
            aria-label='Go back to previous step'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              className='text-white'
            >
              <path
                d='M10 12L6 8L10 4'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
        )}
        <h1 className='text-2xl leading-[120%] font-medium tracking-[-0.48px] text-white'>
          Create a new Project
        </h1>
      </div>

      <div className='scrollbar-hide mb-0 overflow-x-auto'>
        <div className='flex w-full min-w-max items-center justify-between md:min-w-0'>
          {steps.map(step => {
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;
            const stepStatus = stepCompletion?.[step.id];
            const isPartiallyCompleted =
              stepStatus?.isPartiallyCompleted || false;
            const completionPercentage = stepStatus?.completionPercentage || 0;

            return (
              <div
                key={step.id}
                className={cn(
                  'flex w-full min-w-[120px] items-center pb-2 md:min-w-0',
                  isActive && 'border-primary border-b-2',
                  isCompleted && 'border-primary border-b-2'
                )}
              >
                <div className='flex flex-col items-center'>
                  <div className='flex items-center space-x-2'>
                    <span
                      className={`text-sm leading-[145%] whitespace-nowrap ${
                        isActive || isCompleted
                          ? 'text-white'
                          : 'text-[#919191]'
                      }`}
                    >
                      {step.name}
                    </span>
                    <div className='relative'>
                      <div
                        className={`flex h-[13.3px] w-[13.3px] flex-shrink-0 items-center justify-center rounded-full border-[1.25px] ${
                          isActive
                            ? 'border-white'
                            : isCompleted
                              ? 'border-white bg-white'
                              : 'border-[#919191]'
                        }`}
                      >
                        {isActive && (
                          <span className='h-[6.67px] w-[6.67px] rounded-full bg-white' />
                        )}
                        {isCompleted && (
                          <CheckCircle className='h-3 w-3 text-black' />
                        )}
                      </div>
                      {/* Progress ring for partially completed steps */}
                      {isPartiallyCompleted && !isCompleted && (
                        <div className='absolute inset-0 rounded-full'>
                          <svg className='h-[13.3px] w-[13.3px] -rotate-90 transform'>
                            <circle
                              cx='6.65'
                              cy='6.65'
                              r='5.65'
                              fill='none'
                              stroke='#10b981'
                              strokeWidth='1.5'
                              strokeDasharray={`${(completionPercentage / 100) * 35.5} 35.5`}
                              className='transition-all duration-300'
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Progress indicator for current step */}
                  {isActive && isPartiallyCompleted && (
                    <div className='mt-1 text-xs text-green-400'>
                      {completionPercentage}% complete
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className='absolute bottom-0 left-1/2 h-[0.5px] w-screen -translate-x-1/2 bg-[#484848] sm:-mx-4 md:left-0 md:-mx-[75px] md:-translate-x-0 lg:-mx-[150px]' />
    </div>
  );
};

export default Header;
