
import { ProjectFormWrapper } from '@/components/project-form-wrapper';

const Page = async () => {
  return (
    <div className="container max-w-3sxl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Initialize New Project</h1>
        <p className="text-muted-foreground">
          Submit your project idea for community validation before launching your campaign
        </p>
      </div>
      <ProjectFormWrapper />
    </div>
  );
};

export default Page;
