import { ProjectFormWrapper } from "@/components/project-form-wrapper";

const Page = async () => {
	return (
		<div className="container max-w-3sxl py-8">
			<div className="mb-8">
				<h1 className="text-3xl font-bold">Create a New Project</h1>
				<p className="text-muted-foreground">
					Submit your project for funding on the Stellar blockchain
				</p>
			</div>
			<ProjectFormWrapper />
		</div>
	);
};

export default Page;
