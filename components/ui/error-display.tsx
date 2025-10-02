'use client';

import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ErrorDisplayProps {
  type?: 'error' | 'warning' | 'success' | 'info';
  title?: string;
  message: string;
  className?: string;
  showIcon?: boolean;
}

const ErrorDisplay = ({
  type = 'error',
  title,
  message,
  className,
  showIcon = true,
}: ErrorDisplayProps) => {
  const getIcon = () => {
    switch (type) {
      case 'error':
        return <XCircle className='h-4 w-4' />;
      case 'warning':
        return <AlertCircle className='h-4 w-4' />;
      case 'success':
        return <CheckCircle className='h-4 w-4' />;
      case 'info':
        return <Info className='h-4 w-4' />;
      default:
        return <XCircle className='h-4 w-4' />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case 'error':
        return 'border-red-500/20 bg-red-500/10 text-red-400';
      case 'warning':
        return 'border-yellow-500/20 bg-yellow-500/10 text-yellow-400';
      case 'success':
        return 'border-green-500/20 bg-green-500/10 text-green-400';
      case 'info':
        return 'border-blue-500/20 bg-blue-500/10 text-blue-400';
      default:
        return 'border-red-500/20 bg-red-500/10 text-red-400';
    }
  };

  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-lg border p-4',
        getStyles(),
        className
      )}
    >
      {showIcon && <div className='mt-0.5 flex-shrink-0'>{getIcon()}</div>}
      <div className='flex-1'>
        {title && <h4 className='mb-1 font-medium'>{title}</h4>}
        <p className='text-sm leading-relaxed'>{message}</p>
      </div>
    </div>
  );
};

interface FieldErrorProps {
  error?: string;
  className?: string;
}

export const FieldError = ({ error, className }: FieldErrorProps) => {
  if (!error) return null;

  return (
    <div
      className={cn(
        'mt-1 flex items-center gap-2 text-sm text-red-400',
        className
      )}
    >
      <XCircle className='h-3 w-3 flex-shrink-0' />
      <span>{error}</span>
    </div>
  );
};

interface ValidationSummaryProps {
  errors: Array<{
    field: string;
    message: string;
    step?: number;
  }>;
  onFieldClick?: (field: string, step?: number) => void;
  className?: string;
}

export const ValidationSummary = ({
  errors,
  onFieldClick,
  className,
}: ValidationSummaryProps) => {
  if (errors.length === 0) return null;

  return (
    <div className={cn('space-y-3', className)}>
      <div className='flex items-center gap-2 text-red-400'>
        <XCircle className='h-4 w-4' />
        <span className='font-medium'>
          Please fix the following {errors.length === 1 ? 'error' : 'errors'}:
        </span>
      </div>
      <div className='space-y-2'>
        {errors.map((error, index) => (
          <button
            key={index}
            onClick={() => onFieldClick?.(error.field, error.step)}
            className='block w-full rounded-md border border-red-500/20 bg-red-500/5 p-2 text-left transition-colors hover:bg-red-500/10'
          >
            <div className='flex items-center justify-between'>
              <span className='text-sm text-red-300'>{error.field}</span>
              {error.step && (
                <span className='text-xs text-red-400/70'>
                  Step {error.step}
                </span>
              )}
            </div>
            <p className='mt-1 text-xs text-red-400/80'>{error.message}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ErrorDisplay;
