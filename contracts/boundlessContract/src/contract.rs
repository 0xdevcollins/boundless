use soroban_sdk::{contract, contractimpl, symbol_short, Address, Env, String, Vec};

use crate::{
    error::ProjectError,
    storage::{project_exists, read_project, update_project, write_project, Project},
};

#[contract]
pub struct BoundlessContract;

#[contractimpl]
impl BoundlessContract {
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
        // if project_exists(&env, &project_id) {
        //     return Err(ProjectError::AlreadyExists);
        // }

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
            created_at: env.ledger().timestamp(),
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
        let mut project = read_project(&env, &project_id)?;

        if project.creator != creator {
            return Err(ProjectError::Unauthorized);
        }

        if project.is_closed {
            return Err(ProjectError::ProjectClosed);
        }

        project.metadata_uri = new_metadata_uri;
        update_project(&env, &project)?;

        // env.events().publish(
        //     (symbol_short!("project"), symbol_short!("uriupdate")),
        //     &project_id,
        // );

        Ok(())
    }

    pub fn update_project_mile(
        env: Env,
        project_id: String,
        creator: Address,
        new_milestone_count: u32,
    ) -> Result<(), ProjectError> {
        let mut project = read_project(&env, &project_id)?;

        if project.creator != creator {
            return Err(ProjectError::Unauthorized);
        }

        if project.is_closed {
            return Err(ProjectError::ProjectClosed);
        }

        project.milestone_count = new_milestone_count;
        update_project(&env, &project)?;

        Ok(())
    }

    // Modify milestone count
    pub fn modify_milestone(
        env: Env,
        project_id: String,
        caller: Address,
        new_milestone_count: u32,
    ) -> Result<(), ProjectError> {
        let mut project = read_project(&env, &project_id)?;

        if project.creator != caller {
            return Err(ProjectError::Unauthorized);
        }

        if project.is_closed {
            return Err(ProjectError::ProjectClosed);
        }

        project.milestone_count = new_milestone_count;
        update_project(&env, &project)?;

        // env.events().publish(
        //     (symbol_short!("project"), symbol_short!("milestone_modified")),
        //     &project_id,
        // );

        Ok(())
    }

    // Close a project
    pub fn close_project(
        env: Env,
        project_id: String,
        creator: Address,
    ) -> Result<(), ProjectError> {
        let mut project = read_project(&env, &project_id)?;

        if project.creator != creator {
            return Err(ProjectError::Unauthorized);
        }

        if project.is_closed {
            return Err(ProjectError::ProjectClosed);
        }

        project.is_closed = true;
        write_project(&env, project)?;

        // env.events().publish(
        //     (symbol_short!("project"), symbol_short!("closed")),
        //     &project_id,
        // );

        Ok(())
    }

    pub fn vote_project(
        env: Env,
        project_id: String,
        voter: Address,
        vote_value: i32,
    ) -> Result<(), ProjectError> {
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
}
