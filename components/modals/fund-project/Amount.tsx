import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { BoundlessButton } from '@/components/buttons';
import { CircleAlert } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

export interface AmountFormData {
  amount: string;
  currency: string;
  message?: string;
  keepAnonymous?: boolean;
}

interface AmountProps {
  onDataChange: (data: AmountFormData) => void;
  initialData?: Partial<AmountFormData>;
}

export interface AmountHandle {
  validate: () => boolean;
  markSubmitted?: () => void;
}

const Amount = forwardRef<AmountHandle, AmountProps>(
  ({ onDataChange, initialData = {} }, ref) => {
    const [data, setData] = useState<AmountFormData>({
      amount: initialData.amount || '',
      currency: initialData.currency || 'USD',
      message: initialData.message || '',
      keepAnonymous: initialData.keepAnonymous || false,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleDataChange = (
      field: keyof AmountFormData,
      value: string | boolean
    ) => {
      const newData = { ...data, [field]: value };
      setData(newData);
      onDataChange(newData);

      if (errors[field as string]) {
        setErrors(prev => ({ ...prev, [field as string]: '' }));
      }
    };

    const handleQuickAmount = (amount: number) => {
      handleDataChange('amount', amount.toString());
    };

    const validate = (): boolean => {
      const newErrors: Record<string, string> = {};

      if (!data.amount.trim()) {
        newErrors.amount = 'Amount is required';
      } else {
        const amount = parseFloat(data.amount);
        if (isNaN(amount) || amount <= 0) {
          newErrors.amount = 'Please enter a valid amount';
        } else if (amount < 1) {
          newErrors.amount = 'Minimum funding amount is $1';
        }
      }

      if (!data.currency.trim()) {
        newErrors.currency = 'Currency is required';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const markSubmitted = () => {
      // Mark as submitted for validation display
    };

    useImperativeHandle(ref, () => ({
      validate,
      markSubmitted,
    }));

    const quickAmounts = [10, 20, 30, 100, 500, 200, 1000];

    return (
      <div className='space-y-6'>
        <div className='mb-10 space-y-2'>
          <h5 className='text-sm text-white'>
            How much would you like to fund?{' '}
            <span className='text-red-500'>*</span>
          </h5>
          <div className='rounded-[12px] border border-[#2B2B2B] bg-[#101010] p-5'>
            <div className='relative flex items-center gap-2'>
              <span className='text-white'>$</span>
              <Input
                type='number'
                placeholder='100 USDC'
                value={data.amount}
                onChange={e => handleDataChange('amount', e.target.value)}
                className='w-full border-none bg-transparent p-0 text-white focus-visible:border-none focus-visible:ring-0'
              />
            </div>
            <Separator className='my-4 bg-gray-900' />
            <div className='flex flex-wrap gap-2'>
              {quickAmounts.map(amount => (
                <BoundlessButton
                  key={amount}
                  onClick={() => handleQuickAmount(amount)}
                  className={`text-white ${
                    data.amount === amount.toString()
                      ? 'bg-primary text-black'
                      : 'hover:bg-gray-800'
                  }`}
                  variant='outline'
                >
                  ${amount}
                </BoundlessButton>
              ))}
            </div>
          </div>
          {errors.amount && (
            <p className='text-sm text-red-400'>{errors.amount}</p>
          )}
          <p className='flex items-center gap-2 text-sm text-[#DBF936]'>
            <CircleAlert className='size-4' /> Funds will be held in escrow
            until milestones are approved
          </p>
        </div>

        <div>
          <h5 className='mb-4 text-sm text-white'>
            Would you like to stay anonymous?
          </h5>
          <div className='flex items-center gap-2'>
            <Switch
              checked={data.keepAnonymous}
              onCheckedChange={checked =>
                handleDataChange('keepAnonymous', checked)
              }
            />
            <span className='text-sm text-white'>
              {data.keepAnonymous ? 'YES' : 'NO'}
            </span>
          </div>
        </div>
      </div>
    );
  }
);

Amount.displayName = 'Amount';

export default Amount;
