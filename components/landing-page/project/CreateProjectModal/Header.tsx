import { cn } from '@/lib/utils';
import React from 'react';

interface HeaderProps {
  currentStep?: number;
  onBack?: () => void;
}

const Header = ({ currentStep = 1, onBack }: HeaderProps) => {
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
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='10'
                          height='7'
                          viewBox='0 0 10 7'
                          fill='none'
                        >
                          <path
                            fill-rule='evenodd'
                            clip-rule='evenodd'
                            d='M8.54434 0.769641C8.67156 0.886264 8.68015 1.08394 8.56353 1.21117L3.9802 6.21117C3.9226 6.274 3.84184 6.31058 3.75663 6.31243C3.67141 6.31428 3.58914 6.28124 3.52887 6.22097L1.44553 4.13764C1.32349 4.0156 1.32349 3.81774 1.44553 3.6957C1.56757 3.57366 1.76544 3.57366 1.88747 3.6957L3.74002 5.54824L8.10281 0.788838C8.21943 0.661613 8.41711 0.653019 8.54434 0.769641Z'
                            fill='#030303'
                            stroke='#030303'
                            stroke-width='0.833333'
                            strokeLinecap='round'
                            stroke-linejoin='round'
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                  {/* {isActive && (
                    <div
                      className='mt-2 h-0.5 w-full bg-green-500'
                      style={{ width: 'calc(100% + 1rem)' }}
                    />
                  )} */}
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
