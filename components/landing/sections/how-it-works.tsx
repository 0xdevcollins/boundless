"use client";

import { motion, useInView } from "framer-motion";
import {
	CheckCircle,
	Clock,
	Globe,
	Lightbulb,
	Shield,
	Sparkles,
	Users,
	Vote,
	Zap,
	type LucideIcon,
} from "lucide-react";
import type React from "react";
import { useRef } from "react";
import AnimatedUnderline from "../components/AnimatedUnderline";
import PageTransition from "../components/PageTransition";

type WorkflowStep = {
	icon: LucideIcon;
	title: string;
	description: string;
};

type UserType = {
	title: string;
	subtitle: string;
	steps: WorkflowStep[];
};

const USER_TYPES: UserType[] = [
	{
		title: "For Crowdfund Creators",
		subtitle: "Turn your ideas into reality with community support",
		steps: [
			{
		icon: Lightbulb,
				title: "Submit an idea",
				description: "Share your innovative project with our global community",
			},
			{
				icon: Vote,
				title: "Receive public votes & feedback",
				description: "Get validation and suggestions from the community",
			},
			{
				icon: CheckCircle,
				title: "If validated, launch campaign with goals/milestones",
				description: "Set clear objectives and funding targets",
			},
			{
		icon: Users,
				title: "Users fund your campaign",
				description: "Community members support your vision",
			},
			{
				icon: Shield,
				title: "Funds are held in escrow",
				description: "Secure smart contract protection for all parties",
	},
	{
				icon: Zap,
				title: "Submit milestone proofs → reviewed → funds released",
				description: "Transparent milestone-based funding releases",
			},
		],
	},
	{
		title: "For Grant Creators",
		subtitle: "Create funding programs for builders and creators",
		steps: [
			{
				icon: Lightbulb,
				title: "Create a grant program",
				description: "Define your funding initiative and objectives",
	},
	{
				icon: Shield,
				title: "Define rules, criteria, milestone expectations",
				description: "Set clear guidelines for applicants",
			},
			{
				icon: Globe,
				title: "Open for applications",
				description: "Accept proposals from potential grantees",
			},
			{
				icon: Users,
				title: "Review applicants and approve funding",
				description: "Evaluate and select the best proposals",
			},
			{
				icon: CheckCircle,
				title: "Monitor execution & approve milestone claims",
				description: "Track progress and release funds accordingly",
			},
			],
	},
	{
		title: "For Grant Applicants",
		subtitle: "Apply for funding to build meaningful projects",
		steps: [
			{
				icon: Globe,
				title: "Browse open grants",
				description: "Find funding opportunities that match your skills",
			},
			{
				icon: Lightbulb,
				title: "Submit proposal",
				description: "Present your project idea and implementation plan",
	},
	{
				icon: Users,
				title: "Negotiate or align on milestones",
				description: "Work with grant creators to define deliverables",
			},
			{
		icon: CheckCircle,
				title: "Execute project",
				description: "Build and develop according to agreed milestones",
			},
			{
				icon: Zap,
				title: "Submit proofs → milestone payout",
				description: "Complete milestones and receive funding",
			},
		],
	},
	{
		title: "For Supporters & Backers",
		subtitle: "Support great ideas and track their progress",
		steps: [
			{
				icon: Users,
				title: "Sign up",
				description: "Join the Boundless community",
			},
			{
				icon: Vote,
				title: "Vote on ideas",
				description: "Participate in project validation",
			},
			{
				icon: Sparkles,
				title: "Comment on upcoming projects",
				description: "Provide feedback and suggestions",
			},
			{
				icon: Shield,
				title: "Fund campaigns you believe in",
				description: "Support projects with confidence",
			},
			{
				icon: Clock,
				title: "Track milestone progress",
				description: "Monitor project development and success",
			},
			],
	},
];

export default function HowItWorks() {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { margin: "-100px" });

	return (
		<PageTransition>
			<section className="py-16 md:py-24 bg-background" ref={ref}>
				<div className="container max-w-6xl mx-auto px-4 md:px-6">
					<motion.div
						className="text-center max-w-3xl mx-auto mb-16"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: "easeOut" }}
					>
						<div className="relative inline-block">
							<h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6">
								How It Works
							</h2>
							<AnimatedUnderline isInView={isInView} />
						</div>
						<p className="text-lg text-muted-foreground mt-6">
							Different workflows for different types of users on Boundless
						</p>
					</motion.div>

					<div className="space-y-16">
						{USER_TYPES.map((userType, userIndex) => (
							<motion.div
								key={userType.title}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: userIndex * 0.1 }}
								className="bg-card border border-border rounded-lg p-8"
							>
								<div className="text-center mb-8">
									<h3 className="text-2xl font-bold mb-2">{userType.title}</h3>
									<p className="text-muted-foreground">{userType.subtitle}</p>
					</div>

								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
									{userType.steps.map((step, stepIndex) => (
									<motion.div
											key={step.title}
											initial={{ opacity: 0, y: 20 }}
											whileInView={{ opacity: 1, y: 0 }}
											viewport={{ once: true }}
											transition={{ duration: 0.5, delay: stepIndex * 0.1 }}
											className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
										>
											<div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
												<step.icon className="h-5 w-5 text-primary" />
											</div>
											<div>
												<h4 className="font-semibold mb-2">{step.title}</h4>
												<p className="text-sm text-muted-foreground">
													{step.description}
												</p>
											</div>
									</motion.div>
								))}
							</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>
		</PageTransition>
	);
}
