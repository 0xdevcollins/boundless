import Image from 'next/image';
import React from 'react';

const OurTeam = () => {
  return (
    <div>
      <p
        className='text-sm font-medium bg-clip-text text-transparent w-fit mx-auto'
        style={{
          backgroundImage:
            'linear-gradient(272.61deg, #A7F95080 13.84%, #3AE6B2 73.28%)',
        }}
      >
        Our Team
      </p>

      <h1 className='lg:text-5xl font-normal'>
        Meet the Brains Behind Boundless
      </h1>
      <p
        className='mt-2 bg-clip-text text-transparent text-center lg:w-2/5 mx-auto '
        style={{
          backgroundImage:
            'linear-gradient(93.2deg, #B5B5B5 15.93%, #FFFFFF 73.28%)',
        }}
      >
        A passionate team of innovators driving transparency, trust, and
        opportunity in Web3 funding.
      </p>
      <div className='mt-20 grid lg:grid-cols-2 lg:gap-16 gap-10 xl:gap-21'>
        <div className='flex items-center gap-6 w-full'>
          <div className='bg-[#D9D9D9] xl:w-75 lg:w-60 max-lg:w-75 h-82 rounded-xl cursor-pointer transition duration-300 hover:scale-105'></div>
          <div className='text-left flex-1'>
            <p className='font-medium text-2xl'>Collins Ikechukwu</p>
            <p className='font-medium italic text-[#B5B5B5] mt-2'>
              Blockchain Developer
            </p>
            <hr
              className='my-10 w-full h-[1px] border-0'
              style={{
                background:
                  'radial-gradient(113.1% 103.23% at 45.52% -1.51%, rgba(255, 255, 255, 0.4704) 0%, rgba(255, 255, 255, 0.0784) 100%)',
              }}
            />
            <p className='text-[#B5B5B5] mt-2'>
              A skilled blockchain developer with a focus on decentralized
              finance and smart contract solutions.
            </p>
            <div className='flex items-center gap-3.5 mt-10'>
              <div
                style={{
                  border: '1px solid',
                  background:
                    'radial-gradient(113.1% 103.23% at 45.52% -1.51%, rgba(255, 255, 255, 0.4704) 0%, rgba(255, 255, 255, 0.0784) 100%)',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                }}
                className='flex items-center justify-center cursor-pointer transition duration-300 hover:scale-105'
              >
                <Image
                  src={'/linkedin.svg'}
                  alt='linkedin'
                  width={20}
                  height={20}
                />
              </div>
              <div
                style={{
                  border: '1px solid',
                  background:
                    'radial-gradient(113.1% 103.23% at 45.52% -1.51%, rgba(255, 255, 255, 0.4704) 0%, rgba(255, 255, 255, 0.0784) 100%)',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                }}
                className='flex items-center justify-center cursor-pointer transition duration-300 hover:scale-105'
              >
                {' '}
                <Image src={'/X.svg'} alt='X' width={20} height={20} />
              </div>
            </div>
          </div>
        </div>
        <div className='flex items-center gap-6 w-full'>
          <div className='bg-[#D9D9D9] xl:w-75 lg:w-60 max-lg:w-75 h-82 rounded-xl cursor-pointer transition duration-300 hover:scale-105'></div>
          <div className='text-left flex-1'>
            <p className='font-medium text-2xl'>Nnaji Benjamin</p>
            <p className='font-medium italic text-[#B5B5B5] mt-2'>
              Full-Stack & Blockchain Developer
            </p>
            <hr
              className='mt-5 mb-10 w-full h-[1px] border-0'
              style={{
                background:
                  'radial-gradient(113.1% 103.23% at 45.52% -1.51%, rgba(255, 255, 255, 0.4704) 0%, rgba(255, 255, 255, 0.0784) 100%)',
              }}
            />

            <p className='text-[#B5B5B5] mt-2'>
              A versatile full-stack and blockchain developer with strong
              experience across Web3 platforms.
            </p>
            <div className='flex items-center gap-3.5 mt-10'>
              <div
                style={{
                  border: '1px solid',
                  background:
                    'radial-gradient(113.1% 103.23% at 45.52% -1.51%, rgba(255, 255, 255, 0.4704) 0%, rgba(255, 255, 255, 0.0784) 100%)',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                }}
                className='flex items-center justify-center cursor-pointer transition duration-300 hover:scale-105'
              >
                <Image
                  src={'/linkedin.svg'}
                  alt='linkedin'
                  width={20}
                  height={20}
                />
              </div>
              <div
                style={{
                  border: '1px solid',
                  background:
                    'radial-gradient(113.1% 103.23% at 45.52% -1.51%, rgba(255, 255, 255, 0.4704) 0%, rgba(255, 255, 255, 0.0784) 100%)',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                }}
                className='flex items-center justify-center cursor-pointer transition duration-300 hover:scale-105'
              >
                {' '}
                <Image src={'/X.svg'} alt='X' width={20} height={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurTeam;
