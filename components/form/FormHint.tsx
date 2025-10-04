'use client';

import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

type FormHintProps = {
  hint: React.ReactNode;
  className?: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  sideOffset?: number;
  iconClassName?: string;
};

export default function FormHint({
  hint,
  className,
  side = 'top',
  sideOffset = 6,
  iconClassName,
}: FormHintProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type='button'
          aria-label='Field help'
          className={cn(
            'inline-flex items-center justify-center rounded text-[#B5B5B5] hover:text-white focus:outline-none',
            className
          )}
        >
          <Info className={cn('mt-[3px] h-4 w-4', iconClassName)} />
        </button>
      </TooltipTrigger>
      <TooltipContent
        side={side}
        sideOffset={sideOffset}
        className='max-w-sm whitespace-normal'
      >
        {hint}
      </TooltipContent>
    </Tooltip>
  );
}
