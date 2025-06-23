"use client";

import { motion, useInView } from "framer-motion";
import {
	CheckCircle,
	Globe,
	Handshake,
	Lightbulb,
	type LucideIcon,
	Shield,
	Users,
	Zap,
} from "lucide-react";
import React, { useRef } from "react";
import AnimatedUnderline from "../components/AnimatedUnderline";
import PageTransition from "../components/PageTransition";

type ValueItem = {
	icon: LucideIcon;
	title: string;
	description: string;
};

type MetricItem = {
	value: string;
	label: string;
};

const VALUES: ValueItem[] = [
	{
		icon: Lightbulb,
		title: "Crowdfund Your Vision",
		description:
			"Submit an idea, get public validation, and raise support from your community.",
	},
	{
		icon: Shield,
		title: "Launch a Grant Program",
		description:
			"Create your own funding program for builders, open-source teams, or creators — using smart escrow contracts.",
	},
	{
		icon: Users,
		title: "Apply for Grants",
		description:
			"Build something meaningful? Apply for milestone-based funding with clear deliverables.",
	},
	{
		icon: Handshake,
		title: "Back Great Projects",
		description:
			"Support ideas early, follow their progress, and fund with confidence via smart contracts.",
	},
];

const IMPACT_METRICS: MetricItem[] = [
	{ value: "2.5M+", label: "XLM Raised" },
	{ value: "150+", label: "Funded Projects" },
	{ value: "12K+", label: "Active Backers" },
	{ value: "35+", label: "Countries" },
];

export default function WhoWeAre() {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { margin: "-100px" });

	return (
		<PageTransition>
			<section className="py-16 md:py-24 bg-muted/30" ref={ref}>
				<div className="container max-w-6xl mx-auto px-4 md:px-6">
					<div className="text-center mb-10">
						<div className="relative inline-block">
							<h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
								What You Can Do on Boundless
							</h2>
							<AnimatedUnderline isInView={isInView} />
						</div>
					</div>

					<div className="grid gap-8 lg:grid-cols-12">
						<div className="lg:col-span-8 space-y-8">
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5 }}
								className="max-w-2xl"
							>
								<p className="text-lg mb-4">
									Boundless is the decentralized platform for crowdfunding and grant funding — powered by Stellar and Soroban.
								</p>
								<p className="text-muted-foreground">
									Raise funds, validate ideas, launch projects, or fund changemakers — with full transparency and milestone-based payouts.
								</p>
							</motion.div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{VALUES.map((value, index) => (
									<motion.div
										key={value.title}
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.5, delay: index * 0.1 }}
										className="bg-card border border-border p-4 rounded-lg flex items-start space-x-3"
									>
										<div className="mt-1 bg-primary/10 p-2 rounded-full">
											<value.icon className="h-5 w-5 text-primary" />
										</div>
										<div>
											<h3 className="font-medium">{value.title}</h3>
											<p className="text-sm text-muted-foreground mt-1">
												{value.description}
											</p>
										</div>
									</motion.div>
								))}
							</div>
						</div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className="lg:col-span-4 flex h-full"
						>
							<div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm w-full p-6 flex flex-col justify-center">
								<h3 className="text-lg font-medium mb-6 text-center">
									Our Impact
								</h3>
								<div className="grid grid-cols-2 gap-y-8 gap-x-4">
									{IMPACT_METRICS.map((metric) => (
										<div key={metric.label} className="text-center">
											<p className="text-3xl font-bold text-primary">
												{metric.value}
											</p>
											<p className="text-sm text-muted-foreground">
												{metric.label}
											</p>
										</div>
									))}
								</div>
								<div className="mt-8 pt-6 border-t border-border">
									<p className="text-sm text-muted-foreground text-center">
										Empowering creators across the globe since 2022
									</p>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</section>
		</PageTransition>
	);
}
