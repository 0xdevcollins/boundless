"use client";

import { motion, useInView } from "framer-motion";
import { 
	Globe, 
	Shield, 
	Users, 
	Zap,
	type LucideIcon 
} from "lucide-react";
import React, { useRef } from "react";
import AnimatedUnderline from "../components/AnimatedUnderline";
import PageTransition from "../components/PageTransition";

type FeatureItem = {
	icon: LucideIcon;
	title: string;
	description: string;
};

const FEATURES: FeatureItem[] = [
	{
		icon: Shield,
		title: "Trustless Funding",
		description: "Funds are held in Soroban smart escrows and only released after verified milestones.",
	},
	{
		icon: Users,
		title: "Community Validation",
		description: "Projects are voted and commented on before they go live.",
	},
	{
		icon: Globe,
		title: "No Middlemen",
		description: "No banks. No institutions. Just builders and supporters.",
	},
	{
		icon: Zap,
		title: "Multiflow System",
		description: "Crowdfunding + Grant Creation + Grant Applications all in one.",
	},
];

export default function WhyBoundless() {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { margin: "-100px" });

	return (
		<PageTransition>
			<section className="py-20 bg-background" ref={ref}>
				<div className="container max-w-6xl mx-auto px-4 md:px-6">
					<motion.div
						className="text-center max-w-3xl mx-auto mb-12"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<div className="relative inline-block">
							<h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6">
								Why Boundless?
							</h2>
							<AnimatedUnderline isInView={isInView} />
						</div>
						<p className="text-lg text-muted-foreground mt-6">
							Built on transparency, community, and blockchain technology
						</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{FEATURES.map((feature, index) => (
							<motion.div
								key={feature.title}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
							>
								<div className="flex items-center mb-4">
									<div className="bg-primary/10 p-3 rounded-full mr-4">
										<feature.icon className="h-6 w-6 text-primary" />
									</div>
									<h3 className="font-semibold text-lg">{feature.title}</h3>
								</div>
								<p className="text-muted-foreground">
									{feature.description}
								</p>
							</motion.div>
						))}
					</div>

					<motion.div
						className="text-center mt-12"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.4 }}
					>
						<div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8">
							<h3 className="text-2xl font-bold mb-4"> Powered by Stellar</h3>
							<p className="text-lg text-muted-foreground mb-6">
								Boundless is built on the Stellar blockchain, using Soroban smart contracts for secure, fast, and low-fee transactions.
							</p>
							<div className="flex justify-center">
								<button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
									Learn About Stellar
								</button>
							</div>
						</div>
					</motion.div>
				</div>
			</section>
		</PageTransition>
	);
}
