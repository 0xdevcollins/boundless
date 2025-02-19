#![no_std]

use soroban_sdk::{contracttype, Address, Env, Vec};

#[derive(Clone)]
#[contracttype]
pub struct Project {
    pub project_id: u64,
    pub creator: Address,
    pub funding_target: u64,
    pub milestone_count: u32,
    pub current_milestone: u32,
    pub total_funded: u64,
    pub backers: Vec<(Address, u64)>,
    pub validated: bool,
}

impl Project {
    pub fn new(env: &Env, project_id: u64, creator: Address, funding_target: u64, milestone_count: u32) -> Self {
        Self {
            project_id,
            creator,
            funding_target,
            milestone_count,
            current_milestone: 0,
            total_funded: 0,
            backers: Vec::new(env),
            validated: false,
        }
    }
}
