use soroban_sdk::{symbol_short, Address, Env, Map, String};

pub fn store_vote(env: Env, project_id: String, voter: Address, vote_value: i32, weight: u64) {
    let key = (project_id.clone(), voter.clone());
    let mut votes: Map<(String, Address), (i32, u64)> = env
        .storage()
        .persistent()
        .get(&symbol_short!("votes"))
        .unwrap_or(Map::new(&env));

    if votes.contains_key(key) {
        panic!("User has already voted on this project");
    }

    let key = (project_id, voter);
    votes.set(key, (vote_value, weight));
    env.storage().persistent().set(&symbol_short!("votes"), &votes);
}

