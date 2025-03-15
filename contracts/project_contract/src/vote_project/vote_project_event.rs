use soroban_sdk::{log, Address, Env, String};

pub fn emit_vote_event(env: Env, project_id: String, voter: Address, vote_value: i32, weight: u64) {
    log!(
        &env,
        "Vote Cast: Project ID {}, Voter {}, Vote Value {}, Weight {}",
        project_id,
        voter,
        vote_value,
        weight
    );
}
