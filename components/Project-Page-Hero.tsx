'use client';
import React from 'react';
import Image from 'next/image';
import { ArrowDown } from 'lucide-react';
import { BoundlessButton } from './buttons/BoundlessButton';
import Link from 'next/link';

export default function ProjectPageHero() {
  return (
    <div className='relative min-h-screen overflow-hidden text-white'>
      <div className='pointer-events-none absolute inset-0'>
        <div className='absolute bottom-1/3 left-[220px] h-[393px] w-[476px] rounded-[476px] border-[20px] border-[#DBFFB7] opacity-[0.30px] mix-blend-overlay blur-[25px] md:block lg:!hidden' />
        <div
          className='absolute bottom-1/3 left-[200px] h-[397px] w-[493px] rounded-[493px] border-[100px] border-[#6DC01A] opacity-[0.15px] mix-blend-hard-light blur-[100px] md:block lg:!hidden'
          style={{
            background:
              'linear-gradient(270deg, rgba(3, 3, 3, 0.00) 0%, rgba(109, 192, 26, 0.64) 100%)',
          }}
        />
        <div
          className='absolute top-1/4 left-[100px] h-[560px] w-[696px] rounded-[696px] bg-[#A7F950] opacity-10 blur-[140px] md:block lg:!hidden'
          style={{
            background:
              'linear-gradient(270deg, rgba(3, 3, 3, 0.00) 0%, rgba(167, 249, 80, 0.64) 100%)',
          }}
        />
      </div>

      <div className='relative z-10'>
        <div className='mx-auto grid min-h-[85vh] max-w-[1300px] items-center gap-6 space-y-[60px] md:grid-cols-2 md:gap-8 md:space-y-[80px] lg:gap-12'>
          <div className='z-10 space-y-6 text-left md:space-y-6 lg:space-y-8'>
            <h1 className='text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-4xl lg:text-5xl'>
              <span className='bg-gradient-to-r from-[#3AE6B2] to-[#A7F95080] bg-clip-text text-transparent'>
                Discover projects
              </span>
              <br />
              <span className='text-white'>that are shaping</span>
              <br />
              <span className='text-white'>the future on Stellar</span>
            </h1>

            <p className='max-w-[300px] text-base font-normal text-white md:max-w-[350px] lg:max-w-[400px]'>
              Validated by the community. Backed milestone by milestone.
            </p>

            <Link href='#explore-project'>
              <BoundlessButton
                size='xl'
                className='group relative transform rounded-lg bg-[#A7F950] px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#A7F950]/25 md:px-7 md:py-3.5 md:text-base lg:px-8 lg:py-4 lg:text-base'
              >
                <span className='flex items-center gap-2'>
                  Start Exploring Projects
                  <ArrowDown className='h-4 w-4 transition-transform group-hover:translate-y-1 md:h-4 md:w-4 lg:h-5 lg:w-5' />
                </span>
              </BoundlessButton>
            </Link>
          </div>

          <div className='relative hidden h-[60vh] md:block lg:h-[70vh]'>
            <div className='relative mx-auto w-full'>
              <div className='h-full w-full overflow-hidden rounded-2xl bg-black shadow-2xl shadow-black/80'>
                <div className='relative h-full w-full'>
                  <Image
                    src='/projects.png'
                    alt='Project cards showcase'
                    width={520}
                    height={580}
                    className='h-auto w-full rounded-lg object-cover'
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className='bg-gradient-radial pointer-events-none absolute inset-0 hidden rounded-lg from-transparent via-transparent to-black md:block'
            style={{
              background:
                'linear-gradient(0deg, #030303 0%, rgba(3, 3, 3, 0.80) 20%, rgba(3, 3, 3, 0.44) 41.63%, rgba(3, 3, 3, 0.02) 55.9%, rgba(3, 3, 3, 0.90) 80%, #030303 100%)',
            }}
          />
          <div
            className='bg-gradient-radial pointer-events-none absolute inset-0 hidden rounded-lg from-transparent via-transparent to-black md:block'
            style={{
              background:
                'linear-gradient(270deg, #030303 0%, rgba(3, 3, 3, 0.24) 18%, rgba(3, 3, 3, 0.24) 40%, #030303 53.9%, rgba(3, 3, 3, 0.00) 100%)',
            }}
          />

          <div className='md:hidden lg:hidden'>
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
