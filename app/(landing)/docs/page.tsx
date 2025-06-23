"use client";

import { Button } from "@/components/ui/button";
import {
	BookOpen,
	Mail,
	Rocket,
	Shield,
	Users,
	Zap,
	Globe,
	Code,
	Lock,
	Lightbulb,
	FileText,
	ArrowRight,
} from "lucide-react";
import Link from "next/link";
import React from "react";

export default function DocsPage() {
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
							<BookOpen className="h-4 w-4 mr-2" />
							<span className="text-sm font-medium">
								📚 Platform Documentation
							</span>
						</div>

						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
							Boundless Docs
						</h1>

						<div className="h-1.5 w-32 bg-gradient-to-r from-primary to-primary/50 rounded-full mb-8" />

						<p className="text-xl text-muted-foreground max-w-3xl mb-10">
							Welcome to the Boundless Docs — your complete guide to how the platform works, what&apos;s possible, and how to get started.
						</p>
					</div>
				</div>
			</section>

			{/* Core Concepts Section */}
			<section className="py-24 bg-gradient-to-b from-primary/5 to-background">
				<div className="container max-w-4xl mx-auto px-4">
					<div className="bg-card rounded-2xl border border-primary/10 p-8 shadow-xl">
						<div className="text-center mb-8">
							<div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
								<Lightbulb className="h-4 w-4 mr-2" />
								<span className="text-sm font-medium">🔧 Core Concepts</span>
							</div>
							<h2 className="text-3xl font-bold mb-6">How Boundless Works</h2>
						</div>

						<p className="text-lg text-muted-foreground text-center">
							Boundless is powered by Stellar and Soroban smart contracts to enable milestone-based decentralized crowdfunding and grants. Every action — from campaign creation to milestone reviews — is recorded and executed transparently.
						</p>
					</div>
				</div>
			</section>

			{/* Sections Overview */}
			<section className="py-24 bg-background">
				<div className="container max-w-6xl mx-auto px-4">
					<div className="text-center max-w-3xl mx-auto mb-16">
						<div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
							<FileText className="h-4 w-4 mr-2" />
							<span className="text-sm font-medium">📌 Sections</span>
						</div>
						<h2 className="text-3xl md:text-4xl font-bold mb-6">Complete Platform Guide</h2>
						<div className="h-1.5 w-24 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto mb-6" />
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{/* 1. Getting Started */}
						<div className="bg-card rounded-xl border border-primary/10 p-6 hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
							<div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
								<Rocket className="h-8 w-8 text-primary" />
							</div>
							<h3 className="font-semibold mb-3 text-center">1. Getting Started</h3>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>• <Link href="/how-it-works" className="text-primary hover:text-primary/80">How Boundless Works</Link></li>
								<li>• Platform roles: Crowdfund Creator, Grant Creator, Grant Applicant</li>
								<li>• Creating your account and wallet</li>
								<li>• KYC process for receiving funds</li>
							</ul>
						</div>

						{/* 2. Crowdfunding */}
						<div className="bg-card rounded-xl border border-primary/10 p-6 hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
							<div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
								<Zap className="h-8 w-8 text-primary" />
							</div>
							<h3 className="font-semibold mb-3 text-center">2. Crowdfunding</h3>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>• Validating your idea</li>
								<li>• Setting milestones and goals</li>
								<li>• Launching a campaign</li>
								<li>• Fund escrow and backer protection</li>
								<li>• Milestone submission and fund release</li>
								<li>• Refund scenarios</li>
							</ul>
						</div>

						{/* 3. Grant Programs */}
						<div className="bg-card rounded-xl border border-primary/10 p-6 hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
							<div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
								<Shield className="h-8 w-8 text-primary" />
							</div>
							<h3 className="font-semibold mb-3 text-center">3. Grant Programs</h3>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>• Creating a grant initiative</li>
								<li>• Defining eligibility and milestones</li>
								<li>• Reviewing applications</li>
								<li>• Setting up smart escrow rules</li>
								<li>• Monitoring progress and releasing funds</li>
							</ul>
						</div>

						{/* 4. Grant Applicants */}
						<div className="bg-card rounded-xl border border-primary/10 p-6 hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
							<div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
								<Users className="h-8 w-8 text-primary" />
							</div>
							<h3 className="font-semibold mb-3 text-center">4. Grant Applicants</h3>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>• Browsing available grants</li>
								<li>• Crafting and submitting a proposal</li>
								<li>• Collaborating with the grantor</li>
								<li>• Delivering work in milestone phases</li>
							</ul>
						</div>

						{/* 5. Community Participation */}
						<div className="bg-card rounded-xl border border-primary/10 p-6 hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
							<div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
								<Globe className="h-8 w-8 text-primary" />
							</div>
							<h3 className="font-semibold mb-3 text-center">5. Community Participation</h3>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>• How to vote on project ideas</li>
								<li>• Leaving feedback</li>
								<li>• Participating in DAO reviews (if applicable)</li>
								<li>• Viewing project progress and updates</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			{/* Technical Sections */}
			<section className="py-24 bg-gradient-to-b from-background to-primary/5">
				<div className="container max-w-6xl mx-auto px-4">
					<div className="text-center max-w-3xl mx-auto mb-16">
						<div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
							<Code className="h-4 w-4 mr-2" />
							<span className="text-sm font-medium">Technical Details</span>
						</div>
						<h2 className="text-3xl md:text-4xl font-bold mb-6">Advanced Platform Information</h2>
						<div className="h-1.5 w-24 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto mb-6" />
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{/* Smart Contracts & Technical Architecture */}
						<div className="bg-card rounded-2xl border border-primary/10 p-8 shadow-xl">
							<div className="flex items-center gap-4 mb-6">
								<div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
									<Code className="h-6 w-6 text-primary" />
								</div>
								<h3 className="text-xl font-bold">💡 Smart Contracts & Technical Architecture</h3>
							</div>
							<ul className="space-y-3 text-muted-foreground">
								<li>• Overview of Soroban Escrow Contracts</li>
								<li>• Data structures (Projects, Milestones, Funds)</li>
								<li>• Refund logic & milestone rejection handling</li>
								<li>• Admin vs DAO vs hybrid validation</li>
								<li>• API endpoints (if public)</li>
								<li>• Transaction fees and limits</li>
							</ul>
						</div>

						{/* Security & Safeguards */}
						<div className="bg-card rounded-2xl border border-primary/10 p-8 shadow-xl">
							<div className="flex items-center gap-4 mb-6">
								<div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
									<Lock className="h-6 w-6 text-primary" />
								</div>
								<h3 className="text-xl font-bold">🔐 Security & Safeguards</h3>
							</div>
							<ul className="space-y-3 text-muted-foreground">
								<li>• Smart escrow audits (when applicable)</li>
								<li>• KYC for fund receivers</li>
								<li>• Multi-layer milestone approval</li>
								<li>• Transparency principles and IPFS integration</li>
								<li>• Risk mitigation strategies for backers</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			{/* Dev & Open Source Section */}
			<section className="py-24 bg-background">
				<div className="container max-w-4xl mx-auto px-4">
					<div className="bg-card rounded-2xl border border-primary/10 p-8 shadow-xl">
						<div className="text-center mb-8">
							<div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
								<Code className="h-4 w-4 mr-2" />
								<span className="text-sm font-medium">🧪 Dev & Open Source Info</span>
							</div>
							<h2 className="text-3xl font-bold mb-6">For Developers</h2>
						</div>

						<div className="space-y-6">
							<div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl">
								<Code className="h-6 w-6 text-primary flex-shrink-0" />
								<div>
									<p className="font-semibold">Repository</p>
									<a href="#" className="text-primary hover:text-primary/80">github.com/boundless-xyz</a>
								</div>
							</div>

							<div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl">
								<FileText className="h-6 w-6 text-primary flex-shrink-0" />
								<div>
									<p className="font-semibold">Smart contract codebase</p>
									<p className="text-muted-foreground">Soroban</p>
								</div>
							</div>

							<div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl">
								<Users className="h-6 w-6 text-primary flex-shrink-0" />
								<div>
									<p className="font-semibold">Contributions welcome</p>
									<p className="text-muted-foreground">Open grant plans available</p>
								</div>
							</div>
						</div>

						<div className="mt-8 text-center">
							<div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
								<p className="text-lg font-semibold mb-4">
									For advanced integration, bugs, or docs feedback, contact: <a href="mailto:dev@boundless.xyz" className="text-primary hover:text-primary/80">dev@boundless.xyz</a>
								</p>
								<p className="text-muted-foreground">
									Need help using the platform? Visit <Link href="/help" className="text-primary hover:text-primary/80">Help Center</Link>
								</p>
							</div>
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
								<BookOpen className="h-4 w-4 mr-2" />
								<span className="text-sm font-medium">Ready to get started?</span>
							</div>

							<h2 className="text-3xl md:text-4xl font-bold mb-8">
								Explore the platform
							</h2>
							
							<p className="text-lg text-muted-foreground mb-8">
								Now that you understand how Boundless works, it&apos;s time to dive in.
							</p>

							<div className="flex flex-wrap gap-6 justify-center">
								<Link href="/how-it-works">
									<Button
										size="lg"
										className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 px-8 py-6 text-lg"
									>
										<ArrowRight className="mr-2 h-5 w-5" /> How It Works
									</Button>
								</Link>
								<Link href="/crowdfunding">
									<Button
										size="lg"
										variant="outline"
										className="border-primary/20 hover:border-primary/50 px-8 py-6 text-lg"
									>
										<Rocket className="mr-2 h-5 w-5" /> Start Crowdfunding
									</Button>
								</Link>
								<Link href="/grants">
									<Button
										size="lg"
										variant="outline"
										className="border-primary/20 hover:border-primary/50 px-8 py-6 text-lg"
									>
										<Shield className="mr-2 h-5 w-5" /> Explore Grants
									</Button>
								</Link>
								<Link href="/contact">
									<Button
										size="lg"
										variant="outline"
										className="border-primary/20 hover:border-primary/50 px-8 py-6 text-lg"
									>
										<Mail className="mr-2 h-5 w-5" /> Get Help
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
