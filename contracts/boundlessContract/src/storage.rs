use soroban_sdk::{contracttype, symbol_short, Address, Env, Map, String, Symbol, Vec};

use crate::error::ProjectError;

pub(crate) const DAY_IN_LEDGERS: u32 = 17280; // Assuming 5 seconds per ledger
pub(crate) const PROJECTS_BUMP_AMOUNT: u32 = 30 * DAY_IN_LEDGERS;
pub(crate) const PROJECTS_LIFETIME_THRESHOLD: u32 = PROJECTS_BUMP_AMOUNT - DAY_IN_LEDGERS;

// Persistent Storage TTL Extender
fn extend_persistent(e: &Env, key: &ProjectDataKey) {
    e.storage()
        .persistent()
        .extend_ttl(key, PROJECTS_LIFETIME_THRESHOLD, PROJECTS_BUMP_AMOUNT);
}

// Struct to define a project
#[derive(Clone)]
#[contracttype]
pub struct Project {
    pub project_id: String,
    pub creator: Address,
    pub metadata_uri: String,
    pub funding_target: u64,
    pub milestone_count: u32,
    pub current_milestone: u32,
    pub total_funded: u64,
    pub backers: Vec<(Address, u64)>,
    pub votes: Vec<(Address, i32)>,
    pub validated: bool,
    pub is_successful: bool,
    pub is_closed: bool,
    pub created_at: u64,
}

// Enum for Project Storage Keys
#[derive(Clone)]
#[contracttype]
enum ProjectDataKey {
    Projects,
    Project(String),
}
pub fn write_project(e: &Env, project: Project) -> Result<(), ProjectError> {
    let key = ProjectDataKey::Project(project.project_id.clone());

    let mut projects: Map<String, Project> = e
        .storage()
        .persistent()
        .get(&ProjectDataKey::Projects)
        .unwrap_or(Map::new(e));

    if projects.contains_key(project.project_id.clone()) {
        return Err(ProjectError::AlreadyExists);
    }

    projects.set(project.project_id.clone(), project.clone());
    e.storage()
        .persistent()
        .set(&ProjectDataKey::Projects, &projects);
    e.storage().persistent().set(&key, &project);
    extend_persistent(e, &key);

    e.events()
        .publish((key, symbol_short!("added")), project.project_id);

    Ok(())
}
pub fn update_project(env: &Env, project: &Project) -> Result<(), ProjectError> {
    let project_key = ProjectDataKey::Project(project.project_id.clone());

    let mut projects: Map<String, Project> = env
        .storage()
        .persistent()
        .get(&ProjectDataKey::Projects)
        .unwrap_or(Map::new(env));

    if !projects.contains_key(project.project_id.clone()) {
        return Err(ProjectError::NotFound);
    }

    // let mut existing_project = projects.get(project.project_id.clone()).unwrap();

    // existing_project.metadata_uri = project.metadata_uri.clone();
    // existing_project.milestone_count = project.milestone_count.clone();

    projects.set(project.project_id.clone(), project.clone());

    env.storage()
        .persistent()
        .set(&ProjectDataKey::Projects, &projects);

    env.storage()
        .persistent()
        .set(&project_key, &project.clone());

    env.events().publish(
        (project_key, symbol_short!("metaupdat")),
        project.project_id.clone(),
    );

    Ok(())
}

pub fn read_project(e: &Env, project_id: &String) -> Result<Project, ProjectError> {
    let key = ProjectDataKey::Project(project_id.clone());

    e.storage()
        .persistent()
        .get(&key)
        .ok_or(ProjectError::NotFound)
}

pub fn project_exists(e: &Env, project_id: &String) -> bool {
    let key = ProjectDataKey::Project(project_id.clone());

    e.storage().persistent().has(&key)
}

pub fn list_projects(e: &Env) -> Vec<Project> {
    let projects: Map<String, Project> = e
        .storage()
        .persistent()
        .get(&ProjectDataKey::Projects)
        .unwrap_or(Map::new(e));

    projects.values()
}

pub fn delete_project(e: &Env, project_id: &String) -> Result<(), ProjectError> {
    let key = ProjectDataKey::Project(project_id.clone());

    let mut projects: Map<String, Project> = e
        .storage()
        .persistent()
        .get(&ProjectDataKey::Projects)
        .unwrap_or(Map::new(e));

    if !projects.contains_key(project_id.clone()) {
        return Err(ProjectError::NotFound);
    }

    projects.remove(project_id.clone());
    e.storage()
        .persistent()
        .set(&ProjectDataKey::Projects, &projects);
    e.storage().persistent().remove(&key);

    e.events()
        .publish((key, symbol_short!("deleted")), project_id.clone());

    Ok(())
}
