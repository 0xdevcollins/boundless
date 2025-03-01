#[cfg(test)]
mod tests {
    use soroban_sdk::{Env, Address, String}; 

    use crate::create_project::{CreateProjectStorage, CreateProject};

    #[test]
    fn test_create_project() {
        let env = Env::default();

        let contract_id = env.register(CreateProject, ());

        env.as_contract(&contract_id, || {
            let creator_key = String::from_str(&env, "GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF");
            let creator = Address::from_string(&creator_key);

            CreateProject::create_project(env.clone(), 1, creator.clone(), 10000, 5);
            
            let project = CreateProjectStorage::get(&env, 1).unwrap();

            assert_eq!(project.project_id, 1);
            assert_eq!(project.creator, creator);
            assert_eq!(project.funding_target, 10000);
            assert_eq!(project.milestone_count, 5);
            assert_eq!(project.total_funded, 0);
        });
    }
}
