import { LoadingState } from "./loading-state";

export default function Loading() {
	return (
		<div className="container mx-auto py-8 max-w-7xl">
			<h1 className="text-3xl font-bold mb-6">My Contributions</h1>

			{/* Loading states for all sections */}
			<LoadingState type="stats" />

			<div className="mb-8">
				<div className="h-10 bg-muted rounded-md w-full max-w-md mb-4" />
			</div>

			<h2 className="text-2xl font-semibold mb-4">Ongoing Contributions</h2>
			<LoadingState type="cards" count={3} />

			<h2 className="text-2xl font-semibold mb-4">Past Contributions</h2>
			<LoadingState type="table" count={4} />

			<h2 className="text-2xl font-semibold mb-4">My Comments</h2>
			<LoadingState type="comments" count={3} />
		</div>
	);
}
