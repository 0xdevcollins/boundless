'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { CampaignProgressFlow } from './campaign-progress-flow';
import { CampaignForm } from './campaign-form';

interface CampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CampaignModal({ isOpen, onClose }: CampaignModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className='max-w-4xl w-[95vw] sm:w-[90vw] md:w-full max-h-[95vh] bg-black border border-gray-800 p-0 mx-auto flex flex-col'
        showCloseButton={false}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className='absolute top-3 right-3 md:top-4 md:right-4 z-50 w-8 h-8 md:w-9 md:h-9 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors shadow-lg'
          aria-label='Close modal'
        >
          <X className='w-4 h-4 md:w-5 md:h-5 text-white' />
        </button>

        <div className='flex flex-col flex-1 min-h-0'>
          {/* Progress Flow - Horizontal on mobile, moved to top */}
          <div className='w-full bg-black border-b border-gray-800 md:hidden'>
            <CampaignProgressFlow />
          </div>

          <div className='flex flex-col md:flex-row flex-1 min-h-0'>
            {/* Progress Flow - Vertical on desktop, left sidebar */}
            <div className='hidden md:block w-80 bg-black border-r border-gray-800 p-8 flex-shrink-0'>
              <CampaignProgressFlow />
            </div>

            <div className='flex-1 bg-black min-h-0 flex flex-col'>
              <CampaignForm />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
