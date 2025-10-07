import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

interface TransactionSigningScreenProps {
  onSign: () => void;
  isSigning?: boolean;
  flowStep?: 'signing' | 'confirming';
  onRetry?: () => void;
  hasError?: boolean;
  errorMessage?: string;
}

const TransactionSigningScreen: React.FC<TransactionSigningScreenProps> = ({
  onSign,
  isSigning = false,
  flowStep = 'signing',
  onRetry,
  hasError = false,
  errorMessage,
}) => {
  return (
    <div className='flex h-full items-center justify-center'>
      <Card className='w-full max-w-md'>
        <CardHeader className='text-center'>
          <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10'>
            {isSigning ? (
              <Loader2 className='h-8 w-8 animate-spin text-blue-500' />
            ) : (
              <AlertCircle className='h-8 w-8 text-blue-500' />
            )}
          </div>
          <CardTitle className='text-xl'>
            {flowStep === 'confirming'
              ? 'Creating Your Project...'
              : isSigning
                ? 'Signing Transaction...'
                : 'Sign Transaction Required'}
          </CardTitle>
          <CardDescription>
            {flowStep === 'confirming'
              ? 'Please wait while we finalize your project creation.'
              : isSigning
                ? 'Please confirm the transaction in your wallet to complete project creation.'
                : 'Your project has been prepared and requires a transaction signature to be finalized.'}
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          {hasError && errorMessage && (
            <div className='rounded-lg border border-red-500/40 bg-red-500/10 p-4'>
              <div className='flex items-start gap-2'>
                <AlertCircle className='mt-0.5 h-4 w-4 flex-shrink-0 text-red-500' />
                <div>
                  <h4 className='text-sm font-medium text-red-300'>Error</h4>
                  <p className='text-sm text-red-200'>{errorMessage}</p>
                </div>
              </div>
            </div>
          )}

          <div className='rounded-lg bg-gray-800/50 p-4'>
            <h4 className='mb-2 text-sm font-medium text-gray-300'>
              What happens next?
            </h4>
            <ul className='space-y-2 text-sm text-gray-400'>
              <li className='flex items-start gap-2'>
                <CheckCircle className='mt-0.5 h-4 w-4 flex-shrink-0 text-green-500' />
                <span>Your project details have been prepared</span>
              </li>
              <li className='flex items-start gap-2'>
                <CheckCircle className='mt-0.5 h-4 w-4 flex-shrink-0 text-green-500' />
                <span>Escrow contract is ready for funding</span>
              </li>
              <li className='flex items-start gap-2'>
                {flowStep === 'confirming' ? (
                  <Loader2 className='mt-0.5 h-4 w-4 animate-spin text-blue-500' />
                ) : isSigning ? (
                  <Loader2 className='mt-0.5 h-4 w-4 animate-spin text-blue-500' />
                ) : (
                  <AlertCircle className='mt-0.5 h-4 w-4 text-yellow-500' />
                )}
                <span>
                  {flowStep === 'confirming'
                    ? 'Finalizing project creation...'
                    : isSigning
                      ? 'Waiting for transaction signature...'
                      : 'Sign the transaction to activate your project'}
                </span>
              </li>
            </ul>
          </div>

          {flowStep === 'signing' && !isSigning && (
            <div className='space-y-2'>
              <Button onClick={onSign} className='w-full' size='lg'>
                Sign Transaction
              </Button>
              {hasError && onRetry && (
                <Button
                  onClick={onRetry}
                  variant='outline'
                  className='w-full'
                  size='lg'
                >
                  Try Again
                </Button>
              )}
            </div>
          )}

          {(isSigning || flowStep === 'confirming') && (
            <div className='text-center text-sm text-gray-400'>
              <p>
                {flowStep === 'confirming'
                  ? 'Please wait while we create your project...'
                  : 'Please check your wallet for the transaction prompt.'}
              </p>
              <p className='mt-1'>
                {flowStep === 'confirming'
                  ? 'This may take a few moments...'
                  : 'This may take a few moments...'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionSigningScreen;
