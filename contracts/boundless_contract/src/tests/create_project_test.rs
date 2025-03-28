#[cfg(test)]
use crate::contract::{BoundlessContract, BoundlessContractClient};

use soroban_sdk::{testutils::Address as _, Address, Env, String};

#[test]
fn test_create_project_success() {
    let env = Env::default();
    let contract_id = env.register(BoundlessContract, ());
    let client = BoundlessContractClient::new(&env, &contract_id);

    let creator = Address::generate(&env);
    let project_id = String::from_str(&env, "test_project");
    let metadata_uri = String::from_str(&env, "ipfs://example-metadata");
    let funding_target = 1000;
    let milestone_count = 5;

    client.create_project(
        &project_id,
        &creator,
        &metadata_uri,
        &funding_target,
        &milestone_count,

    );

    let project = client.get_project(&project_id);

    assert_eq!(project.project_id, project_id);
    assert_eq!(project.creator, creator);
    assert_eq!(project.metadata_uri, metadata_uri);
    assert_eq!(project.funding_target, funding_target);
    assert_eq!(project.milestone_count, milestone_count);
    assert!(!project.is_closed);
}

#[test]
#[should_panic(expected = "Error(Contract, #7)")]
fn test_create_project_zero_funding_target_fails() {
    let env = Env::default();
    let contract_id = env.register(BoundlessContract, ());
    let client = BoundlessContractClient::new(&env, &contract_id);

    let creator = Address::generate(&env);
    let project_id = String::from_str(&env, "test_project");
    let metadata_uri = String::from_str(&env, "ipfs://example-metadata");

    client.create_project(&project_id, &creator, &metadata_uri, &0, &3);
    // assert_eq!(result.un(), ProjectError::InvalidFundingTarget);
}
#[test]
#[should_panic(expected = "Error(Contract, #2)")]
fn test_create_project_duplicate_id_fails() {
    let env = Env::default();
    let contract_id = env.register(BoundlessContract, ());
    let client = BoundlessContractClient::new(&env, &contract_id);

    let creator = Address::generate(&env);
    let project_id = String::from_str(&env, "test_project");
    let metadata_uri = String::from_str(&env, "ipfs://example-metadata");

    client.create_project(&project_id, &creator, &metadata_uri, &1000, &5);
    client.create_project(&project_id, &creator, &metadata_uri, &2000, &3);
}

#[test]
fn test_update_project_metadata_success() {
    let env = Env::default();
    let contract_id = env.register(BoundlessContract, ());
    let client = BoundlessContractClient::new(&env, &contract_id);
    
    let creator = Address::generate(&env);
    let project_id = String::from_str(&env, "test_project");
    let metadata_uri = String::from_str(&env, "ipfs://example-metadata");
    let new_metadata_uri = String::from_str(&env, "ipfs://new-metadata");
    
    env.mock_all_auths();
    client.create_project(&project_id, &creator, &metadata_uri, &1000, &5);
    client.update_project_metadata(&project_id, &creator, &new_metadata_uri);

    let project = client.get_project(&project_id);

    assert_eq!(project.metadata_uri, new_metadata_uri);
}

#[test]
#[should_panic(expected = "Error(Contract, #5)")]
fn test_update_project_metadata_wrong_creator_fails() {
    let env = Env::default();
    let contract_id = env.register(BoundlessContract, ());
    let client = BoundlessContractClient::new(&env, &contract_id);

    let creator = Address::generate(&env);
    let other_user = Address::generate(&env);
    let project_id = String::from_str(&env, "test_project");
    let metadata_uri = String::from_str(&env, "ipfs://example-metadata");
    env.mock_all_auths();
    env.mock_all_auths();

    client.create_project(&project_id, &creator, &metadata_uri, &1000, &5);
    client.update_project_metadata(
        &project_id,
        &other_user,
        &String::from_str(&env, "ipfs://new-metadata"),
    );
}

#[test]
fn test_modify_milestone_success() {
    let env = Env::default();
    let contract_id = env.register(BoundlessContract, ());
    let client = BoundlessContractClient::new(&env, &contract_id);

    let creator = Address::generate(&env);
    let project_id = String::from_str(&env, "test_project");
    let metadata_uri = String::from_str(&env, "ipfs://example-metadata");
    env.mock_all_auths();
    env.mock_all_auths();
    client.create_project(&project_id, &creator, &metadata_uri, &1000, &4);

    client.modify_milestone(&project_id, &creator, &10);

    let project = client.get_project(&project_id);

    assert_eq!(10, project.milestone_count);
}

#[test]
#[should_panic(expected = "Error(Contract, #5)")]
fn test_modify_milestone_wrong_caller_fails() {
    let env = Env::default();
    let contract_id = env.register(BoundlessContract, ());
    let client = BoundlessContractClient::new(&env, &contract_id);

    let creator = Address::generate(&env);
    let other_user = Address::generate(&env);
    let project_id = String::from_str(&env, "test_project");
    let metadata_uri = String::from_str(&env, "ipfs://example-metadata");
    env.mock_all_auths();
    env.mock_all_auths();
    client.create_project(&project_id, &creator, &metadata_uri, &1000, &5);
    client.modify_milestone(&project_id, &other_user, &10);
}

#[test]
#[should_panic(expected = "Error(Contract, #5)")]
fn test_close_project_wrong_caller_fails() {
    let env = Env::default();
    let contract_id = env.register(BoundlessContract, ());
    let client = BoundlessContractClient::new(&env, &contract_id);

    let creator = Address::generate(&env);
    let other_user = Address::generate(&env);
    let project_id = String::from_str(&env, "test_project");
    let metadata_uri = String::from_str(&env, "ipfs://example-metadata");
    env.mock_all_auths();
    env.mock_all_auths();

    client.create_project(&project_id, &creator, &metadata_uri, &1000, &5);
    client.close_project(&project_id, &other_user);
}
