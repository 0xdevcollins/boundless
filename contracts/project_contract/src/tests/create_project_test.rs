#[cfg(test)]
mod tests {
    use soroban_sdk::{Env, Address, String};
    use crate::create_project::{CreateProjectStorage, CreateProject, CreateProjectClient};

    #[test]
    fn test_create_project() {
        let env = Env::default();
        let contract_id = env.register(CreateProject, ());
        let client = CreateProjectClient::new(&env, &contract_id);

        let creator_key = String::from_str(&env, "GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF");
        let creator = Address::from_string(&creator_key);
        let project_id = String::from_str(&env, "project-1");
        let meta_uri = String::from_str(&env, "ipfs://QmExample");
        
        client.create_project(&project_id, &creator, &meta_uri, &10000, &5);
        
        let project = env.as_contract(&contract_id, || {
            CreateProjectStorage::get(&env, &project_id).expect("Project not found")
        });
        
        assert_eq!(project.project_id, project_id);
        assert_eq!(project.creator, creator);
        assert_eq!(project.metadata_uri, meta_uri);
        assert_eq!(project.funding_target, 10000);
        assert_eq!(project.milestone_count, 5);
        assert_eq!(project.total_funded, 0);
        assert_eq!(project.current_milestone, 0);
        assert_eq!(project.validated, false);
        assert_eq!(project.is_successful, false);
        assert_eq!(project.is_closed, false);
    }
}
