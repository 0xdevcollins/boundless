import Image from 'next/image';
import React from 'react';

const OurTeam = () => {
  return (
    <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12'>
      {/* Header Section */}
      <div className='text-center mb-12 md:mb-16 lg:mb-20'>
        <p
          className='text-sm md:text-base font-medium bg-clip-text text-transparent w-fit mx-auto mb-4'
          style={{
            backgroundImage:
              'linear-gradient(272.61deg, #A7F95080 13.84%, #3AE6B2 73.28%)',
          }}
        >
          Our Team
        </p>

        <h1 className='text-white text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal leading-tight mb-4'>
          Meet the Brains Behind Boundless
        </h1>
        <p
          className='bg-clip-text text-transparent text-center text-sm sm:text-base md:text-lg max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto leading-relaxed'
          style={{
            backgroundImage:
              'linear-gradient(93.2deg, #B5B5B5 15.93%, #FFFFFF 73.28%)',
          }}
        >
          A passionate team of innovators driving transparency, trust, and
          opportunity in Web3 funding.
        </p>
      </div>

      {/* Team Members Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 xl:gap-20'>
        {/* Team Member 1 */}
        <div className='flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6 w-full'>
          <div className='bg-[#D9D9D9] w-48 h-48 sm:w-56 sm:h-56 md:w-60 md:h-60 lg:w-64 lg:h-64 xl:w-72 xl:h-72 rounded-xl cursor-pointer transition duration-300 hover:scale-105 flex-shrink-0'></div>
          <div className='text-center sm:text-left flex-1 w-full'>
            <h3 className='font-medium text-xl md:text-2xl text-white mb-2'>
              Collins Ikechukwu
            </h3>
            <p className='font-medium italic text-[#B5B5B5] text-sm md:text-base mb-4 md:mb-6'>
              Blockchain Developer
            </p>
            <hr
              className='w-full h-[1px] border-0 mb-4 md:mb-6'
              style={{
                background:
                  'radial-gradient(113.1% 103.23% at 45.52% -1.51%, rgba(255, 255, 255, 0.4704) 0%, rgba(255, 255, 255, 0.0784) 100%)',
              }}
            />
            <p className='text-[#B5B5B5] text-sm md:text-base leading-relaxed mb-6 md:mb-8'>
              A skilled blockchain developer with a focus on decentralized
              finance and smart contract solutions.
            </p>
            <div className='flex items-center justify-center sm:justify-start gap-3 md:gap-4'>
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
                <Image src={'/X.svg'} alt='X' width={20} height={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Team Member 2 */}
        <div className='flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6 w-full'>
          <div className='bg-[#D9D9D9] w-48 h-48 sm:w-56 sm:h-56 md:w-60 md:h-60 lg:w-64 lg:h-64 xl:w-72 xl:h-72 rounded-xl cursor-pointer transition duration-300 hover:scale-105 flex-shrink-0'></div>
          <div className='text-center sm:text-left flex-1 w-full'>
            <h3 className='font-medium text-xl md:text-2xl text-white mb-2'>
              Nnaji Benjamin
            </h3>
            <p className='font-medium italic text-[#B5B5B5] text-sm md:text-base mb-4 md:mb-6'>
              Full-Stack & Blockchain Developer
            </p>
            <hr
              className='w-full h-[1px] border-0 mb-4 md:mb-6'
              style={{
                background:
                  'radial-gradient(113.1% 103.23% at 45.52% -1.51%, rgba(255, 255, 255, 0.4704) 0%, rgba(255, 255, 255, 0.0784) 100%)',
              }}
            />
            <p className='text-[#B5B5B5] text-sm md:text-base leading-relaxed mb-6 md:mb-8'>
              A versatile full-stack and blockchain developer with strong
              experience across Web3 platforms.
            </p>
            <div className='flex items-center justify-center sm:justify-start gap-3 md:gap-4'>
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
