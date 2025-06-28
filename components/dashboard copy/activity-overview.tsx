"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { activityData } from "@/data/mock-data";
import {
	Area,
	AreaChart,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import CustomTooltip from "./custom-tooltip";
import RecentActivity from "./recent-activity";

export default function ActivityOverview() {
	return (
		<div className="grid gap-6 md:grid-cols-7 mb-6">
			<Card className="md:col-span-5">
				<CardHeader>
					<CardTitle>Activity Overview</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="h-[300px]">
						<ResponsiveContainer width="100%" height="100%">
							<AreaChart
								data={activityData}
								margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
							>
								<defs>
									<linearGradient
										id="colorContributions"
										x1="0"
										y1="0"
										x2="0"
										y2="1"
									>
										<stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
										<stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
									</linearGradient>
									<linearGradient
										id="colorParticipants"
										x1="0"
										y1="0"
										x2="0"
										y2="1"
									>
										<stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
										<stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
									</linearGradient>
								</defs>
								<CartesianGrid
									strokeDasharray="3 3"
									stroke="#f3f4f6"
									vertical={false}
								/>
								<XAxis
									dataKey="name"
									axisLine={false}
									tickLine={false}
									tick={{ fill: "#6b7280" }}
								/>
								<YAxis
									axisLine={false}
									tickLine={false}
									tick={{ fill: "#6b7280" }}
									width={50}
									tickFormatter={(value) =>
										value >= 1000 ? `${value / 1000}k` : value
									}
								/>
								<Tooltip content={<CustomTooltip />} />
								<Legend
									verticalAlign="top"
									height={36}
									iconType="circle"
									iconSize={8}
								/>
								<Area
									type="monotone"
									dataKey="contributions"
									name="Contributions"
									stroke="#3b82f6"
									strokeWidth={2}
									fillOpacity={1}
									fill="url(#colorContributions)"
									activeDot={{ r: 6 }}
								/>
								<Area
									type="monotone"
									dataKey="participants"
									name="Participants"
									stroke="#10b981"
									strokeWidth={2}
									fillOpacity={1}
									fill="url(#colorParticipants)"
									activeDot={{ r: 6 }}
								/>
							</AreaChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>
			<Card className="md:col-span-2">
				<CardHeader>
					<CardTitle>Recent Activity</CardTitle>
				</CardHeader>
				<CardContent>
					<RecentActivity />
				</CardContent>
			</Card>
		</div>
	);
}
