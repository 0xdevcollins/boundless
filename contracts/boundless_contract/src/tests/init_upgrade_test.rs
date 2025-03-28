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
    
    let admin = Address::generate(&env);
    client.initialize(&admin);
    
    assert_eq!(1, client.get_version());
    
    assert_eq!(admin, client.get_admin());
}

#[test]
#[should_panic(expected = "Error(Contract, #100)")]
fn test_cannot_reinitialize() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register(BoundlessContract, ());
    let client = BoundlessContractClient::new(&env, &contract_id);
    
    let admin = Address::generate(&env);
    client.initialize(&admin);

    let result = client.initialize(&admin);
    
}

#[test]
fn test_project_deadlines() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register(BoundlessContract, ());
    let client = BoundlessContractClient::new(&env, &contract_id);
    
    let admin = Address::generate(&env);
    client.initialize(&admin);

    let creator = Address::generate(&env);
    let project_id = String::from_str(&env, "test_project");
    let metadata_uri = String::from_str(&env, "ipfs://example-metadata");
    
    client.create_project(&project_id, &creator, &metadata_uri, &1000, &5);

    let project = client.get_project(&project_id);
    
    assert_eq!(
        project.funding_deadline,
        project.created_at + FUNDING_PERIOD_LEDGERS as u64
    );
    
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
    
//     let admin = Address::generate(&env);
//     client.initialize(&admin);

//     let non_admin = Address::generate(&env);
    
//     env.as_contract(&non_admin, || {
//         let result = client.upgrade(&[0u8; 32]); // Dummy WASM hash
//         assert!(result.is_err());
        
//         let err: ProjectError = result.err().unwrap().try_into().unwrap();
//         assert_eq!(err, ProjectError::Unauthorized);
//     });
// }
