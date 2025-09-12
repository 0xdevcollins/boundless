import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Partners = () => {
  return (
    <div className='text-center'>
      <h1 className='lg:text-5xl md:text-4xl text-[32px] text-white'>
        Backed by Trusted Partners
      </h1>
      <p
        className='mt-2 bg-clip-text text-transparent mx-auto'
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
      <div className='mt-11 xl:w-2/3 lg:w-4/5 mx-auto lg:gap-6 md:gap-4 gap-2.5 w-full grid sm:grid-cols-4 grid-cols-2'>
        <div className='lg:w-50 md:w-42.5 w-full md:h-25 h-20 relative cursor-pointer transition duration-300 hover:scale-105'>
          <Image src='/onlydust.svg' alt='onlydust' fill />
        </div>
        <div className='lg:w-50 md:w-42.5 w-full md:h-25 h-20 relative cursor-pointer transition duration-300 hover:scale-105'>
          <Image
            src='/stellar-development.svg'
            alt='stellar-development'
            fill
          />
        </div>
        <div className='lg:w-50 md:w-42.5 w-full md:h-25 h-20 relative cursor-pointer transition duration-300 hover:scale-105'>
          <Image src='/stellar.svg' alt='stellar' fill />
        </div>
        <div className='lg:w-50 md:w-42.5 w-full md:h-25 h-20 relative cursor-pointer transition duration-300 hover:scale-105'>
          <Image src='/trustless.svg' alt='trustless' fill />
        </div>
      </div>
    </div>
  );
};

export default Partners;
