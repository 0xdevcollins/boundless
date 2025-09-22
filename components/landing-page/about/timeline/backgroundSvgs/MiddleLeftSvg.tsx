import React from 'react';

interface MiddleLeftSvgProps {
  svgRefs: React.MutableRefObject<(SVGPathElement | null)[]>;
}

const MiddleLeftSvg: React.FC<MiddleLeftSvgProps> = ({ svgRefs }) => {
  return (
    <div className='absolute top-1/2 hidden -translate-y-1/2 md:-left-8 md:block lg:left-8 xl:left-64'>
      <svg
        width='352'
        height='58'
        viewBox='0 0 352 58'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          ref={(el: SVGPathElement | null) => {
            svgRefs.current[2] = el;
          }}
          d='M1 57H283.521L323 1H351'
          stroke='url(#paint0_linear_2191_14143)'
          strokeOpacity='0.9'
          strokeWidth='2'
          strokeLinecap='round'
        />
        <defs>
          <linearGradient
            id='paint0_linear_2191_14143'
            x1='1'
            y1='57.4148'
            x2='258.886'
            y2='211.853'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#030303' />
            <stop offset='0.278845' stopColor='#18A15F' stopOpacity='0.7' />
            <stop offset='0.505629' stopColor='#24FF95' />
            <stop offset='1' stopColor='#030303' />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default MiddleLeftSvg;
