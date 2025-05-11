'use client';

import AnimatedUnderline from "@/components/landing/components/AnimatedUnderline";
import PageTransition from "@/components/landing/components/PageTransition";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import {
	CheckCircle,
	ChevronRight,
	Code,
	Gift,
	Globe,
	Handshake,
	Heart,
	LineChart,
	type LucideIcon,
	Rocket,
	Sparkles,
	Star,
	Users,
	Zap,
} from "lucide-react";
import Image from "next/image";
import React, { useRef } from "react";

// Types for team members and history items
type TeamMember = {
	name: string;
	role: string;
	bio: string;
	imageUrl: string;
};

type ValueItem = {
	icon: LucideIcon;
	title: string;
	description: string;
};

type HistoryItem = {
	year: string;
	title: string;
	description: string;
	icon: LucideIcon;
};

// Data arrays
const TEAM_MEMBERS: TeamMember[] = [
	{
		name: "Chikangwu Ikechukwu Collins",
		role: "Founder & CEO",
		bio: "Passionate blockchain innovator with experience in decentralized systems. Founded Boundless to improve funding for Stellar ecosystem projects.",
		imageUrl: "/api/placeholder/400/400",
	},
	{
		name: "Nnaji Benjamin",
		role: "Fullstack Blockchain Developer",
		bio: "Expert in blockchain architecture with deep knowledge of the Stellar ecosystem. Leads development of our secure platform.",
		imageUrl: "/api/placeholder/400/400",
	},
	{
		name: "Ukpaa Chigozie",
		role: "Developer & Technical Writer",
		bio: "Combines technical skills with good communication to create educational content and develop key platform features.",
		imageUrl: "/api/placeholder/400/400",
	},
	{
		name: "Ugo Justice",
		role: "Blockchain Advocate & DeFi Specialist",
		bio: "DeFi strategist who brings knowledge of decentralized finance models to help creators maximize their funding potential.",
		imageUrl: "/api/placeholder/400/400",
	},
];

const VALUES: ValueItem[] = [
	{
		icon: Star,
		title: "Stellar First",
		description:
			"We're fully dedicated to supporting projects building on the Stellar ecosystem, focusing all our resources on this network.",
	},
	{
		icon: Heart,
		title: "Community Driven",
		description:
			"Our platform puts power in the hands of the community, where backers vote on projects and give valuable feedback to creators.",
	},
	{
		icon: CheckCircle,
		title: "Milestone Based",
		description:
			"We release funding as projects reach verified milestones, ensuring accountability and giving backers confidence in their investments.",
	},
	{
		icon: Code,
		title: "Technical Excellence",
		description:
			"We prioritize projects with strong technical foundations and provide expert mentorship throughout the development process.",
	},
	{
		icon: Globe,
		title: "Global Access",
		description:
			"Using Stellar's fast, low-cost transactions, we make funding accessible to creators from all around the world.",
	},
	{
		icon: LineChart,
		title: "Sustainable Growth",
		description:
			"We focus on long-term project success rather than quick wins, supporting founders who are building for lasting impact.",
	},
];

const HISTORY: HistoryItem[] = [
	{
		year: "Mid 2024",
		title: "The Idea",
		description:
			"Boundless was born as a solution to fix funding challenges for Stellar ecosystem projects. We developed our core concept and formed our initial team.",
		icon: Sparkles,
	},
	{
		year: "Late 2024",
		title: "Stellar Community Fund",
		description:
			"We presented our vision at the Stellar Community Fund meeting, securing $10,000 in XLM funding to turn our concept into reality.",
		icon: Gift,
	},
	{
		year: "Early 2025",
		title: "Platform Development",
		description:
			"We built the Boundless platform with a focus on security, transparency, and easy user experience for both creators and backers.",
		icon: Code,
	},
	{
		year: "2025",
		title: "Launch & Partnerships",
		description:
			"We officially launched Boundless and formed partnerships with open-source projects like OnlyDust to grow our ecosystem and create more opportunities.",
		icon: Handshake,
	},
];

export default function AboutUsPage() {
	const missionRef = useRef<HTMLDivElement>(null);
	const isMissionInView = useInView(missionRef, { margin: "-100px" });
	const valuesRef = useRef<HTMLDivElement>(null);
	const isValuesInView = useInView(valuesRef, { margin: "-100px" });
	const teamRef = useRef<HTMLDivElement>(null);
	const isTeamInView = useInView(teamRef, { margin: "-100px" });
	const historyRef = useRef<HTMLDivElement>(null);
	const isHistoryInView = useInView(historyRef, { margin: "-100px" });

	return (
		<PageTransition>
			<div className="min-h-screen bg-background">
				{/* Hero Section with Enhanced Animated Gradients */}
				<section className="relative pt-28 pb-20 overflow-hidden">
					{/* Animated background elements */}
					<div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/10 rounded-full blur-3xl animate-pulse" />
					<div
						className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl animate-pulse"
						style={{ animationDelay: "1s" }}
					/>
					<div
						className="absolute top-1/4 left-1/4 w-1/3 h-1/3 bg-primary/8 rounded-full blur-3xl animate-pulse"
						style={{ animationDelay: "2s" }}
					/>

					<div className="container max-w-6xl mx-auto px-4 relative z-10">
						<div className="flex flex-col items-center text-center">
							<motion.div
								initial={{ opacity: 0, y: -20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6 }}
								className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20"
							>
								<Star className="h-4 w-4 mr-2" />
								<span className="text-sm font-medium">Our Story</span>
							</motion.div>

							<motion.h1
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.7, delay: 0.1 }}
								className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
							>
								About Boundless
							</motion.h1>

							<motion.div
								initial={{ width: 0 }}
								animate={{ width: "8rem" }}
								transition={{ duration: 0.8, delay: 0.2 }}
								className="h-1.5 w-32 bg-gradient-to-r from-primary to-primary/50 rounded-full mb-8"
							/>

							<motion.p
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.6, delay: 0.3 }}
								className="text-xl text-muted-foreground max-w-2xl mb-10"
							>
								Helping innovators in the Stellar ecosystem get community-backed
								funding and technical support.
							</motion.p>
						</div>
					</div>
				</section>

				{/* Mission Section with Enhanced Animation */}
				<section className="py-16 relative overflow-hidden" ref={missionRef}>
					<div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
					<div className="container max-w-6xl mx-auto px-4">
						<div className="flex flex-col md:flex-row gap-12 items-center">
							<div className="w-full md:w-1/2">
								<div className="text-left mb-8">
									<div className="relative inline-block">
										<h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
											Our Mission
										</h2>
										<AnimatedUnderline isInView={isMissionInView} />
									</div>
								</div>

								<motion.div
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5 }}
								>
									<p className="text-lg mb-6">
										Boundless connects innovative builders with passionate
										backers who believe in the future of the Stellar ecosystem.
									</p>
									<p className="text-muted-foreground mb-8">
										Our platform breaks down the barriers to funding by creating
										a clear, milestone-based system where great ideas get the
										resources they need, and backers can follow the journey from
										start to finish.
									</p>
									<div className="flex flex-wrap gap-6">
										<Button className="gap-2 bg-primary hover:bg-primary/90 shadow-md transition-all duration-300">
											How It Works <ChevronRight className="h-4 w-4" />
										</Button>
										<Button
											variant="outline"
											className="gap-2 border-primary/20 hover:border-primary/50 transition-all duration-300"
										>
											Explore Projects <Globe className="h-4 w-4" />
										</Button>
									</div>
								</motion.div>
							</div>

							<div className="w-full md:w-1/2">
								<motion.div
									initial={{ opacity: 0, scale: 0.95 }}
									whileInView={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.5 }}
									className="relative p-1 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl shadow-xl"
								>
									<div className="grid grid-cols-2 gap-3">
										<div className="bg-card rounded-lg p-6 shadow-md flex flex-col items-center text-center hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
											<div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
												<Rocket className="h-7 w-7 text-primary" />
											</div>
											<p className="text-2xl font-bold text-primary mb-1">
												150+
											</p>
											<p className="text-sm text-muted-foreground">
												Projects Funded
											</p>
										</div>
										<div className="bg-card rounded-lg p-6 shadow-md flex flex-col items-center text-center hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
											<div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
												<Users className="h-7 w-7 text-primary" />
											</div>
											<p className="text-2xl font-bold text-primary mb-1">
												12K+
											</p>
											<p className="text-sm text-muted-foreground">
												Active Backers
											</p>
										</div>
										<div className="bg-card rounded-lg p-6 shadow-md flex flex-col items-center text-center hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
											<div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
												<Globe className="h-7 w-7 text-primary" />
											</div>
											<p className="text-2xl font-bold text-primary mb-1">
												35+
											</p>
											<p className="text-sm text-muted-foreground">Countries</p>
										</div>
										<div className="bg-card rounded-lg p-6 shadow-md flex flex-col items-center text-center hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
											<div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
												<Zap className="h-7 w-7 text-primary" />
											</div>
											<p className="text-2xl font-bold text-primary mb-1">
												2.5M+
											</p>
											<p className="text-sm text-muted-foreground">
												XLM Raised
											</p>
										</div>
									</div>
								</motion.div>
							</div>
						</div>
					</div>
				</section>

				{/* Values Section with Enhanced Cards */}
				<section className="py-20 bg-muted/30" ref={valuesRef}>
					<div className="container max-w-6xl mx-auto px-4">
						<div className="text-center mb-12">
							<div className="relative inline-block">
								<h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
									Our Values
								</h2>
								<AnimatedUnderline isInView={isValuesInView} />
							</div>
							<p className="text-muted-foreground max-w-2xl mx-auto mt-4">
								The key principles that guide everything we do at Boundless
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{VALUES.map((value, index) => (
								<motion.div
									key={value.title}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: index * 0.1 }}
									className="bg-card border border-primary/10 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px] group"
								>
									<div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
										<value.icon className="h-7 w-7 text-primary" />
									</div>
									<h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
										{value.title}
									</h3>
									<p className="text-muted-foreground">{value.description}</p>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* Team Section with Enhanced Cards and Avatars */}
				<section
					className="py-20 bg-background relative overflow-hidden"
					ref={teamRef}
				>
					<div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

					<div className="container max-w-6xl mx-auto px-4 relative z-10">
						<div className="text-center mb-12">
							<div className="relative inline-block">
								<h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
									Our Team
								</h2>
								<AnimatedUnderline isInView={isTeamInView} />
							</div>
							<p className="text-muted-foreground max-w-2xl mx-auto mt-4">
								Meet the people behind Boundless who are dedicated to helping
								creators on Stellar
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							{TEAM_MEMBERS.map((member, index) => (
								<motion.div
									key={member.name}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: index * 0.1 }}
									className="bg-card border border-primary/10 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px] group"
								>
									<div className="relative">
										<div className="w-full aspect-square bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 flex items-center justify-center p-6">
											<Image
												width={150}
												height={150}
												src={member.imageUrl}
												alt={`${member.name} avatar`}
												className="w-32 h-32 rounded-full object-cover border-4 border-primary/20 shadow-lg"
											/>
										</div>
										<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
											<div className="p-4">
												<h3 className="text-white font-semibold">
													{member.name}
												</h3>
												<p className="text-white/80 text-sm">{member.role}</p>
											</div>
										</div>
									</div>
									<div className="p-5">
										<h3 className="font-semibold mb-1">{member.name}</h3>
										<p className="text-primary text-sm mb-3">{member.role}</p>
										<p className="text-sm text-muted-foreground">
											{member.bio}
										</p>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* History Timeline with Enhanced Design */}
				<section className="py-20 bg-muted/30" ref={historyRef}>
					<div className="container max-w-6xl mx-auto px-4">
						<div className="text-center mb-16">
							<div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
								<Sparkles className="h-4 w-4 mr-2" />
								<span className="text-sm font-medium">Our Journey</span>
							</div>

							<div className="relative inline-block">
								<h2 className="text-3xl md:text-4xl font-bold mb-6">
									The Boundless Story
								</h2>
								<AnimatedUnderline isInView={isHistoryInView} />
							</div>
							<p className="text-muted-foreground max-w-2xl mx-auto mt-4">
								From idea to a growing community, follow our journey
							</p>
						</div>

						<div className="relative">
							{/* Center line */}
							<div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary/40 via-primary/20 to-primary/5 rounded-full" />

							<div className="space-y-24">
								{HISTORY.map((item, index) => (
									<div key={item.year} className="relative">
										<div className="absolute left-1/2 transform -translate-x-1/2 -mt-3 w-10 h-10 rounded-full border-4 border-background bg-gradient-to-br from-primary to-primary/70 z-10 flex items-center justify-center shadow-lg shadow-primary/20">
											<item.icon className="h-4 w-4 text-white" />
										</div>

										<motion.div
											initial={{ opacity: 0, y: 20 }}
											whileInView={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.5, delay: index * 0.2 }}
											className={`w-5/12 ${index % 2 === 0 ? "mr-auto pr-16" : "ml-auto pl-16"}`}
										>
											<div className="bg-card border border-primary/10 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
												<div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary mb-4 text-sm font-medium">
													{item.year}
												</div>
												<h3 className="text-xl font-semibold mb-3">
													{item.title}
												</h3>
												<p className="text-muted-foreground">
													{item.description}
												</p>
											</div>
										</motion.div>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				{/* Enhanced Stellar Banner */}
				<section className="py-12 bg-gradient-to-r from-primary/5 to-primary/10">
					<div className="container max-w-6xl mx-auto px-4">
						<div className="rounded-2xl border border-primary/20 bg-card/70 shadow-lg p-8 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
							<div className="flex flex-col sm:flex-row items-center justify-between gap-6">
								<div className="flex items-center gap-5">
									<div className="relative">
										<div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
											<div className="w-16 h-16 rounded-full bg-card flex items-center justify-center shadow-md">
												<div className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center">
													<Star className="h-5 w-5 text-primary" />
												</div>
											</div>
										</div>
										<div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold shadow-lg">
											<Zap className="h-4 w-4" />
										</div>
									</div>
									<div>
										<h3 className="text-xl font-bold mb-2">
											Built Only for Stellar
										</h3>
										<p className="text-muted-foreground">
											We&apos;re fully focused on supporting new ideas in the
											Stellar ecosystem
										</p>
									</div>
								</div>
								<Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-300">
									Learn About Stellar
								</Button>
							</div>
						</div>
					</div>
				</section>

				{/* Enhanced CTA Section */}
				<section className="py-20 bg-background">
					<div className="container max-w-6xl mx-auto px-4">
						<div className="bg-gradient-to-r from-primary/5 via-card to-primary/5 rounded-2xl border border-primary/20 p-8 md:p-12 shadow-xl relative overflow-hidden hover:shadow-2xl transition-all duration-300">
							{/* Background elements */}
							<div
								className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-70 animate-pulse"
								style={{ animationDuration: "8s" }}
							/>
							<div
								className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-70 animate-pulse"
								style={{ animationDuration: "12s" }}
							/>

							<div className="relative flex flex-col md:flex-row gap-10 items-center justify-between">
								<div className="w-full md:w-2/3">
									<div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
										<Rocket className="h-4 w-4 mr-2" />
										<span className="text-sm font-medium">
											Ready to Join Us?
										</span>
									</div>

									<h2 className="text-3xl md:text-4xl font-bold mb-6">
										Be Part of Something Bigger
									</h2>
									<p className="text-xl text-muted-foreground mb-8">
										Whether you&apos;re a creator with a bold idea or a backer
										looking to support innovation, Boundless is where great
										ideas take flight.
									</p>

									<div className="flex flex-wrap gap-6">
										<Button
											size="lg"
											className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 px-8 py-6 text-lg hover:translate-y-[-2px] transition-all duration-300"
										>
											<Rocket className="mr-2 h-5 w-5" /> Start Your Project
										</Button>
										<Button
											size="lg"
											variant="outline"
											className="border-primary/20 hover:border-primary/50 px-8 py-6 text-lg hover:translate-y-[-2px] transition-all duration-300"
										>
											<Globe className="mr-2 h-5 w-5" /> Explore Projects
										</Button>
									</div>
								</div>

								<div className="w-full md:w-1/3 flex justify-center md:justify-end">
									{/* Enhanced Stellar-themed decoration */}
									<div className="relative w-56 h-56 flex items-center justify-center">
										<div
											className="absolute inset-0 rounded-full bg-primary/10 animate-pulse"
											style={{ animationDuration: "4s" }}
										/>
										<div className="absolute inset-4 rounded-full bg-primary/5 border border-primary/20 flex items-center justify-center">
											<div className="w-20 h-20 relative">
												{/* Stylized Stellar-inspired logo */}
												<div className="absolute inset-0 flex items-center justify-center">
													<Star className="h-12 w-12 text-primary" />
												</div>
												<div
													className="absolute inset-0 animate-spin"
													style={{ animationDuration: "10s" }}
												>
													<div className="h-4 w-4 bg-primary rounded-full absolute -top-2 left-1/2 transform -translate-x-1/2" />
													<div className="h-4 w-4 bg-primary/60 rounded-full absolute top-1/2 -right-2 transform -translate-y-1/2" />
													<div className="h-4 w-4 bg-primary/40 rounded-full absolute -bottom-2 left-1/2 transform -translate-x-1/2" />
													<div className="h-4 w-4 bg-primary/20 rounded-full absolute top-1/2 -left-2 transform -translate-y-1/2" />
												</div>
											</div>
										</div>
										<div
											className="absolute top-0 left-0 w-full h-full animate-spin"
											style={{ animationDuration: "15s" }}
										>
											<div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-primary/30 rounded-full" />
											<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-primary/30 rounded-full" />
											<div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-primary/30 rounded-full" />
											<div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-primary/30 rounded-full" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</PageTransition>
	);
}
