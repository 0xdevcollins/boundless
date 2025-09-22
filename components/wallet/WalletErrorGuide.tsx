'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Button } from '../ui/button';
import { AlertTriangle, ExternalLink, RefreshCw } from 'lucide-react';

interface WalletErrorGuideProps {
  error: string | null;
  onRetry: () => void;
}

const WalletErrorGuide: React.FC<WalletErrorGuideProps> = ({
  error,
  onRetry,
}) => {
  if (!error) return null;

  const getErrorGuidance = (errorMessage: string) => {
    if (errorMessage.includes('No account selected')) {
      return {
        title: 'No Account Selected',
        description: 'You need to select an account in your Freighter wallet.',
        steps: [
          'Open your Freighter wallet extension',
          'Click on the account dropdown',
          'Select an account (or create one if none exist)',
          'Try connecting again',
        ],
        action: 'Select Account in Freighter',
      };
    }

    if (
      errorMessage.includes('not connected') ||
      errorMessage.includes('unlock')
    ) {
      return {
        title: 'Wallet Not Connected',
        description: 'Your Freighter wallet needs to be unlocked.',
        steps: [
          'Click on the Freighter extension icon',
          'Enter your password to unlock',
          'Make sure the wallet is active',
          'Try connecting again',
        ],
        action: 'Unlock Freighter Wallet',
      };
    }

    if (errorMessage.includes('not installed')) {
      return {
        title: 'Freighter Not Installed',
        description: 'You need to install the Freighter wallet extension.',
        steps: [
          'Visit the Freighter website',
          'Download the browser extension',
          'Install and set up your wallet',
          'Create or import an account',
          'Try connecting again',
        ],
        action: 'Install Freighter',
      };
    }

    return {
      title: 'Connection Error',
      description: 'There was an issue connecting to your wallet.',
      steps: [
        'Check if Freighter is installed and unlocked',
        'Make sure you have an account selected',
        'Try refreshing the page',
        'Contact support if the issue persists',
      ],
      action: 'Try Again',
    };
  };

  const guidance = getErrorGuidance(error);

  return (
    <Card className='border-red-500/20 bg-red-500/10'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-red-400'>
          <AlertTriangle className='h-5 w-5' />
          {guidance.title}
        </CardTitle>
        <CardDescription className='text-red-300'>
          {guidance.description}
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='space-y-2'>
          <h4 className='font-medium text-white'>Steps to resolve:</h4>
          <ol className='list-inside list-decimal space-y-1 text-sm text-gray-300'>
            {guidance.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>

        <div className='flex gap-2'>
          <Button
            onClick={onRetry}
            variant='outline'
            size='sm'
            className='flex items-center gap-2'
          >
            <RefreshCw className='h-4 w-4' />
            {guidance.action}
          </Button>

          {guidance.action === 'Install Freighter' && (
            <Button asChild size='sm' className='flex items-center gap-2'>
              <a
                href='https://www.freighter.app/'
                target='_blank'
                rel='noopener noreferrer'
              >
                <ExternalLink className='h-4 w-4' />
                Download Freighter
              </a>
            </Button>
          )}
        </div>

        <div className='text-xs text-gray-400'>
          <p>
            <strong>Error details:</strong> {error}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletErrorGuide;
