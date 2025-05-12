"use client";
import { usePathname } from "next/navigation";

export function PageTitle() {
	const pathname = usePathname();

	// Get the last segment of the path and format it
	const getTitle = () => {
		const segments = pathname.split("/").filter(Boolean);
		const lastSegment = segments[segments.length - 1];

		// Handle special cases
		if (lastSegment === "projects") return "Projects";
		if (lastSegment === "settings") return "Settings";
		if (lastSegment === "profile") return "Profile";

		// Default: capitalize and replace hyphens with spaces
		return lastSegment
			.split("-")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" ");
	};

	return <h1 className="text-xl font-semibold">{getTitle()}</h1>;
}
