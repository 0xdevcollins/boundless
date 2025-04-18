#![cfg(test)]

use crate::{
    contract::{BoundlessContract, BoundlessContractClient},
    error::ProjectError,
};
use soroban_sdk::{
    testutils::{Address as _, Ledger},
    token::{self, TokenClient},
    Address, Env, String,
};
use token::StellarAssetClient as TokenAdminClient;

fn create_token_contract<'a>(e: &Env, admin: &Address) -> (TokenClient<'a>, TokenAdminClient<'a>) {
    let sac = e.register_stellar_asset_contract_v2(admin.clone());
    (
        token::Client::new(e, &sac.address()),
        token::StellarAssetClient::new(e, &sac.address()),
    )
}
// #[test]
// fn test_milestone_operations() {
//     let env = Env::default();
//     env.mock_all_auths();

//     // Initialize contract
//     let contract_id = env.register_contract(None, BoundlessContract);
//     let client = BoundlessContractClient::new(&env, &contract_id);

//     // Setup addresses
//     let admin = Address::generate(&env);
//     let creator = Address::generate(&env);
//     let project_id = String::from_str(&env, "test_project");
//     let metadata_uri = String::from_str(&env, "ipfs://example-metadata");

//     // Initialize contract
//     client.initialize(&admin);

//     // Create project
//     client.create_project(&project_id, &creator, &metadata_uri, &1000, &2);

//     // Test approve milestone
//     client.approve_milestone(&project_id, &0, &admin);
//     let project = client.get_project(&project_id);
//     assert!(project.milestone_approvals.iter().any(|(num, approved)| *num == 0 && *approved));

//     // Test reject milestone
//     client.reject_milestone(&project_id, &1, &admin);
//     let project = client.get_project(&project_id);
//     assert!(project.milestone_approvals.iter().any(|(num, approved)| *num == 1 && !*approved));

//     // Test release milestone
//     client.release_milestone(&project_id, &0, &admin);
//     let project = client.get_project(&project_id);
//     assert!(project.milestone_releases.iter().any(|(num, _)| *num == 0));
//     assert_eq!(project.current_milestone, 1);
// }

struct FundingTest<'a> {
    env: Env,
    admin: Address,
    creator: Address,
    funder: Address,
    token_contract: Address,
    token_client: TokenClient<'a>,
    token_admin_client: TokenAdminClient<'a>,
    contract_client: BoundlessContractClient<'a>,
    project_id: String,
    metadata_uri: String,
}

impl<'a> FundingTest<'a> {
    fn setup() -> Self {
        let env = Env::default();
        env.mock_all_auths();

        // Setup addresses
        let admin = Address::generate(&env);
        let creator = Address::generate(&env);
        let funder = Address::generate(&env);
        let project_id = String::from_str(&env, "test_project");
        let metadata_uri = String::from_str(&env, "ipfs://example-metadata");

        // Initialize token contract and client
        let (token_client, token_admin_client) = create_token_contract(&env, &admin);
        let token_contract = token_client.address.clone();

        // Mint tokens to funder
        token_admin_client.mint(&funder, &3000);

        // Initialize contract
        let contract_id = env.register(BoundlessContract, ());
        let contract_client = BoundlessContractClient::new(&env, &contract_id);
        contract_client.initialize(&admin);

        // Create project
        contract_client.create_project(&project_id, &creator, &metadata_uri, &1000, &2);

        // Set up token permissions for the contract
        token_admin_client.set_authorized(&contract_id, &true);

        FundingTest {
            env,
            admin,
            creator,
            funder,
            token_contract,
            token_client,
            token_admin_client,
            contract_client,
            project_id,
            metadata_uri,
        }
    }
}

#[test]
fn test_funding_operations() {
    let test = FundingTest::setup();

    test.contract_client
        .fund_project(&test.project_id, &500, &test.funder, &test.token_contract);

    // Test get project funding
    let (total_funded, target) = test.contract_client.get_project_funding(&test.project_id);
    assert_eq!(total_funded, 500);
    assert_eq!(target, 1000);

    // Test get backer contribution
    let contribution = test
        .contract_client
        .get_backer_contribution(&test.project_id, &test.funder);
    assert_eq!(contribution, 500);

    // // Test funding target reached
    test.contract_client
        .fund_project(&test.project_id, &600, &test.funder, &test.token_contract);
    let (total_funded, _) = test.contract_client.get_project_funding(&test.project_id);
    assert_eq!(total_funded, 1000); // Should be capped at funding target
}

#[test]
fn test_refund() {
    let test = FundingTest::setup();

    // Fund project with some amount
    test.contract_client
        .fund_project(&test.project_id, &500, &test.funder, &test.token_contract);

    // Fast forward past funding deadline
    let before = test.env.ledger().timestamp();
    let after = before + 31 * 17280; // 31 days in ledgers
    test.env.ledger().set_timestamp(after);

    // Test refund
    test.contract_client
        .refund(&test.project_id, &test.token_contract);

    // Verify project state
    let project = test.contract_client.get_project(&test.project_id);
    assert!(project.refund_processed);
    assert!(project.is_closed);

    // Verify funder received their tokens back
    let funder_balance = test.token_client.balance(&test.funder);
    assert_eq!(funder_balance, 3000); // Should have original balance back
}

#[test]
#[should_panic(expected = "Error(Contract, #5)")]
fn test_unauthorized_milestone_approval() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register(BoundlessContract, ());
    let client = BoundlessContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let creator = Address::generate(&env);
    let non_admin = Address::generate(&env);
    let project_id = String::from_str(&env, "test_project");
    let metadata_uri = String::from_str(&env, "ipfs://example-metadata");

    client.initialize(&admin);
    client.create_project(&project_id, &creator, &metadata_uri, &1000, &2);

    // Try to approve milestone with non-admin
    client.approve_milestone(&project_id, &0, &non_admin);
}

#[test]
#[should_panic(expected = "Error(Contract, #5)")]
fn test_unauthorized_milestone_release() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register(BoundlessContract, ());
    let client = BoundlessContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let creator = Address::generate(&env);
    let non_admin = Address::generate(&env);
    let project_id = String::from_str(&env, "test_project");
    let metadata_uri = String::from_str(&env, "ipfs://example-metadata");

    client.initialize(&admin);
    client.create_project(&project_id, &creator, &metadata_uri, &1000, &2);

    // Try to release milestone with non-admin
    client.release_milestone(&project_id, &0, &non_admin);
}
