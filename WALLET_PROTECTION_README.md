# Wallet Protection System

## Overview

The Boundless platform now includes a comprehensive wallet protection system that ensures all critical blockchain actions require wallet connection before execution. This system provides a seamless user experience while maintaining security and transparency.

## Components

### 1. useWalletProtection Hook

**Location:** `hooks/use-wallet-protection.ts`

A custom React hook that provides wallet protection functionality for any component that needs to perform blockchain actions.

#### Usage

```typescript
import { useWalletProtection } from '@/hooks/use-wallet-protection';

const MyComponent = () => {
  const { requireWallet, showWalletModal, handleWalletConnected, closeWalletModal } = useWalletProtection({
    actionName: 'perform this action'
  });

  const handleAction = () => {
    requireWallet(() => {
      // Your blockchain action here
      console.log('Action executed with wallet connected');
    });
  };

  return (
    <>
      <button onClick={handleAction}>Perform Action</button>

      <WalletRequiredModal
        open={showWalletModal}
        onOpenChange={closeWalletModal}
        actionName="perform this action"
        onWalletConnected={handleWalletConnected}
      />
    </>
  );
};
```

#### Options

- `actionName` (string): Human-readable description of the action requiring wallet connection
- `showModal` (boolean, optional): Whether to show the modal (default: true)

#### Return Values

- `requireWallet(callback)`: Function that checks wallet connection and executes callback if connected
- `isConnected`: Boolean indicating if wallet is currently connected
- `publicKey`: Current wallet public key
- `showWalletModal`: Boolean controlling modal visibility
- `handleWalletConnected`: Function to call when wallet is successfully connected
- `closeWalletModal`: Function to close the modal

### 2. WalletRequiredModal Component

**Location:** `components/wallet/WalletRequiredModal.tsx`

A modal component that appears when wallet connection is required for an action.

#### Props

- `open` (boolean): Controls modal visibility
- `onOpenChange` (function): Callback when modal open state changes
- `actionName` (string): Description of the action requiring wallet
- `onWalletConnected` (function, optional): Callback when wallet is successfully connected

#### Features

- Clear explanation of why wallet connection is needed
- Benefits of wallet connection
- Integrated wallet connection button
- Seamless flow from modal to wallet connection

## Protected Actions

The following critical blockchain actions now require wallet connection:

### 1. Launch Campaign

**Components:** `LaunchCampaignFlow.tsx`

- **Action:** Deploying smart escrow contracts
- **Protection:** Prevents campaign launch without wallet connection

### 2. Back Project

**Components:** `back-project-form.tsx`

- **Action:** Contributing funds to projects
- **Protection:** Ensures secure transaction signing

### 3. Project Initialization

**Components:** `Initialize.tsx`

- **Action:** Creating new projects on blockchain
- **Protection:** Validates creator identity and wallet ownership

### 4. Milestone Submission

**Components:** `MilestoneSubmissionModal.tsx`, `MilestoneSubmissionPage.tsx`

- **Action:** Submitting milestone proofs for review
- **Protection:** Ensures authentic submissions from project creators

### 5. Project Voting

**Components:** `ValidationFlow.tsx`, `project-card.tsx`

- **Action:** Voting on project validation
- **Protection:** Prevents duplicate voting and ensures authentic votes

## User Flow

1. **User clicks action button** (e.g., "Launch Campaign")
2. **Wallet check:** System checks if wallet is connected
3. **If not connected:** WalletRequiredModal appears with explanation
4. **User clicks "Connect Wallet":** Wallet connection modal opens
5. **User connects wallet:** Modal closes, action proceeds automatically
6. **If already connected:** Action proceeds immediately

## Error Handling

The system includes comprehensive error handling:

- **Connection failures:** Clear error messages with retry options
- **Network issues:** Graceful fallback and user guidance
- **Wallet errors:** Specific error messages for different wallet types
- **Transaction failures:** Detailed feedback for debugging

## Integration Examples

### Basic Integration

```typescript
// Before (no wallet protection)
const handleAction = () => {
  performBlockchainAction();
};

// After (with wallet protection)
const {
  requireWallet,
  showWalletModal,
  handleWalletConnected,
  closeWalletModal,
} = useWalletProtection({
  actionName: 'perform blockchain action',
});

const handleAction = () => {
  requireWallet(() => {
    performBlockchainAction();
  });
};
```

### Advanced Integration

```typescript
const MyComponent = () => {
  const { requireWallet, showWalletModal, handleWalletConnected, closeWalletModal } = useWalletProtection({
    actionName: 'launch campaign',
    showModal: true
  });

  const handleLaunch = async () => {
    requireWallet(async () => {
      try {
        // Show loading state
        setIsLoading(true);

        // Perform blockchain action
        const result = await launchCampaign(projectId);

        // Handle success
        toast.success('Campaign launched successfully!');
        onSuccess(result);
      } catch (error) {
        // Handle error
        toast.error('Failed to launch campaign');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    });
  };

  return (
    <>
      <Button onClick={handleLaunch} disabled={isLoading}>
        {isLoading ? 'Launching...' : 'Launch Campaign'}
      </Button>

      <WalletRequiredModal
        open={showWalletModal}
        onOpenChange={closeWalletModal}
        actionName="launch campaign"
        onWalletConnected={handleWalletConnected}
      />
    </>
  );
};
```

## Security Benefits

1. **Prevents unauthorized actions:** Users cannot perform blockchain actions without wallet connection
2. **Ensures transaction signing:** All actions require proper wallet authentication
3. **Prevents duplicate submissions:** Wallet connection provides unique identity verification
4. **Audit trail:** All actions are traceable to specific wallet addresses
5. **Fraud prevention:** Reduces risk of fake submissions and votes

## User Experience Benefits

1. **Clear messaging:** Users understand why wallet connection is needed
2. **Seamless flow:** Smooth transition from action to wallet connection
3. **Consistent experience:** Same protection pattern across all blockchain actions
4. **Error recovery:** Clear guidance when things go wrong
5. **No breaking changes:** Existing functionality preserved with added security

## Testing

To test the wallet protection system:

1. **Without wallet connected:**
   - Click any protected action button
   - Verify modal appears with explanation
   - Test wallet connection flow

2. **With wallet connected:**
   - Connect wallet first
   - Click protected action button
   - Verify action proceeds immediately

3. **Error scenarios:**
   - Test with network issues
   - Test with wallet connection failures
   - Verify error messages are clear and helpful

## Future Enhancements

Potential improvements for the wallet protection system:

1. **Multi-wallet support:** Support for multiple connected wallets
2. **Permission levels:** Different wallet requirements for different actions
3. **Batch operations:** Support for multiple actions requiring single wallet connection
4. **Offline mode:** Graceful handling when blockchain is unavailable
5. **Analytics:** Track wallet connection success rates and user behavior

## Troubleshooting

### Common Issues

1. **Modal not appearing:** Check that `showModal` option is not set to false
2. **Wallet connection fails:** Verify wallet extension is installed and unlocked
3. **Action not executing:** Ensure callback is properly passed to `requireWallet`
4. **TypeScript errors:** Check that all required props are provided to components

### Debug Mode

Enable debug logging by setting environment variable:

```bash
NEXT_PUBLIC_DEBUG_WALLET=true
```

This will log wallet connection attempts and errors to the console for debugging purposes.
