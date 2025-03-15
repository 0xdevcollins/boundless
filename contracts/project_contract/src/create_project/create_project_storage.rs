use crate::project::Project;
use soroban_sdk::{symbol_short, Env, Map, String};

pub struct CreateProjectStorage;

impl CreateProjectStorage {
    pub fn save(env: &Env, project: &Project) {
        let mut projects: Map<String, Project> = env
            .storage()
            .persistent()
            .get(&symbol_short!("projects"))
            .unwrap_or(Map::new(&env));

        projects.set(project.project_id.clone(), project.clone());

        env.storage()
            .persistent()
            .set(&symbol_short!("projects"), &projects);
    }

    pub fn fetch_project(env: &Env, project_id: &String) -> Option<Project> {
        let projects: Map<String, Project> = env
            .storage()
            .persistent()
            .get(&symbol_short!("projects"))
            .unwrap_or(Map::new(&env));

        projects.get(project_id.clone())
    }

    pub fn project_exists(env: &Env, project_id: &String) -> bool {
        let projects: Map<String, Project> = env
            .storage()
            .persistent()
            .get(&symbol_short!("projects"))
            .unwrap_or(Map::new(&env));

        projects.contains_key(project_id.clone())
    }
}
