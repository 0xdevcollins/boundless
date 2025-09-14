import Image from 'next/image';
import React from 'react';

interface props {
  img: string;
  year: string;
  title: string;
  subTitle: string;
  backgroundImage: string;
}

const TimelineCard = ({
  img,
  year,
  title,
  subTitle,
  backgroundImage,
}: props) => {
  return (
    <article
      className={`${backgroundImage} time-card-general-background-positioning px-6 pt-6 pb-[91px] flex flex-col gap-20 min-w-[350px] min-h-[400px] max-w-[550px] max-h-[480px] rounded-lg bg-[#101010] text-white`}
    >
      <div className='flex justify-between items-center'>
        <div className='my-gradient-box flex h-20 w-20 items-center justify-center rounded-xl'>
          <Image
            src={img}
            width={48}
            height={48}
            className='size-12'
            alt='Yellow Bulb'
          />
        </div>

        <p className='uppercase tracking-[-2%] text-base font-medium leading-[120%]'>
          {year}
        </p>
      </div>
      <div className='flex flex-col gap-11'>
        <h2 className='uppercase leading-[120%] tracking-[-2%] text-2xl font-medium'>
          {title}
        </h2>
        <p className='text-base font-normal leading-[160%] text-[#B5B5B5]'>
          {subTitle}
        </p>
      </div>
    </article>
  );
};

export default TimelineCard;
