// components/DashboardLayout.tsx
import React, { ReactNode } from 'react';
type TimelineLayoutProps = {
  children: ReactNode;
};

const TimelineLayout = ({ children }: TimelineLayoutProps) => {
  return (
    <main className='flex flex-col gap-8 overflow-hidden justify-center items-center px-5 relative min-h-screen'>
      {children}
    </main>
  );
};

export default TimelineLayout;
