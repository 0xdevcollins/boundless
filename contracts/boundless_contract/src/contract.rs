use soroban_sdk::{contract, contractimpl, symbol_short, Address, BytesN, Env, String, Vec, token};

use crate::{
    error::ProjectError,
    storage::{
        get_admin, get_version, is_initialized, project_exists, read_project, set_admin, set_initialized, set_version, update_project, write_project, ContractDataKey, Project,
        FUNDING_PERIOD_LEDGERS, VOTING_PERIOD_LEDGERS,
    },
};

#[contract]
#[allow(dead_code)]
pub struct BoundlessContract;

#[contractimpl]
#[allow(dead_code)]
impl BoundlessContract {
    pub fn initialize(env: Env, admin: Address) -> Result<(), ProjectError> {
        if is_initialized(&env) {
            return Err(ProjectError::AlreadyInitialized);
        }

        set_admin(&env, &admin);
        set_version(&env, 1);
        set_initialized(&env);

        Ok(())
    }

    pub fn upgrade(env: Env, new_wasm_hash: BytesN<32>) -> Result<(), ProjectError> {
        let admin = get_admin(&env);
        if env.current_contract_address() != admin {
            return Err(ProjectError::Unauthorized);
        }

        env.deployer().update_current_contract_wasm(new_wasm_hash);
        set_version(&env, get_version(&env) + 1);

        Ok(())
    }

    pub fn get_admin(e: &Env) -> Address {
        e.storage()
            .instance()
            .get::<ContractDataKey, Address>(&ContractDataKey::Admin)
            .unwrap()
    }

    pub fn get_version(e: &Env) -> u32 {
        e.storage()
            .instance()
            .get::<ContractDataKey, u32>(&ContractDataKey::Version)
            .unwrap_or(1)
    }

    // Helper function to check if funding period has ended
    fn is_funding_period_ended(env: &Env, project: &Project) -> bool {
        env.ledger().timestamp() > project.funding_deadline
    }

    // Helper function to check if voting period has ended
    fn is_voting_period_ended(env: &Env, project: &Project) -> bool {
        env.ledger().timestamp() > project.voting_deadline
    }

    pub fn create_project(
        env: Env,
        project_id: String,
        creator: Address,
        metadata_uri: String,
        funding_target: u64,
        milestone_count: u32,
    ) -> Result<(), ProjectError> {
        if funding_target == 0 {
            return Err(ProjectError::InvalidFundingTarget);
        }
        if project_exists(&env, &project_id) {
            return Err(ProjectError::AlreadyExists);
        }

        let current_timestamp = env.ledger().timestamp();
        let funding_deadline = current_timestamp + FUNDING_PERIOD_LEDGERS as u64;
        let voting_deadline = funding_deadline + VOTING_PERIOD_LEDGERS as u64;

        let project = Project {
            project_id: project_id.clone(),
            creator: creator.clone(),
            metadata_uri,
            funding_target,
            milestone_count,
            current_milestone: 0,
            total_funded: 0,
            backers: Vec::new(&env),
            votes: Vec::new(&env),
            validated: false,
            is_successful: false,
            is_closed: false,
            created_at: current_timestamp,
            funding_deadline,
            voting_deadline,
            milestone_approvals: Vec::new(&env),
            milestone_releases: Vec::new(&env),
            refund_processed: false,
        };

        write_project(&env, project)?;

        Ok(())
    }

    pub fn get_project(env: Env, project_id: String) -> Result<Project, ProjectError> {
        read_project(&env, &project_id)
    }

    // Update project metadata
    pub fn update_project_metadata(
        env: Env,
        project_id: String,
        creator: Address,
        new_metadata_uri: String,
    ) -> Result<(), ProjectError> {
        creator.require_auth();
        let mut project = read_project(&env, &project_id)?;

        if project.creator != creator {
            return Err(ProjectError::Unauthorized);
        }

        if project.is_closed {
            return Err(ProjectError::ProjectClosed);
        }

        project.metadata_uri = new_metadata_uri;
        update_project(&env, &project)?;

        env.events().publish(
            (symbol_short!("project"), symbol_short!("uriup")),
            project_id.clone(),
        );

        Ok(())
    }

    pub fn update_project_mile(
        env: Env,
        project_id: String,
        creator: Address,
        new_milestone_count: u32,
    ) -> Result<(), ProjectError> {
        creator.require_auth();
        let mut project = read_project(&env, &project_id)?;

        if project.creator != creator {
            return Err(ProjectError::Unauthorized);
        }

        if project.is_closed {
            return Err(ProjectError::ProjectClosed);
        }

        project.milestone_count = new_milestone_count;
        update_project(&env, &project)?;

        env.events().publish(
            (symbol_short!("project"), symbol_short!("milmod")),
            project_id.clone(),
        );

        Ok(())
    }

    // Modify milestone count
    pub fn modify_milestone(
        env: Env,
        project_id: String,
        caller: Address,
        new_milestone_count: u32,
    ) -> Result<(), ProjectError> {
        caller.require_auth();
        let mut project = read_project(&env, &project_id)?;

        if project.creator != caller {
            return Err(ProjectError::Unauthorized);
        }

        if project.is_closed {
            return Err(ProjectError::ProjectClosed);
        }

        project.milestone_count = new_milestone_count;
        update_project(&env, &project)?;

        env.events().publish(
            (symbol_short!("project"), symbol_short!("milmod")),
            project_id.clone(),
        );

        Ok(())
    }

    // Close a project
    pub fn close_project(
        env: Env,
        project_id: String,
        creator: Address,
    ) -> Result<(), ProjectError> {
        creator.require_auth();
        let mut project = read_project(&env, &project_id)?;

        if project.creator != creator {
            return Err(ProjectError::Unauthorized);
        }

        if project.is_closed {
            return Err(ProjectError::ProjectClosed);
        }

        project.is_closed = true;
        write_project(&env, project)?;

        env.events().publish(
            (symbol_short!("project"), symbol_short!("closed")),
            project_id.clone(),
        );

        Ok(())
    }

    pub fn vote_project(
        env: Env,
        project_id: String,
        voter: Address,
        vote_value: i32,
    ) -> Result<(), ProjectError> {
        voter.require_auth();
        let mut project = read_project(&env, &project_id)?;

        if vote_value != 1 && vote_value != -1 {
            return Err(ProjectError::InvalidVote);
        }

        if project.votes.iter().any(|(addr, _)| addr == voter) {
            return Err(ProjectError::AlreadyVoted);
        }

        project.votes.push_back((voter.clone(), vote_value));
        update_project(&env, &project)?;

        env.events().publish(
            (symbol_short!("project"), symbol_short!("voted")),
            (project_id, voter, vote_value),
        );

        Ok(())
    }

    pub fn withdraw_vote(env: Env, project_id: String, voter: Address) -> Result<(), ProjectError> {
        voter.require_auth();
        let mut project = read_project(&env, &project_id)?;

        let index = project.votes.iter().position(|(addr, _)| addr == voter);
        if let Some(index) = index {
            project.votes.remove(index.try_into().unwrap());
            update_project(&env, &project)?;

            env.events().publish(
                (symbol_short!("project"), symbol_short!("v_removed")),
                (project_id, voter),
            );

            Ok(())
        } else {
            Err(ProjectError::NotVoted)
        }
    }

    pub fn has_voted(env: Env, project_id: String, voter: Address) -> Result<bool, ProjectError> {
        let project = read_project(&env, &project_id)?;
        let voted = project.votes.iter().any(|(addr, _)| addr == voter);
        Ok(voted)
    }

    pub fn get_vote(env: Env, project_id: String, voter: Address) -> Result<i32, ProjectError> {
        let project = read_project(&env, &project_id)?;

        for (addr, vote) in project.votes.iter() {
            if addr == voter {
                return Ok(vote);
            }
        }

        Err(ProjectError::NotVoted)
    }

    pub fn release_milestone(
        env: Env,
        project_id: String,
        milestone_number: u32,
        admin: Address,
    ) -> Result<(), ProjectError> {
        // Verify admin authorization
        admin.require_auth();
        if admin != get_admin(&env) {
            return Err(ProjectError::Unauthorized);
        }

        let mut project = read_project(&env, &project_id)?;

        // Validate milestone number
        if milestone_number >= project.milestone_count {
            return Err(ProjectError::InvalidMilestoneNumber);
        }

        // Check if milestone is already completed
        if project.milestone_releases.iter().any(|release| release.0 == milestone_number) {
            return Err(ProjectError::MilestoneAlreadyCompleted);
        }

        // Check if milestone is approved
        if !project.milestone_approvals.iter().any(|approval| approval.0 == milestone_number && approval.1) {
            return Err(ProjectError::MilestoneNotApproved);
        }

        // Calculate milestone release amount
        let milestone_amount = project.funding_target / project.milestone_count as u64;

        // Update project state
        project.milestone_releases.push_back((milestone_number, milestone_amount));
        project.current_milestone = milestone_number + 1;

        // If all milestones are completed, mark project as successful
        if project.current_milestone == project.milestone_count {
            project.is_successful = true;
        }

        update_project(&env, &project)?;

        // Emit milestone release event
        env.events().publish(
            (symbol_short!("milestone"), symbol_short!("released")),
            (project_id, milestone_number, milestone_amount),
        );

        Ok(())
    }

    pub fn approve_milestone(
        env: Env,
        project_id: String,
        milestone_number: u32,
        admin: Address,
    ) -> Result<(), ProjectError> {
        // Verify admin authorization
        admin.require_auth();
        if admin != get_admin(&env) {
            return Err(ProjectError::Unauthorized);
        }

        let mut project = read_project(&env, &project_id)?;

        // Validate milestone number
        if milestone_number >= project.milestone_count {
            return Err(ProjectError::InvalidMilestoneNumber);
        }

        // Check if milestone is already approved
        if project.milestone_approvals.iter().any(|approval| approval.0 == milestone_number) {
            return Err(ProjectError::MilestoneAlreadyCompleted);
        }

        // Add milestone approval
        project.milestone_approvals.push_back((milestone_number, true));
        update_project(&env, &project)?;

        // Emit milestone approval event
        env.events().publish(
            (symbol_short!("milestone"), symbol_short!("approved")),
            (project_id, milestone_number),
        );

        Ok(())
    }

    pub fn reject_milestone(
        env: Env,
        project_id: String,
        milestone_number: u32,
        admin: Address,
    ) -> Result<(), ProjectError> {
        // Verify admin authorization
        admin.require_auth();
        if admin != get_admin(&env) {
            return Err(ProjectError::Unauthorized);
        }

        let mut project = read_project(&env, &project_id)?;

        // Validate milestone number
        if milestone_number >= project.milestone_count {
            return Err(ProjectError::InvalidMilestoneNumber);
        }

        // Check if milestone is already approved or rejected
        if project.milestone_approvals.iter().any(|approval| approval.0 == milestone_number) {
            return Err(ProjectError::MilestoneAlreadyCompleted);
        }

        // Add milestone rejection
        project.milestone_approvals.push_back((milestone_number, false));
        update_project(&env, &project)?;

        // Emit milestone rejection event
        env.events().publish(
            (symbol_short!("milestone"), symbol_short!("rejected")),
            (project_id, milestone_number),
        );

        Ok(())
    }

    pub fn fund_project(
        env: Env,
        project_id: String,
        amount: i128,
        funder: Address,
        token_contract: Address,
    ) -> Result<(), ProjectError> {
        funder.require_auth();

        if amount <= 0 {
            return Err(ProjectError::InvalidAmount);
        }

        let mut project = read_project(&env, &project_id)?;

        if project.is_closed {
            return Err(ProjectError::ProjectClosed);
        }

        if env.ledger().timestamp() > project.funding_deadline {
            return Err(ProjectError::FundingDeadlinePassed);
        }

        if project.total_funded >= project.funding_target {
            return Err(ProjectError::FundingTargetReached);
        }

        let remaining = project.funding_target - project.total_funded;
        let contribution = if amount > remaining as i128 {
            remaining as i128
        } else {
            amount
        };

        // let token_client = token::StellarAssetClient::new(&env, &token_contract);
        
        // For funding, we need to clawback from the funder and mint to the contract
        token::Client::new(&env, &token_contract).transfer(&funder, &env.current_contract_address(), &contribution);
        // token_client.clawback(&funder, &contribution);
        // token_client.mint(&env.current_contract_address(), &contribution);

        project.total_funded += contribution as u64;
        project.backers.push_back((funder.clone(), contribution as u64));
        update_project(&env, &project)?;

        env.events().publish(
            (symbol_short!("project"), symbol_short!("funded")),
            (project_id, funder, contribution),
        );

        Ok(())
    }

    pub fn refund(env: Env, project_id: String, token_contract: Address) -> Result<(), ProjectError> {
        let mut project = read_project(&env, &project_id)?;

        // Check if project has failed (funding target not met by deadline)
        if project.total_funded >= project.funding_target || env.ledger().timestamp() < project.funding_deadline {
            return Err(ProjectError::ProjectNotFailed);
        }

        // Check if refund has already been processed
        if project.refund_processed {
            return Err(ProjectError::RefundAlreadyProcessed);
        }

        // Check if there are funds to refund
        if project.total_funded == 0 {
            return Err(ProjectError::NoFundsToRefund);
        }

        let token_client = token::Client::new(&env, &token_contract);

        // Process refunds for all backers
        for (backer, amount) in project.backers.iter() {
            // For refunds, we need to transfer from the contract back to the backer
            token_client.transfer(&env.current_contract_address(), &backer, &(amount as i128));
        }

        // Mark refund as processed
        project.refund_processed = true;
        project.is_closed = true;
        update_project(&env, &project)?;

        // Emit refund event
        env.events().publish(
            (symbol_short!("project"), symbol_short!("refunded")),
            (project_id, project.total_funded),
        );

        Ok(())
    }

    pub fn get_project_funding(env: Env, project_id: String) -> Result<(u64, u64), ProjectError> {
        let project = read_project(&env, &project_id)?;
        Ok((project.total_funded, project.funding_target))
    }

    pub fn get_backer_contribution(
        env: Env,
        project_id: String,
        backer: Address,
    ) -> Result<u64, ProjectError> {
        let project = read_project(&env, &project_id)?;
        
        for (addr, amount) in project.backers.iter() {
            if addr == backer {
                return Ok(amount);
            }
        }

        Ok(0)
    }

    // pub fn get_project_backers(env: Env, project_id: String) -> Result<Vec<(Address, u64)>, ProjectError> {
    //     let project = read_project(&env, &project_id)?;
    //     Ok(project.backers.to_vec())
    // }
}
