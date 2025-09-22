'use client';

import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export function OtpInput({
  length = 6,
  value,
  onChange,
  disabled = false,
  className,
}: OtpInputProps) {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (value) {
      const valueArray = value.split('').slice(0, length);
      const newOtp = [...new Array(length).fill('')];
      valueArray.forEach((char, index) => {
        newOtp[index] = char;
      });
      setOtp(newOtp);
    } else {
      setOtp(new Array(length).fill(''));
    }
  }, [value, length]);

  const focusInput = (index: number) => {
    if (inputRefs.current[index]) {
      inputRefs.current[index]?.focus();
    }
  };

  const handleChange = (index: number, inputValue: string) => {
    if (disabled) return;

    const newOtp = [...otp];

    if (inputValue.length > 1) {
      newOtp[index] = inputValue.slice(-1);
    } else {
      newOtp[index] = inputValue;
    }

    setOtp(newOtp);
    onChange(newOtp.join(''));

    if (inputValue && index < length - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (disabled) return;

    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      focusInput(index - 1);
    }

    if (e.key === 'ArrowRight' && index < length - 1) {
      focusInput(index + 1);
    }

    if (e.key === 'ArrowLeft' && index > 0) {
      focusInput(index - 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    if (disabled) return;

    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').replace(/\D/g, '');

    if (pastedData.length > 0) {
      const newOtp = [...otp];
      const dataArray = pastedData.slice(0, length).split('');

      dataArray.forEach((char, index) => {
        if (index < length) {
          newOtp[index] = char;
        }
      });

      setOtp(newOtp);
      onChange(newOtp.join(''));

      const nextEmptyIndex = newOtp.findIndex(char => !char);
      if (nextEmptyIndex !== -1) {
        focusInput(nextEmptyIndex);
      } else {
        focusInput(length - 1);
      }
    }
  };

  return (
    <div className={cn('flex justify-center gap-2', className)}>
      {otp.map((digit, index) => (
        <Input
          key={index}
          ref={el => {
            inputRefs.current[index] = el;
          }}
          type='text'
          inputMode='numeric'
          pattern='[0-9]*'
          maxLength={1}
          value={digit}
          onChange={e => handleChange(index, e.target.value)}
          onKeyDown={e => handleKeyDown(index, e)}
          onPaste={handlePaste}
          disabled={disabled}
          className={cn(
            'h-12 w-12 text-center text-lg font-semibold',
            'border-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200',
            digit && 'border-green-500 bg-green-50',
            disabled && 'cursor-not-allowed opacity-50'
          )}
          placeholder='•'
        />
      ))}
    </div>
  );
}
