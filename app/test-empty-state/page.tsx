'use client';

import React, { useState } from 'react';
import EmptyState from '@/components/EmptyState';
import { Menu, ChevronDown, Search } from 'lucide-react';
import {
  FaDiscord,
  FaTelegramPlane,
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import Image from 'next/image';

export default function TestEmptyStatePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAddProject = () => alert('Add Project clicked!');

  const socialIcons = [
    { Icon: FaDiscord, href: 'https://discord.com' },
    { Icon: FaTelegramPlane, href: 'https://t.me' },
    { Icon: FaGithub, href: 'https://github.com' },
    { Icon: FaLinkedin, href: 'https://linkedin.com' },
    { Icon: FaTwitter, href: 'https://x.com' },
    { Icon: SiGmail, href: 'mailto:example@gmail.com' },
  ];

  return (
    <div className='min-h-screen bg-black'>
      {/* Header */}
      <div className='border-b border-gray-700 bg-black'>
        <div className='flex items-center justify-between px-4 py-4 sm:px-6'>
          <h1 className='text-lg font-bold text-white sm:text-xl'>
            Explore Boundless Projects
          </h1>
          <button
            className='p-2 text-gray-300 hover:text-white lg:hidden'
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Controls */}
        <div className='px-4 pb-4 sm:px-6'>
          <div className='hidden items-center justify-between lg:flex'>
            <div className='flex items-center gap-3'>
              {['Sort', 'Status', 'Category'].map(label => (
                <button
                  key={label}
                  className='flex items-center gap-1 rounded border border-gray-600 px-3 py-2 text-gray-300 transition-colors hover:text-white'
                >
                  <span className='text-sm'>{label}</span>
                  <ChevronDown size={16} />
                </button>
              ))}
            </div>
            <div className='relative'>
              <Search
                className='absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400'
                size={16}
              />
              <input
                type='text'
                placeholder='Search project or creator...'
                className='w-80 rounded-lg border border-gray-600 bg-gray-800 py-2 pr-4 pl-10 text-white placeholder-gray-400 transition-colors focus:border-green-400 focus:outline-none'
              />
            </div>
          </div>

          {/* Mobile */}
          <div className='lg:hidden'>
            <div className='relative mb-4'>
              <Search
                className='absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400'
                size={16}
              />
              <input
                type='text'
                placeholder='Search project or creator...'
                className='w-full rounded-lg border border-gray-600 bg-gray-800 py-2 pr-4 pl-10 text-white placeholder-gray-400 transition-colors focus:border-green-400 focus:outline-none'
              />
            </div>

            <div className={`${mobileMenuOpen ? 'block' : 'hidden'} space-y-2`}>
              <div className='flex flex-col gap-2 sm:flex-row'>
                {['Sort', 'Status', 'Category'].map(label => (
                  <button
                    key={label}
                    className='flex w-full items-center justify-between rounded bg-gray-800 px-3 py-2 text-gray-300 transition-colors hover:text-white sm:w-auto'
                  >
                    <span className='text-sm'>{label}</span>
                    <ChevronDown size={16} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className='flex min-h-96 flex-1 items-center justify-center p-4 sm:p-8'>
        <EmptyState
          title='No Projects'
          description='There are currently no projects here. Go ahead and create the first one!'
          buttonText='Add Project'
          onAddClick={handleAddProject}
          type='default'
        />
      </div>

      {/* Footer */}
      <div className='border-t border-gray-700 px-4 py-6 sm:px-6'>
        <div className='flex flex-col items-start justify-between gap-4 text-sm text-gray-400 lg:flex-row lg:items-center'>
          <div className='mb-2 flex items-center gap-2 lg:mb-0'>
            <Image
              src='/test_footer_logo.png'
              alt='Logo'
              width={40}
              height={40}
            />
          </div>
          <div className='flex flex-col gap-2 sm:flex-row sm:gap-6'>
            <a href='#' className='transition-colors hover:text-white'>
              Terms of Service
            </a>
            <a href='#' className='transition-colors hover:text-white'>
              Privacy Policy
            </a>
          </div>
        </div>

        <div className='flex flex-col items-start justify-between gap-4 pt-5 text-sm text-gray-400 lg:flex-row lg:items-center'>
          <span className='text-center leading-relaxed lg:text-left'>
            © 2023 Boundless — Transparent, Community-Driven, Web3-Native
            Funding
          </span>
          <div className='flex items-center gap-3 text-gray-600'>
            {socialIcons.map(({ Icon, href }, idx) => (
              <a
                key={idx}
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                className='transition-colors hover:text-white'
              >
                <Icon className='h-5 w-5' />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
