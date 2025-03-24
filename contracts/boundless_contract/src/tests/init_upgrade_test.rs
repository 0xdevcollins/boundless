#![cfg(test)]

use crate::{
    contract::{BoundlessContract, BoundlessContractClient},
    error::ProjectError,
    storage::{FUNDING_PERIOD_LEDGERS, VOTING_PERIOD_LEDGERS},
};
use soroban_sdk::{testutils::Address as _, Address, Env, String};

#[test]
fn test_initialization() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register(BoundlessContract, ());
    let client = BoundlessContractClient::new(&env, &contract_id);
    
    // Test initialization
    let admin = Address::generate(&env);
    client.initialize(&admin);
    
    // Verify version is 1 after initialization
    assert_eq!(1, client.get_version());
    
    // Verify admin is set correctly
    assert_eq!(admin, client.get_admin());
}

#[test]
#[should_panic(expected = "Error(Contract, #100)")]
fn test_cannot_reinitialize() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register(BoundlessContract, ());
    let client = BoundlessContractClient::new(&env, &contract_id);
    
    // First initialization
    let admin = Address::generate(&env);
    client.initialize(&admin);

    // Attempt second initialization
    let result = client.initialize(&admin);
    
    // Verify the error is AlreadyInitialized
}

#[test]
fn test_project_deadlines() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register(BoundlessContract, ());
    let client = BoundlessContractClient::new(&env, &contract_id);
    
    // Initialize contract
    let admin = Address::generate(&env);
    client.initialize(&admin);

    // Create a project
    let creator = Address::generate(&env);
    let project_id = String::from_str(&env, "test_project");
    let metadata_uri = String::from_str(&env, "ipfs://example-metadata");
    
    client.create_project(&project_id, &creator, &metadata_uri, &1000, &5);

    // Get project details
    let project = client.get_project(&project_id);
    
    // Verify funding deadline is set correctly (30 days from creation)
    assert_eq!(
        project.funding_deadline,
        project.created_at + FUNDING_PERIOD_LEDGERS as u64
    );
    
    // Verify voting deadline is set correctly (30 days after funding deadline)
    assert_eq!(
        project.voting_deadline,
        project.funding_deadline + VOTING_PERIOD_LEDGERS as u64
    );
}

// #[test]
// fn test_unauthorized_upgrade() {
//     let env = Env::default();
//     env.mock_all_auths();

//     let contract_id = env.register_contract(None, BoundlessContract);
//     let client = BoundlessContractClient::new(&env, &contract_id);
    
//     // Initialize with admin
//     let admin = Address::generate(&env);
//     client.initialize(&admin);

//     // Try to upgrade with non-admin address
//     let non_admin = Address::generate(&env);
    
//     // Switch to non-admin context
//     env.as_contract(&non_admin, || {
//         let result = client.upgrade(&[0u8; 32]); // Dummy WASM hash
//         assert!(result.is_err());
        
//         // Verify the error is Unauthorized
//         let err: ProjectError = result.err().unwrap().try_into().unwrap();
//         assert_eq!(err, ProjectError::Unauthorized);
//     });
// } 
