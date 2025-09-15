'use client';

import React, { useState } from 'react';
import { Input } from '../ui/input';
import { BoundlessButton } from '../buttons';
import { Plus, Search, Menu } from 'lucide-react';
import { SidebarTrigger } from '../ui/sidebar';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeInUp, slideInFromLeft, slideInFromRight } from '@/lib/motion';
import WalletConnectButton from '../wallet/WalletConnectButton';
import { ProjectSheetFlow } from '../project';
import { useProjectSheetStore } from '@/lib/stores/project-sheet-store';

const Header = () => {
  const [open, setOpen] = useState(false);
  const sheet = useProjectSheetStore();

  return (
    <motion.header
      className='bg-transparent border-none flex flex-col sm:flex-row shrink-0 items-start sm:items-center gap-4 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 sticky top-0 z-50'
      initial='hidden'
      animate='visible'
      variants={fadeInUp}
    >
      {/* Mobile Menu Trigger - Only visible on mobile */}
      <motion.div
        className='flex items-center gap-3 w-full sm:hidden'
        variants={slideInFromLeft}
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <SidebarTrigger className='text-white hover:text-gray-300 transition-colors bg-[#2A2A2A] p-2 rounded-lg'>
            <Menu className='w-5 h-5' />
          </SidebarTrigger>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Image src='/logo.svg' alt='logo' width={100} height={100} />
        </motion.div>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        className='flex-1 flex items-center w-full sm:w-auto'
        variants={fadeInUp}
      >
        <div className='relative w-full max-w-md'>
          <motion.span
            className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Search className='w-4 h-4 sm:w-5 sm:h-5' />
          </motion.span>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Input
              type='text'
              placeholder='Search project...'
              className='pl-9 sm:pl-10 pr-4 py-2 rounded-xl bg-[#1C1C1C] border border-[#2B2B2B] text-white placeholder:text-gray-400 focus:ring-0 focus:outline-none w-full h-10 sm:h-9 shadow-none text-sm sm:text-base'
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className='flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto'
        variants={slideInFromRight}
      >
        {/* New Project Button */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <BoundlessButton
            variant='secondary'
            size='default'
            icon={<Plus className='w-4 h-4 sm:w-5 sm:h-5' />}
            iconPosition='right'
            onClick={() => {
              sheet.openInitialize();
              setOpen(true);
            }}
          >
            New Project
          </BoundlessButton>
        </motion.div>

        {/* Wallet Connect Button */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <WalletConnectButton
            variant='default'
            size='default'
            className='min-w-[140px] bg-[#101010] border border-[#2B2B2B] text-[#fff] hover:bg-[#101010] hover:border-[#2B2B2B]'
          />
        </motion.div>
      </motion.div>
      <ProjectSheetFlow
        open={open || sheet.open}
        onOpenChange={o => {
          setOpen(o);
          sheet.setOpen(o);
        }}
      />
    </motion.header>
  );
};

export default Header;
