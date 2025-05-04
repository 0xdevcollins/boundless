import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface BlogPaginationProps {
	currentPage: number;
	totalPages: number;
	category?: string;
	tag?: string;
	search?: string;
}

export function BlogPagination({
	currentPage,
	totalPages,
	category,
	tag,
	search,
}: BlogPaginationProps) {
	const getPageUrl = (page: number) => {
		const params = new URLSearchParams();
		if (page > 1) params.set("page", page.toString());
		if (category) params.set("category", category);
		if (tag) params.set("tag", tag);
		if (search) params.set("search", search);
		return `/blog${params.toString() ? `?${params.toString()}` : ""}`;
	};

	if (totalPages <= 1) return null;

	return (
		<div className="flex items-center justify-center gap-2">
			<Button
				variant="outline"
				size="icon"
				asChild
				disabled={currentPage === 1}
			>
				<Link href={getPageUrl(currentPage - 1)}>
					<ChevronLeft className="h-4 w-4" />
				</Link>
			</Button>
			<div className="flex items-center gap-1">
				{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
					<Button
						key={page}
						variant={currentPage === page ? "default" : "outline"}
						size="icon"
						asChild
					>
						<Link href={getPageUrl(page)}>{page}</Link>
					</Button>
				))}
			</div>
			<Button
				variant="outline"
				size="icon"
				asChild
				disabled={currentPage === totalPages}
			>
				<Link href={getPageUrl(currentPage + 1)}>
					<ChevronRight className="h-4 w-4" />
				</Link>
			</Button>
		</div>
	);
}
