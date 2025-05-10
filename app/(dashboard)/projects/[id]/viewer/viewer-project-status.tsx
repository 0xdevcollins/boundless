import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

type ValidationStatus = 'PENDING' | 'REJECTED' | 'VALIDATED';

type ProjectStatusProps = {
  project: {
    ideaValidation: ValidationStatus;
    _count: {
      votes: number;
    };
  };
};

export function ViewerProjectStatus({ project }: ProjectStatusProps) {
  // Calculate validation progress
  const validationProgress =
    project.ideaValidation === 'VALIDATED'
      ? 100
      : project.ideaValidation === 'REJECTED'
        ? 0
        : Math.min(project._count.votes, 100);

  // Determine validation phase
  const getValidationPhase = () => {
    switch (project.ideaValidation) {
      case 'VALIDATED':
        return 'Phase 4 of 4';
      case 'REJECTED':
        return 'Rejected';
      case 'PENDING':
        if (project._count.votes >= 75) return 'Phase 3 of 4';
        if (project._count.votes >= 50) return 'Phase 2 of 4';
        if (project._count.votes >= 25) return 'Phase 1 of 4';
        return 'Initial Phase';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center text-sm">
        <span className="font-medium">Project Validation Status</span>
        <Badge variant="outline">{getValidationPhase()}</Badge>
      </div>
      <Progress value={validationProgress} className="h-2" />
      <p className="text-sm text-muted-foreground">
        {project.ideaValidation === 'VALIDATED'
          ? 'Project has been validated and is now in funding stage'
          : project.ideaValidation === 'REJECTED'
            ? 'Project did not receive enough community support'
            : 'Currently in community validation phase'}
      </p>
    </div>
  );
}
