'use client';
import { Button } from '@/components/ui/button';
import { formatAddress } from '@/lib/utils';
import { useWalletStore } from '@/store/useWalletStore';
import { Check, Copy, Loader2, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const ConnectWalletButton = ({ className = '' }) => {
  const { publicKey, connecting, connect: connectWallet, disconnect: disconnectWallet } = useWalletStore();

  const [isChecking, setIsChecking] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        if (publicKey) {
          toast.success('Wallet Reconnected', {
            description: 'Welcome back!',
          });
        }
      } catch (error) {
        console.log('No wallet connected.', error);
      } finally {
        setIsChecking(false);
      }
    };

    checkConnection();
  }, [publicKey]);

  useEffect(() => {
    setIsConnecting(connecting);
  }, [connecting]);

  const handleConnectWallet = async () => {
    try {
      setIsConnecting(true);
      await connectWallet();
      if (publicKey) {
        toast.success('Wallet Connected', {
          description: 'Successfully connected to wallet',
        });
      }
    } catch (error) {
      console.log(error);
      toast.error('Connection Failed', {
        description: 'Failed to connect to the wallet.',
      });
    } finally {
      setTimeout(() => {
        setIsConnecting(false);
      }, 1000);
    }
  };

  const handleDisconnectWallet = async () => {
    await disconnectWallet();
    toast.info('Wallet Disconnected', {
      description: 'You have been disconnected.',
    });
  };

  const copyToClipboard = async () => {
    if (!publicKey) return;
    try {
      await navigator.clipboard.writeText(publicKey);
      setIsCopied(true);
      toast.success('Address Copied', {
        description: 'Wallet address copied to clipboard',
      });
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      toast.error(error as string, {
        description: 'Failed to copy address to clipboard',
      });
    }
  };

	return (
		<div className="flex items-center space-x-2">
			{isChecking ? (
				<Button disabled className={className}>
					<Loader2 className="mr-2 h-4 w-4 animate-spin" /> Checking...
				</Button>
			) : isConnecting ? (
				<Button disabled className={className}>
					<Loader2 className="mr-2 h-4 w-4 animate-spin" /> Connecting...
				</Button>
			) : publicKey ? (
				<Button
					variant="outline"
					onClick={copyToClipboard}
					className={`${className} flex items-center dark:bg-secondary gap-2 cursor-pointer bg-primary text-white`}
				>
					{formatAddress(publicKey)}
					{isCopied ? (
						<Check className="h-4 w-4 text-green-500" />
					) : (
						<Copy className="h-4 w-4" />
					)}
				</Button>
			) : (
				<Button onClick={handleConnectWallet} className={className}>
					Connect Wallet
				</Button>
			)}
			{publicKey && (
				<Button onClick={handleDisconnectWallet} variant="outline">
					<LogOut className="mr-2 h-4 w-4" />{" "}
					<span className="hidden md:block">Disconnect</span>
				</Button>
			)}
		</div>
	);
};

export default ConnectWalletButton;
