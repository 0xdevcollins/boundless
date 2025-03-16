use super::{CreateProjectEvent, CreateProjectStorage};
use crate::project::Project;
use soroban_sdk::{contract, contractimpl, Address, Env, String};

#[contract]
pub struct CreateProject;

#[contractimpl]
impl CreateProject {
    pub fn create_project(
        env: Env,
        project_id: String,
        creator: Address,
        metadata_uri: String,
        funding_target: u64,
        milestone_count: u32,
    ) {
        if CreateProjectStorage::project_exists(&env, &project_id) {
            panic!("Project ID already exists");
        }
        if funding_target == 0 {
            panic!("Funding target must be greater than zero");
        }
        let project = Project::new(
            &env,
            project_id.clone(),
            creator.clone(),
            metadata_uri,
            funding_target,
            milestone_count,
        );

        CreateProjectStorage::save(&env, &project);

        CreateProjectEvent::emit(&env, project_id, creator);
    }

    pub fn get_project(env: Env, project_id: String) -> Option<Project> {
        CreateProjectStorage::fetch_project(&env, &project_id)
    }
    pub fn update_project_metadata(
        env: Env,
        project_id: String,
        creator: Address,
        new_metadata_uri: String,
    ) {
        let mut project =
            CreateProjectStorage::fetch_project(&env, &project_id).expect("Project does not exist");
        if project.creator != creator {
            panic!("Only the project creator can modify metadata");
        }

        if project.is_closed {
            panic!("Cannot modify a closed project");
        }
        project.metadata_uri = new_metadata_uri;

        CreateProjectStorage::save(&env, &project);
    }

    pub fn modify_milestone(
        env: Env,
        project_id: String,
        caller: Address,
        new_milestone_count: u32,
    ) {
        let mut project =
            CreateProjectStorage::fetch_project(&env, &project_id).expect("Project does not exist");

        if project.creator != caller {
            panic!("Only the project creator can modify milestones");
        }

        if project.is_closed {
            panic!("Cannot modify milestones for a closed project");
        }

        project.milestone_count = new_milestone_count;

        CreateProjectStorage::save(&env, &project);
    }

    pub fn close_project(env: Env, project_id: String, creator: Address) {
        let mut project =
            CreateProjectStorage::fetch_project(&env, &project_id).expect("Project does not exist");

        if project.creator != creator {
            panic!("Only the project creator can close the project");
        }

        if project.is_closed {
            panic!("Project is already closed");
        }
        project.is_closed = true;

        CreateProjectStorage::save(&env, &project);
    }
}
