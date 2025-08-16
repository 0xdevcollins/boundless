import React, { useEffect, useRef } from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet';
import { XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface BoundlessSheetProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title?: string;
  children?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  side?: 'top' | 'right' | 'bottom' | 'left';
  maxHeight?: string;
  minHeight?: string;
}

const BoundlessSheet: React.FC<BoundlessSheetProps> = ({
  open,
  setOpen,
  title,
  children,
  contentClassName,
  showCloseButton = true,
  side = 'bottom',
  maxHeight,
  minHeight = '400px',
}) => {
  const isMobile = useIsMobile();
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [open, setOpen]);

  const getResponsiveConfig = () => {
    if (isMobile) {
      return {
        side: 'bottom' as const,
        className:
          'w-[calc(100%-30px)] mx-auto   rounded-t-[20px] min-h-[300px] max-h-[85vh] px-4',
        closeButtonPosition: 'top-4 -right-0 ',
        maxHeight: '85vh',
      };
    }

    if (side === 'bottom') {
      return {
        side: 'bottom' as const,
        className:
          'w-[calc(100vw-120px)]  mx-auto rounded-t-[24px] min-h-[400px] !max-h-[95vh] px-4',
        closeButtonPosition: 'top-0 -right-16',
        maxHeight: '80vh',
      };
    }

    return {
      side,
      className:
        'w-[calc(100%-120px)] max-w-md mx-auto rounded-[16px] min-h-[400px] h-[100vh] px-4',
      closeButtonPosition: 'top-0 -right-16',
      maxHeight: '80vh',
    };
  };

  const responsiveConfig = getResponsiveConfig();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        ref={sheetRef}
        side={responsiveConfig.side}
        className={cn(
          'bg-[#030303] border-[rgba(255,255,255,0.10)] backdrop-blur-[10px]',
          'transition-all duration-300 ease-in-out',
          'focus:outline-none',
          responsiveConfig.className,
          contentClassName
        )}
        style={{
          maxHeight: maxHeight || responsiveConfig.maxHeight,
          minHeight: minHeight,
        }}
        showCloseButton={false}
      >
        <SheetHeader className='relative pb-4'>
          {title && (
            <SheetTitle className='text-white text-lg font-semibold text-center'>
              {title}
            </SheetTitle>
          )}

          {showCloseButton && (
            <SheetClose
              onClick={() => setOpen(false)}
              className={cn(
                'absolute bg-white hover:bg-white/20 rounded-full p-2',
                'w-10 h-10 flex items-center justify-center',
                'border border-white/20 backdrop-blur-[10px]',
                'transition-all duration-200 ease-in-out',
                'focus:outline-none focus:ring-2 focus:ring-white/30',
                'hover:scale-105 active:scale-95',
                'shadow-lg',
                responsiveConfig.closeButtonPosition
              )}
              aria-label='Close sheet'
            >
              <XIcon className='w-5 h-5 text-background' />
            </SheetClose>
          )}
        </SheetHeader>

        <div
          className={cn(
            'flex-1 overflow-y-auto',
            'slim-scrollbar',
            'px-4 pb-4'
          )}
        >
          {children}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BoundlessSheet;
