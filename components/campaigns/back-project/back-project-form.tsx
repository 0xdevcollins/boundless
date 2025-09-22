'use client';

import type React from 'react';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Check, Copy } from 'lucide-react';
import { BoundlessButton } from '@/components/buttons';

interface BackProjectFormProps {
  onSubmit: (data: {
    amount: string;
    currency: string;
    token: string;
    network: string;
    walletAddress: string;
    keepAnonymous: boolean;
  }) => void;
  isLoading?: boolean;
}

const QUICK_AMOUNTS = [10, 20, 30, 50, 100, 500, 1000];

export function BackProjectForm({
  onSubmit,
  isLoading = false,
}: BackProjectFormProps) {
  const [amount, setAmount] = useState('');
  const [currency] = useState('USDT');
  const [token, setToken] = useState('');
  const [network, setNetwork] = useState('Stella / Soroban');
  const [walletAddress] = useState('GDS3...GB7');
  const [keepAnonymous, setKeepAnonymous] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      amount,
      currency,
      token,
      network,
      walletAddress,
      keepAnonymous,
    });
  };

  const handleQuickAmount = (quickAmount: number) => {
    setAmount(quickAmount.toString());
  };

  const handleCopyAddress = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(walletAddress);
      // Could add toast notification here instead of state
    } catch {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      // Silent fallback for older browsers
      textArea.value = walletAddress;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
      } catch {
        // Copy failed, but no need to log in production
      }
      document.body.removeChild(textArea);
    }
  };

  const isFormValid = amount && currency && token && walletAddress;

  return (
    <div className='text-white'>
      <div className='mb-5 flex gap-10'>
        <ArrowLeft className='cursor-pointer' />
        <h1 className='text-lg font-semibold text-white'>Back Project</h1>
      </div>
      <div className='flex w-[500px] flex-col gap-3 pt-3 pb-6'>
        <div className='space-y-2'>
          <p className='text-sm text-orange-400'>
            Funds will be held in escrow and released only upon milestone
            approvals.
          </p>
        </div>

        <div className='flex flex-col gap-1'>
          <label className='text-card text-xs font-medium'>
            Amount <span className='text-red-500'>*</span>
          </label>
          <div className='bg-stepper-foreground border-stepper-border flex h-12 w-full items-center gap-3 rounded-[12px] border p-4'>
            <span className='text-card text-sm'>{currency}</span>
            <input
              value={amount}
              onChange={e => setAmount(e.target.value)}
              type='number'
              className='text-placeholder w-full bg-transparent text-base font-normal focus:outline-none'
              placeholder='1000'
              disabled={isLoading}
            />
          </div>
          <p className='text-card/60 text-xs'>min. amount: $10</p>

          <div className='mt-2 flex flex-wrap gap-2'>
            {QUICK_AMOUNTS.map(quickAmount => (
              <button
                key={quickAmount}
                type='button'
                onClick={() => handleQuickAmount(quickAmount)}
                className='bg-stepper-foreground border-stepper-border text-card hover:bg-stepper-foreground/80 rounded-[8px] border px-3 py-1 text-sm transition-colors'
                disabled={isLoading}
              >
                ${quickAmount}
              </button>
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-1'>
          <label className='text-card text-xs font-medium'>
            Select Token <span className='text-red-500'>*</span>
          </label>
          <Select value={token} onValueChange={setToken} disabled={isLoading}>
            <SelectTrigger className='bg-stepper-foreground border-stepper-border flex !h-12 w-full items-center !gap-3 rounded-[12px] border p-4 focus:ring-0'>
              <SelectValue placeholder='Select' />
            </SelectTrigger>
            <SelectContent className='bg-background text-placeholder border-stepper-border max-h-[200px] overflow-y-auto rounded-[12px] border text-base font-normal'>
              <SelectItem value='XLM'>XLM</SelectItem>
              <SelectItem value='USDT'>USDT</SelectItem>
              <SelectItem value='USDC'>USDC</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='flex flex-col gap-1'>
          <label className='text-card text-xs font-medium'>
            Network <span className='text-red-500'>*</span>
          </label>
          <div className='bg-stepper-foreground border-stepper-border flex h-12 w-full items-center gap-3 rounded-[12px] border p-4'>
            <input
              value={network}
              onChange={e => setNetwork(e.target.value)}
              type='text'
              className='text-placeholder w-full bg-transparent text-base font-normal focus:outline-none'
              disabled={isLoading}
            />
          </div>
        </div>

        <div className='flex flex-col gap-1'>
          <label className='text-card text-xs font-medium'>
            Wallet Address <span className='text-red-500'>*</span>
          </label>
          <BoundlessButton
            type='button'
            onClick={handleCopyAddress}
            className='flex h-12 w-full items-center justify-center gap-3 rounded-[12px] bg-blue-600 p-4 text-white transition-colors hover:bg-blue-700'
            disabled={isLoading}
          >
            <Check className='h-4 w-4' />
            <span className='text-base font-normal'>{walletAddress}</span>
            <Copy className='h-4 w-4' />
          </BoundlessButton>
        </div>

        <div className='mt-2 flex items-center gap-2'>
          <Checkbox
            id='anonymous'
            checked={keepAnonymous}
            onCheckedChange={checked => setKeepAnonymous(checked as boolean)}
            disabled={isLoading}
            className='border-stepper-border data-[state=checked]:bg-primary data-[state=checked]:border-primary'
          />
          <label htmlFor='anonymous' className='text-card text-sm font-normal'>
            Keep me anonymous
          </label>
        </div>

        <BoundlessButton
          type='button'
          disabled={!isFormValid || isLoading}
          onClick={handleSubmit}
          className={`mt-4 h-12 w-full text-base font-medium transition-colors ${
            isFormValid && !isLoading
              ? 'bg-primary text-background border-primary hover:bg-primary/90 border'
              : 'bg-stepper-foreground text-card/30 border-stepper-border cursor-not-allowed border'
          }`}
        >
          Confirm Contribution
        </BoundlessButton>
      </div>
    </div>
  );
}
