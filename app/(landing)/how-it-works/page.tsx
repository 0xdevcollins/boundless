"use client";

import { Button } from "@/components/ui/button";
import {
	CheckCircle,
	Globe,
	Lightbulb,
	Rocket,
	Shield,
	Sparkles,
	Star,
	Users,
	Vote,
	Zap,
} from "lucide-react";
import React from "react";

export default function HowItWorksPage() {
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
							<Sparkles className="h-4 w-4 mr-2" />
							<span className="text-sm font-medium">
								Powered by Stellar & Soroban
							</span>
						</div>

						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
							How Boundless Works
						</h1>

						<div className="h-1.5 w-32 bg-gradient-to-r from-primary to-primary/50 rounded-full mb-8" />

						<p className="text-xl text-muted-foreground max-w-3xl mb-10">
							Boundless is a decentralized crowdfunding and grant funding platform powered by Stellar and Soroban. Whether you&apos;re launching a product, supporting open-source, funding a nonprofit, or creating a grant program — Boundless gives you the tools to do it transparently, with milestone-based funding and community validation.
						</p>

						<div className="flex flex-wrap gap-5 justify-center">
							<Button
								size="lg"
								className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all duration-300 hover:translate-y-[-2px]"
							>
								<Rocket className="mr-2 h-5 w-5" /> Submit a Crowdfund Idea
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="border-primary/20 hover:border-primary/50 transition-all duration-300 hover:translate-y-[-2px]"
							>
								<Globe className="mr-2 h-5 w-5" /> Browse Projects
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* Choose Your Role Section */}
			<section className="py-24 bg-gradient-to-b from-primary/5 to-background">
				<div className="container max-w-6xl mx-auto px-4">
					<div className="text-center max-w-3xl mx-auto mb-16">
						<div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
							<Users className="h-4 w-4 mr-2" />
							<span className="text-sm font-medium">Choose Your Role</span>
						</div>
						<h2 className="text-3xl md:text-4xl font-bold mb-6">Anyone can use Boundless in one of three ways:</h2>
						<div className="h-1.5 w-24 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto mb-6" />
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{/* Crowdfund Creator */}
						<div className="bg-card rounded-2xl border border-primary/10 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:translate-y-[-5px]">
							<div className="text-center mb-6">
								<div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
									<Lightbulb className="h-8 w-8 text-primary" />
								</div>
								<h3 className="text-xl font-bold mb-2">Crowdfund Creator</h3>
							</div>
							<p className="text-muted-foreground text-center">
								Raise funds from the public by validating your idea and launching a smart-contract-powered campaign.
							</p>
						</div>

						{/* Grant Creator */}
						<div className="bg-card rounded-2xl border border-primary/10 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:translate-y-[-5px]">
							<div className="text-center mb-6">
								<div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
									<Shield className="h-8 w-8 text-primary" />
								</div>
								<h3 className="text-xl font-bold mb-2">Grant Creator</h3>
							</div>
							<p className="text-muted-foreground text-center">
								Launch your own grant program and distribute funding to builders through transparent, verifiable milestones.
							</p>
						</div>

						{/* Grant Applicant */}
						<div className="bg-card rounded-2xl border border-primary/10 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:translate-y-[-5px]">
							<div className="text-center mb-6">
								<div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
									<Zap className="h-8 w-8 text-primary" />
								</div>
								<h3 className="text-xl font-bold mb-2">Grant Applicant</h3>
							</div>
							<p className="text-muted-foreground text-center">
								Apply for open grant opportunities, deliver work in phases, and receive milestone-based payouts.
							</p>
						</div>
					</div>

					<div className="text-center mt-12">
						<p className="text-muted-foreground">
							Supporters and voters can also engage with no extra setup — just sign up and back projects you love.
						</p>
					</div>
				</div>
			</section>

			{/* Crowdfunding Projects Section */}
			<section className="py-24 bg-background">
				<div className="container max-w-6xl mx-auto px-4">
					<div className="text-center max-w-3xl mx-auto mb-16">
						<div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
							<Lightbulb className="h-4 w-4 mr-2" />
							<span className="text-sm font-medium">Crowdfunding Projects</span>
						</div>
						<h2 className="text-3xl md:text-4xl font-bold mb-6">Boundless makes it easy for creators to validate and raise funds for their ideas.</h2>
						<div className="h-1.5 w-24 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto mb-6" />
					</div>

					<div className="bg-card rounded-2xl border border-primary/10 p-8 shadow-xl">
						<h3 className="text-xl font-bold mb-6 text-center">Step-by-Step:</h3>
						
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<div className="space-y-6">
								<div className="flex items-start gap-4">
									<div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">1</div>
									<div>
										<h4 className="font-semibold mb-2">Submit Your Idea</h4>
										<p className="text-muted-foreground">Describe your vision, problem, and expected outcome.</p>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">2</div>
									<div>
										<h4 className="font-semibold mb-2">Receive Public Feedback</h4>
										<p className="text-muted-foreground">The community votes and comments on your idea.</p>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">3</div>
									<div>
										<h4 className="font-semibold mb-2">Validation Threshold</h4>
										<p className="text-muted-foreground">If your idea gets enough support (e.g. votes, upvotes), you&apos;re cleared to launch a campaign.</p>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">4</div>
									<div>
										<h4 className="font-semibold mb-2">Create a Campaign</h4>
										<p className="text-muted-foreground">Define your funding goal, set timelines, and break down the project into clear milestones.</p>
									</div>
								</div>
							</div>

							<div className="space-y-6">
								<div className="flex items-start gap-4">
									<div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">5</div>
									<div>
										<h4 className="font-semibold mb-2">Campaign Goes Live</h4>
										<p className="text-muted-foreground">Supporters contribute funds, which are held securely in a smart escrow on Stellar.</p>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">6</div>
									<div>
										<h4 className="font-semibold mb-2">Build and Deliver</h4>
										<p className="text-muted-foreground">Submit proof as you complete each milestone.</p>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">7</div>
									<div>
										<h4 className="font-semibold mb-2">Review and Payout</h4>
										<p className="text-muted-foreground">Admins or community reviewers verify your progress and approve fund releases.</p>
									</div>
								</div>
							</div>
						</div>

						<div className="mt-8 p-6 bg-primary/5 rounded-xl border border-primary/10">
							<h4 className="font-semibold mb-2">If Campaign Fails to Meet Goal:</h4>
							<p className="text-muted-foreground">If your funding goal isn&apos;t met before the deadline, all backers are automatically refunded.</p>
						</div>
					</div>
				</div>
			</section>

			{/* Grant Creation Section */}
			<section className="py-24 bg-gradient-to-b from-background to-primary/5">
				<div className="container max-w-6xl mx-auto px-4">
					<div className="text-center max-w-3xl mx-auto mb-16">
						<div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
							<Shield className="h-4 w-4 mr-2" />
							<span className="text-sm font-medium">Grant Creation</span>
						</div>
						<h2 className="text-3xl md:text-4xl font-bold mb-6">Organizations or funders can launch grant programs for public use, ecosystem development, or private funding.</h2>
						<div className="h-1.5 w-24 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto mb-6" />
					</div>

					<div className="bg-card rounded-2xl border border-primary/10 p-8 shadow-xl">
						<h3 className="text-xl font-bold mb-6 text-center">Step-by-Step:</h3>
						
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<div className="space-y-6">
								<div className="flex items-start gap-4">
									<div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">1</div>
									<div>
										<h4 className="font-semibold mb-2">Set Up a Grant Program</h4>
										<p className="text-muted-foreground">Define eligibility, requirements, and timeline.</p>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">2</div>
									<div>
										<h4 className="font-semibold mb-2">Design Milestones and Rules</h4>
										<p className="text-muted-foreground">Create clear payout rules and expectations.</p>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">3</div>
									<div>
										<h4 className="font-semibold mb-2">Open for Applications</h4>
										<p className="text-muted-foreground">Accept proposals from builders or teams.</p>
									</div>
								</div>
							</div>

							<div className="space-y-6">
								<div className="flex items-start gap-4">
									<div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">4</div>
									<div>
										<h4 className="font-semibold mb-2">Review & Approve Applicants</h4>
										<p className="text-muted-foreground">Shortlist qualified proposals and lock funds in escrow.</p>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">5</div>
									<div>
										<h4 className="font-semibold mb-2">Track Progress</h4>
										<p className="text-muted-foreground">Applicants submit work and milestone evidence.</p>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">6</div>
									<div>
										<h4 className="font-semibold mb-2">Approve Milestones → Release Funds</h4>
										<p className="text-muted-foreground">Verify completion before releasing each tranche.</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Grant Applicants Section */}
			<section className="py-24 bg-background">
				<div className="container max-w-6xl mx-auto px-4">
					<div className="text-center max-w-3xl mx-auto mb-16">
						<div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
							<Zap className="h-4 w-4 mr-2" />
							<span className="text-sm font-medium">Grant Applicants</span>
						</div>
						<h2 className="text-3xl md:text-4xl font-bold mb-6">Apply for open grants, complete work, and get paid transparently.</h2>
						<div className="h-1.5 w-24 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto mb-6" />
					</div>

					<div className="bg-card rounded-2xl border border-primary/10 p-8 shadow-xl">
						<h3 className="text-xl font-bold mb-6 text-center">Step-by-Step:</h3>
						
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<div className="space-y-6">
								<div className="flex items-start gap-4">
									<div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">1</div>
									<div>
										<h4 className="font-semibold mb-2">Browse Open Grants</h4>
										<p className="text-muted-foreground">Find opportunities that match your skills and interests.</p>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">2</div>
									<div>
										<h4 className="font-semibold mb-2">Submit a Proposal</h4>
										<p className="text-muted-foreground">Include deliverables, timeline, and impact.</p>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">3</div>
									<div>
										<h4 className="font-semibold mb-2">Align on Milestones</h4>
										<p className="text-muted-foreground">Creators may adjust or negotiate terms.</p>
									</div>
								</div>
							</div>

							<div className="space-y-6">
								<div className="flex items-start gap-4">
									<div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">4</div>
									<div>
										<h4 className="font-semibold mb-2">Get Approved and Start Work</h4>
										<p className="text-muted-foreground">Begin your project with clear expectations.</p>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">5</div>
									<div>
										<h4 className="font-semibold mb-2">Submit Proof per Milestone</h4>
										<p className="text-muted-foreground">Provide evidence of completed work.</p>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">6</div>
									<div>
										<h4 className="font-semibold mb-2">Receive Escrowed Funds on Approval</h4>
										<p className="text-muted-foreground">Get paid automatically when milestones are verified.</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Supporters Section */}
			<section className="py-24 bg-gradient-to-b from-primary/5 to-background">
				<div className="container max-w-6xl mx-auto px-4">
					<div className="text-center max-w-3xl mx-auto mb-16">
						<div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
							<Users className="h-4 w-4 mr-2" />
							<span className="text-sm font-medium">For Supporters, Voters & Backers</span>
						</div>
						<h2 className="text-3xl md:text-4xl font-bold mb-6">You don&apos;t need to be a creator to participate.</h2>
						<div className="h-1.5 w-24 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto mb-6" />
					</div>

					<div className="bg-card rounded-2xl border border-primary/10 p-8 shadow-xl">
						<h3 className="text-xl font-bold mb-6 text-center">What You Can Do:</h3>
						
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							<div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl">
								<Vote className="h-6 w-6 text-primary flex-shrink-0" />
								<span className="font-medium">Vote on early ideas</span>
							</div>
							<div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl">
								<Users className="h-6 w-6 text-primary flex-shrink-0" />
								<span className="font-medium">Comment on proposals</span>
							</div>
							<div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl">
								<Shield className="h-6 w-6 text-primary flex-shrink-0" />
								<span className="font-medium">Back campaigns you believe in</span>
							</div>
							<div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl">
								<CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
								<span className="font-medium">Track project progress</span>
							</div>
							<div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl">
								<Star className="h-6 w-6 text-primary flex-shrink-0" />
								<span className="font-medium">Participate in milestone reviews</span>
							</div>
						</div>

						<div className="mt-8 p-6 bg-primary/5 rounded-xl border border-primary/10">
							<p className="text-muted-foreground text-center">
								You only need a basic account to vote, comment, and fund projects. No KYC required unless you&apos;re receiving funds.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Milestone-Based Funding Section */}
			<section className="py-24 bg-background">
				<div className="container max-w-6xl mx-auto px-4">
					<div className="text-center max-w-3xl mx-auto mb-16">
						<div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
							<Shield className="h-4 w-4 mr-2" />
							<span className="text-sm font-medium">Milestone-Based Funding</span>
						</div>
						<h2 className="text-3xl md:text-4xl font-bold mb-6">Boundless uses smart escrow contracts built on Soroban (Stellar&apos;s smart contract platform) to ensure funds are released only when real progress is made.</h2>
						<div className="h-1.5 w-24 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto mb-6" />
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						<div className="bg-card rounded-xl border border-primary/10 p-6 text-center">
							<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
								<Shield className="h-6 w-6 text-primary" />
							</div>
							<h3 className="font-semibold mb-2">Funds locked until milestone is submitted</h3>
						</div>
						<div className="bg-card rounded-xl border border-primary/10 p-6 text-center">
							<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
								<CheckCircle className="h-6 w-6 text-primary" />
							</div>
							<h3 className="font-semibold mb-2">Admin or DAO reviews proof</h3>
						</div>
						<div className="bg-card rounded-xl border border-primary/10 p-6 text-center">
							<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
								<Zap className="h-6 w-6 text-primary" />
							</div>
							<h3 className="font-semibold mb-2">Release happens only on approval</h3>
						</div>
						<div className="bg-card rounded-xl border border-primary/10 p-6 text-center">
							<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
								<Users className="h-6 w-6 text-primary" />
							</div>
							<h3 className="font-semibold mb-2">Backers are protected at every stage</h3>
						</div>
					</div>
				</div>
			</section>

			{/* Built for Transparency Section */}
			<section className="py-24 bg-gradient-to-b from-primary/5 to-background">
				<div className="container max-w-6xl mx-auto px-4">
					<div className="text-center max-w-3xl mx-auto mb-16">
						<div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
							<Globe className="h-4 w-4 mr-2" />
							<span className="text-sm font-medium">Built for Transparency</span>
						</div>
						<h2 className="text-3xl md:text-4xl font-bold mb-6">Open, transparent, and efficient funding</h2>
						<div className="h-1.5 w-24 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto mb-6" />
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="bg-card rounded-xl border border-primary/10 p-6">
							<h3 className="font-semibold mb-2">Open access, low fees</h3>
							<p className="text-muted-foreground">Thanks to Stellar&apos;s efficient network</p>
						</div>
						<div className="bg-card rounded-xl border border-primary/10 p-6">
							<h3 className="font-semibold mb-2">Clear roles, rules, and responsibilities</h3>
							<p className="text-muted-foreground">Everyone knows what to expect</p>
						</div>
						<div className="bg-card rounded-xl border border-primary/10 p-6">
							<h3 className="font-semibold mb-2">Progress is public and verifiable</h3>
							<p className="text-muted-foreground">Transparency at every step</p>
						</div>
						<div className="bg-card rounded-xl border border-primary/10 p-6">
							<h3 className="font-semibold mb-2">Crowdfunding + Grants in one platform</h3>
							<p className="text-muted-foreground">Complete funding ecosystem</p>
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
								<span className="text-sm font-medium">Ready to Use Boundless?</span>
							</div>

							<h2 className="text-3xl md:text-4xl font-bold mb-6">
								Choose your role and start building or backing something meaningful.
							</h2>

							<div className="flex flex-wrap gap-6 justify-center">
								<Button
									size="lg"
									className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 px-8 py-6 text-lg"
								>
									<Lightbulb className="mr-2 h-5 w-5" /> Submit a Crowdfund Idea
								</Button>
								<Button
									size="lg"
									variant="outline"
									className="border-primary/20 hover:border-primary/50 px-8 py-6 text-lg"
								>
									<Shield className="mr-2 h-5 w-5" /> Create a Grant Program
								</Button>
								<Button
									size="lg"
									variant="outline"
									className="border-primary/20 hover:border-primary/50 px-8 py-6 text-lg"
								>
									<Globe className="mr-2 h-5 w-5" /> Browse Projects
								</Button>
								<Button
									size="lg"
									variant="outline"
									className="border-primary/20 hover:border-primary/50 px-8 py-6 text-lg"
								>
									<Zap className="mr-2 h-5 w-5" /> Apply for Grants
								</Button>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
