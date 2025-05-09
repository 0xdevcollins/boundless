import { toast } from 'sonner';

/**
 * Checks if a wallet is connected and shows an alert if not
 * @returns boolean indicating if wallet is connected
 */
export const requireWalletConnection = (): boolean => {
  if (typeof window === 'undefined') return false;

  const walletStorage = localStorage.getItem('wallet-storage');
  if (!walletStorage) return false;

  try {
    const walletState = JSON.parse(walletStorage);
    const isConnected = walletState.state?.isConnected || false;
    const publicKey = walletState.state?.publicKey || null;

    if (!isConnected || !publicKey) {
      toast.error('Wallet Connection Required', {
        description: 'Please connect your wallet to continue.',
      });
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error checking wallet connection:', error);
    return false;
  }
};

/**
 * Redirects to a specific page if wallet is not connected
 * @param redirectPath Path to redirect to if wallet is not connected
 * @returns boolean indicating if wallet is connected
 */
export const redirectIfNoWallet = (redirectPath = '/'): boolean => {
  const isConnected = requireWalletConnection();

  if (!isConnected && typeof window !== 'undefined') {
    setTimeout(() => {
      window.location.href = redirectPath;
    }, 0);
    return false;
  }

  return true;
};
