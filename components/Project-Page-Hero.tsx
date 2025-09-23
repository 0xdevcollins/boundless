import React from 'react';
import Image from 'next/image';
import { ArrowDown } from 'lucide-react';

export default function ProjectPageHero() {
  return (
    <div className='relative min-h-screen overflow-hidden bg-black text-white'>
      {/* Subtle Background Effects */}
      <div className='pointer-events-none absolute inset-0'>
        <div className='absolute top-1/4 right-1/4 h-[300px] w-[300px] bg-[#A7F950] opacity-10 blur-[100px]' />
        <div className='absolute bottom-1/3 left-1/3 h-[250px] w-[250px] bg-[#A7F950] opacity-8 blur-[80px]' />
      </div>

      <div className='relative z-10 container mx-auto px-4 py-8 sm:px-6 lg:px-8 lg:py-16'>
        <div className='grid min-h-[85vh] items-center gap-6 md:grid-cols-2 lg:gap-12'>
          {/* Left Content Section */}
          <div className='space-y-6 text-center lg:space-y-8 lg:text-left'>
            <h1 className='text-3xl leading-[1.1] font-bold tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl'>
              <span className='bg-gradient-to-r from-[#A7F950] to-[#3AE6B2] bg-clip-text text-transparent'>
                Discover projects
              </span>
              <br />
              <span className='text-white'>that are shaping</span>
              <br />
              <span className='text-white'>the future on Stellar</span>
            </h1>

            <p className='mx-auto max-w-md text-base font-normal text-white sm:text-lg lg:mx-0 lg:text-xl'>
              Validated by the community. Backed milestone by milestone.
            </p>

            <button className='group relative transform rounded-lg bg-[#A7F950] px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#A7F950]/25 lg:px-8 lg:py-4 lg:text-base'>
              <span className='flex items-center gap-2'>
                Start Exploring Projects
                <ArrowDown className='h-4 w-4 transition-transform group-hover:translate-y-1 lg:h-5 lg:w-5' />
              </span>
            </button>
          </div>

          {/* Right Cards Section - Desktop */}
          <div className='relative hidden md:block'>
            <div className='relative mx-auto w-full max-w-[580px]'>
              {/* Dark container with spotlight effect */}
              <div className='overflow-hidden rounded-2xl bg-black p-8 shadow-2xl shadow-black/80'>
                <div className='relative'>
                  <Image
                    src='/projects.png'
                    alt='Project cards showcase'
                    width={520}
                    height={580}
                    className='h-auto w-full rounded-lg'
                    priority
                  />
                  {/* Spotlight effect - dark edges, bright center */}
                  <div
                    className='bg-gradient-radial pointer-events-none absolute inset-0 rounded-lg from-transparent via-transparent to-black'
                    style={{
                      background:
                        'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.4) 60%, black 85%)',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Cards Section */}
          <div className='md:hidden'>
            <div className='mx-auto max-w-sm overflow-hidden rounded-xl border border-[#1A1A1A] bg-black p-6 shadow-2xl shadow-black/80'>
              <div className='relative'>
                <Image
                  src='/projects-mobile.png'
                  alt='Project cards showcase'
                  width={320}
                  height={420}
                  className='h-auto w-full rounded-lg'
                  priority
                />
                {/* Spotlight effect for mobile - dark edges, bright center */}
                <div
                  className='pointer-events-none absolute inset-0 rounded-lg'
                  style={{
                    background:
                      'radial-gradient(circle at center, transparent 25%, rgba(0,0,0,0.5) 55%, black 80%)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
