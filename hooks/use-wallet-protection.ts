import { useState, useEffect } from 'react';
import { useWalletStore } from './use-wallet';
import { toast } from 'sonner';

interface UseWalletProtectionOptions {
  actionName?: string;
  showModal?: boolean;
}

export function useWalletProtection(options: UseWalletProtectionOptions = {}) {
  const { actionName = 'perform this action', showModal = true } = options;
  const { isConnected, publicKey, validateConnection } = useWalletStore();
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    const validateAndUpdateConnection = async () => {
      if (isConnected && publicKey) {
        setIsValidating(true);
        try {
          const isValid = await validateConnection();
          if (!isValid && isConnected) {
            toast.error(
              'Wallet connection lost. Please reconnect your wallet.'
            );
          }
        } catch {
        } finally {
          setIsValidating(false);
        }
      }
    };

    validateAndUpdateConnection();
  }, [isConnected, publicKey, validateConnection]);

  const requireWallet = async (callback?: () => void) => {
    if (!isConnected || !publicKey) {
      if (showModal) {
        setShowWalletModal(true);
      } else {
        toast.error(`Wallet connection required to ${actionName}`);
      }
      return false;
    }

    setIsValidating(true);
    try {
      const isValid = await validateConnection();
      if (!isValid) {
        if (showModal) {
          setShowWalletModal(true);
        } else {
          toast.error(
            `Wallet connection lost. Please reconnect to ${actionName}`
          );
        }
        return false;
      }

      if (callback) {
        callback();
      }

      return true;
    } catch {
      if (showModal) {
        setShowWalletModal(true);
      } else {
        toast.error(
          `Wallet connection validation failed. Please reconnect to ${actionName}`
        );
      }
      return false;
    } finally {
      setIsValidating(false);
    }
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
    isValidating,
  };
}
