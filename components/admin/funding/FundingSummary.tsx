import { Card, CardContent } from "@/components/ui/card";
import {
	CheckCircle2,
	Clock,
	DollarSign,
	RefreshCw,
	XCircle,
} from "lucide-react";

interface FundingSummaryProps {
	data: any[];
}

export function FundingSummary({ data }: FundingSummaryProps) {
	// Calculate totals
	const getTotalAmount = (status: string) => {
		const item = data.find((d) => d.status === status);
		return item ? item._sum.amount || 0 : 0;
	};

	const getCount = (status: string) => {
		const item = data.find((d) => d.status === status);
		return item ? item._count : 0;
	};

	const totalCompleted = getTotalAmount("COMPLETED");
	const totalPending = getTotalAmount("PENDING");
	const totalFailed = getTotalAmount("FAILED");
	const totalRefunded = getTotalAmount("REFUNDED");

	const countCompleted = getCount("COMPLETED");
	const countPending = getCount("PENDING");
	const countFailed = getCount("FAILED");
	const countRefunded = getCount("REFUNDED");

	const totalAmount =
		totalCompleted + totalPending + totalFailed + totalRefunded;
	const totalCount =
		countCompleted + countPending + countFailed + countRefunded;

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
			<Card className="lg:col-span-1">
				<CardContent className="pt-6">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-muted-foreground">
								Total Funding
							</p>
							<h3 className="text-2xl font-bold">
								${totalAmount.toLocaleString()}
							</h3>
						</div>
						<div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
							<DollarSign className="h-6 w-6 text-primary" />
						</div>
					</div>
					<p className="text-xs text-muted-foreground mt-2">
						{totalCount} transactions
					</p>
				</CardContent>
			</Card>

			<Card className="lg:col-span-1">
				<CardContent className="pt-6">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-muted-foreground">
								Completed
							</p>
							<h3 className="text-2xl font-bold">
								${totalCompleted.toLocaleString()}
							</h3>
						</div>
						<div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
							<CheckCircle2 className="h-6 w-6 text-green-600" />
						</div>
					</div>
					<p className="text-xs text-muted-foreground mt-2">
						{countCompleted} transactions
					</p>
				</CardContent>
			</Card>

			<Card className="lg:col-span-1">
				<CardContent className="pt-6">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-muted-foreground">
								Pending
							</p>
							<h3 className="text-2xl font-bold">
								${totalPending.toLocaleString()}
							</h3>
						</div>
						<div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
							<Clock className="h-6 w-6 text-yellow-600" />
						</div>
					</div>
					<p className="text-xs text-muted-foreground mt-2">
						{countPending} transactions
					</p>
				</CardContent>
			</Card>

			<Card className="lg:col-span-1">
				<CardContent className="pt-6">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-muted-foreground">
								Failed
							</p>
							<h3 className="text-2xl font-bold">
								${totalFailed.toLocaleString()}
							</h3>
						</div>
						<div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
							<XCircle className="h-6 w-6 text-red-600" />
						</div>
					</div>
					<p className="text-xs text-muted-foreground mt-2">
						{countFailed} transactions
					</p>
				</CardContent>
			</Card>

			<Card className="lg:col-span-1">
				<CardContent className="pt-6">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-muted-foreground">
								Refunded
							</p>
							<h3 className="text-2xl font-bold">
								${totalRefunded.toLocaleString()}
							</h3>
						</div>
						<div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
							<RefreshCw className="h-6 w-6 text-blue-600" />
						</div>
					</div>
					<p className="text-xs text-muted-foreground mt-2">
						{countRefunded} transactions
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
