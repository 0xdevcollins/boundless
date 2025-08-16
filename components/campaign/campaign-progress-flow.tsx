import { Check, Lightbulb, Shield, Rocket } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Initialize',
    description:
      'Submit your project idea and define milestones to begin your campaign journey.',
    status: 'completed',
    icon: Lightbulb,
  },
  {
    id: 2,
    title: 'Validate',
    description: 'Get admin approval and gather public support through voting.',
    status: 'completed',
    icon: Shield,
  },
  {
    id: 3,
    title: 'Launch Campaign',
    description:
      'Finalize campaign details and deploy smart escrow to go live and receive funding.',
    status: 'current',
    icon: Rocket,
  },
];

export function CampaignProgressFlow() {
  return (
    <>
      <div className='block md:hidden'>
        <div className='flex items-center justify-between px-2 py-4 relative'>
          {steps.map((step, index) => (
            <div
              key={step.id}
              className='flex flex-col items-center relative flex-1'
            >
              {/* Step Indicator */}
              <div className='relative z-10 mb-2'>
                <div
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center relative
                    ${
                      step.status === 'completed' || step.status === 'current'
                        ? 'bg-[#C5FB7A]/30 border-2 border-[#A7F950] shadow-lg shadow-[#A7F950]/20'
                        : 'bg-gray-700/20 border-2 border-gray-600'
                    }
                  `}
                >
                  {/* Inner circle with number instead of icon */}
                  <div
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm
                      ${
                        step.status === 'completed'
                          ? 'bg-[#A7F950] text-black'
                          : step.status === 'current'
                            ? 'bg-[#A7F950] text-black'
                            : 'bg-gray-700 text-gray-400'
                      }
                    `}
                  >
                    {step.status === 'completed' ? (
                      <Check className='w-4 h-4' />
                    ) : (
                      step.id
                    )}
                  </div>
                </div>
              </div>

              {/* Step Title */}
              <h3
                className={`text-xs font-semibold text-center leading-tight ${
                  step.status === 'current' ? 'text-[#A7F950]' : 'text-white'
                }`}
              >
                {step.title}
              </h3>

              {index < steps.length - 1 && (
                <div
                  className={`
                    absolute top-6 left-1/2 w-full h-0.5 z-0
                    ${steps[index].status === 'completed' ? 'bg-[#A7F950]' : 'bg-gray-600'}
                  `}
                  style={{
                    transform: 'translateX(25%)',
                    width: 'calc(100% - 1.5rem)',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className='hidden md:block space-y-0'>
        {steps.map((step, index) => (
          <div key={step.id} className='flex items-start space-x-4 relative'>
            {/* Step Indicator */}
            <div className='flex flex-col items-center relative z-10'>
              <div className='relative'>
                {/* Outer ring for double background effect */}
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    ${
                      step.status === 'completed' || step.status === 'current'
                        ? 'bg-[#C5FB7A]/30 border-2 border-[#A7F950]'
                        : 'bg-gray-700/20 border-2 border-gray-600'
                    }
                  `}
                >
                  {/* Inner circle */}
                  <div
                    className={`
                      w-6 h-6 rounded-full flex items-center justify-center font-semibold text-xs
                      ${
                        step.status === 'completed'
                          ? 'bg-[#A7F950] text-black'
                          : step.status === 'current'
                            ? 'bg-[#A7F950] text-black'
                            : 'bg-gray-700 text-gray-400'
                      }
                    `}
                  >
                    {step.status === 'completed' ? (
                      <Check className='w-3 h-3' />
                    ) : (
                      step.id
                    )}
                  </div>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`
                    w-0.5 h-16 mt-2
                    ${step.status === 'completed' ? 'bg-[#A7F950]' : 'bg-gray-600'}
                  `}
                />
              )}
            </div>

            {/* Step Content */}
            <div className='flex-1 pb-8'>
              <h3 className='text-white font-semibold text-base mb-2'>
                {step.title}
              </h3>
              <p className='text-gray-400 text-sm leading-relaxed pr-4'>
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
