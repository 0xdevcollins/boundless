import { connect, disconnect, getPublicKey } from "@/hooks/useStellarWallet";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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
					console.error("Failed to connect wallet:", error);
					set({ connecting: false });
				}
			},

			disconnect: async () => {
				try {
					await disconnect(async () => {
						set({
							isConnected: false,
							publicKey: null,
						});
					});
				} catch (error) {
					console.error("Failed to disconnect wallet:", error);
				}
			},

			setWallet: () => set({ isConnected: !get().isConnected }),
		}),
		{
			name: "wallet-storage",
			storage: createJSONStorage(() => localStorage),
		},
	),
);
