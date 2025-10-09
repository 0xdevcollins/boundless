import React, { forwardRef, useImperativeHandle, useMemo } from 'react';
import { AmountFormData } from './Amount';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle, Pencil } from 'lucide-react';
import { Timeline, TimelineItemType } from '@/components/ui/timeline';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export interface ConfirmFormData {
  agreeToTerms?: boolean;
  agreeToPrivacy?: boolean;
}

export interface ConfirmHandle {
  validate?: () => boolean;
  markSubmitted?: () => void;
}

interface ConfirmProps {
  fundingData: AmountFormData;
  onDataChange?: (data: ConfirmFormData) => void;
  initialData?: Partial<ConfirmFormData>;
}

const Confirm = forwardRef<ConfirmHandle, ConfirmProps>(
  ({ fundingData, onDataChange, initialData = {} }, ref) => {
    const [confirmData, setConfirmData] = React.useState<ConfirmFormData>({
      agreeToTerms: initialData.agreeToTerms || false,
      agreeToPrivacy: initialData.agreeToPrivacy || false,
    });

    const handleDataChange = (field: keyof ConfirmFormData, value: boolean) => {
      const newData = { ...confirmData, [field]: value };
      setConfirmData(newData);
      onDataChange?.(newData);
    };

    const milestones: TimelineItemType[] = useMemo(
      () => [
        {
          id: 'milestone-1',
          title: 'Smart Contract Development',
          description:
            'Develop and deploy core smart contracts for the platform including escrow, milestone validation, and fund distribution mechanisms.',
          dueDate: '05 Dec, 2025 - 31 Jan, 2026',
          amount: 12300,
          percentage: 10,
          status: 'awaiting',
        },
        {
          id: 'milestone-2',
          title: 'Frontend Development',
          description:
            'Build responsive web interface with user dashboard, project management tools, and real-time funding tracking.',
          dueDate: '01 Feb, 2026 - 28 Feb, 2026',
          amount: 12300,
          percentage: 10,
          status: 'in-review',
          feedbackDays: 3,
        },
        {
          id: 'milestone-3',
          title: 'Security Audit',
          description:
            'Comprehensive security audit of smart contracts and platform infrastructure to ensure user fund safety.',
          dueDate: '01 Mar, 2026 - 31 Mar, 2026',
          amount: 12300,
          percentage: 10,
          status: 'in-progress',
        },
      ],
      []
    );

    const markSubmitted = () => {
      // Validation handled by parent component
    };

    useImperativeHandle(ref, () => ({
      validate: () => true,
      markSubmitted,
    }));

    const totalAmount = parseFloat(fundingData.amount || '0');

    return (
      <div className='space-y-6'>
        <div className='flex items-center space-x-3'>
          <div className='relative'>
            <div className='h-12 w-12 overflow-hidden rounded-full border-[0.5px] border-[#2B2B2B]'>
              <Image
                width={48}
                height={48}
                src='/avatar.png'
                alt='Project owner'
                className='h-full w-full object-cover'
              />
            </div>
          </div>
          <div className='flex flex-col space-y-0.5'>
            <span className='text-base font-normal text-white'>John Doe</span>
            <span className='text-sm text-[#DBF936]'>PROJECT OWNER</span>
          </div>
        </div>

        <div className='space-y-3'>
          <h5 className='font-medium text-white'>BitMed Health Protocol</h5>
          <p className='leading-relaxed text-gray-400'>
            Building a secure, transparent, and trusted digital health ecosystem
            powered by Sonic blockchain for 280M lives in Indonesia. Our
            platform ensures health data integrity and enables seamless
            healthcare transactions.
          </p>
          <Link
            href='/projects/bitmed'
            className='text-primary flex items-center gap-2 text-sm font-medium hover:underline'
          >
            Learn More <ArrowUpRight className='h-4 w-4' />
          </Link>
        </div>

        <div className='space-y-4'>
          <h5 className='font-medium text-white'>Project Milestones</h5>
          <Timeline
            items={milestones}
            showConnector={true}
            variant='default'
            className='w-full'
            projectId='bitmed-health-protocol'
          />
        </div>

        <div className='space-y-2'>
          <h5 className='font-medium text-white'>Contribution Amount</h5>
          <div className='flex w-fit items-center justify-between'>
            <span className='font-medium tracking-[-0.48px] text-white'>
              ${totalAmount.toFixed(2)} {fundingData.currency}
            </span>
            <Button variant='link' className='text-primary'>
              Edit Amount <Pencil className='size-4' />
            </Button>
          </div>
          <div>
            <h5>Keep me anonymous?</h5>
            <div className='flex w-fit items-center justify-between'>
              <div className='flex items-center gap-2'>
                <Switch checked={fundingData.keepAnonymous} disabled />
                <span className='text-sm text-white'>
                  {fundingData.keepAnonymous ? 'YES' : 'NO'}
                </span>
              </div>
              <Button variant='link' className='text-primary'>
                Edit <Pencil className='size-4' />
              </Button>
            </div>
          </div>
        </div>

        <Card className='border-blue-500/30 bg-blue-500/10 text-blue-200'>
          <CardContent className='p-4'>
            <div className='flex items-start space-x-3'>
              <CheckCircle className='mt-0.5 h-5 w-5 flex-shrink-0' />
              <div>
                <h4 className='font-semibold'>Escrow Protection</h4>
                <p className='mt-1 text-sm'>
                  Your funds are held securely in a smart contract and will only
                  be released to the project team upon successful milestone
                  completion and approval. If milestones are not met, your
                  contribution will be automatically refunded.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className='space-y-4'>
          <h5 className='font-medium text-white'>Agreements</h5>
          <div className='space-y-3'>
            <div className='flex items-start space-x-3'>
              <Switch
                checked={confirmData.agreeToTerms}
                onCheckedChange={checked =>
                  handleDataChange('agreeToTerms', checked)
                }
                className='mt-1'
              />
              <div className='flex-1'>
                <p className='text-sm text-white'>
                  I agree to the{' '}
                  <a
                    href='/terms'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-primary hover:underline'
                  >
                    Terms of Service
                  </a>
                </p>
              </div>
            </div>
            <div className='flex items-start space-x-3'>
              <Switch
                checked={confirmData.agreeToPrivacy}
                onCheckedChange={checked =>
                  handleDataChange('agreeToPrivacy', checked)
                }
                className='mt-1'
              />
              <div className='flex-1'>
                <p className='text-sm text-white'>
                  I agree to the{' '}
                  <a
                    href='/privacy'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-primary hover:underline'
                  >
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Confirm.displayName = 'Confirm';

export default Confirm;
