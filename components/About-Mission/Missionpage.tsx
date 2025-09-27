'use client';

import { useRef } from 'react';
import AboutUsMission from './Aboutmissionbg';
import MissionText from './text';

interface MissionPageProps {
  className?: string;
}

export default function MissionPage({ className = '' }: MissionPageProps) {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className={`bg-background relative mx-6 my-5 h-full min-h-[80vh] overflow-hidden text-white md:mx-12 md:my-16 lg:mx-[100px] ${className}`}
      id='mission'
      role='region'
      aria-labelledby='mission-heading'
    >
      <div className='absolute inset-0 z-0' aria-hidden='true'>
        <AboutUsMission />
      </div>

      <div className='absolute inset-0 z-10 flex min-h-[60vh] items-center justify-center'>
        <MissionText />
      </div>
    </section>
  );
}
