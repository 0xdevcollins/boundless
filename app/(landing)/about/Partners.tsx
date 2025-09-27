import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Partners = () => {
  return (
    <div className='text-center'>
      <h1 className='text-[32px] text-white md:text-4xl lg:text-5xl'>
        Backed by Trusted Partners
      </h1>
      <p
        className='mx-auto mt-2 bg-clip-text text-transparent'
        style={{
          backgroundImage:
            'linear-gradient(93.2deg, #B5B5B5 15.93%, #FFFFFF 73.28%)',
        }}
      >
        Want to collaborate?{' '}
        <Link href={''} className='text-primary underline'>
          Contact Us
        </Link>
      </p>
      <div className='mx-auto mt-11 grid w-full grid-cols-2 gap-2.5 sm:grid-cols-4 md:gap-4 lg:w-4/5 lg:gap-6 xl:w-2/3'>
        <div className='relative h-20 w-full cursor-pointer transition duration-300 hover:scale-105 md:h-25 md:w-42.5 lg:w-50'>
          <Image src='/onlydust.svg' alt='onlydust' fill />
        </div>
        <div className='relative h-20 w-full cursor-pointer transition duration-300 hover:scale-105 md:h-25 md:w-42.5 lg:w-50'>
          <Image
            src='/stellar-development.svg'
            alt='stellar-development'
            fill
          />
        </div>
        <div className='relative h-20 w-full cursor-pointer transition duration-300 hover:scale-105 md:h-25 md:w-42.5 lg:w-50'>
          <Image src='/stellar.svg' alt='stellar' fill />
        </div>
        <div className='relative h-20 w-full cursor-pointer transition duration-300 hover:scale-105 md:h-25 md:w-42.5 lg:w-50'>
          <Image src='/trustless.svg' alt='trustless' fill />
        </div>
      </div>
    </div>
  );
};

export default Partners;
