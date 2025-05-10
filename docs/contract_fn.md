# Boundless Smart Contract TypeScript Binding Documentation

## Contract Initialization and Management

### Initialize Contract

```typescript
async function initialize(admin: Address): Promise<void>;
```

Initializes the contract with an admin address.

- **Parameters:**
  - `admin`: Address of the contract administrator
- **Throws:**
  - `AlreadyInitialized`: If contract has been previously initialized

### Upgrade Contract

```typescript
async function upgrade(newWasmHash: BytesN<32>): Promise<void>;
```

Upgrades the contract with new WASM code.

- **Parameters:**
  - `newWasmHash`: Hash of the new WASM code
- **Throws:**
  - `Unauthorized`: If caller is not the admin

### Get Admin

```typescript
async function getAdmin(): Promise<Address>;
```

Retrieves the current admin address.

- **Returns:** Address of the contract administrator

### Get Version

```typescript
async function getVersion(): Promise<number>;
```

Retrieves the current contract version.

- **Returns:** Current version number (defaults to 1 if not set)

## Project Management

### Create Project

```typescript
async function createProject(
  projectId: string,
  creator: Address,
  metadataUri: string,
  fundingTarget: bigint,
  milestoneCount: number,
): Promise<void>;
```

Creates a new project on the platform.

- **Parameters:**
  - `projectId`: Unique identifier for the project
  - `creator`: Address of the project creator
  - `metadataUri`: URI pointing to the project's metadata
  - `fundingTarget`: Target funding amount (must be > 0)
  - `milestoneCount`: Number of milestones for the project
- **Throws:**
  - `InvalidFundingTarget`: If funding target is 0
  - `AlreadyExists`: If project with same ID exists

### Get Project

```typescript
async function getProject(projectId: string): Promise<Project>;
```

Retrieves project details.

- **Parameters:**
  - `projectId`: ID of the project to fetch
- **Returns:** Project object containing all project details

### Update Project Metadata

```typescript
async function updateProjectMetadata(projectId: string, creator: Address, newMetadataUri: string): Promise<void>;
```

Updates the metadata URI of an existing project.

- **Parameters:**
  - `projectId`: ID of the project
  - `creator`: Must be the original project creator
  - `newMetadataUri`: New metadata URI
- **Throws:**
  - `Unauthorized`: If caller is not the project creator
  - `ProjectClosed`: If project is already closed

### Update Project Milestone Count

```typescript
async function updateProjectMile(projectId: string, creator: Address, newMilestoneCount: number): Promise<void>;
```

Updates the number of milestones for a project.

- **Parameters:**
  - `projectId`: ID of the project
  - `creator`: Must be the project creator
  - `newMilestoneCount`: New number of milestones
- **Throws:**
  - `Unauthorized`: If caller is not the project creator
  - `ProjectClosed`: If project is already closed

### Close Project

```typescript
async function closeProject(projectId: string, creator: Address): Promise<void>;
```

Closes a project permanently.

- **Parameters:**
  - `projectId`: ID of the project
  - `creator`: Must be the project creator
- **Throws:**
  - `Unauthorized`: If caller is not the project creator
  - `ProjectClosed`: If project is already closed

## Voting System

### Vote on Project

```typescript
async function voteProject(projectId: string, voter: Address, voteValue: number): Promise<void>;
```

Casts a vote on a project.

- **Parameters:**
  - `projectId`: ID of the project
  - `voter`: Address of the voter
  - `voteValue`: Must be either 1 (positive) or -1 (negative)
- **Throws:**
  - `InvalidVote`: If vote value is not 1 or -1
  - `AlreadyVoted`: If address has already voted

### Withdraw Vote

```typescript
async function withdrawVote(projectId: string, voter: Address): Promise<void>;
```

Removes a previously cast vote.

- **Parameters:**
  - `projectId`: ID of the project
  - `voter`: Address of the voter
- **Throws:**
  - `NotVoted`: If address hasn't voted on the project

### Check Vote Status

```typescript
async function hasVoted(projectId: string, voter: Address): Promise<boolean>;
```

Checks if an address has voted on a project.

- **Parameters:**
  - `projectId`: ID of the project
  - `voter`: Address to check
- **Returns:** `true` if address has voted, `false` otherwise

### Get Vote Value

```typescript
async function getVote(projectId: string, voter: Address): Promise<number>;
```

Gets the vote value for a specific voter.

- **Parameters:**
  - `projectId`: ID of the project
  - `voter`: Address of the voter
- **Returns:** 1 for positive vote, -1 for negative vote
- **Throws:**
  - `NotVoted`: If address hasn't voted on the project

## Milestone Management

### Release Milestone

```typescript
async function releaseMilestone(projectId: string, milestoneNumber: number, admin: Address): Promise<void>;
```

Releases funds for a completed milestone.

- **Parameters:**
  - `projectId`: ID of the project
  - `milestoneNumber`: Number of the milestone to release
  - `admin`: Must be the contract admin
- **Throws:**
  - `Unauthorized`: If caller is not the admin
  - `InvalidMilestoneNumber`: If milestone number is invalid
  - `MilestoneAlreadyCompleted`: If milestone is already released
  - `MilestoneNotApproved`: If milestone hasn't been approved

### Approve Milestone

```typescript
async function approveMilestone(projectId: string, milestoneNumber: number, admin: Address): Promise<void>;
```

Approves a milestone for release.

- **Parameters:**
  - `projectId`: ID of the project
  - `milestoneNumber`: Number of the milestone to approve
  - `admin`: Must be the contract admin
- **Throws:**
  - `Unauthorized`: If caller is not the admin
  - `InvalidMilestoneNumber`: If milestone number is invalid
  - `MilestoneAlreadyCompleted`: If milestone is already processed

### Reject Milestone

```typescript
async function rejectMilestone(projectId: string, milestoneNumber: number, admin: Address): Promise<void>;
```

Rejects a milestone.

- **Parameters:**
  - `projectId`: ID of the project
  - `milestoneNumber`: Number of the milestone to reject
  - `admin`: Must be the contract admin
- **Throws:**
  - `Unauthorized`: If caller is not the admin
  - `InvalidMilestoneNumber`: If milestone number is invalid
  - `MilestoneAlreadyCompleted`: If milestone is already processed

## Funding Management

### Fund Project

```typescript
async function fundProject(projectId: string, amount: bigint, funder: Address, tokenContract: Address): Promise<void>;
```

Funds a project with tokens.

- **Parameters:**
  - `projectId`: ID of the project
  - `amount`: Amount to fund
  - `funder`: Address of the funder
  - `tokenContract`: Address of the token contract
- **Throws:**
  - `InvalidAmount`: If amount is <= 0
  - `ProjectClosed`: If project is closed
  - `FundingDeadlinePassed`: If funding period has ended
  - `FundingTargetReached`: If funding target has been reached

### Refund Project

```typescript
async function refund(projectId: string, tokenContract: Address): Promise<void>;
```

Processes refunds for a failed project.

- **Parameters:**
  - `projectId`: ID of the project
  - `tokenContract`: Address of the token contract
- **Throws:**
  - `ProjectNotFailed`: If project hasn't failed
  - `RefundAlreadyProcessed`: If refunds have already been processed
  - `NoFundsToRefund`: If there are no funds to refund

### Get Project Funding

```typescript
async function getProjectFunding(projectId: string): Promise<[bigint, bigint]>;
```

Gets the current funding status of a project.

- **Parameters:**
  - `projectId`: ID of the project
- **Returns:** Tuple of [totalFunded, fundingTarget]

### Get Backer Contribution

```typescript
async function getBackerContribution(projectId: string, backer: Address): Promise<bigint>;
```

Gets the contribution amount for a specific backer.

- **Parameters:**
  - `projectId`: ID of the project
  - `backer`: Address of the backer
- **Returns:** Amount contributed by the backer (0 if not a backer)

## Type Definitions

### Project Interface

```typescript
interface Project {
  projectId: string;
  creator: Address;
  metadataUri: string;
  fundingTarget: bigint;
  milestoneCount: number;
  currentMilestone: number;
  totalFunded: bigint;
  backers: [Address, bigint][];
  votes: [Address, number][];
  validated: boolean;
  isSuccessful: boolean;
  isClosed: boolean;
  createdAt: number;
  fundingDeadline: number;
  votingDeadline: number;
  milestoneApprovals: [number, boolean][];
  milestoneReleases: [number, bigint][];
  refundProcessed: boolean;
}
```

### Error Types

```typescript
enum ProjectError {
  AlreadyInitialized = 'AlreadyInitialized',
  Unauthorized = 'Unauthorized',
  ProjectClosed = 'ProjectClosed',
  AlreadyExists = 'AlreadyExists',
  InvalidFundingTarget = 'InvalidFundingTarget',
  InvalidVote = 'InvalidVote',
  AlreadyVoted = 'AlreadyVoted',
  NotVoted = 'NotVoted',
  InvalidMilestoneNumber = 'InvalidMilestoneNumber',
  MilestoneAlreadyCompleted = 'MilestoneAlreadyCompleted',
  MilestoneNotApproved = 'MilestoneNotApproved',
  InvalidAmount = 'InvalidAmount',
  FundingDeadlinePassed = 'FundingDeadlinePassed',
  FundingTargetReached = 'FundingTargetReached',
  ProjectNotFailed = 'ProjectNotFailed',
  RefundAlreadyProcessed = 'RefundAlreadyProcessed',
  NoFundsToRefund = 'NoFundsToRefund',
}
```

## Best Practices

1. Always handle potential errors when calling contract functions
2. Verify the caller's address has appropriate permissions before making admin calls
3. Check project status (closed/open) before attempting modifications
4. Use BigInt for funding-related values to handle large numbers accurately
5. Keep track of transaction status and handle pending transactions appropriately
6. Verify milestone status before attempting to release funds
7. Check funding deadlines before attempting to fund projects
8. Ensure proper token approvals before funding projects
