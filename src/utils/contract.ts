import { contractClient } from "@/src/contracts/boundless_contract";
import { signTransaction } from "@/hooks/useStellarWallet";
import { useWalletStore } from "@/store/useWalletStore";
import { toast } from "sonner";

// Define available contract methods
type ContractMethod = 
  | "initialize"
  | "upgrade"
  | "get_admin"
  | "get_version"
  | "fund_project"
  | "refund"
  | "get_project_funding"
  | "get_backer_contribution"
  | "whitelist_token_contract"
  | "release_milestone"
  | "approve_milestone"
  | "reject_milestone"
  | "get_milestone_status"
  | "get_project_milestones"
  | "create_project"
  | "get_project"
  | "update_project_metadata"
  | "update_project_milestone_count"
  | "modify_milestone"
  | "close_project"
  | "get_project_status"
  | "list_projects"
  | "get_project_stats"
  | "vote_project"
  | "withdraw_vote"
  | "has_voted"
  | "get_vote";

type ContractParams = {
  initialize: { admin: string };
  upgrade: { new_wasm_hash: Buffer };
  get_admin: Record<string, never>;
  get_version: Record<string, never>;
  fund_project: { project_id: string; amount: bigint; funder: string; token_contract: string };
  refund: { project_id: string; token_contract: string };
  get_project_funding: { project_id: string };
  get_backer_contribution: { project_id: string; backer: string };
  whitelist_token_contract: { admin: string; project_id: string; token_contract: string };
  release_milestone: { project_id: string; milestone_number: number; admin: string };
  approve_milestone: { project_id: string; milestone_number: number; admin: string };
  reject_milestone: { project_id: string; milestone_number: number; admin: string };
  get_milestone_status: { project_id: string; milestone_number: number };
  get_project_milestones: { project_id: string };
  create_project: { project_id: string; creator: string; metadata_uri: string; funding_target: bigint; milestone_count: number };
  get_project: { project_id: string };
  update_project_metadata: { project_id: string; creator: string; new_metadata_uri: string };
  update_project_milestone_count: { project_id: string; creator: string; new_milestone_count: number };
  modify_milestone: { project_id: string; caller: string; new_milestone_count: number };
  close_project: { project_id: string; creator: string };
  get_project_status: { project_id: string };
  list_projects: Record<string, never>;
  get_project_stats: { project_id: string };
  vote_project: { project_id: string; voter: string; vote_value: number };
  withdraw_vote: { project_id: string; voter: string };
  has_voted: { project_id: string; voter: string };
  get_vote: { project_id: string; voter: string };
};

interface ContractInvokeOptions<T extends ContractMethod> {
  method: T;
  params: ContractParams[T];
  successMessage?: string;
  errorMessage?: string;
  onError?: (error: { code: number; message?: string; details?: unknown }) => void;
}

function extractContractErrorCode(errorMessage: string): number | null {
  // Look for patterns like "Error(Contract, #4)" or "Error(Contract, 4)"
  const match = errorMessage.match(/Error\(Contract,\s*#?(\d+)\)/);
  if (match) {
    return parseInt(match[1], 10);
  }
  return null;
}

function getContractErrorMessage(errorCode: number): string {
  // Map error codes to their messages from the contract
  const errorMessages: Record<number, string> = {
    1: "Contract has already been initialized",
    2: "Invalid user authorization for action",
    3: "Project with the given ID already exists",
    4: "Project with the given ID does not exist",
    5: "Invalid funding target amount",
    6: "Invalid milestone count",
    7: "Project is closed",
    8: "Funding period has ended",
    9: "Voting period has ended",
    10: "User has already voted",
    11: "User has not voted",
    12: "Invalid vote value",
    13: "Milestone has already been released",
    14: "Milestone has already been approved",
    15: "Milestone has already been rejected",
    16: "Insufficient funds",
    17: "Refund already processed",
    18: "Invalid operation for current project status",
    19: "Internal error",
    20: "Token contract has already been whitelisted",
    21: "Token contract has not been whitelisted",
    22: "No backers found for the project",
    23: "Transfer failed",
    24: "Balance check failed"
  };

  return errorMessages[errorCode] || "An unexpected error occurred";
}

export async function invokeContract<T extends ContractMethod>({
  method,
  params,
  successMessage = "Transaction successful!",
  errorMessage: customErrorMessage,
  onError,
}: ContractInvokeOptions<T>): Promise<boolean> {
  const { publicKey } = useWalletStore.getState();

  if (!publicKey || !signTransaction) {
    toast.error("Please connect your wallet first");
    return false;
  }

  // Set up contract client
  contractClient.options.publicKey = publicKey;
  contractClient.options.signTransaction = signTransaction;

  try {
    // Get the contract method
    const contractMethod = contractClient[method as keyof typeof contractClient];
    if (typeof contractMethod !== "function") {
      throw new Error(`Invalid contract method: ${String(method)}`);
    }

    // Call the contract method with proper typing
    const tx = await (contractMethod as unknown as (params: ContractParams[T]) => Promise<{ signAndSend: () => Promise<unknown> }>)(params);

    // Sign and send the transaction
    const result = await tx.signAndSend();

    if (result) {
      toast.success(successMessage);
      return true;
    } else {
      throw new Error("Transaction failed");
    }
  } catch (error) {
    console.error(`Contract invocation error (${String(method)}):`, error);
    
    const errorDetails = error;
    let errorCode = -1;
    let errorMessage = customErrorMessage || "An unexpected error occurred";

    // Handle contract errors
    if (error && typeof error === 'object') {
      // Check if it's a contract error with a code
      if ('code' in error) {
        errorCode = Number(error.code);
        errorMessage = getContractErrorMessage(errorCode);
      }
      
      // Check if it's a contract error with a message
      if ('message' in error && typeof error.message === 'string') {
        const rawErrorMessage = error.message;
        
        // Try to extract contract error code from simulation error message
        const contractErrorCode = extractContractErrorCode(rawErrorMessage);
        if (contractErrorCode !== null) {
          errorCode = contractErrorCode;
          errorMessage = getContractErrorMessage(contractErrorCode);
        } else {
          errorMessage = rawErrorMessage;
        }
      }
    }
    
    // Call onError callback with all error details
    if (onError) {
      onError({ 
        code: errorCode, 
        message: errorMessage,
        details: errorDetails 
      });
    } else {
      toast.error(errorMessage);
    }
    return false;
  }
}

// Example usage:
/*
await invokeContract({
  method: "fund_project",
  params: {
    project_id: projectId,
    amount: convertUSDToStroops(Number(amount), xlmPrice),
    funder: publicKey,
    token_contract: "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC"
  },
  successMessage: "Project funded successfully!",
  errorMessage: "Failed to fund project. Please try again.",
  onSuccess: () => {
    // Handle success
  }
});
*/ 
