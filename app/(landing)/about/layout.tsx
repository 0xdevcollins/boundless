// components/DashboardLayout.tsx
import BeamBackground from '@/components/landing-page/BeamBackground';
import React, { ReactNode } from 'react';
type AboutLayoutProps = {
  children: ReactNode;
};

const AboutLayout = ({ children }: AboutLayoutProps) => {
  return (
    <section>
      <BeamBackground />
      {children}
    </section>
  );
};

export default AboutLayout;
