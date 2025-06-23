"use client";

import { Button } from "@/components/ui/button";
import {
	Search,
	Filter,
	TrendingUp,
	Clock,
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
} from "lucide-react";
import Link from "next/link";
import React from "react";

export default function ProjectsPage() {
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
								🚀 Explore Projects
							</span>
						</div>

						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
							Discover bold ideas
						</h1>

						<div className="h-1.5 w-32 bg-gradient-to-r from-primary to-primary/50 rounded-full mb-8" />

						<p className="text-xl text-muted-foreground max-w-3xl mb-10">
							<strong>Discover bold ideas — and help bring them to life.</strong><br />
							Boundless is where creators launch milestone-based crowdfunding campaigns backed by the Stellar blockchain. Every project here is powered by community trust and secured with smart contract escrow.
						</p>
					</div>
				</div>
			</section>

			{/* Find Projects Section */}
			<section className="py-24 bg-gradient-to-b from-primary/5 to-background">
				<div className="container max-w-6xl mx-auto px-4">
					<div className="text-center max-w-3xl mx-auto mb-16">
						<div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
							<Search className="h-4 w-4 mr-2" />
							<span className="text-sm font-medium">🧭 Find Projects That Matter</span>
						</div>
						<h2 className="text-3xl md:text-4xl font-bold mb-6">Browse campaigns across categories</h2>
						<div className="h-1.5 w-24 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto mb-6" />
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
						{/* Early-stage startups */}
						<div className="bg-card rounded-xl border border-primary/10 p-6 hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
							<div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
								<Lightbulb className="h-8 w-8 text-primary" />
							</div>
							<h3 className="font-semibold mb-3 text-center">💡 Early-stage startups</h3>
							<p className="text-sm text-muted-foreground text-center">
								Innovative new ventures looking for community support
							</p>
						</div>

						{/* Open-source tools */}
						<div className="bg-card rounded-xl border border-primary/10 p-6 hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
							<div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
								<Wrench className="h-8 w-8 text-primary" />
							</div>
							<h3 className="font-semibold mb-3 text-center">🛠️ Open-source tools</h3>
							<p className="text-sm text-muted-foreground text-center">
								Developer tools and infrastructure projects
							</p>
						</div>

						{/* Social impact ventures */}
						<div className="bg-card rounded-xl border border-primary/10 p-6 hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
							<div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
								<Globe className="h-8 w-8 text-primary" />
							</div>
							<h3 className="font-semibold mb-3 text-center">🌍 Social impact ventures</h3>
							<p className="text-sm text-muted-foreground text-center">
								Projects making positive change in the world
							</p>
						</div>

						{/* Creative projects */}
						<div className="bg-card rounded-xl border border-primary/10 p-6 hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
							<div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
								<Palette className="h-8 w-8 text-primary" />
							</div>
							<h3 className="font-semibold mb-3 text-center">🎨 Creative projects & content</h3>
							<p className="text-sm text-muted-foreground text-center">
								Art, media, and creative content initiatives
							</p>
						</div>

						{/* Education */}
						<div className="bg-card rounded-xl border border-primary/10 p-6 hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
							<div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
								<GraduationCap className="h-8 w-8 text-primary" />
							</div>
							<h3 className="font-semibold mb-3 text-center">🧑‍🏫 Education & knowledge-sharing</h3>
							<p className="text-sm text-muted-foreground text-center">
								Learning resources and educational content
							</p>
						</div>
					</div>

					{/* Campaign Features */}
					<div className="bg-card rounded-2xl border border-primary/10 p-8 shadow-xl">
						<h3 className="text-2xl font-bold text-center mb-8">Each campaign features:</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							<div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl">
								<Eye className="h-6 w-6 text-primary flex-shrink-0" />
								<span className="font-medium">Transparent milestones</span>
							</div>
							<div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl">
								<Shield className="h-6 w-6 text-primary flex-shrink-0" />
								<span className="font-medium">Escrow-backed funding</span>
							</div>
							<div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl">
								<Users className="h-6 w-6 text-primary flex-shrink-0" />
								<span className="font-medium">Public feedback & voting</span>
							</div>
							<div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl">
								<TrendingUp className="h-6 w-6 text-primary flex-shrink-0" />
								<span className="font-medium">Progress tracking and updates</span>
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
							<span className="text-sm font-medium">🔍 How to Explore</span>
						</div>
						<h2 className="text-3xl md:text-4xl font-bold mb-6">Find exactly what you&apos;re looking for</h2>
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
								<li>• Project category</li>
								<li>• Funding status (active, upcoming, completed)</li>
								<li>• Funding goal progress</li>
								<li>• Location or creator profile</li>
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
								<li>• Most recent</li>
								<li>• Trending</li>
								<li>• Ending soon</li>
								<li>• Most funded</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			{/* How to Back Section */}
			<section className="py-24 bg-gradient-to-b from-background to-primary/5">
				<div className="container max-w-4xl mx-auto px-4">
					<div className="bg-card rounded-2xl border border-primary/10 p-8 shadow-xl mb-8">
						<div className="text-center mb-8">
							<div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
								<Zap className="h-4 w-4 mr-2" />
								<span className="text-sm font-medium">💸 Want to Back a Project?</span>
							</div>
							<h2 className="text-3xl font-bold mb-6">Simple 5-step process</h2>
						</div>

						<div className="space-y-6">
							<div className="flex items-start gap-4 p-4 bg-primary/5 rounded-xl">
								<span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
								<p className="text-muted-foreground">Connect your Stellar wallet</p>
							</div>
							<div className="flex items-start gap-4 p-4 bg-primary/5 rounded-xl">
								<span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
								<p className="text-muted-foreground">Read the project story, roadmap, and milestones</p>
							</div>
							<div className="flex items-start gap-4 p-4 bg-primary/5 rounded-xl">
								<span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
								<p className="text-muted-foreground">Choose an amount to fund</p>
							</div>
							<div className="flex items-start gap-4 p-4 bg-primary/5 rounded-xl">
								<span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
								<p className="text-muted-foreground">Funds are locked in smart escrow — not released until milestones are achieved</p>
							</div>
							<div className="flex items-start gap-4 p-4 bg-primary/5 rounded-xl">
								<span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold flex-shrink-0">5</span>
								<p className="text-muted-foreground">Get project updates, vote on progress, and track your support</p>
							</div>
						</div>

						<div className="mt-8 bg-primary/5 rounded-xl p-6 border border-primary/10">
							<p className="text-lg font-semibold text-primary">
								Backers are protected by milestone-based release logic — if the project fails or misses key deliverables, unspent funds are returned.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 bg-background">
				<div className="container max-w-6xl mx-auto px-4">
					<div className="bg-gradient-to-r from-primary/5 via-card to-primary/5 rounded-2xl border border-primary/20 p-8 md:p-12 shadow-xl relative overflow-hidden">
						{/* Background elements */}
						<div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-70" />
						<div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-70" />

						<div className="relative text-center">
							<div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
								<Eye className="h-4 w-4 mr-2" />
								<span className="text-sm font-medium">👀 Start Exploring</span>
							</div>

							<h2 className="text-3xl md:text-4xl font-bold mb-8">
								Ready to discover amazing projects?
							</h2>
							
							<p className="text-lg text-muted-foreground mb-8">
								Browse active campaigns, see upcoming launches, or submit your own idea.
							</p>

							<div className="flex flex-wrap gap-6 justify-center">
								<Link href="/projects?status=active">
									<Button
										size="lg"
										className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 px-8 py-6 text-lg"
									>
										<ArrowRight className="mr-2 h-5 w-5" /> Browse Active Projects
									</Button>
								</Link>
								<Link href="/projects?status=upcoming">
									<Button
										size="lg"
										variant="outline"
										className="border-primary/20 hover:border-primary/50 px-8 py-6 text-lg"
									>
										<Clock className="mr-2 h-5 w-5" /> See Upcoming Launches
									</Button>
								</Link>
								<Link href="/crowdfunding">
									<Button
										size="lg"
										variant="outline"
										className="border-primary/20 hover:border-primary/50 px-8 py-6 text-lg"
									>
										<Lightbulb className="mr-2 h-5 w-5" /> Submit Your Idea
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