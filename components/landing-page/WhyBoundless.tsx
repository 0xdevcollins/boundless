import { FileLock, Globe, UserCheck } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const features = [
  {
    icon: <FileLock size={32} className='text-gray-400' />,
    title: 'Milestone Escrow',
    description:
      'Funds are locked in smart contracts and released only when milestones are completed. Backers know their contributions support real progress, while creators stay accountable.',
  },
  {
    icon: <Globe size={32} className='text-gray-500' />,
    title: 'Inclusive Opportunities',
    description:
      'From crowdfunding to grants and hackathons, Boundless provides builders with multiple ways to access funding and grow their ideas, while supporters discover projects that inspire them.',
  },
  {
    icon: <UserCheck size={32} className='text-gray-500' />,
    title: 'Powered by Stellar',
    description:
      'Built on Stellar and Soroban smart contracts, Boundless makes funding secure, fast, and affordable. This global infrastructure enables builders and backers to connect without barriers.',
  },
];

const WhyBoundless = () => {
  return (
    <div
      className='w-full h-full md:py-20 py-5 px-6 md:px-10 xl:px-[100px]'
      id='how-boundless-work'
    >
      {/* Heading & Description */}
      <div className='max-w-4xl mx-auto text-center'>
        <h2 className='text-white text-3xl md:text-4xl xl:text-[48px] leading-[140%] tracking-wide'>
          Why Builders Choose Boundless
        </h2>
        <p className='mt-3 text-base md:text-lg leading-[160%] mx-auto max-w-xl gradient-text-2'>
          Boundless combines transparency, accountability, and accessibility,
          giving creators the tools to raise funds confidently and backers the
          security to support with trust.
        </p>
      </div>

      {/* Image + Feature Text */}
      <div className='mt-12  flex-col-reverse lg:flex-row justify-between items-center gap-10 hidden lg:flex'>
        <div className='w-full lg:w-1/2'>
          <Image
            src='/why.png'
            alt='why-boundless'
            width={800}
            height={600}
            unoptimized
            className='w-full h-auto rounded-lg'
          />
        </div>
        <div className='w-full lg:w-1/2 space-y-6 '>
          <div className='flex flex-col'>
            <UserCheck size={32} className='text-white' />
            <h4 className='text-white text-xl leading-[120%] font-medium mt-2 tracking-[-0.4px]'>
              Community Validation
            </h4>
          </div>
          <p className='text-[#B5B5B5] leading-[160%]'>
            Every project starts with open feedback and voting, allowing
            builders to refine their ideas and prove demand before funding
            begins.
          </p>
          <p className='text-[#B5B5B5] leading-[160%]'>
            This ensures that only projects with genuine potential and
            credibility move forward, giving backers greater confidence in where
            their support goes.
          </p>
        </div>
      </div>

      {/* Gradient Box with GIF */}
      <div className='mt-16'>
        <div
          className='border border-[rgba(255,255,255,0.48)] relative z-10 rounded-xl py-5 px-5 md:px-10 md:py-10'
          style={{
            background:
              'linear-gradient(258deg, rgba(167, 249, 80, 0.46) 53.09%, rgba(58, 230, 178, 0.92) 103.03%)',
          }}
        >
          <Image
            src='/why.gif'
            unoptimized
            alt='why-boundless'
            width={800}
            height={600}
            className='rounded-xl max-w-[754px] w-full h-auto mx-auto object-cover z-30'
          />
        </div>

        {/* Features Grid */}
        <div className='mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {/* <div className='w-full lg:w-1/2 space-y-6  lg:hidden'>
            <div className='flex flex-col'>
              <UserCheck size={32} className='text-white' />
              <h4 className='text-white text-xl leading-[120%] font-medium mt-2 tracking-[-0.4px]'>
                Community Validation
              </h4>
            </div>
            <p className='text-[#B5B5B5] leading-[160%]'>
              Every project starts with open feedback and voting, allowing
              builders to refine their ideas and prove demand before funding
              begins.
            </p>
            <p className='text-[#B5B5B5] leading-[160%]'>
              This ensures that only projects with genuine potential and
              credibility move forward, giving backers greater confidence in
              where their support goes.
            </p>
          </div> */}
          {features.map((feature, i) => (
            <div key={i} className='relative bg-[#101010] p-4 rounded-xl'>
              <div className='pointer-events-none absolute inset-0 rounded-xl border border-white/20 [mask-image:linear-gradient(to_bottom,white,rgba(255,255,255,0.3))]'></div>
              <div className='space-y-4 relative z-10'>
                <div className='flex flex-col'>
                  {feature.icon}
                  <h4 className='text-white leading-[145%] font-medium mt-2 tracking-[-0.4px]'>
                    {feature.title}
                  </h4>
                </div>
                <p className='text-[#B5B5B5] leading-[160%]'>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyBoundless;
