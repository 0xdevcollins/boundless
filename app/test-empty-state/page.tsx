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
      <div className='bg-black border-b border-gray-700'>
        <div className='px-4 sm:px-6 py-4 flex items-center justify-between'>
          <h1 className='text-white text-lg sm:text-xl font-bold'>
            Explore Boundless Projects
          </h1>
          <button
            className='lg:hidden text-gray-300 hover:text-white p-2'
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Controls */}
        <div className='px-4 sm:px-6 pb-4'>
          <div className='hidden lg:flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              {['Sort', 'Status', 'Category'].map(label => (
                <button
                  key={label}
                  className='flex items-center gap-1 text-gray-300 hover:text-white px-3 py-2 rounded border border-gray-600 transition-colors'
                >
                  <span className='text-sm'>{label}</span>
                  <ChevronDown size={16} />
                </button>
              ))}
            </div>
            <div className='relative'>
              <Search
                className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                size={16}
              />
              <input
                type='text'
                placeholder='Search project or creator...'
                className='w-80 bg-gray-800 text-white placeholder-gray-400 pl-10 pr-4 py-2 rounded-lg border border-gray-600 focus:border-green-400 focus:outline-none transition-colors'
              />
            </div>
          </div>

          {/* Mobile */}
          <div className='lg:hidden'>
            <div className='mb-4 relative'>
              <Search
                className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                size={16}
              />
              <input
                type='text'
                placeholder='Search project or creator...'
                className='w-full bg-gray-800 text-white placeholder-gray-400 pl-10 pr-4 py-2 rounded-lg border border-gray-600 focus:border-green-400 focus:outline-none transition-colors'
              />
            </div>

            <div className={`${mobileMenuOpen ? 'block' : 'hidden'} space-y-2`}>
              <div className='flex flex-col sm:flex-row gap-2'>
                {['Sort', 'Status', 'Category'].map(label => (
                  <button
                    key={label}
                    className='flex items-center justify-between text-gray-300 hover:text-white px-3 py-2 rounded transition-colors bg-gray-800 w-full sm:w-auto'
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
      <div className='flex-1 min-h-96 flex items-center justify-center p-4 sm:p-8'>
        <EmptyState
          title='No Projects'
          description='There are currently no projects here. Go ahead and create the first one!'
          buttonText='Add Project'
          onAddClick={handleAddProject}
          type='default'
        />
      </div>

      {/* Footer */}
      <div className='border-t border-gray-700 px-4 sm:px-6 py-6'>
        <div className='flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 text-sm text-gray-400'>
          <div className='flex items-center gap-2 mb-2 lg:mb-0'>
            <Image
              src='/test_footer_logo.png'
              alt='Logo'
              width={40}
              height={40}
            />
          </div>
          <div className='flex flex-col sm:flex-row gap-2 sm:gap-6'>
            <a href='#' className='hover:text-white transition-colors'>
              Terms of Service
            </a>
            <a href='#' className='hover:text-white transition-colors'>
              Privacy Policy
            </a>
          </div>
        </div>

        <div className='flex pt-5 flex-col lg:flex-row items-start lg:items-center justify-between gap-4 text-sm text-gray-400'>
          <span className='text-center lg:text-left leading-relaxed'>
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
                className='hover:text-white transition-colors'
              >
                <Icon className='w-5 h-5' />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
