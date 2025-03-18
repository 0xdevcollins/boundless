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
}
