use soroban_sdk::{contract, contractimpl, Address, Env};
use crate::project::Project;

use super::{CreateProjectEvent, CreateProjectStorage};


#[contract]
pub struct CreateProject;

#[contractimpl]
impl CreateProject {
    pub fn create_project(env: Env, project_id: u64, creator: Address, funding_target: u64, milestone_count: u32) {
        let project = Project::new(&env, project_id, creator.clone(), funding_target, milestone_count);
        
        // Save to storage
        CreateProjectStorage::save(&env, &project);

        // Emit event
        CreateProjectEvent::emit(&env, project_id, creator);
    }
}
