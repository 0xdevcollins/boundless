'use client';

import { useMemo } from 'react';
import Image from 'next/image';

interface AboutUsDifferentProps {
  className?: string;
}

interface FeatureCard {
  id: string;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  gridClass?: string;
}

function AboutUsDifferent({ className = '' }: AboutUsDifferentProps) {
  const features = useMemo<FeatureCard[]>(
    () => [
      {
        id: 'validation-first',
        title: 'Validation First',
        description:
          'Ideas are filtered through community-driven voting and feedback before funds are raised.',
        image: {
          src: 'card1.svg',
          alt: 'Validation First - Community-driven idea validation process',
          width: 520,
          height: 241,
        },
        gridClass: 'lg:col-span-4',
      },
      {
        id: 'milestone-escrow',
        title: 'Milestone Escrow',
        description:
          'Backers are protected. Funds are only released when project milestones are achieved and verified.',
        image: {
          src: 'card2.svg',
          alt: 'Milestone Escrow - Secure milestone-based funding system',
          width: 452,
          height: 205,
        },
        gridClass: 'lg:col-span-3',
      },
      {
        id: 'inclusive-growth',
        title: 'Inclusive Growth',
        description:
          'Crowdfunding, grants, and hackathons all opportunities in one ecosystem.',
        image: {
          src: 'card3.svg',
          alt: 'Inclusive Growth - Multiple funding opportunities in one platform',
          width: 452,
          height: 205,
        },
        gridClass: 'lg:col-span-3',
      },
      {
        id: 'blockchain-powered',
        title: 'Blockchain-Powered',
        description:
          'Built on Stellar and integrated with Trustless Work for secure, transparent funding.',
        image: {
          src: 'card4.svg',
          alt: 'Blockchain-Powered - Stellar blockchain integration for secure funding',
          width: 620,
          height: 258,
        },
        gridClass: 'lg:col-span-4',
      },
    ],
    []
  );

  return (
    <section
      className={`relative mx-6 my-5 flex flex-col items-center gap-8 overflow-hidden md:mx-12 md:my-16 lg:mx-[100px] ${className}`}
      id='what-makes-different'
      role='region'
      aria-labelledby='different-heading'
    >
      <Image
        src='bg-header-about.svg'
        alt=''
        width={1240}
        height={1324}
        className='absolute -top-12 left-1/2 h-auto w-full max-w-none -translate-x-1/2 transform'
        priority
        quality={85}
        sizes='100vw'
        aria-hidden='true'
      />

      <header className='relative mt-[130px] flex w-full items-center justify-center pb-4 md:pb-6'>
        <h2
          id='different-heading'
          className='text-center text-2xl leading-tight font-normal text-white sm:text-3xl md:text-4xl lg:text-5xl'
        >
          What Makes Boundless
          <br className='sm:hidden' />
          <span className='hidden sm:inline'> </span>Different
        </h2>
      </header>

      <div
        className='grid w-full grid-cols-1 gap-4 md:gap-6 lg:grid-cols-7 lg:grid-rows-2'
        role='list'
        aria-label='Key features that make Boundless different'
      >
        {features.map(feature => (
          <article
            key={feature.id}
            className={`flex h-full w-full flex-col items-center gap-4 rounded-[12px] border border-white/48 p-4 backdrop-blur-[7px] md:gap-6 md:p-6 ${
              'bg-[#101010A3] bg-[url("/card-bg.svg")] bg-center bg-no-repeat'
              //  'bg-black/85 bg-[url("/card-bg.svg")] bg-center bg-no-repeat backdrop-blur-2xl'
            } ${feature.gridClass || ''}`}
            role='listitem'
            aria-labelledby={`${feature.id}-title`}
          >
            <div
              className='flex h-[200px] w-full flex-shrink-0 items-center justify-center md:h-[240px]'
              style={{ maxWidth: `${feature.image.width}px` }}
            >
              <Image
                src={feature.image.src}
                width={feature.image.width}
                height={feature.image.height}
                alt={feature.image.alt}
                className='h-auto max-h-full w-full max-w-full object-contain'
                loading='lazy'
                quality={90}
              />
            </div>
            <div className='flex flex-grow flex-col gap-2 px-4 py-4 md:gap-2.5 md:px-8 md:py-6'>
              <h3
                id={`${feature.id}-title`}
                className='text-base font-semibold text-white md:text-lg'
              >
                {feature.title}
              </h3>
              <p className='text-stepper-text-inactive text-sm leading-relaxed font-normal md:text-base'>
                {feature.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default AboutUsDifferent;
