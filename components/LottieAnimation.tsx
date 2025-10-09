'use client';

import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface LottieAnimationProps {
  src?: string;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
  width?: number | string;
  height?: number | string;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
  src = 'https://lottie.host/086e1916-d90c-4ef5-9ba8-93051fed0bd8/UjMFDTl4mh.lottie',
  loop = true,
  autoplay = true,
  className = '',
  width,
  height,
}) => {
  return (
    <div className={className} style={{ width, height }}>
      <DotLottieReact src={src} loop={loop} autoplay={autoplay} />
    </div>
  );
};

export default LottieAnimation;
