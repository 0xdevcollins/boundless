import React, { useEffect, useState } from 'react';
import { useWalletStore } from '@/hooks/use-wallet';
import { useAutoReconnect } from '@/hooks/use-wallet';

interface WalletProviderProps {
  children: React.ReactNode;
}

export function WalletProvider({ children }: WalletProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const { initializeWalletKit, network } = useWalletStore();

  useEffect(() => {
    const initialize = async () => {
      try {
        await initializeWalletKit(network);
        setIsInitialized(true);
      } catch {
        setIsInitialized(true);
      }
    };

    initialize();
  }, [initializeWalletKit, network]);

  useAutoReconnect();

  if (!isInitialized) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-center'>
          <div className='mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600'></div>
          <p className='text-gray-600'>Initializing wallet connection...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export function useWalletProvider() {
  const { isConnected, publicKey, selectedWallet, network, error } =
    useWalletStore();

  return {
    isConnected,
    publicKey,
    selectedWallet,
    network,
    error,
  };
}
