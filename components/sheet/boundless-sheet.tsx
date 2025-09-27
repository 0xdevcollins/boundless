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
  size?: 'default' | 'large' | 'xl';
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
  size = 'default',
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
          'w-[calc(100%-30px)] mx-auto rounded-t-[20px] min-h-[300px] max-h-[85vh] px-0',
        closeButtonPosition: 'top-4 -right-0 ',
        maxHeight: '85vh',
      };
    }

    if (side === 'bottom') {
      let widthClass = 'w-[calc(100vw-120px)]';
      let maxWidth = 'max-w-[1032px]';

      if (size === 'large') {
        widthClass = 'w-[calc(100vw-80px)]';
        maxWidth = 'max-w-4xl';
      } else if (size === 'xl') {
        widthClass = 'w-[calc(100vw-40px)]';
        maxWidth = 'max-w-6xl';
      }

      return {
        side: 'bottom' as const,
        className: `${widthClass} mx-auto rounded-t-[14px] min-h-[400px] !max-h-[95vh] px-0 ${maxWidth}`,
        closeButtonPosition: 'top-6 right-6',
        maxHeight: '80vh',
      };
    }

    return {
      side,
      className:
        'w-[calc(100%-120px)] max-w-md mx-auto rounded-[16px] min-h-[400px] h-[100vh] px-0',
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
          'border-[rgba(255,255,255,0.10)] bg-[#030303] backdrop-blur-[10px]',
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
        <SheetHeader className='relative flex items-center justify-between pb-4'>
          <SheetTitle
            className={cn(
              title
                ? 'text-center text-2xl font-semibold text-white'
                : 'sr-only'
            )}
          >
            {title || 'Dialog'}
          </SheetTitle>

          {showCloseButton && (
            <SheetClose
              onClick={() => setOpen(false)}
              className={cn(
                'absolute rounded-full bg-white p-2 hover:bg-white/20',
                'flex h-10 w-10 items-center justify-center',
                'border border-white/20 backdrop-blur-[10px]',
                'transition-all duration-200 ease-in-out',
                'focus:ring-2 focus:ring-white/30 focus:outline-none',
                'hover:scale-105 active:scale-95',
                'z-40 shadow-lg',
                responsiveConfig.closeButtonPosition
              )}
              aria-label='Close sheet'
            >
              <XIcon className='text-background h-5 w-5' />
            </SheetClose>
          )}
        </SheetHeader>

        <div
          className={cn(
            'relative flex-1 overflow-y-auto',
            'custom-scrollbar'
            // 'md:px-[75px] lg:px-[150px] px-4 pb-4'
          )}
        >
          {children}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BoundlessSheet;
