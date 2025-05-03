import { ProjectFormWrapper } from '@/components/project-form-wrapper';
import { authOptions } from '@/lib/auth.config';
import { getServerSession } from 'next-auth/next';

const Page = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="container max-w-3sxl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create a New Project</h1>
        <p className="text-muted-foreground">Submit your project for funding on the Stellar blockchain</p>
      </div>
      <ProjectFormWrapper userId={session?.user?.id} />
    </div>
  );
};

export default Page;
