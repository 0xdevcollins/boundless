'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '@/lib/utils';

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot='progress'
      className={cn(
        'bg-primary/20 relative h-2 w-full overflow-hidden rounded-full',
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot='progress-indicator'
        className='h-full w-full flex-1 transition-all rounded-full'
        style={{
          transform: `translateX(-${100 - (value || 0)}%)`,
          backgroundImage:
            'linear-gradient(to right, rgba(167, 249, 80, 0.5) 0%, rgba(167, 249, 80, 0.6) 20%, rgba(167, 249, 80, 0.7) 40%, rgba(167, 249, 80, 0.8) 60%, rgba(167, 249, 80, 0.9) 80%, rgba(167, 249, 80, 1) 100%)',
        }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
