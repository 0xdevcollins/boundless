// components/DashboardLayout.tsx
import BeamBackground from '@/components/landing-page/BeamBackground';
import React, { ReactNode } from 'react';
type AboutLayoutProps = {
  children: ReactNode;
};

const AboutLayout = ({ children }: AboutLayoutProps) => {
  return (
    <section className='relative z-10 space-y-[23px] md:space-y-[80px] max-w-[1300px] mx-auto'>
      <BeamBackground />
      {children}
    </section>
  );
};

export default AboutLayout;
