import React from 'react';
import Link from 'next/link';
import { Github } from 'lucide-react';
import Image from 'next/image';

const MilestoneLinks = () => {
  return (
    <div className='!w-full space-y-5'>
      <div className='flex flex-col gap-3'>
        <Link
          className='hover:text-primary flex items-center gap-2 text-sm text-white'
          href='/demo'
        >
          <Github size={16} /> github.com/boundlessfi/milestone-1
        </Link>
        <Link
          className='hover:text-primary flex items-center gap-2 text-sm text-white'
          href='/demo'
        >
          <Github size={16} /> github.com/boundlessfi/milestone-1
        </Link>
        <Link
          className='hover:text-primary flex items-center gap-2 text-sm text-white'
          href='/demo'
        >
          <Github size={16} /> github.com/boundlessfi/milestone-1
        </Link>
        <Link
          className='hover:text-primary flex items-center gap-2 text-sm text-white'
          href='/demo'
        >
          <Github size={16} /> github.com/boundlessfi/milestone-1
        </Link>
      </div>
      <div className='flex flex-col gap-0'>
        <div
          key={1}
          className='flex cursor-pointer items-center justify-between rounded py-2 transition-colors hover:bg-gray-900/30'
          // onClick={() => handleMemberClick()}
        >
          <div className='flex items-center space-x-4'>
            <div className='relative'>
              <div className='h-12 w-12 overflow-hidden rounded-full border-[0.5px] border-[#2B2B2B]'>
                {true ? (
                  <Image
                    width={48}
                    height={48}
                    src={'/avatar.png'}
                    alt=''
                    className='h-full w-full object-cover'
                  />
                ) : (
                  <Image
                    width={48}
                    height={48}
                    src='/avatar.png'
                    alt='Default avatar'
                    className='h-full w-full object-cover'
                  />
                )}
              </div>
            </div>

            {/* Member Info */}
            <div className='flex flex-col space-y-0.5'>
              <span className='text-sm font-normal text-gray-500'>Project</span>
              <span className={`text-[#fff]`}>BitMed</span>
            </div>
          </div>

          {/* Chevron */}
          <svg
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M7.5 15L12.5 10L7.5 5'
              stroke='white'
              strokeWidth='1.4'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
        <div
          key={2}
          className='flex cursor-pointer items-center justify-between rounded py-2 transition-colors hover:bg-gray-900/30'
          // onClick={() => handleMemberClick()}
        >
          <div className='flex items-center space-x-4'>
            <div className='relative'>
              <div className='h-12 w-12 overflow-hidden rounded-full border-[0.5px] border-[#2B2B2B]'>
                {true ? (
                  <Image
                    width={48}
                    height={48}
                    src={'/avatar.png'}
                    alt=''
                    className='h-full w-full object-cover'
                  />
                ) : (
                  <Image
                    width={48}
                    height={48}
                    src='/avatar.png'
                    alt='Default avatar'
                    className='h-full w-full object-cover'
                  />
                )}
              </div>
            </div>

            {/* Member Info */}
            <div className='flex flex-col space-y-0.5'>
              <span className='text-base font-normal text-white'>John Doe</span>
              <span className={`text-sm text-[#DBF936]`}>OWNER</span>
            </div>
          </div>

          {/* Chevron */}
          <svg
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M7.5 15L12.5 10L7.5 5'
              stroke='white'
              strokeWidth='1.4'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default MilestoneLinks;
