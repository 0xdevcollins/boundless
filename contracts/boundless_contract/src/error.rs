use soroban_sdk::contracterror;

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum ProjectError {
    NotFound = 1,
    AlreadyExists = 2,
    StorageError = 3,
    OverOrUnderFlow = 4,
    Unauthorized = 5,
    ProjectClosed = 6,
    InvalidFundingTarget = 7,
    InvalidVote = 8,
    AlreadyVoted = 9,
    NotVoted = 10,
    AlreadyInitialized = 100,
    NotInitialized = 101,
    UpgradeFailed = 400,
    InvalidMilestoneNumber = 11,
    MilestoneAlreadyCompleted = 12,
    MilestoneNotApproved = 13,
    NoFundsToRefund = 14,
    ProjectNotFailed = 15,
    RefundAlreadyProcessed = 16,
    InvalidAmount = 17,
    ProjectAlreadyFunded = 18,
    FundingTargetReached = 19,
    FundingDeadlinePassed = 20,
    InsufficientFunds = 21,
    InvalidFunder = 22,
}
