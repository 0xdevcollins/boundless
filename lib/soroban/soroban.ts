import {
	FREIGHTER_ID,
	StellarWalletsKit,
	WalletNetwork,
	allowAllModules,
} from "@creit.tech/stellar-wallets-kit";
import {
	Address,
	BASE_FEE,
	Contract,
	Networks,
	TransactionBuilder,
	nativeToScVal,
	rpc,
	type xdr,
} from "@stellar/stellar-sdk";

const RPC_URL = "https://soroban-testnet.stellar.org";
const CONTRACT_ADDRESS =
	"CCCVHFXEQ5RBRRW4YX35TZ5X4D5ZZVLORIQXJB6ECI2BY5HBYBLD34PZ";

const walletKit = new StellarWalletsKit({
	network: WalletNetwork.TESTNET,
	selectedWalletId: FREIGHTER_ID,
	modules: allowAllModules(),
});

const TX_PARAMS = {
	fee: BASE_FEE,
	networkPassphrase: Networks.TESTNET,
};

/**
 * Converts a string to an XDR symbol.
 */
export const stringToSymbol = (value: string) =>
	nativeToScVal(value, { type: "symbol" });

/**
 * Converts a Stellar address to XDR format.
 */
export const accountToScVal = (account: string) =>
	new Address(account).toScVal();

/**
 * Converts a number to an XDR `u64` value.
 */
export const numberToScVal = (value: number) =>
	nativeToScVal(value, { type: "u64" });

/**
 * Interacts with the Soroban smart contract.
 */
export const contractInteraction = async (
	functName: string,
	values?: xdr.ScVal[],
) => {
	const provider = new rpc.Server(RPC_URL, { allowHttp: true });
	const contract = new Contract(CONTRACT_ADDRESS);

	// Fetch connected wallet address
	const { address: caller } = await walletKit.getAddress();
	if (!caller) throw new Error("No connected wallet");

	const sourceAccount = await provider.getAccount(caller);

	// Build transaction
	const transaction = new TransactionBuilder(sourceAccount, TX_PARAMS)
		.addOperation(contract.call(functName, ...(values || [])))
		.setTimeout(120) // ⬅️ Increased timeout
		.build();

	// Prepare transaction
	const preparedTx = await provider.prepareTransaction(transaction);
	const preparedTxXDR = preparedTx.toXDR();

	// Sign transaction using StellarWalletsKit
	const { signedTxXdr } = await walletKit.signTransaction(preparedTxXDR, {
		address: caller,
		networkPassphrase: WalletNetwork.TESTNET,
	});

	const signedTx = TransactionBuilder.fromXDR(signedTxXdr, Networks.TESTNET);

	try {
		// Submit transaction
		const sendTx = await provider.sendTransaction(signedTx);
		if (sendTx.errorResult) throw new Error("Transaction submission failed");

		// Wait for transaction confirmation
		if (sendTx.status === "PENDING") {
			let txResponse = await provider.getTransaction(sendTx.hash);
			while (txResponse.status === "NOT_FOUND") {
				await new Promise((resolve) => setTimeout(resolve, 100));
				txResponse = await provider.getTransaction(sendTx.hash);
			}

			if (txResponse.status === "SUCCESS") {
				return txResponse.returnValue;
			}
		}
	} catch (err) {
		console.error("Contract interaction error:", err);
		return err;
	}
};
