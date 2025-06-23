"use client";

import { Button } from "@/components/ui/button";
import {
	CheckCircle,
	Globe,
	Rocket,
	Shield,
	Sparkles,
	Star,
	Users,
	Vote,
	Zap,
} from "lucide-react";
import Link from "next/link";
import React from "react";

export default function GrantsPage() {
	return (
		<div className="min-h-screen bg-background">
			{/* Hero Section */}
			<section className="relative pt-24 pb-24 overflow-hidden">
				{/* Animated background elements */}
				<div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/10 rounded-full blur-3xl animate-pulse" />
				<div
					className="absolute bottom-0 left-0 w-1/2 h-1/3 bg-primary/5 rounded-full blur-3xl animate-pulse"
					style={{ animationDelay: "1s" }}
				/>

				<div className="container max-w-6xl mx-auto px-4 relative z-10">
					<div className="flex flex-col items-center text-center">
						<div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
							<Shield className="h-4 w-4 mr-2" />
							<span className="text-sm font-medium">
								Grants on Boundless
							</span>
						</div>

						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
							Create, manage, and distribute on-chain grants with full transparency.
						</h1>

						<div className="h-1.5 w-32 bg-gradient-to-r from-primary to-primary/50 rounded-full mb-8" />

						<p className="text-xl text-muted-foreground max-w-3xl mb-10">
							Boundless empowers individuals, DAOs, and organizations to launch milestone-based grant programs — and gives builders a trusted way to apply, build, and receive funding.
						</p>

						<div className="flex flex-wrap gap-5 justify-center">
							<Button
								size="lg"
								className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all duration-300 hover:translate-y-[-2px]"
							>
								<Shield className="mr-2 h-5 w-5" /> Create a Grant Program
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="border-primary/20 hover:border-primary/50 transition-all duration-300 hover:translate-y-[-2px]"
							>
								<Zap className="mr-2 h-5 w-5" /> Apply for a Grant
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* For Grant Creators Section */}
			<section className="py-24 bg-gradient-to-b from-primary/5 to-background">
				<div className="container max-w-6xl mx-auto px-4">
					<div className="text-center max-w-3xl mx-auto mb-16">
						<div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
							<Shield className="h-4 w-4 mr-2" />
							<span className="text-sm font-medium"> For Grant Creators</span>
						</div>
						<h2 className="text-3xl md:text-4xl font-bold mb-6">Boundless lets you create a custom grant program, define your rules, and distribute funds securely.</h2>
						<div className="h-1.5 w-24 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto mb-6" />
					</div>

					<div className="bg-card rounded-2xl border border-primary/10 p-8 shadow-xl mb-12">
						<h3 className="text-xl font-bold mb-6 text-center"> Key Benefits:</h3>
						
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							<div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl">
								<CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
								<span className="font-medium">Create your own grant rules</span>
							</div>
							<div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl">
								<Shield className="h-6 w-6 text-primary flex-shrink-0" />
								<span className="font-medium">Funds are held in smart escrows</span>
							</div>
							<div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl">
								<Zap className="h-6 w-6 text-primary flex-shrink-0" />
								<span className="font-medium">Milestone-based releases</span>
							</div>
							<div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl">
								<Users className="h-6 w-6 text-primary flex-shrink-0" />
								<span className="font-medium"> Receive proposals directly from builders</span>
							</div>
							<div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl">
								<Vote className="h-6 w-6 text-primary flex-shrink-0" />
								<span className="font-medium">Optional DAO governance for approvals</span>
							</div>
							<div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl">
								<Globe className="h-6 w-6 text-primary flex-shrink-0" />
								<span className="font-medium">Real-time grant tracking</span>
							</div>
						</div>

						<div className="text-center mt-8">
							<p className="text-lg font-semibold mb-2">You stay in control — but the process remains transparent, secure, and fair.</p>
						</div>
					</div>

					{/* How to Create a Grant Program */}
					<div className="bg-card rounded-2xl border border-primary/10 p-8 shadow-xl">
						<h3 className="text-xl font-bold mb-6 text-center"> How to Create a Grant Program</h3>
						
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<div className="space-y-6">
								<div className="flex items-start gap-4">
									<div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">1</div>
									<div>
										<h4 className="font-semibold mb-2">Set Program Name, Description, and Purpose</h4>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">2</div>
									<div>
										<h4 className="font-semibold mb-2">Define Eligibility Requirements</h4>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">3</div>
									<div>
										<h4 className="font-semibold mb-2">Set Total Budget and Funding Per Applicant</h4>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">4</div>
									<div>
										<h4 className="font-semibold mb-2">Break Into Milestones</h4>
									</div>
								</div>
							</div>

							<div className="space-y-6">
								<div className="flex items-start gap-4">
									<div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">5</div>
									<div>
										<h4 className="font-semibold mb-2">Launch the Grant for Public Applications</h4>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">6</div>
									<div>
										<h4 className="font-semibold mb-2">Review & Approve Proposals</h4>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">7</div>
									<div>
										<h4 className="font-semibold mb-2">Lock Funds in Escrow Per Grantee</h4>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">8</div>
									<div>
										<h4 className="font-semibold mb-2">Approve Milestones → Release Funds</h4>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* For Grant Applicants Section */}
			<section className="py-24 bg-background">
				<div className="container max-w-6xl mx-auto px-4">
					<div className="text-center max-w-3xl mx-auto mb-16">
						<div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
							<Zap className="h-4 w-4 mr-2" />
							<span className="text-sm font-medium"> For Grant Applicants</span>
						</div>
						<h2 className="text-3xl md:text-4xl font-bold mb-6">If you&apos;re a builder, researcher, or open-source contributor — Boundless makes it easy to apply for funding.</h2>
						<div className="h-1.5 w-24 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto mb-6" />
					</div>

					<div className="bg-card rounded-2xl border border-primary/10 p-8 shadow-xl mb-12">
						<h3 className="text-xl font-bold mb-6 text-center"> Apply in Minutes:</h3>
						
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<div className="space-y-6">
								<div className="flex items-start gap-4">
									<div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">1</div>
									<div>
										<h4 className="font-semibold mb-2">Browse Open Grants</h4>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">2</div>
									<div>
										<h4 className="font-semibold mb-2">Submit a Proposal</h4>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">3</div>
									<div>
										<h4 className="font-semibold mb-2">Define Your Timeline and Deliverables</h4>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">4</div>
									<div>
										<h4 className="font-semibold mb-2">Collaborate on Milestones with Grantor</h4>
									</div>
								</div>
							</div>

							<div className="space-y-6">
								<div className="flex items-start gap-4">
									<div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">5</div>
									<div>
										<h4 className="font-semibold mb-2">Execute Work</h4>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">6</div>
									<div>
										<h4 className="font-semibold mb-2">Submit Milestone Proofs</h4>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">7</div>
									<div>
										<h4 className="font-semibold mb-2">Receive Escrowed Funds on Approval</h4>
									</div>
								</div>
							</div>
						</div>

						<div className="text-center mt-8">
							<p className="text-lg font-semibold mb-2">No need to wait months or chase emails.</p>
							<p className="text-muted-foreground">The process is trustless and on-chain.</p>
						</div>
					</div>
				</div>
			</section>

			{/* Who Should Create Grants Section */}
			<section className="py-24 bg-gradient-to-b from-background to-primary/5">
				<div className="container max-w-6xl mx-auto px-4">
					<div className="text-center max-w-3xl mx-auto mb-16">
						<div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
							<Users className="h-4 w-4 mr-2" />
							<span className="text-sm font-medium">Who Should Create Grants?</span>
						</div>
						<h2 className="text-3xl md:text-4xl font-bold mb-6">Perfect for organizations and communities</h2>
						<div className="h-1.5 w-24 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto mb-6" />
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
						<div className="bg-card rounded-xl border border-primary/10 p-6 text-center">
							<div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
								<Users className="h-8 w-8 text-primary" />
							</div>
							<h3 className="font-semibold mb-2">DAOs managing treasury funds</h3>
						</div>
						<div className="bg-card rounded-xl border border-primary/10 p-6 text-center">
							<div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
								<Globe className="h-8 w-8 text-primary" />
							</div>
							<h3 className="font-semibold mb-2">NGOs and social impact orgs</h3>
						</div>
						<div className="bg-card rounded-xl border border-primary/10 p-6 text-center">
							<div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
								<Star className="h-8 w-8 text-primary" />
							</div>
							<h3 className="font-semibold mb-2">Blockchain ecosystems</h3>
						</div>
						<div className="bg-card rounded-xl border border-primary/10 p-6 text-center">
							<div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
								<Zap className="h-8 w-8 text-primary" />
							</div>
							<h3 className="font-semibold mb-2">Open-source initiatives</h3>
						</div>
						<div className="bg-card rounded-xl border border-primary/10 p-6 text-center">
							<div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
								<Rocket className="h-8 w-8 text-primary" />
							</div>
							<h3 className="font-semibold mb-2">Hackathon sponsors</h3>
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
								<Sparkles className="h-4 w-4 mr-2" />
								<span className="text-sm font-medium">Ready to Get Started?</span>
							</div>

							<h2 className="text-3xl md:text-4xl font-bold mb-8">
								Join the future of transparent grant funding
							</h2>

							<div className="flex flex-wrap gap-6 justify-center">
								<Button
									size="lg"
									className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 px-8 py-6 text-lg"
								>
									<Shield className="mr-2 h-5 w-5" /> Create a Grant Program
								</Button>
								<Button
									size="lg"
									variant="outline"
									className="border-primary/20 hover:border-primary/50 px-8 py-6 text-lg"
								>
									<Zap className="mr-2 h-5 w-5" /> Apply for a Grant
								</Button>
								<Button
									size="lg"
									variant="outline"
									className="border-primary/20 hover:border-primary/50 px-8 py-6 text-lg"
								>
									<Globe className="mr-2 h-5 w-5" /> Explore Live Grants
								</Button>
								<Link href="/how-it-works">
									<Button
										size="lg"
										variant="outline"
										className="border-primary/20 hover:border-primary/50 px-8 py-6 text-lg"
									>
										<Sparkles className="mr-2 h-5 w-5" /> See Full Flow
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
