'use client';

import React, { useState } from 'react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Loader2,
  CheckCircle,
  Copy,
  Wallet,
  LogOut,
  Settings,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { cn, copyToClipboard } from '@/lib/utils';
import { toast } from 'sonner';
import WalletErrorGuide from './WalletErrorGuide';
import {
  useWalletInfo,
  useWalletStore,
  useAutoReconnect,
  useNetworkSwitcher,
} from '@/hooks/use-wallet';
import {
  formatAddress,
  getWalletDisplayName,
  getExplorerUrl,
  getNetworkDisplayName,
  validateAddress,
} from '@/lib/wallet-utils';
import { BoundlessButton } from '../buttons';
import ConnectWallet from '../connect-wallet';
import { Badge } from '../ui/badge';

interface WalletConnectButtonProps {
  className?: string;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  showErrorGuide?: boolean;
  onConnect?: () => void;
}

const WalletConnectButton: React.FC<WalletConnectButtonProps> = ({
  className,
  variant = 'default',
  size = 'default',
  showErrorGuide = true,
  onConnect,
}) => {
  const [showErrorGuideState, setShowErrorGuideState] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const {
    isConnected,
    isLoading,
    error,
    disconnectWallet,
    clearError,
    selectedWallet,
  } = useWalletStore();

  const { currentNetwork, switchToNetwork } = useNetworkSwitcher();
  const walletInfo = useWalletInfo();

  useAutoReconnect();

  React.useEffect(() => {
    if (error) {
      toast.error(error, {
        description: 'Please try again or check your wallet connection',
        action: {
          label: 'Dismiss',
          onClick: clearError,
        },
      });
      if (showErrorGuide) {
        setShowErrorGuideState(true);
      }
    } else {
      setShowErrorGuideState(false);
    }
  }, [error, clearError, showErrorGuide]);

  const handleConnect = () => {
    setShowErrorGuideState(false);
    setShowConnectModal(true);
  };

  const handleDisconnect = () => {
    disconnectWallet();
    toast.success('Wallet disconnected');
    setDropdownOpen(false);
  };

  const handleCopyAddress = () => {
    if (walletInfo) {
      copyToClipboard(walletInfo.address);
      toast.success('Address copied to clipboard');
    }
  };

  const handleSwitchNetwork = async (newNetwork: 'testnet' | 'public') => {
    try {
      await switchToNetwork(newNetwork);
      toast.success(
        `Switched to ${newNetwork === 'testnet' ? 'Testnet' : 'Public'} network`
      );
    } catch {
      toast.error('Failed to switch network');
    }
  };

  const handleSwitchWallet = () => {
    setShowConnectModal(true);
    setDropdownOpen(false);
  };

  const getNetworkDisplay = (network: string) => {
    return getNetworkDisplayName(network as 'testnet' | 'public');
  };

  const getWalletDisplayNameLocal = (walletId: string) => {
    return getWalletDisplayName(walletId);
  };

  if (isLoading) {
    return (
      <Button
        variant={variant}
        size={size}
        className={cn('min-w-[140px]', className)}
        disabled
      >
        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
        Connecting...
      </Button>
    );
  }

  if (isConnected && walletInfo) {
    return (
      <div className='space-y-4'>
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant={variant}
              size={size}
              className={cn('min-w-[140px] justify-between', className)}
            >
              <div className='flex items-center gap-2'>
                <CheckCircle className='h-4 w-4 text-green-500' />
                <span className='truncate'>
                  {formatAddress(walletInfo.address)}
                </span>
              </div>
              <ChevronDown className='ml-2 h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='end'
            className='bg-card border-border w-64 border'
          >
            <DropdownMenuLabel className='bg-card text-card-foreground flex items-center gap-2'>
              <div className='h-2 w-2 rounded-full bg-green-500'></div>
              Connected Wallet
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              className='bg-card hover:bg-accent text-card-foreground hover:text-accent-foreground flex cursor-pointer items-center gap-2 p-3'
              onSelect={e => e.preventDefault()}
              onClick={handleCopyAddress}
            >
              <Wallet className='text-muted-foreground h-4 w-4' />
              <div className='min-w-0 flex-1'>
                <div className='flex items-center gap-2'>
                  <span className='truncate font-medium'>
                    {getWalletDisplayNameLocal(selectedWallet || '')}
                  </span>
                  <Badge
                    variant='outline'
                    className='border-border text-muted-foreground text-xs'
                  >
                    {getNetworkDisplay(currentNetwork)}
                  </Badge>
                </div>
                <div className='mt-1 flex items-center gap-2'>
                  <div className='text-muted-foreground flex-1 truncate font-mono text-xs'>
                    {validateAddress(walletInfo.address)
                      ? formatAddress(walletInfo.address, 8)
                      : walletInfo.address}
                  </div>
                  <Copy className='text-muted-foreground h-3 w-3 flex-shrink-0' />
                </div>
              </div>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <div className='grid grid-cols-1 gap-1 p-2'>
              <DropdownMenuItem
                onClick={handleSwitchWallet}
                className='bg-card hover:bg-accent text-card-foreground hover:text-accent-foreground text-xs'
              >
                <Settings className='mr-2 h-3 w-3' />
                Switch Wallet
              </DropdownMenuItem>
            </div>

            <DropdownMenuSeparator />

            <div className='p-2'>
              <div className='text-card-foreground mb-2 px-2 text-xs font-medium'>
                Network
              </div>
              <div className='grid grid-cols-2 gap-1'>
                <DropdownMenuItem
                  onClick={() => handleSwitchNetwork('testnet')}
                  className={cn(
                    'bg-card hover:bg-accent text-card-foreground hover:text-accent-foreground justify-center text-xs',
                    currentNetwork === 'testnet' &&
                      'bg-accent text-accent-foreground'
                  )}
                >
                  <div className='mr-1 h-2 w-2 rounded-full bg-yellow-500'></div>
                  Testnet
                  {currentNetwork === 'testnet' && (
                    <CheckCircle className='ml-1 h-3 w-3' />
                  )}
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => handleSwitchNetwork('public')}
                  className={cn(
                    'bg-card hover:bg-accent text-card-foreground hover:text-accent-foreground justify-center text-xs',
                    currentNetwork === 'public' &&
                      'bg-accent text-accent-foreground'
                  )}
                >
                  <div className='mr-1 h-2 w-2 rounded-full bg-blue-500'></div>
                  Public
                  {currentNetwork === 'public' && (
                    <CheckCircle className='ml-1 h-3 w-3' />
                  )}
                </DropdownMenuItem>
              </div>
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              asChild
              className='bg-card hover:bg-accent text-card-foreground hover:text-accent-foreground text-xs'
            >
              <a
                href={getExplorerUrl(
                  walletInfo.address,
                  currentNetwork as 'testnet' | 'public'
                )}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center'
              >
                <ExternalLink className='mr-2 h-3 w-3' />
                View on Stellar Expert
              </a>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleDisconnect}
              className='text-destructive hover:text-destructive bg-card hover:bg-accent text-xs'
            >
              <LogOut className='mr-2 h-3 w-3' />
              Disconnect
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {showErrorGuideState && showErrorGuide && (
          <WalletErrorGuide error={error} onRetry={handleConnect} />
        )}

        <ConnectWallet
          open={showConnectModal}
          onOpenChange={setShowConnectModal}
          onConnect={onConnect}
        />
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      <BoundlessButton
        variant={variant}
        size={size}
        className={cn('min-w-[140px]', className)}
        onClick={handleConnect}
      >
        <Wallet className='mr-2 h-4 w-4' />
        Connect Wallet
      </BoundlessButton>

      {showErrorGuideState && showErrorGuide && (
        <WalletErrorGuide error={error} onRetry={handleConnect} />
      )}

      <ConnectWallet
        open={showConnectModal}
        onOpenChange={setShowConnectModal}
        onConnect={onConnect}
      />
    </div>
  );
};

export default WalletConnectButton;
