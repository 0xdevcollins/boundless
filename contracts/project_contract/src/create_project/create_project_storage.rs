use soroban_sdk::{Env, String};
use crate::project::Project;

pub struct CreateProjectStorage;

impl CreateProjectStorage {
    pub fn save(env: &Env, project: &Project) {
        env.storage().instance().set(&project.project_id, project);
    }
    
    pub fn get(env: &Env, project_id: &String) -> Option<Project> {
        env.storage().instance().get(project_id)
    }
}
