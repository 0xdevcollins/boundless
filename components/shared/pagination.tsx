"use client";

import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	siblingsCount?: number;
	className?: string;
	buttonClassName?: string;
	activeButtonClassName?: string;
	disabledButtonClassName?: string;
}

export default function Pagination({
	currentPage,
	totalPages,
	onPageChange,
	siblingsCount = 1,
	className = "flex justify-center items-center gap-1",
	buttonClassName = "h-8 w-8 p-0",
	activeButtonClassName = "bg-primary text-primary-foreground hover:bg-primary/90",
	disabledButtonClassName = "opacity-50 cursor-not-allowed",
}: PaginationProps) {
	// Generate page numbers array based on current page and siblings count
	const generatePagination = () => {
		// Always show first and last page
		const firstPage = 1;
		const lastPage = totalPages;

		// Calculate range of pages to show around current page
		const leftSiblingIndex = Math.max(currentPage - siblingsCount, firstPage);
		const rightSiblingIndex = Math.min(currentPage + siblingsCount, lastPage);

		// Determine if we need to show dots
		const showLeftDots = leftSiblingIndex > firstPage + 1;
		const showRightDots = rightSiblingIndex < lastPage - 1;

		// Initialize pages array
		const pages: (number | string)[] = [];

		// Always add first page
		pages.push(firstPage);

		// Add left dots if needed
		if (showLeftDots) {
			pages.push("leftDots");
		} else if (firstPage + 1 < leftSiblingIndex) {
			// If we're not showing dots but there's still a gap, fill it
			for (let i = firstPage + 1; i < leftSiblingIndex; i++) {
				pages.push(i);
			}
		}

		// Add pages around current page
		for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
			if (i !== firstPage && i !== lastPage) {
				pages.push(i);
			}
		}

		// Add right dots if needed
		if (showRightDots) {
			pages.push("rightDots");
		} else if (rightSiblingIndex + 1 < lastPage) {
			// If we're not showing dots but there's still a gap, fill it
			for (let i = rightSiblingIndex + 1; i < lastPage; i++) {
				pages.push(i);
			}
		}

		// Always add last page if it's not the same as first page
		if (lastPage !== firstPage) {
			pages.push(lastPage);
		}

		return pages;
	};

	const pages = generatePagination();

	return (
		<nav aria-label="Pagination" className={className}>
			{/* Previous page button */}
			<Button
				variant="outline"
				size="icon"
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className={`${buttonClassName} ${currentPage === 1 ? disabledButtonClassName : ""}`}
				aria-label="Previous page"
			>
				<ChevronLeft className="h-4 w-4" />
			</Button>

			{/* Page buttons */}
			{pages.map((page, index) => {
				if (page === "leftDots" || page === "rightDots") {
					return (
						<Button
							key={crypto.randomUUID()}
							variant="outline"
							size="icon"
							disabled
							className={buttonClassName}
							aria-hidden="true"
							id={`pagination-dots-${index}`}
						>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					);
				}

				const pageNumber = page as number;
				const isActive = pageNumber === currentPage;

				return (
					<Button
						key={pageNumber}
						variant={isActive ? "default" : "outline"}
						size="icon"
						onClick={() => onPageChange(pageNumber)}
						className={`${buttonClassName} ${isActive ? activeButtonClassName : ""}`}
						aria-current={isActive ? "page" : undefined}
						aria-label={`Page ${pageNumber}`}
					>
						{pageNumber}
					</Button>
				);
			})}

			{/* Next page button */}
			<Button
				variant="outline"
				size="icon"
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className={`${buttonClassName} ${currentPage === totalPages ? disabledButtonClassName : ""}`}
				aria-label="Next page"
			>
				<ChevronRight className="h-4 w-4" />
			</Button>
		</nav>
	);
}
