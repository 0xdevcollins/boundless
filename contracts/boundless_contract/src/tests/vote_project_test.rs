#[cfg(test)]
use crate::contract::{BoundlessContract, BoundlessContractClient};
use crate::error::ProjectError;

use super::*;
use soroban_sdk::{testutils::Address as _, Address, Env, String};

#[test]
fn test_voting() {
    let env = Env::default();
    let contract_id = env.register(BoundlessContract, ());
    let client = BoundlessContractClient::new(&env, &contract_id);

    let creator = Address::generate(&env);
    let voter = Address::generate(&env);
    let project_id = String::from_str(&env, "test_project");
    let metadata_uri = String::from_str(&env, "ipfs://example-metadata");

    client.create_project(&project_id, &creator, &metadata_uri, &1000, &5);

    assert_eq!(client.has_voted(&project_id, &voter), false);

    client.vote_project(&project_id, &voter, &1);
    assert_eq!(client.has_voted(&project_id, &voter), true);
    assert_eq!(client.get_vote(&project_id, &voter), 1);

    client.withdraw_vote(&project_id, &voter);
    assert_eq!(client.has_voted(&project_id, &voter), false);
}
