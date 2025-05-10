import Link from "next/link";

export default function UnauthorizedPage() {
	return (
		<div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
			<div className="relative py-3 sm:max-w-xl sm:mx-auto">
				<div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/70 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl" />
				<div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
					<div className="max-w-md mx-auto">
						<div>
							<h1 className="text-2xl font-semibold text-primary">
								Access Denied
							</h1>
						</div>
						<div className="divide-y divide-gray-200">
							<div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
								<p>You do not have permission to access the admin dashboard.</p>
								<p>This area is restricted to administrators only.</p>
								<div className="pt-6">
									<Link
										href="/dashboard"
										className="bg-gradient-to-r from-primary to-primary/70 text-white px-4 py-2 rounded-md hover:from-primary hover:to-primary/70 transition-colors"
									>
										Return to Home
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
