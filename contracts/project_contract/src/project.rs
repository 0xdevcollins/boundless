use soroban_sdk::{contracttype, Address, Env, String, Vec};

#[derive(Clone)]
#[contracttype]
pub struct Project {
    pub project_id: String,
    pub creator: Address,
    pub metadata_uri: String,
    pub funding_target: u64,
    pub milestone_count: u32,
    pub current_milestone: u32,
    pub total_funded: u64,
    pub backers: Vec<(Address, u64)>,
    pub validated: bool,
    pub is_successful: bool,
    pub is_closed: bool,
    pub created_at: u64,
}

impl Project {
    pub fn new(
        env: &Env,
        project_id: String,
        creator: Address,
        metadata_uri: String,
        funding_target: u64,
        milestone_count: u32,
    ) -> Self {
        Self {
            project_id,
            creator,
            metadata_uri,
            funding_target,
            milestone_count,
            current_milestone: 0,
            total_funded: 0,
            backers: Vec::new(env),
            validated: false,
            is_successful: false,
            is_closed: false,
            created_at: env.ledger().timestamp(),
        }
    }
}
