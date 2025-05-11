"use client";

import PageTransition from "@/components/landing/components/PageTransition";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
	Code,
	Globe,
	Handshake,
	Lightbulb,
	Shield,
	ShieldCheck,
	Zap,
} from "lucide-react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type React from "react";

type ValueItem = {
	icon: React.ElementType;
	title: string;
	description: string;
};

type TeamMember = {
	name: string;
	role: string;
	description: string;
	image: string;
};

const VALUES: ValueItem[] = [
	{
		icon: Shield,
		title: "Trust & Transparency",
		description:
			"See exactly where your money goes. We release funds as projects hit their goals.",
	},
	{
		icon: Globe,
		title: "Open to Everyone",
		description:
			"Low fees and fast payments help creators from anywhere join our platform.",
	},
	{
		icon: Handshake,
		title: "Community Input",
		description:
			"Backers get to vote on important project decisions. Your voice matters here.",
	},
	{
		icon: Lightbulb,
		title: "Bold Ideas Welcome",
		description:
			"We support projects that push boundaries and help communities grow.",
	},
];

const TEAM: TeamMember[] = [
	{
		name: "Collins Ikechukwu",
		role: "ROLE",
		description:
			"Blockchain entrepreneur with 8+ years of experience in fintech and decentralized systems.",
		image: "/api/placeholder/100/100",
	},
	{
		name: "Ukpaa Chigozie",
		role: "ROLE",
		description:
			"Former Stellar core developer with expertise in blockchain architecture and smart contracts.",
		image: "/api/placeholder/100/100",
	},
	{
		name: "Nnaji Chinedu",
		role: "ROLE",
		description:
			"Community builder with a passion for connecting creators with their supporters.",
		image: "/api/placeholder/100/100",
	},
	{
		name: "Justtice",
		role: "ROLE",
		description:
			"Product leader focused on creating intuitive experiences for blockchain users.",
		image: "/api/placeholder/100/100",
	},
];

export default function AboutPage() {
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
									<span className="text-primary font-medium">Our Story</span>
								</motion.div>

								<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
									Building the Future of{" "}
									<span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
										Decentralized Funding
									</span>
								</h1>

								<motion.p
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.3 }}
									className="text-lg md:text-xl text-muted-foreground mb-8"
								>
									Boundless is revolutionizing how innovative projects get
									funded. We combine the power of community-driven funding with
									the security and efficiency of the Stellar blockchain.
								</motion.p>

								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.4 }}
									className="space-y-4"
								>
									<div className="flex items-start space-x-3">
										<div className="mt-1 bg-primary/10 p-2 rounded-full">
											<Shield className="h-5 w-5 text-primary" />
										</div>
										<p className="text-muted-foreground">
											Secure, transparent funding through blockchain technology
										</p>
									</div>
									<div className="flex items-start space-x-3">
										<div className="mt-1 bg-primary/10 p-2 rounded-full">
											<Globe className="h-5 w-5 text-primary" />
										</div>
										<p className="text-muted-foreground">
											Global accessibility with low fees and fast transactions
										</p>
									</div>
									<div className="flex items-start space-x-3">
										<div className="mt-1 bg-primary/10 p-2 rounded-full">
											<Handshake className="h-5 w-5 text-primary" />
										</div>
										<p className="text-muted-foreground">
											Community-driven decision making and project validation
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
										<Link href="/explore">Explore Projects</Link>
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
												<Lightbulb className="h-12 w-12 text-primary" />
											</div>
											<h3 className="text-2xl font-semibold mb-4">
												Innovation Through Community
											</h3>
											<p className="text-muted-foreground">
												Join a network of creators and backers shaping the
												future of decentralized funding
											</p>
										</div>
									</div>
								</div>
							</motion.div>
						</div>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.6 }}
							className="mt-2 pt-8 text-center"
						>
							<p className="text-sm text-muted-foreground mb-6">
								Built on and powered by
							</p>
							<div className="flex flex-wrap justify-center items-center gap-4">
								<div className="flex items-center space-x-2">
									<Image
										src="/brands/stellar-white.svg"
										alt="Stellar"
										width={120}
										height={40}
										className="h-8 w-auto dark:block hidden opacity-80 hover:opacity-100 transition-opacity"
									/>
									<Image
										src="/brands/stellar-black.svg"
										alt="Stellar"
										width={120}
										height={40}
										className="h-8 w-auto dark:hidden block opacity-80 hover:opacity-100 transition-opacity"
									/>
								</div>
								<div className="flex items-center space-x-2">
									<Image
										src="/brands/soroban-white.svg"
										alt="Soroban"
										width={120}
										height={40}
										className="h-8 w-auto dark:block hidden opacity-80 hover:opacity-100 transition-opacity"
									/>
									<Image
										src="/brands/soroban-black.svg"
										alt="Soroban"
										width={120}
										height={40}
										className="h-8 w-auto dark:hidden block opacity-80 hover:opacity-100 transition-opacity"
									/>
								</div>
								<div className="flex items-center space-x-2">
									<Image
										src="/brands/sdf-white.svg"
										alt="Stellar Development Foundation"
										width={120}
										height={40}
										className="h-8 w-auto dark:block hidden opacity-80 hover:opacity-100 transition-opacity"
									/>
									<Image
										src="/brands/sdf-black.svg"
										alt="Stellar Development Foundation"
										width={120}
										height={40}
										className="h-8 w-auto dark:hidden block opacity-80 hover:opacity-100 transition-opacity"
									/>
								</div>
								<div className="flex items-center space-x-2">
									<Image
										src="/brands/scf-white.svg"
										alt="Stellar Development Foundation"
										width={120}
										height={40}
										className="h-8 w-auto dark:block hidden opacity-80 hover:opacity-100 transition-opacity"
									/>
									<Image
										src="/brands/scf-black.svg"
										alt="Stellar Development Foundation"
										width={120}
										height={40}
										className="h-8 w-auto dark:hidden block opacity-80 hover:opacity-100 transition-opacity"
									/>
								</div>
							</div>
						</motion.div>
					</div>
				</section>

				{/* Mission Section */}
				<section className="py-16 md:py-24 bg-muted/30">
					<div className="container max-w-6xl mx-auto px-4 md:px-6">
						<div className="grid gap-12 lg:grid-cols-2 items-center">
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.6 }}
							>
								<h2 className="text-3xl font-bold tracking-tighter mb-6">
									Our Mission
								</h2>
								<p className="text-lg text-muted-foreground mb-6">
									At Boundless, we&apos;re building the future of crowdfunding
									by leveraging blockchain technology to create a more
									transparent, efficient, and accessible platform for creators
									and backers alike.
								</p>
								<p className="text-lg text-muted-foreground">
									Our platform combines the power of community-driven funding
									with the security and efficiency of the Stellar blockchain,
									enabling innovative projects to thrive while giving backers
									unprecedented visibility and control.
								</p>
							</motion.div>
							<motion.div
								initial={{ opacity: 0, x: 20 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.6 }}
								className="grid grid-cols-2 gap-4"
							>
								<div className="space-y-4">
									<div className="bg-card p-6 rounded-lg border border-border">
										<Zap className="h-8 w-8 text-primary mb-4" />
										<h3 className="font-semibold mb-2">Fast Transactions</h3>
										<p className="text-sm text-muted-foreground">
											Process contributions in seconds with Stellar&apos;s
											high-speed network
										</p>
									</div>
									<div className="bg-card p-6 rounded-lg border border-border">
										<Code className="h-8 w-8 text-primary mb-4" />
										<h3 className="font-semibold mb-2">Smart Contracts</h3>
										<p className="text-sm text-muted-foreground">
											Secure, automated fund management through Soroban
										</p>
									</div>
								</div>
								<div className="space-y-4 mt-8">
									<div className="bg-card p-6 rounded-lg border border-border">
										<ShieldCheck className="h-8 w-8 text-primary mb-4" />
										<h3 className="font-semibold mb-2">Enhanced Security</h3>
										<p className="text-sm text-muted-foreground">
											Protect all transactions with Stellar&apos;s immutable
											ledger
										</p>
									</div>
									<div className="bg-card p-6 rounded-lg border border-border">
										<Globe className="h-8 w-8 text-primary mb-4" />
										<h3 className="font-semibold mb-2">Global Reach</h3>
										<p className="text-sm text-muted-foreground">
											Connect with backers worldwide through borderless payments
										</p>
									</div>
								</div>
							</motion.div>
						</div>
					</div>
				</section>

				{/* Values Section */}
				<section className="py-16 md:py-24 bg-background">
					<div className="container max-w-6xl mx-auto px-4 md:px-6">
						<motion.div
							className="text-center max-w-3xl mx-auto mb-16"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
						>
							<h2 className="text-3xl font-bold tracking-tighter mb-6">
								Our Values
							</h2>
							<p className="text-lg text-muted-foreground">
								These core principles guide everything we do at Boundless
							</p>
						</motion.div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							{VALUES.map((value, index) => (
								<motion.div
									key={value.title}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: index * 0.1 }}
									className="bg-card border border-border p-6 rounded-lg"
								>
									<div className="flex items-start space-x-4">
										<div className="mt-1 bg-primary/10 p-3 rounded-full">
											<value.icon className="h-6 w-6 text-primary" />
										</div>
										<div>
											<h3 className="text-xl font-semibold mb-2">
												{value.title}
											</h3>
											<p className="text-muted-foreground">
												{value.description}
											</p>
										</div>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* Team Section */}
				<section className="py-16 md:py-24 bg-muted/30">
					<div className="container max-w-6xl mx-auto px-4 md:px-6">
						<motion.div
							className="text-center max-w-3xl mx-auto mb-16"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
						>
							<h2 className="text-3xl font-bold tracking-tighter mb-6">
								Meet Our Team
							</h2>
							<p className="text-lg text-muted-foreground">
								The passionate individuals behind Boundless
							</p>
						</motion.div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
							{TEAM.map((member, index) => (
								<motion.div
									key={member.name}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: index * 0.1 }}
									className="bg-card border border-border p-6 rounded-lg text-center"
								>
									<div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
										<Image
											width={100}
											height={100}
											src={member.image}
											alt={member.name}
											className="w-full h-full object-cover"
										/>
									</div>
									<h3 className="text-xl font-semibold mb-2">{member.name}</h3>
									<p className="text-primary font-medium mb-2">{member.role}</p>
									<p className="text-muted-foreground text-sm">
										{member.description}
									</p>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<section className="py-16 md:py-24 bg-background">
					<div className="container max-w-6xl mx-auto px-4 md:px-6">
						<motion.div
							className="text-center max-w-3xl mx-auto"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
						>
							<h2 className="text-3xl font-bold tracking-tighter mb-6">
								Join Our Journey
							</h2>
							<p className="text-lg text-muted-foreground mb-8">
								Be part of the future of crowdfunding. Whether you&apos;re a
								creator with a vision or a backer looking to support innovative
								projects, Boundless is your platform.
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
