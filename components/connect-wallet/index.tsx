import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '../ui/dialog';
import WalletCard from './wallet-card';
import { CircleQuestionMark, X, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Checkbox } from '../ui/checkbox';
import { ScrollArea } from '../ui/scroll-area';
import { Button } from '../ui/button';
import { useWalletStore } from '@/hooks/use-wallet';
import { toast } from 'sonner';
import { TooltipContent, TooltipProvider } from '@radix-ui/react-tooltip';
import { Tooltip, TooltipTrigger } from '../ui/tooltip';

const ConnectWallet = ({
  open,
  onOpenChange,
  onConnect,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConnect?: () => void;
}) => {
  const [selectedNetwork, setSelectedNetwork] = useState('testnet');
  const [acceptedTerms, setAcceptedTerms] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null);

  const {
    network,
    availableWallets,
    isConnected,
    isLoading,
    error,
    initializeWalletKit,
    connectWallet,
    clearError,
  } = useWalletStore();

  // Initialize wallet kit when modal opens
  useEffect(() => {
    if (open && !isConnected) {
      initializeWalletKit(selectedNetwork as 'testnet' | 'public').catch(() => {
        // Silently handle initialization errors
        // These are expected when wallet is not available
      });
    }
  }, [open, isConnected, initializeWalletKit, selectedNetwork]);

  // Handle network selection
  useEffect(() => {
    setSelectedNetwork(network);
  }, [network]);

  const networks = [
    {
      id: 'testnet',
      name: 'Testnet',
      icon: '/globe.svg',
      active: true,
    },
    {
      id: 'public',
      name: 'Public',
      icon: '/globe.svg',
      active: true,
    },
  ];

  const handleWalletSelect = async (walletId: string) => {
    if (!acceptedTerms) {
      toast.error('Please accept the terms and conditions first');
      return;
    }

    setIsConnecting(true);
    setConnectingWallet(walletId);
    clearError();

    try {
      // Show specific instructions for different wallets
      const walletInstructions = {
        freighter: 'Please unlock Freighter and approve the connection',
        albedo:
          'Albedo will open in a new window. Please approve the connection',
        rabet: 'Please unlock Rabet and approve the connection',
        xbull: 'Please unlock xBull and approve the connection',
        lobstr: 'Please unlock Lobstr and approve the connection',
        hana: 'Please unlock Hana and approve the connection',
        'hot-wallet':
          'Please unlock your hardware wallet and approve the connection',
      };

      const instruction =
        walletInstructions[walletId as keyof typeof walletInstructions] ||
        'Please approve the connection';

      toast.info(instruction, {
        duration: 5000,
      });

      await connectWallet(walletId);

      toast.success('Wallet connected successfully!', {
        description: `Connected to ${network === 'testnet' ? 'Testnet' : 'Public'} network`,
      });
      onOpenChange(false);
      onConnect?.();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to connect wallet';

      // Provide specific error messages for different wallets
      let specificError = errorMessage;
      if (errorMessage.includes('not available')) {
        specificError = `${walletId} is not installed or not available. Please install it first.`;
      } else if (errorMessage.includes('permission')) {
        specificError = `Permission denied. Please unlock ${walletId} and try again.`;
      } else if (errorMessage.includes('network')) {
        specificError = `Network mismatch. Please switch ${walletId} to ${selectedNetwork} network.`;
      }

      toast.error('Connection failed', {
        description: specificError,
        duration: 8000,
      });
    } finally {
      setIsConnecting(false);
      setConnectingWallet(null);
    }
  };

  const handleNetworkChange = async (networkId: string) => {
    if (networkId === selectedNetwork) return;

    setSelectedNetwork(networkId);

    // Reinitialize wallet kit with new network
    try {
      await initializeWalletKit(networkId as 'testnet' | 'public');
      toast.success(
        `Switched to ${networkId === 'testnet' ? 'Testnet' : 'Public'} network`
      );
    } catch {
      toast.error('Failed to switch network');
      // Log error for debugging but don't expose to user
    }
  };

  // Filter available wallets and map them to our UI format
  const walletOptions = availableWallets
    .filter(wallet => wallet.isAvailable)
    .map(wallet => ({
      id: wallet.id,
      name: wallet.name,
      icon: wallet.icon,
      disabled: false,
    }));

  // Fallback wallets if none are available
  const fallbackWallets = [
    {
      id: 'freighter',
      name: 'Freighter',
      icon: '/wallets/freighter.svg',
      disabled: false,
    },
    {
      id: 'albedo',
      name: 'Albedo',
      icon: '/wallets/albedo.svg',
      disabled: false,
    },
    {
      id: 'rabet',
      name: 'Rabet',
      icon: '/wallets/rabet.svg',
      disabled: false,
    },
    {
      id: 'xbull',
      name: 'xBull',
      icon: '/wallets/xbull.svg',
      disabled: false,
    },
    {
      id: 'lobstr',
      name: 'Lobstr',
      icon: '/wallets/lobstr.svg',
      disabled: false,
    },
    {
      id: 'hana',
      name: 'Hana',
      icon: '/wallets/hana.svg',
      disabled: false,
    },
    {
      id: 'hot-wallet',
      name: 'HOT Wallet',
      icon: '/wallets/hot-wallet.svg',
      disabled: false,
    },
  ];

  const wallets = walletOptions.length > 0 ? walletOptions : fallbackWallets;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='!max-w-[552px] !w-[95vw] max-h-[90vh] rounded-[16px] bg-[#030303] gap-6 p-4 sm:p-6 border-none shadow-[0_1px_4px_0_rgba(72,72,72,0.14),0_0_4px_1px_#484848] overflow-hidden'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <DialogTitle className='text-white text-xl sm:text-2xl font-medium'>
              Connect Wallet
            </DialogTitle>
            <CircleQuestionMark className='w-4 h-4 text-[#484848]' />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <CircleQuestionMark className='w-4 h-4 text-[#484848]' />
                </TooltipTrigger>
                <TooltipContent>
                  <h4 className='text-white text-lg font-medium'>
                    What is a Wallet?
                  </h4>
                  <p className='text-[#B5B5B5] text-sm'>
                    Wallets are used to send, receive, and store the keys you
                    use to sign blockchain transactions.
                  </p>
                  <h4 className='text-white text-lg font-medium'>
                    What is a Stellar Blockchain?
                  </h4>
                  <p className='text-[#B5B5B5] text-sm'>
                    Stellar is a decentralized network that allows you to send
                    and receive digital assets.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => onOpenChange(false)}
            className='h-8 w-8 p-0 hover:bg-[#1a1a1a] rounded-lg'
            aria-label='Close modal'
            disabled={isConnecting}
          >
            <X className='w-4 h-4 text-white' />
          </Button>
        </div>

        {/* Description and Terms */}
        <DialogDescription className='!mt-0 !p-0'>
          <p className='text-[#B5B5B5] font-normal mb-4 text-sm'>
            Select what network and wallet below
          </p>

          <div className='space-y-3 mb-6'>
            <p className='text-[#B5B5B5] font-normal text-sm leading-relaxed'>
              Accept{' '}
              <Link
                href='/terms-of-service'
                className='text-[#A7F950] hover:text-[#86C939] transition-colors underline underline-offset-2'
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href='/privacy-policy'
                className='text-[#A7F950] hover:text-[#86C939] transition-colors underline underline-offset-2'
              >
                Privacy Policy
              </Link>
            </p>
            <div className='flex items-center gap-2'>
              <Checkbox
                checked={acceptedTerms}
                onCheckedChange={checked =>
                  setAcceptedTerms(checked as boolean)
                }
                className='data-[state=checked]:bg-[#A7F950] data-[state=checked]:border-[#A7F950]'
                id='terms-checkbox'
              />
              <label
                htmlFor='terms-checkbox'
                className='text-white text-sm cursor-pointer'
              >
                I read and accept
              </label>
            </div>
          </div>
        </DialogDescription>

        {/* Network Selection */}
        <div className='space-y-3'>
          <h3 className='text-white font-medium text-base'>Choose Network</h3>
          <div className='grid grid-cols-2 gap-3'>
            {networks.map(network => (
              <Button
                key={network.id}
                variant='outline'
                className={`h-auto p-4 flex flex-col items-center gap-2 rounded-lg border transition-all ${
                  selectedNetwork === network.id
                    ? 'border-[#A7F950] bg-[#0a0a0a]'
                    : 'border-[#2B2B2B] bg-[#101010] hover:border-[#404040]'
                }`}
                onClick={() => handleNetworkChange(network.id)}
                disabled={isConnecting}
              >
                <div className='w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center'>
                  <div className='w-3 h-0.5 bg-white'></div>
                </div>
                <span className='text-white text-sm font-medium'>
                  {network.name}
                </span>
              </Button>
            ))}
          </div>
        </div>

        {/* Wallet Selection */}
        <div className='space-y-3 flex-1 min-h-0'>
          <div className='flex items-center justify-between'>
            <h3 className='text-white font-medium text-base'>Choose Wallet</h3>
            {isLoading && (
              <div className='flex items-center gap-2 text-[#B5B5B5] text-sm'>
                <Loader2 className='w-4 h-4 animate-spin' />
                Loading wallets...
              </div>
            )}
          </div>

          {/* Connection Status */}
          {isConnecting && connectingWallet && (
            <div className='flex items-center gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg'>
              <Loader2 className='w-4 h-4 animate-spin text-blue-500' />
              <span className='text-blue-500 text-sm'>
                Connecting to {connectingWallet}...
              </span>
            </div>
          )}

          <ScrollArea className='h-[280px] sm:h-[225px] pr-2'>
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-3 p-1'>
              {wallets.map(wallet => (
                <WalletCard
                  key={wallet.id}
                  disabled={wallet.disabled || isConnecting}
                  onClick={() => handleWalletSelect(wallet.id)}
                  icon={wallet.icon}
                  label={wallet.name}
                />
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Error Display */}
        {error && (
          <div className='bg-red-500/10 border border-red-500/20 rounded-lg p-3'>
            <div className='flex items-center gap-2 mb-2'>
              <AlertCircle className='w-4 h-4 text-red-400' />
              <span className='text-red-400 text-sm font-medium'>
                Connection Error
              </span>
            </div>
            <p className='text-red-400 text-sm'>{error}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ConnectWallet;
