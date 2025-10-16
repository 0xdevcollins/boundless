import { useState, useCallback, useEffect } from 'react';
import { useWalletStore } from './use-wallet';
import { useWalletProtection } from './use-wallet-protection';

interface UseProtectedActionOptions {
  actionName: string;
  onSuccess?: () => void;
  redirectTo?: string;
}

export function useProtectedAction({
  actionName,
  onSuccess,
  redirectTo,
}: UseProtectedActionOptions) {
  const { isConnected, publicKey } = useWalletStore();
  const {
    requireWallet,
    showWalletModal,
    handleWalletConnected,
    closeWalletModal,
  } = useWalletProtection({
    actionName,
    showModal: true,
  });
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const checkHydration = () => {
      if (useWalletStore.persist.hasHydrated()) {
        setIsHydrated(true);
      } else {
        const unsubscribe = useWalletStore.persist.onFinishHydration(() => {
          setIsHydrated(true);
        });
        return unsubscribe;
      }
    };

    const cleanup = checkHydration();
    return cleanup;
  }, []);

  const executeProtectedAction = useCallback(
    async (action: () => void | Promise<void>) => {
      if (!isHydrated) {
        return false;
      }

      if (!isConnected || !publicKey) {
        setPendingAction(() => action);
        requireWallet();
        return false;
      }

      const isValid = await requireWallet();
      if (!isValid) {
        setPendingAction(() => action);
        return false;
      }

      try {
        await action();
        onSuccess?.();
        return true;
      } catch {
        return false;
      }
    },
    [isHydrated, isConnected, publicKey, requireWallet, actionName, onSuccess]
  );

  const handleWalletConnectedWithRedirect = useCallback(() => {
    handleWalletConnected();
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }

    if (redirectTo) {
      window.location.href = redirectTo;
    }
  }, [handleWalletConnected, pendingAction, redirectTo]);

  const clearPendingAction = useCallback(() => {
    setPendingAction(null);
  }, []);

  return {
    executeProtectedAction,
    showWalletModal,
    closeWalletModal,
    handleWalletConnected: handleWalletConnectedWithRedirect,
    clearPendingAction,
    hasPendingAction: !!pendingAction,
  };
}
