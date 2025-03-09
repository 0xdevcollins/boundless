use soroban_sdk::{contract, contractimpl, Address, Env, String};
use crate::project::Project;

use super::{CreateProjectEvent, CreateProjectStorage};


#[contract]
pub struct CreateProject;

#[contractimpl]
impl CreateProject {
    pub fn create_project(env: Env, project_id: String, creator: Address, metadata_uri: String, funding_target: u64, milestone_count: u32) {
        let project = Project::new(&env, project_id.clone(), creator.clone(), metadata_uri, funding_target, milestone_count);
        
        CreateProjectStorage::save(&env, &project);

        CreateProjectEvent::emit(&env, project_id, creator);
    }
}
