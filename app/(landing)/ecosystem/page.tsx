"use client";

import PageTransition from "@/components/landing/components/PageTransition";
import { motion } from "framer-motion";
import {
	ArrowRight,
	Code,
	Coins,
	Globe,
	Link as LinkIcon,
	Shield,
	Zap,
} from "lucide-react";
import type React from "react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

type EcosystemFeature = {
	icon: React.ElementType;
	title: string;
	description: string;
};

type Integration = {
	name: string;
	description: string;
	image: string;
	link: string;
};

const FEATURES: EcosystemFeature[] = [
	{
		icon: Zap,
		title: "Lightning Fast Transactions",
		description:
			"Process thousands of transactions per second with Stellar&apos;s efficient consensus protocol.",
	},
	{
		icon: Shield,
		title: "Enterprise-Grade Security",
		description:
			"Built on a battle-tested blockchain with proven security and reliability.",
	},
	{
		icon: Coins,
		title: "Low Transaction Costs",
		description:
			"Minimal fees make micro-transactions and small contributions viable.",
	},
	{
		icon: Globe,
		title: "Global Accessibility",
		description:
			"Connect with users worldwide through Stellar&apos;s borderless payment network.",
	},
];

const INTEGRATIONS: Integration[] = [
	{
		name: "Soroban Smart Contracts",
		description:
			"Secure, scalable smart contracts for automated fund management and project milestones.",
		image: "/brands/soroban-white.svg",
		link: "https://soroban.stellar.org",
	},
	{
		name: "Stellar Development Foundation",
		description:
			"Backed by the SDF, ensuring long-term sustainability and innovation.",
		image: "/brands/sdf-white.svg",
		link: "https://stellar.org/foundation",
	},
	{
		name: "Stellar Network",
		description:
			"Built on the most reliable and efficient blockchain for payments.",
		image: "/brands/stellar-white.svg",
		link: "https://stellar.org",
	},
];

export default function EcosystemPage() {
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
						<div className="grid lg:grid-cols-2 gap-12 items-center">
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.6 }}
								className="text-left"
							>
								<motion.div
									initial={{ opacity: 0, scale: 0.95 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.5, delay: 0.2 }}
									className="inline-block bg-primary/10 px-4 py-2 rounded-full mb-6"
								>
									<span className="text-primary font-medium">
										Stellar Ecosystem
									</span>
								</motion.div>

								<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
									Powered by{" "}
									<span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
										Stellar Blockchain
									</span>
								</h1>

								<motion.p
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.3 }}
									className="text-lg md:text-xl text-muted-foreground mb-8"
								>
									Boundless leverages the power of Stellar to create a seamless,
									secure, and efficient crowdfunding platform. Experience the
									future of decentralized funding with enterprise-grade
									blockchain technology.
								</motion.p>

								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.4 }}
									className="space-y-4"
								>
									<div className="flex items-start space-x-3">
										<div className="mt-1 bg-primary/10 p-2 rounded-full">
											<Zap className="h-5 w-5 text-primary" />
										</div>
										<p className="text-muted-foreground">
											Lightning-fast transaction processing
										</p>
									</div>
									<div className="flex items-start space-x-3">
										<div className="mt-1 bg-primary/10 p-2 rounded-full">
											<Shield className="h-5 w-5 text-primary" />
										</div>
										<p className="text-muted-foreground">
											Enterprise-grade security and reliability
										</p>
									</div>
									<div className="flex items-start space-x-3">
										<div className="mt-1 bg-primary/10 p-2 rounded-full">
											<Coins className="h-5 w-5 text-primary" />
										</div>
										<p className="text-muted-foreground">
											Minimal transaction fees
										</p>
									</div>
								</motion.div>

								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.5 }}
									className="mt-8 flex flex-col sm:flex-row gap-4"
								>
									<Button size="lg" className="group">
										<Link href="/auth/signin" className="flex items-center">
											Get Started
											<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
										</Link>
									</Button>
									<Button size="lg" variant="outline">
										<Link
											href="https://stellar.org"
											target="_blank"
											className="flex items-center"
										>
											Learn More About Stellar
											<LinkIcon className="ml-2 h-4 w-4" />
										</Link>
									</Button>
								</motion.div>
							</motion.div>

							<motion.div
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.6 }}
								className="relative"
							>
								<div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
									<div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]" />
									<div className="absolute inset-0 flex items-center justify-center">
										<div className="text-center p-8">
											<div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
												<Code className="h-12 w-12 text-primary" />
											</div>
											<h3 className="text-2xl font-semibold mb-4">
												Built on Stellar
											</h3>
											<p className="text-muted-foreground">
												Leveraging the most efficient blockchain for payments
												and smart contracts
											</p>
										</div>
									</div>
								</div>
							</motion.div>
						</div>
					</div>
				</section>

				{/* Features Section */}
				<section className="py-16 md:py-24 bg-muted/30">
					<div className="container max-w-6xl mx-auto px-4 md:px-6">
						<motion.div
							className="text-center max-w-3xl mx-auto mb-16"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
						>
							<h2 className="text-3xl font-bold tracking-tighter mb-6">
								Stellar Advantages
							</h2>
							<p className="text-lg text-muted-foreground">
								Why we chose Stellar as the foundation for Boundless
							</p>
						</motion.div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							{FEATURES.map((feature, index) => (
								<motion.div
									key={feature.title}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: index * 0.1 }}
									className="bg-card border border-border p-6 rounded-lg"
								>
									<div className="flex items-start space-x-4">
										<div className="mt-1 bg-primary/10 p-3 rounded-full">
											<feature.icon className="h-6 w-6 text-primary" />
										</div>
										<div>
											<h3 className="text-xl font-semibold mb-2">
												{feature.title}
											</h3>
											<p className="text-muted-foreground">
												{feature.description}
											</p>
										</div>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* Integrations Section */}
				<section className="py-16 md:py-24 bg-background">
					<div className="container max-w-6xl mx-auto px-4 md:px-6">
						<motion.div
							className="text-center max-w-3xl mx-auto mb-16"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
						>
							<h2 className="text-3xl font-bold tracking-tighter mb-6">
								Stellar Integrations
							</h2>
							<p className="text-lg text-muted-foreground">
								Key components of the Stellar ecosystem powering Boundless
							</p>
						</motion.div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							{INTEGRATIONS.map((integration, index) => (
								<motion.div
									key={integration.name}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: index * 0.1 }}
									className="bg-card border border-border p-6 rounded-lg text-center"
								>
									<div className="w-32 h-12 mx-auto mb-6 relative">
										<Image
											src={integration.image}
											alt={integration.name}
											fill
											className="object-contain dark:block hidden"
										/>
										<Image
											src={integration.image.replace(
												"-white.svg",
												"-black.svg",
											)}
											alt={integration.name}
											fill
											className="object-contain dark:hidden block"
										/>
									</div>
									<h3 className="text-xl font-semibold mb-2">
										{integration.name}
									</h3>
									<p className="text-muted-foreground text-sm mb-4">
										{integration.description}
									</p>
									<Button variant="ghost" size="sm" asChild>
										<Link
											href={integration.link}
											target="_blank"
											className="flex items-center"
										>
											Learn More
											<LinkIcon className="ml-2 h-4 w-4" />
										</Link>
									</Button>
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
								Join Boundless and experience the power of Stellar blockchain
								for your crowdfunding needs. Whether you&apos;re a creator or a
								backer, we&apos;ve got you covered.
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
