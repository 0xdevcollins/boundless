'use client';

import React, { useRef } from 'react';
import { useFadeGradient } from '@/hooks/use-fadegradient';

interface Props {
  className?: string;
  duration?: number;
  delay?: number;
}

export default function BackgroundOval2({
  className = '',
  duration = 1.5,
  delay = 0.2,
}: Props) {
  const startRef = useRef<SVGStopElement | null>(null);
  const endRef = useRef<SVGStopElement | null>(null);

  useFadeGradient([startRef, endRef], duration, delay);

  return (
    <svg
      className={`absolute -translate-x-1/2 rotate-170 ${className}`}
      width='1240'
      height='467'
      viewBox='0 0 1240 467'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M707 466.5C904.079 466.5 1082.48 412.629 1211.59 325.558C1340.71 238.484 1420.5 118.246 1420.5 -14.5C1420.5 -147.246 1340.71 -267.484 1211.59 -354.558C1082.48 -441.629 904.079 -495.5 707 -495.5C509.921 -495.5 331.521 -441.629 202.405 -354.558C73.2868 -267.484 -6.5 -147.246 -6.5 -14.5C-6.5 118.246 73.2868 238.484 202.405 325.558C331.521 412.629 509.921 466.5 707 466.5Z'
        stroke='url(#ovalGradient2)'
        strokeWidth='2.5'
        strokeLinecap='round'
      />

      <defs>
        <linearGradient
          id='ovalGradient2'
          x1='707'
          y1='467'
          x2='707'
          y2='-496'
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
