"use client";

import React, { useRef } from "react";
import { useFadeGradient } from "@/hooks/use-fadegradient";

interface Props {
  className?: string;
  duration?: number;
  delay?: number;
}

export default function BackgroundOval3({
  className = "",
  duration = 1.5,
  delay = 0.4, // stagger slightly after Oval 2
}: Props) {
  const startRef = useRef<SVGStopElement | null>(null);
  const endRef = useRef<SVGStopElement | null>(null);

  useFadeGradient([startRef, endRef], duration, delay);

  return (
    <svg
      className={`absolute -translate-x-1/2 ${className}`}
      width="1240"
      height="353"
      viewBox="0 0 1240 353"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M700.5 0.5C960.985 0.5 1196.79 49.1794 1367.45 127.862C1538.15 206.565 1643.5 315.191 1643.5 435C1643.5 554.809 1538.15 663.435 1367.45 742.138C1196.79 820.821 960.985 869.5 700.5 869.5C440.015 869.5 204.214 820.821 33.5537 742.138C-137.149 663.435 -242.5 554.809 -242.5 435C-242.5 315.191 -137.149 206.565 33.5537 127.862C204.214 49.1794 440.015 0.5 700.5 0.5Z"
        stroke="url(#ovalGradient3)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      <defs>
        <linearGradient
          id="ovalGradient3"
          x1="700.5"
          y1="0"
          x2="700.5"
          y2="870"
          gradientUnits="userSpaceOnUse"
        >
          <stop ref={startRef} offset="0%" stopColor="#D9D9D900" stopOpacity="0" />
          <stop offset="80%" stopColor="#000000" stopOpacity="1" />
          <stop ref={endRef} offset="100%" stopColor="#D9D9D900" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
