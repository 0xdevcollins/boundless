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

  // Auto-reconnect on page load
  useAutoReconnect();

  // Handle errors with toast and show error guide
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
        <Loader2 className='w-4 h-4 mr-2 animate-spin' />
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
                <CheckCircle className='w-4 h-4 text-green-500' />
                <span className='truncate'>
                  {formatAddress(walletInfo.address)}
                </span>
              </div>
              <ChevronDown className='w-4 h-4 ml-2' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='end'
            className='w-64 bg-card border border-border'
          >
            <DropdownMenuLabel className='flex items-center gap-2 bg-card text-card-foreground'>
              <div className='w-2 h-2 bg-green-500 rounded-full'></div>
              Connected Wallet
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {/* Wallet Info - Compact */}
            <DropdownMenuItem
              className='flex items-center gap-2 p-3 bg-card hover:bg-accent text-card-foreground hover:text-accent-foreground cursor-pointer'
              onSelect={e => e.preventDefault()}
              onClick={handleCopyAddress}
            >
              <Wallet className='w-4 h-4 text-muted-foreground' />
              <div className='flex-1 min-w-0'>
                <div className='flex items-center gap-2'>
                  <span className='font-medium truncate'>
                    {getWalletDisplayNameLocal(selectedWallet || '')}
                  </span>
                  <Badge
                    variant='outline'
                    className='text-xs border-border text-muted-foreground'
                  >
                    {getNetworkDisplay(currentNetwork)}
                  </Badge>
                </div>
                <div className='flex items-center gap-2 mt-1'>
                  <div className='text-xs text-muted-foreground font-mono truncate flex-1'>
                    {validateAddress(walletInfo.address)
                      ? formatAddress(walletInfo.address, 8)
                      : walletInfo.address}
                  </div>
                  <Copy className='w-3 h-3 text-muted-foreground flex-shrink-0' />
                </div>
              </div>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* Quick Actions */}
            <div className='grid grid-cols-1 gap-1 p-2'>
              <DropdownMenuItem
                onClick={handleSwitchWallet}
                className='bg-card hover:bg-accent text-card-foreground hover:text-accent-foreground text-xs'
              >
                <Settings className='w-3 h-3 mr-2' />
                Switch Wallet
              </DropdownMenuItem>
            </div>

            <DropdownMenuSeparator />

            {/* Network Switching - Compact */}
            <div className='p-2'>
              <div className='text-xs font-medium mb-2 px-2 text-card-foreground'>
                Network
              </div>
              <div className='grid grid-cols-2 gap-1'>
                <DropdownMenuItem
                  onClick={() => handleSwitchNetwork('testnet')}
                  className={cn(
                    'bg-card hover:bg-accent text-card-foreground hover:text-accent-foreground text-xs justify-center',
                    currentNetwork === 'testnet' &&
                      'bg-accent text-accent-foreground'
                  )}
                >
                  <div className='w-2 h-2 bg-yellow-500 rounded-full mr-1'></div>
                  Testnet
                  {currentNetwork === 'testnet' && (
                    <CheckCircle className='w-3 h-3 ml-1' />
                  )}
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => handleSwitchNetwork('public')}
                  className={cn(
                    'bg-card hover:bg-accent text-card-foreground hover:text-accent-foreground text-xs justify-center',
                    currentNetwork === 'public' &&
                      'bg-accent text-accent-foreground'
                  )}
                >
                  <div className='w-2 h-2 bg-blue-500 rounded-full mr-1'></div>
                  Public
                  {currentNetwork === 'public' && (
                    <CheckCircle className='w-3 h-3 ml-1' />
                  )}
                </DropdownMenuItem>
              </div>
            </div>

            <DropdownMenuSeparator />

            {/* External Link */}
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
                <ExternalLink className='w-3 h-3 mr-2' />
                View on Stellar Expert
              </a>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* Disconnect */}
            <DropdownMenuItem
              onClick={handleDisconnect}
              className='text-destructive hover:text-destructive bg-card hover:bg-accent text-xs'
            >
              <LogOut className='w-3 h-3 mr-2' />
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
        <Wallet className='w-4 h-4 mr-2' />
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
