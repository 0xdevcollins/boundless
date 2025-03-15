#![cfg(test)]

use crate::create_project::{CreateProject, CreateProjectClient, CreateProjectStorage};
use soroban_sdk::{testutils::Address, Env, String};

#[test]
fn test_create_project_success() {
    let env = Env::default();
    let contract_id = env.register(CreateProject, ());
    let client = CreateProjectClient::new(&env, &contract_id);

    // let creator_key = String::from_str(
    //     &env,
    //     "GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF",
    // );
    let creator = <soroban_sdk::Address as Address>::generate(&env);
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

    let project = env.as_contract(&contract_id, || {
        CreateProjectStorage::fetch_project(&env, &project_id).expect("Project not found")
    });

    assert_eq!(project.project_id, project_id);
    assert_eq!(project.creator, creator);
    assert_eq!(project.metadata_uri, metadata_uri);
    assert_eq!(project.funding_target, funding_target);
    assert_eq!(project.milestone_count, milestone_count);
    assert!(!project.is_closed);
}

#[test]
#[should_panic(expected = "Project ID already exists")]
fn test_create_project_duplicate_id_fails() {
    let env = Env::default();
    let contract_id = env.register(CreateProject, ());
    let client = CreateProjectClient::new(&env, &contract_id);

    let creator = <soroban_sdk::Address as Address>::generate(&env);
    let project_id = String::from_str(&env, "test_project");
    let metadata_uri = String::from_str(&env, "ipfs://example-metadata");

    client.create_project(&project_id, &creator, &metadata_uri, &1000, &5);
    client.create_project(&project_id, &creator, &metadata_uri, &2000, &3);
}

#[test]
#[should_panic(expected = "Funding target must be greater than zero")]
fn test_create_project_zero_funding_target_fails() {
    let env = Env::default();
    let contract_id = env.register(CreateProject, ());
    let client = CreateProjectClient::new(&env, &contract_id);

    let creator = <soroban_sdk::Address as Address>::generate(&env);
    let project_id = String::from_str(&env, "test_project");
    let metadata_uri = String::from_str(&env, "ipfs://example-metadata");

    client.create_project(&project_id, &creator, &metadata_uri, &0, &3);
}

#[test]
fn test_update_project_metadata_success() {
    let env = Env::default();
    let contract_id = env.register(CreateProject, ());
    let client = CreateProjectClient::new(&env, &contract_id);

    let creator = <soroban_sdk::Address as Address>::generate(&env);
    let project_id = String::from_str(&env, "test_project");
    let metadata_uri = String::from_str(&env, "ipfs://example-metadata");
    let new_metadata_uri = String::from_str(&env, "ipfs://new-metadata");

    client.create_project(&project_id, &creator, &metadata_uri, &1000, &5);
    client.update_project_metadata(&project_id, &creator, &new_metadata_uri);

    let project = env.as_contract(&contract_id, || {
        CreateProjectStorage::fetch_project(&env, &project_id).expect("Project not found")
    });

    assert_eq!(project.metadata_uri, new_metadata_uri);
}

#[test]
#[should_panic(expected = "Only the project creator can modify metadata")]
fn test_update_project_metadata_wrong_creator_fails() {
    let env = Env::default();
    let contract_id = env.register(CreateProject, ());
    let client = CreateProjectClient::new(&env, &contract_id);

    let creator = <soroban_sdk::Address as Address>::generate(&env);
    let other_user = <soroban_sdk::Address as Address>::generate(&env);
    let project_id = String::from_str(&env, "test_project");
    let metadata_uri = String::from_str(&env, "ipfs://example-metadata");

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
    let contract_id = env.register(CreateProject, ());
    let client = CreateProjectClient::new(&env, &contract_id);

    let creator = <soroban_sdk::Address as Address>::generate(&env);
    let project_id = String::from_str(&env, "test_project");
    let metadata_uri = String::from_str(&env, "ipfs://example-metadata");

    client.create_project(&project_id, &creator, &metadata_uri, &1000, &5);
    client.modify_milestone(&project_id, &creator, &10);

    let project = env.as_contract(&contract_id, || {
        CreateProjectStorage::fetch_project(&env, &project_id).expect("Project not found")
    });

    assert_eq!(project.milestone_count, 10);
}

#[test]
#[should_panic(expected = "Only the project creator can modify milestones")]
fn test_modify_milestone_wrong_caller_fails() {
    let env = Env::default();
    let contract_id = env.register(CreateProject, ());
    let client = CreateProjectClient::new(&env, &contract_id);

    let creator = <soroban_sdk::Address as Address>::generate(&env);
    let other_user = <soroban_sdk::Address as Address>::generate(&env);
    let project_id = String::from_str(&env, "test_project");
    let metadata_uri = String::from_str(&env, "ipfs://example-metadata");

    client.create_project(&project_id, &creator, &metadata_uri, &1000, &5);
    client.modify_milestone(&project_id, &other_user, &10);
}

#[test]
fn test_close_project_success() {
    let env = Env::default();
    let contract_id = env.register(CreateProject, ());
    let client = CreateProjectClient::new(&env, &contract_id);

    let creator = <soroban_sdk::Address as Address>::generate(&env);
    let project_id = String::from_str(&env, "test_project");
    let metadata_uri = String::from_str(&env, "ipfs://example-metadata");

    client.create_project(&project_id, &creator, &metadata_uri, &1000, &5);
    client.close_project(&project_id, &creator);

    let project = env.as_contract(&contract_id, || {
        CreateProjectStorage::fetch_project(&env, &project_id).expect("Project not found")
    });

    assert!(project.is_closed);
}

#[test]
#[should_panic(expected = "Only the project creator can close the project")]
fn test_close_project_wrong_caller_fails() {
    let env = Env::default();
    let contract_id = env.register(CreateProject, ());
    let client = CreateProjectClient::new(&env, &contract_id);

    let creator = <soroban_sdk::Address as Address>::generate(&env);
    let other_user = <soroban_sdk::Address as Address>::generate(&env);
    let project_id = String::from_str(&env, "test_project");
    let metadata_uri = String::from_str(&env, "ipfs://example-metadata");

    client.create_project(&project_id, &creator, &metadata_uri, &1000, &5);
    client.close_project(&project_id, &other_user);
}
