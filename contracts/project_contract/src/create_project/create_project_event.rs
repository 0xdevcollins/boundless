use soroban_sdk::{Env, Address, Symbol};

pub struct CreateProjectEvent;

impl CreateProjectEvent {
    pub fn emit(env: &Env, project_id: u64, creator: Address) {
        env.events().publish(
            (Symbol::new(env, "create_project"), project_id),
            creator,
        );
    }
}
