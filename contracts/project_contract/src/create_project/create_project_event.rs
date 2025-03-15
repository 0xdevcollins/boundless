use soroban_sdk::{Env, Address, String, Symbol};

pub struct CreateProjectEvent;

impl CreateProjectEvent {
    pub fn emit(env: &Env, project_id: String, creator: Address) {
        env.events().publish(
            (Symbol::new(env, "create_project"), project_id),
            creator,
        );
    }
}
