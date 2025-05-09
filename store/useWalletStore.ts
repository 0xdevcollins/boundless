import { connect, disconnect, getPublicKey } from '@/hooks/useStellarWallet';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type WalletStore = {
  isConnected: boolean;
  publicKey: string | null;
  connecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  setWallet: () => void;
};

export const useWalletStore = create<WalletStore>()(
  persist(
    (set, get) => ({
      isConnected: false,
      publicKey: null,
      connecting: false,

      connect: async () => {
        try {
          set({ connecting: true });
          await connect(async () => {
            const publicKey = await getPublicKey();
            set({
              isConnected: Boolean(publicKey),
              publicKey,
              connecting: false,
            });
          });
        } catch (error) {
          console.error('Failed to connect wallet:', error);
          set({ connecting: false });
        }
      },

      disconnect: async () => {
        try {
          await disconnect(async () => {
            set({
              isConnected: false,
              publicKey: null,
              connecting: false,
            });
          });
        } catch (error) {
          console.error('Failed to disconnect wallet:', error);
          // Ensure state is reset even on disconnect failure
          set({ connecting: false });
        }
      },

      setWallet: () => set({ isConnected: !get().isConnected }),
    }),
    {
      name: 'wallet-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
