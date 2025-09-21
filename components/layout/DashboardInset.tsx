'use client';
import { ReactNode } from 'react';
import { SidebarInset, useSidebar } from '@/components/ui/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import Header from './header';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/motion';

export default function DashboardInset({ children }: { children: ReactNode }) {
  const { state } = useSidebar();

  return (
    <SidebarInset>
      <motion.div
        className={
          state === 'collapsed'
            ? 'fixed top-0 right-0 bottom-0 left-0 w-full overflow-hidden md:left-[3rem] md:w-[calc(100%-3rem)]'
            : 'fixed top-0 right-0 bottom-0 left-0 w-full overflow-hidden md:left-[16rem] md:w-[calc(100%-16rem)]'
        }
        initial='hidden'
        animate='visible'
        variants={fadeInUp}
      >
        <Header />
        <ScrollArea className='h-[calc(100%-88px)] w-full'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className='min-h-full'>{children}</div>
          </motion.div>
        </ScrollArea>
      </motion.div>
    </SidebarInset>
  );
}
