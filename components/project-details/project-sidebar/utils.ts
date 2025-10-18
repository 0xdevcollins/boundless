import { ExtendedProject, CrowdfundData, ProjectStatus } from './types';

/**
 * Determines the project status based on project data and crowdfund information
 */
export function getProjectStatus(
  project: ExtendedProject,
  crowdfund?: CrowdfundData
): ProjectStatus {
  if (project.status === 'idea' && crowdfund?.isVotingActive) {
    return 'Validation';
  }
  if (project.funding?.raised >= project.funding?.goal) {
    return 'Funded';
  }
  if (project.status === 'campaigning' && !crowdfund?.isVotingActive) {
    return 'campaigning';
  }
  return project.status as ProjectStatus;
}
