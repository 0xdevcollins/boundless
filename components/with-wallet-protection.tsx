'use client';

import { useWalletStore } from '@/store/useWalletStore';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { WalletConnectionModal } from './wallet-connection-modal';

interface WithWalletProtectionProps {
  children: React.ReactNode;
  redirectPath?: string;
  showLoader?: boolean;
  useModal?: boolean;
}

/**
 * Higher-order component that ensures a wallet is connected before rendering children
 * If no wallet is connected, it shows a modal or redirects to the connect wallet page
 */
export const WithWalletProtection = ({
  children,
  redirectPath = '/',
  showLoader = true,
  useModal = true,
}: WithWalletProtectionProps) => {
  const { isConnected, publicKey } = useWalletStore();
  const [isChecking, setIsChecking] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (!isConnected || !publicKey) {
      if (useModal) {
        setShowModal(true);
      } else {
        setShouldRedirect(true);
      }
    }

    setIsChecking(false);
  }, [isConnected, publicKey, useModal]);

  useEffect(() => {
    if (shouldRedirect && typeof window !== 'undefined') {
      const timer = setTimeout(() => {
        const encodedRedirect = encodeURIComponent(redirectPath);
        window.location.href = `/connect-wallet?redirect=${encodedRedirect}`;
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [shouldRedirect, redirectPath]);

  if (isChecking && showLoader) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if ((!isConnected || !publicKey) && useModal) {
    return (
      <>
        <WalletConnectionModal isOpen={showModal} onClose={() => setShowModal(false)} redirectPath={redirectPath} />
        <div className="opacity-50 pointer-events-none">{children}</div>
      </>
    );
  }

  if (!isConnected || !publicKey) {
    return null;
  }

  return <>{children}</>;
};
