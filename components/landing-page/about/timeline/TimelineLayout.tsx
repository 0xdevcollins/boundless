'use client';

import { ReactNode } from 'react';

interface TimelineLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function TimelineLayout({
  children,
  className = '',
}: TimelineLayoutProps) {
  return (
    <main
      className={`relative flex min-h-screen flex-col items-center justify-center gap-8 overflow-hidden px-5 ${className}`}
      role='main'
      aria-label='Timeline section'
    >
      {children}
    </main>
  );
}
