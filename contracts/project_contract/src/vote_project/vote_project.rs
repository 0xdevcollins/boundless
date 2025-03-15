use soroban_sdk::{contract, contractimpl, Address, Env, String};

use super::{vote_project_event, vote_project_storage};

// use super::vote_project_event;

#[contract]
pub struct VotingContract;

#[contractimpl]
impl VotingContract {
    pub fn vote_project(
        env: Env,
        project_id: String,
        voter: Address,
        vote_value: i32,
        weight: u64,
    ) {
        vote_project_storage::store_vote(
            env.clone(),
            project_id.clone(),
            voter.clone(),
            vote_value,
            weight,
        );
        vote_project_event::emit_vote_event(env, project_id, voter, vote_value, weight);
    }
}
