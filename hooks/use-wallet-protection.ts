import { useState } from 'react';
import { useWalletStore } from './use-wallet';
import { toast } from 'sonner';

interface UseWalletProtectionOptions {
  actionName?: string;
  showModal?: boolean;
}

export function useWalletProtection(options: UseWalletProtectionOptions = {}) {
  const { actionName = 'perform this action', showModal = true } = options;
  const { isConnected, publicKey } = useWalletStore();
  const [showWalletModal, setShowWalletModal] = useState(false);

  const requireWallet = (callback?: () => void) => {
    if (!isConnected) {
      if (showModal) {
        setShowWalletModal(true);
      } else {
        toast.error(`Wallet connection required to ${actionName}`);
      }
      return false;
    }

    // If callback provided and wallet is connected, execute it
    if (callback) {
      callback();
    }

    return true;
  };

  const handleWalletConnected = () => {
    setShowWalletModal(false);
    toast.success('Wallet connected successfully!');
  };

  const closeWalletModal = () => {
    setShowWalletModal(false);
  };

  return {
    requireWallet,
    isConnected,
    publicKey,
    showWalletModal,
    handleWalletConnected,
    closeWalletModal,
  };
}
