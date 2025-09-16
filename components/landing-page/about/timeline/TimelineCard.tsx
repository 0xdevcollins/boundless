import Image from 'next/image';
import React from 'react';

interface props {
  img: string;
  year: string;
  title: string;
  subTitle: string;
  backgroundImage: string;
  isActive?: boolean;
}

const TimelineCard = ({
  img,
  year,
  title,
  subTitle,
  backgroundImage,
  isActive = false,
}: props) => {
  return (
    <div className='relative'>
      {/* Blur gradient background */}
      <div
        className='blur-[15px] rounded-[12px] mix-blend-hard-light absolute -inset-0.5 z-0 '
        style={{
          background:
            'linear-gradient(273deg, rgba(167, 249, 80, 0.10) 93.84%, rgba(58, 230, 178, 0.4) 3.28%)',
        }}
      />

      {/* Article content */}
      <article
        className={`${backgroundImage} relative z-10 time-card-general-background-positioning px-6 pt-6 pb-8 md:pb-[91px] flex flex-col gap-8 md:gap-20 min-h-[350px] md:min-h-[400px] w-full rounded-lg bg-[#101010] text-white overflow-hidden`}
      >
        <div className='flex justify-between items-center'>
          <div className='my-gradient-box flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-xl'>
            <Image
              src={img}
              width={48}
              height={48}
              className='size-10 md:size-12'
              alt='Timeline Icon'
            />
          </div>

          <p
            className='uppercase tracking-[-2%] text-sm md:text-base font-medium leading-[120%] text-transparent bg-clip-text'
            style={{
              backgroundImage:
                'linear-gradient(273deg, rgba(167, 249, 80, 0.80) 13.84%, #3AE6B2 73.28%)',
            }}
          >
            {year}
          </p>
        </div>
        <div className='flex flex-col gap-6 md:gap-11'>
          <h2 className='uppercase leading-[120%] tracking-[-2%] text-xl md:text-2xl font-medium'>
            {title}
          </h2>
          {isActive && (
            <p className='text-sm md:text-base font-normal leading-[160%] text-[#B5B5B5]'>
              {subTitle}
            </p>
          )}
        </div>
      </article>
    </div>
  );
};

export default TimelineCard;
