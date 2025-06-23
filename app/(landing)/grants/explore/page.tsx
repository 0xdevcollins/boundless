"use client";

import { Button } from "@/components/ui/button";
import {
	Search,
	Filter,
	TrendingUp,
	Clock,
	Star,
	ArrowRight,
	Lightbulb,
	Wrench,
	Globe,
	Palette,
	GraduationCap,
	Zap,
	Shield,
	Users,
	Eye,
	Link as LinkIcon,
	Code,
	BookOpen,
	Leaf,
	Smartphone,
} from "lucide-react";
import Link from "next/link";
import React from "react";

export default function GrantsExplorePage() {
	return (
		<div className="min-h-screen bg-background">
			{/* Hero Section */}
			<section className="relative pt-24 pb-24 overflow-hidden">
				<div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/10 rounded-full blur-3xl animate-pulse" />
				<div
					className="absolute bottom-0 left-0 w-1/2 h-1/3 bg-primary/5 rounded-full blur-3xl animate-pulse"
					style={{ animationDelay: "1s" }}
				/>

				<div className="container max-w-6xl mx-auto px-4 relative z-10">
					<div className="flex flex-col items-center text-center">
						<div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
							<Search className="h-4 w-4 mr-2" />
							<span className="text-sm font-medium">
								 Explore Grant Programs
							</span>
						</div>

						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
							Access open grant opportunities
						</h1>

						<div className="h-1.5 w-32 bg-gradient-to-r from-primary to-primary/50 rounded-full mb-8" />

						<p className="text-xl text-muted-foreground max-w-3xl mb-10">
							<strong>Access open grant opportunities from DAOs, ecosystem builders, and independent grantors.</strong><br />
							Apply, build, and get funded — transparently and milestone by milestone.
						</p>
					</div>
				</div>
			</section>

			{/* Open Calls Section */}
			<section className="py-24 bg-gradient-to-b from-primary/5 to-background">
				<div className="container max-w-6xl mx-auto px-4">
					<div className="text-center max-w-3xl mx-auto mb-16">
						<div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
							<Users className="h-4 w-4 mr-2" />
							<span className="text-sm font-medium">🧑‍💻 Open Calls for Builders & Innovators</span>
						</div>
						<h2 className="text-3xl md:text-4xl font-bold mb-6">Boundless hosts a range of open grant programs in areas like:</h2>
						<div className="h-1.5 w-24 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto mb-6" />
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
						{/* Blockchain development */}
						<div className="bg-card rounded-xl border border-primary/10 p-6 hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
							<div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
								<LinkIcon className="h-8 w-8 text-primary" />
							</div>
							<h3 className="font-semibold mb-3 text-center">🔗 Blockchain development</h3>
							<p className="text-sm text-muted-foreground text-center">
								Smart contracts, protocols, and blockchain infrastructure
							</p>
						</div>

						{/* Open-source tooling */}
						<div className="bg-card rounded-xl border border-primary/10 p-6 hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
							<div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
								<Wrench className="h-8 w-8 text-primary" />
							</div>
							<h3 className="font-semibold mb-3 text-center">🌐 Open-source tooling</h3>
							<p className="text-sm text-muted-foreground text-center">
								Developer tools, libraries, and frameworks
							</p>
						</div>

						{/* Education and research */}
						<div className="bg-card rounded-xl border border-primary/10 p-6 hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
							<div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
								<BookOpen className="h-8 w-8 text-primary" />
							</div>
							<h3 className="font-semibold mb-3 text-center">🎓 Education and research</h3>
							<p className="text-sm text-muted-foreground text-center">
								Educational content, research papers, and learning resources
							</p>
						</div>

						{/* Sustainability */}
						<div className="bg-card rounded-xl border border-primary/10 p-6 hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
							<div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
								<Leaf className="h-8 w-8 text-primary" />
							</div>
							<h3 className="font-semibold mb-3 text-center">🌱 Sustainability & social good</h3>
							<p className="text-sm text-muted-foreground text-center">
								Environmental and social impact projects
							</p>
						</div>

						{/* Fintech & DeFi */}
						<div className="bg-card rounded-xl border border-primary/10 p-6 hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
							<div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
								<Smartphone className="h-8 w-8 text-primary" />
							</div>
							<h3 className="font-semibold mb-3 text-center">📲 Fintech & DeFi innovation</h3>
							<p className="text-sm text-muted-foreground text-center">
								Financial technology and decentralized finance solutions
							</p>
						</div>
					</div>

					{/* Grant Features */}
					<div className="bg-card rounded-2xl border border-primary/10 p-8 shadow-xl">
						<h3 className="text-2xl font-bold text-center mb-8">Each grant has:</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							<div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl">
								<Shield className="h-6 w-6 text-primary flex-shrink-0" />
								<span className="font-medium">Custom rules & eligibility</span>
							</div>
							<div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl">
								<Clock className="h-6 w-6 text-primary flex-shrink-0" />
								<span className="font-medium">Milestone-based payout schedules</span>
							</div>
							<div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl">
								<Eye className="h-6 w-6 text-primary flex-shrink-0" />
								<span className="font-medium">Public or private application options</span>
							</div>
							<div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl">
								<Zap className="h-6 w-6 text-primary flex-shrink-0" />
								<span className="font-medium">Transparent smart escrow system</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* How to Explore Section */}
			<section className="py-24 bg-background">
				<div className="container max-w-6xl mx-auto px-4">
					<div className="text-center max-w-3xl mx-auto mb-16">
						<div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
							<Filter className="h-4 w-4 mr-2" />
							<span className="text-sm font-medium">🔍 How to Explore Grants</span>
						</div>
						<h2 className="text-3xl md:text-4xl font-bold mb-6">Find the perfect grant opportunity</h2>
						<div className="h-1.5 w-24 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto mb-6" />
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
						{/* Filter Options */}
						<div className="bg-card rounded-2xl border border-primary/10 p-8 shadow-xl">
							<div className="flex items-center gap-4 mb-6">
								<div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
									<Filter className="h-6 w-6 text-primary" />
								</div>
								<h3 className="text-xl font-bold">✅ Filter by:</h3>
							</div>
							<ul className="space-y-3 text-muted-foreground">
								<li>• Industry/focus area</li>
								<li>• Grant size</li>
								<li>• Deadline</li>
								<li>• Grantor (organization, DAO, private)</li>
							</ul>
						</div>

						{/* Sort Options */}
						<div className="bg-card rounded-2xl border border-primary/10 p-8 shadow-xl">
							<div className="flex items-center gap-4 mb-6">
								<div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
									<TrendingUp className="h-6 w-6 text-primary" />
								</div>
								<h3 className="text-xl font-bold">🔁 Sort by:</h3>
							</div>
							<ul className="space-y-3 text-muted-foreground">
								<li>• Recently added</li>
								<li>• Ending soon</li>
								<li>• Most funded</li>
								<li>• Most active</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			{/* How Grant Programs Work Section */}
			<section className="py-24 bg-gradient-to-b from-background to-primary/5">
				<div className="container max-w-4xl mx-auto px-4">
					<div className="bg-card rounded-2xl border border-primary/10 p-8 shadow-xl mb-8">
						<div className="text-center mb-8">
							<div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
								<Zap className="h-4 w-4 mr-2" />
								<span className="text-sm font-medium">🧾 How Grant Programs Work</span>
							</div>
							<h2 className="text-3xl font-bold mb-6">Simple 5-step process</h2>
						</div>

						<div className="space-y-6">
							<div className="flex items-start gap-4 p-4 bg-primary/5 rounded-xl">
								<span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
								<p className="text-muted-foreground"><strong>Browse open grant calls</strong></p>
							</div>
							<div className="flex items-start gap-4 p-4 bg-primary/5 rounded-xl">
								<span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
								<p className="text-muted-foreground"><strong>Submit a proposal</strong> – describe your goals and delivery timeline</p>
							</div>
							<div className="flex items-start gap-4 p-4 bg-primary/5 rounded-xl">
								<span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
								<p className="text-muted-foreground"><strong>Negotiate milestones</strong> with the grantor</p>
							</div>
							<div className="flex items-start gap-4 p-4 bg-primary/5 rounded-xl">
								<span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
								<p className="text-muted-foreground"><strong>Get approved and funded</strong> via smart escrow</p>
							</div>
							<div className="flex items-start gap-4 p-4 bg-primary/5 rounded-xl">
								<span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold flex-shrink-0">5</span>
								<p className="text-muted-foreground"><strong>Deliver your work</strong> in phases and get paid per milestone</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Who Can Apply Section */}
			<section className="py-24 bg-background">
				<div className="container max-w-4xl mx-auto px-4">
					<div className="bg-card rounded-2xl border border-primary/10 p-8 shadow-xl">
						<div className="text-center mb-8">
							<div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
								<Users className="h-4 w-4 mr-2" />
								<span className="text-sm font-medium">🧠 Who Can Apply?</span>
							</div>
							<h2 className="text-3xl font-bold mb-6">Open to builders and innovators</h2>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
							<div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl">
								<Code className="h-6 w-6 text-primary flex-shrink-0" />
								<span className="font-medium">Developers</span>
							</div>
							<div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl">
								<BookOpen className="h-6 w-6 text-primary flex-shrink-0" />
								<span className="font-medium">Researchers</span>
							</div>
							<div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl">
								<Wrench className="h-6 w-6 text-primary flex-shrink-0" />
								<span className="font-medium">Product builders</span>
							</div>
							<div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl">
								<GraduationCap className="h-6 w-6 text-primary flex-shrink-0" />
								<span className="font-medium">Educators</span>
							</div>
							<div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl">
								<Users className="h-6 w-6 text-primary flex-shrink-0" />
								<span className="font-medium">Open-source teams</span>
							</div>
						</div>

						<div className="bg-primary/5 rounded-xl p-6 border border-primary/10 text-center">
							<p className="text-lg font-semibold">
								If you have a clear plan and are ready to build — Boundless provides a structured, trustless way to get funded.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 bg-gradient-to-b from-primary/5 to-background">
				<div className="container max-w-6xl mx-auto px-4">
					<div className="bg-gradient-to-r from-primary/5 via-card to-primary/5 rounded-2xl border border-primary/20 p-8 md:p-12 shadow-xl relative overflow-hidden">
						{/* Background elements */}
						<div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-70" />
						<div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-70" />

						<div className="relative text-center">
							<div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
								<LinkIcon className="h-4 w-4 mr-2" />
								<span className="text-sm font-medium">🔗 Start Exploring</span>
							</div>

							<h2 className="text-3xl md:text-4xl font-bold mb-8">
								Ready to find your next grant opportunity?
							</h2>
							
							<p className="text-lg text-muted-foreground mb-8">
								Browse open grants, create your own grant program, or learn how grants work.
							</p>

							<div className="flex flex-wrap gap-6 justify-center">
								<Link href="/grants/explore">
									<Button
										size="lg"
										className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 px-8 py-6 text-lg"
									>
										<ArrowRight className="mr-2 h-5 w-5" /> View Open Grants
									</Button>
								</Link>
								<Link href="/grants/create">
									<Button
										size="lg"
										variant="outline"
										className="border-primary/20 hover:border-primary/50 px-8 py-6 text-lg"
									>
										<Shield className="mr-2 h-5 w-5" /> Create a Grant Program
									</Button>
								</Link>
								<Link href="/how-it-works#grants">
									<Button
										size="lg"
										variant="outline"
										className="border-primary/20 hover:border-primary/50 px-8 py-6 text-lg"
									>
										<BookOpen className="mr-2 h-5 w-5" /> Learn How Grants Work
									</Button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
} 
 