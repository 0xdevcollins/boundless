"use client";

import PageTransition from "@/components/landing/components/PageTransition";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
	ArrowRight,
	Award,
	Code,
	Coins,
	Shield,
	Target,
	Users,
	Wallet,
} from "lucide-react";
import Link from "next/link";

export default function HowItWorksPage() {
	const steps = [
		{
			id: "connect-verify",
			icon: <Wallet className="w-8 h-8" />,
			title: "Connect & Verify",
			description:
				"Start by connecting your Stellar wallet and completing KYC verification. This ensures a secure and compliant platform for all users.",
		},
		{
			id: "create-support",
			icon: <Target className="w-8 h-8" />,
			title: "Create or Support Projects",
			description:
				"Create your own crowdfunding project with clear milestones, or discover and support innovative projects from the community.",
		},
		{
			id: "milestone-funding",
			icon: <Award className="w-8 h-8" />,
			title: "Milestone-Based Funding",
			description:
				"Funds are released based on project milestones, ensuring transparency and accountability. Project creators can only access funds when milestones are achieved.",
		},
		{
			id: "vote-feedback",
			icon: <Users className="w-8 h-8" />,
			title: "Vote & Provide Feedback",
			description:
				"Participate in project governance through our voting mechanism. Your feedback helps shape the future of projects you support.",
		},
	];

	const features = [
		{
			id: "smart-contract",
			icon: <Shield className="w-8 h-8" />,
			title: "Smart Contract Security",
			description:
				"Built with Soroban smart contracts to automate milestone releases and protect all parties involved.",
		},
		{
			id: "decentralized",
			icon: <Code className="w-8 h-8" />,
			title: "Decentralized Funding",
			description:
				"All transactions are processed through Stellar blockchain, ensuring transparency and security.",
		},
		{
			id: "community",
			icon: <Coins className="w-8 h-8" />,
			title: "Community-Driven",
			description:
				"Active community participation through voting and feedback mechanisms shapes project development.",
		},
	];

	return (
		<PageTransition>
			<div className="min-h-screen bg-background">
				{/* Hero Section */}
				<section className="relative py-24 md:py-32 overflow-hidden">
					{/* Background Pattern */}
					<div className="absolute inset-0">
						<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
						<div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
						<div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
					</div>

					<div className="container max-w-6xl mx-auto px-4 md:px-6 relative">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className="text-center max-w-3xl mx-auto"
						>
							<motion.div
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.5, delay: 0.2 }}
								className="inline-block bg-primary/10 px-4 py-2 rounded-full mb-6"
							>
								<span className="text-primary font-medium">How It Works</span>
							</motion.div>

							<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
								Decentralized{" "}
								<span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
									Crowdfunding
								</span>
							</h1>

							<motion.p
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.3 }}
								className="text-lg md:text-xl text-muted-foreground mb-8"
							>
								A transparent and trustless platform built on Stellar
								blockchain, enabling milestone-based project funding with
								community governance.
							</motion.p>
						</motion.div>
					</div>
				</section>

				{/* Steps Section */}
				<section className="py-16 md:py-24 bg-muted/30">
					<div className="container max-w-6xl mx-auto px-4 md:px-6">
						<motion.div
							className="text-center max-w-3xl mx-auto mb-16"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
						>
							<h2 className="text-3xl font-bold tracking-tighter mb-6">
								Getting Started
							</h2>
							<p className="text-lg text-muted-foreground">
								Follow these simple steps to begin your journey with Boundless
							</p>
						</motion.div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							{steps.map((step) => (
								<motion.div
									key={step.id}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: 0.1 }}
									className="bg-card border border-border p-6 rounded-lg"
								>
									<div className="flex items-start space-x-4">
										<div className="mt-1 bg-primary/10 p-3 rounded-full">
											{step.icon}
										</div>
										<div>
											<h3 className="text-xl font-semibold mb-2">
												{step.title}
											</h3>
											<p className="text-muted-foreground">
												{step.description}
											</p>
										</div>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* Features Section */}
				<section className="py-16 md:py-24 bg-background">
					<div className="container max-w-6xl mx-auto px-4 md:px-6">
						<motion.div
							className="text-center max-w-3xl mx-auto mb-16"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
						>
							<h2 className="text-3xl font-bold tracking-tighter mb-6">
								Key Features
							</h2>
							<p className="text-lg text-muted-foreground">
								What makes Boundless unique in the crowdfunding space
							</p>
						</motion.div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							{features.map((feature) => (
								<motion.div
									key={feature.id}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: 0.1 }}
									className="bg-card border border-border p-6 rounded-lg text-center"
								>
									<div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
										{feature.icon}
									</div>
									<h3 className="text-xl font-semibold mb-2">
										{feature.title}
									</h3>
									<p className="text-muted-foreground">{feature.description}</p>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<section className="py-16 md:py-24 bg-muted/30">
					<div className="container max-w-6xl mx-auto px-4 md:px-6">
						<motion.div
							className="text-center max-w-3xl mx-auto"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
						>
							<h2 className="text-3xl font-bold tracking-tighter mb-6">
								Ready to Get Started?
							</h2>
							<p className="text-lg text-muted-foreground mb-8">
								Join our community of creators and supporters in building the
								future of decentralized crowdfunding.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<Button size="lg" className="group">
									<Link href="/auth/signin" className="flex items-center">
										Get Started
										<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
									</Link>
								</Button>
								<Button size="lg" variant="outline">
									<Link href="/explore">Explore Projects</Link>
								</Button>
							</div>
						</motion.div>
					</div>
				</section>
			</div>
		</PageTransition>
	);
}
