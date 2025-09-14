'use client';
import React, { useRef } from 'react';
import { useFadeGradient } from '@/hooks/use-fadegradient';

interface Props {
  className?: string;
  duration?: number;
  delay?: number;
}

export default function AnimatedOval({
  className = '',
  duration = 1.5,
  delay = 0,
}: Props) {
  const startRef = useRef<SVGStopElement | null>(null);
  const endRef = useRef<SVGStopElement | null>(null);

  useFadeGradient([startRef, endRef], duration, delay);

  return (
    <svg
      className={`absolute -translate-y-1/2 rotate-180 ${className}`}
      width='1224'
      height='339'
      viewBox='0 0 1224 339'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M682 0.5C870.25 0.5 1040.66 48.3868 1163.98 125.782C1287.31 203.182 1363.5 310.045 1363.5 428C1363.5 545.955 1287.31 652.818 1163.98 730.218C1040.66 807.613 870.25 855.5 682 855.5C493.75 855.5 323.345 807.613 200.019 730.218C76.6857 652.818 0.5 545.955 0.5 428C0.5 310.045 76.6857 203.182 200.019 125.782C323.345 48.3868 493.75 0.5 682 0.5Z'
        stroke='url(#ovalGradient1)'
        strokeWidth='2.5'
        strokeLinecap='round'
      />

      <defs>
        <linearGradient
          id='ovalGradient1'
          x1='682'
          y1='0'
          x2='682'
          y2='856'
          gradientUnits='userSpaceOnUse'
        >
          <stop
            ref={startRef}
            offset='0%'
            stopColor='#D9D9D900'
            stopOpacity='0'
          />
          <stop offset='80%' stopColor='#000000' stopOpacity='1' />
          <stop
            ref={endRef}
            offset='100%'
            stopColor='#D9D9D900'
            stopOpacity='0'
          />
        </linearGradient>
      </defs>
    </svg>
  );
}
