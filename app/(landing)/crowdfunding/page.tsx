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
import Link from "next/link";
import React from "react";

export default function CrowdfundingPage() {
	return (
		<div className="min-h-screen bg-background">
			<section className="relative pt-24 pb-24 overflow-hidden">
				<div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/10 rounded-full blur-3xl animate-pulse" />
				<div
					className="absolute bottom-0 left-0 w-1/2 h-1/3 bg-primary/5 rounded-full blur-3xl animate-pulse"
					style={{ animationDelay: "1s" }}
				/>

				<div className="container max-w-6xl mx-auto px-4 relative z-10">
					<div className="flex flex-col items-center text-center">
						<div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
							<Lightbulb className="h-4 w-4 mr-2" />
							<span className="text-sm font-medium">
								 Crowdfunding on Boundless
							</span>
						</div>

						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
							Launch your ideas with trust and transparency.
						</h1>

						<div className="h-1.5 w-32 bg-gradient-to-r from-primary to-primary/50 rounded-full mb-8" />

						<p className="text-xl text-muted-foreground max-w-3xl mb-10">
							Boundless gives creators a new way to raise funds — milestone-based, publicly validated, and secured by smart contracts on the Stellar blockchain.
						</p>

						<div className="flex flex-wrap gap-5 justify-center">
							<Button
								size="lg"
								className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all duration-300 hover:translate-y-[-2px]"
							>
								<Rocket className="mr-2 h-5 w-5" /> Submit a Crowdfunding Idea
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="border-primary/20 hover:border-primary/50 transition-all duration-300 hover:translate-y-[-2px]"
							>
								<Globe className="mr-2 h-5 w-5" /> Explore Active Campaigns
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* Why Crowdfund with Boundless Section */}
			<section className="py-24 bg-gradient-to-b from-primary/5 to-background">
				<div className="container max-w-6xl mx-auto px-4">
					<div className="text-center max-w-3xl mx-auto mb-16">
						<div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
							<Sparkles className="h-4 w-4 mr-2" />
							<span className="text-sm font-medium"> Why Crowdfund with Boundless?</span>
						</div>
						<h2 className="text-3xl md:text-4xl font-bold mb-6">Unlike traditional crowdfunding platforms, Boundless offers:</h2>
						<div className="h-1.5 w-24 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto mb-6" />
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="bg-card rounded-2xl border border-primary/10 p-8 shadow-xl">
							<div className="flex items-center gap-4 mb-4">
								<div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
									<Vote className="h-6 w-6 text-primary" />
								</div>
								<h3 className="text-xl font-bold">Public Idea Validation</h3>
							</div>
							<p className="text-muted-foreground">Test your idea with real votes and comments before launching</p>
						</div>

						<div className="bg-card rounded-2xl border border-primary/10 p-8 shadow-xl">
							<div className="flex items-center gap-4 mb-4">
								<div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
									<Shield className="h-6 w-6 text-primary" />
								</div>
								<h3 className="text-xl font-bold"> Smart Escrow Security</h3>
							</div>
							<p className="text-muted-foreground">Backers&apos; funds are held in secure contracts until milestones are completed</p>
						</div>

						<div className="bg-card rounded-2xl border border-primary/10 p-8 shadow-xl">
							<div className="flex items-center gap-4 mb-4">
								<div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
									<Zap className="h-6 w-6 text-primary" />
								</div>
								<h3 className="text-xl font-bold">🛠️ Milestone-Based Payouts</h3>
							</div>
							<p className="text-muted-foreground">Funds are only released when work is proven</p>
						</div>

						<div className="bg-card rounded-2xl border border-primary/10 p-8 shadow-xl">
							<div className="flex items-center gap-4 mb-4">
								<div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
									<Globe className="h-6 w-6 text-primary" />
								</div>
								<h3 className="text-xl font-bold"> Low Fees, Global Reach</h3>
							</div>
							<p className="text-muted-foreground">Powered by Stellar&apos;s low-cost, high-speed infrastructure</p>
						</div>
					</div>

					<div className="text-center mt-12">
						<p className="text-lg font-semibold mb-2">No middlemen. No vague promises.</p>
						<p className="text-muted-foreground">Just clear execution and community trust.</p>
					</div>
				</div>
			</section>

			{/* How Crowdfunding Works Section */}
			<section className="py-24 bg-background">
				<div className="container max-w-6xl mx-auto px-4">
					<div className="text-center max-w-3xl mx-auto mb-16">
						<div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
							<Lightbulb className="h-4 w-4 mr-2" />
							<span className="text-sm font-medium">How Crowdfunding Works</span>
						</div>
						<h2 className="text-3xl md:text-4xl font-bold mb-6">8 simple steps to launch your campaign</h2>
						<div className="h-1.5 w-24 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto mb-6" />
					</div>

					<div className="space-y-8">
						{/* Step 1 */}
						<div className="bg-card rounded-2xl border border-primary/10 p-8 shadow-xl">
							<div className="flex items-start gap-6">
								<div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-lg flex-shrink-0">1</div>
								<div>
									<h3 className="text-xl font-bold mb-3">Submit Your Idea</h3>
									<p className="text-muted-foreground">Describe your concept, define your problem, outline a potential impact.</p>
								</div>
							</div>
						</div>

						{/* Step 2 */}
						<div className="bg-card rounded-2xl border border-primary/10 p-8 shadow-xl">
							<div className="flex items-start gap-6">
								<div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-lg flex-shrink-0">2</div>
								<div>
									<h3 className="text-xl font-bold mb-3">Receive Feedback & Votes</h3>
									<p className="text-muted-foreground">The community engages with your idea. Voting helps prioritize what gets funded.</p>
								</div>
							</div>
						</div>

						{/* Step 3 */}
						<div className="bg-card rounded-2xl border border-primary/10 p-8 shadow-xl">
							<div className="flex items-start gap-6">
								<div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-lg flex-shrink-0">3</div>
								<div>
									<h3 className="text-xl font-bold mb-3">Meet Validation Threshold</h3>
									<p className="text-muted-foreground">Once your idea meets minimum support (upvotes/comments), you can launch a full campaign.</p>
								</div>
							</div>
						</div>

						{/* Step 4 */}
						<div className="bg-card rounded-2xl border border-primary/10 p-8 shadow-xl">
							<div className="flex items-start gap-6">
								<div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-lg flex-shrink-0">4</div>
								<div>
									<h3 className="text-xl font-bold mb-3">Launch Campaign</h3>
									<p className="text-muted-foreground mb-4">Define:</p>
									<ul className="list-disc list-inside space-y-2 text-muted-foreground">
										<li>Total funding goal</li>
										<li>Deadline</li>
										<li>Number of milestones</li>
										<li>Funds needed per milestone</li>
									</ul>
								</div>
							</div>
						</div>

						{/* Step 5 */}
						<div className="bg-card rounded-2xl border border-primary/10 p-8 shadow-xl">
							<div className="flex items-start gap-6">
								<div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-lg flex-shrink-0">5</div>
								<div>
									<h3 className="text-xl font-bold mb-3">Campaign Goes Live</h3>
									<p className="text-muted-foreground">Anyone can now back your project using their Stellar wallet.</p>
								</div>
							</div>
						</div>

						{/* Step 6 */}
						<div className="bg-card rounded-2xl border border-primary/10 p-8 shadow-xl">
							<div className="flex items-start gap-6">
								<div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-lg flex-shrink-0">6</div>
								<div>
									<h3 className="text-xl font-bold mb-3">Funds Locked in Escrow</h3>
									<p className="text-muted-foreground">Supporter funds are held in Soroban-powered smart contracts.</p>
								</div>
							</div>
						</div>

						{/* Step 7 */}
						<div className="bg-card rounded-2xl border border-primary/10 p-8 shadow-xl">
							<div className="flex items-start gap-6">
								<div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-lg flex-shrink-0">7</div>
								<div>
									<h3 className="text-xl font-bold mb-3">Milestone Submission & Review</h3>
									<p className="text-muted-foreground">As you complete each phase, submit proof. Admins or DAO members verify and approve before funds are released.</p>
								</div>
							</div>
						</div>

						{/* Step 8 */}
						<div className="bg-card rounded-2xl border border-primary/10 p-8 shadow-xl">
							<div className="flex items-start gap-6">
								<div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-lg flex-shrink-0">8</div>
								<div>
									<h3 className="text-xl font-bold mb-3">Project Completion</h3>
									<p className="text-muted-foreground">Successfully complete all milestones to receive full funds and build public trust for future campaigns.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* What Happens If You Don't Meet Your Goal Section */}
			<section className="py-24 bg-gradient-to-b from-background to-primary/5">
				<div className="container max-w-6xl mx-auto px-4">
					<div className="text-center max-w-3xl mx-auto mb-16">
						<div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
							<Shield className="h-4 w-4 mr-2" />
							<span className="text-sm font-medium"> What Happens If You Don&apos;t Meet Your Goal?</span>
						</div>
						<h2 className="text-3xl md:text-4xl font-bold mb-6">Your backers are protected</h2>
						<div className="h-1.5 w-24 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto mb-6" />
					</div>

					<div className="bg-card rounded-2xl border border-primary/10 p-8 shadow-xl max-w-4xl mx-auto">
						<div className="space-y-6">
							<div className="flex items-start gap-4">
								<CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
								<div>
									<p className="text-lg">
										If your campaign <strong>doesn&apos;t reach its goal before the deadline</strong>, all funds are <strong>automatically refunded</strong> to backers.
									</p>
								</div>
							</div>
							<div className="flex items-start gap-4">
								<CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
								<div>
									<p className="text-lg">
										You can <strong>resubmit or adjust your campaign</strong> after collecting feedback.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Who Should Use Crowdfunding Section */}
			<section className="py-24 bg-background">
				<div className="container max-w-6xl mx-auto px-4">
					<div className="text-center max-w-3xl mx-auto mb-16">
						<div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
							<Users className="h-4 w-4 mr-2" />
							<span className="text-sm font-medium">Who Should Use Crowdfunding?</span>
						</div>
						<h2 className="text-3xl md:text-4xl font-bold mb-6">Perfect for creators and builders</h2>
						<div className="h-1.5 w-24 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto mb-6" />
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						<div className="bg-card rounded-xl border border-primary/10 p-6 text-center">
							<div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
								<Rocket className="h-8 w-8 text-primary" />
							</div>
							<h3 className="font-semibold mb-2">Early-stage startups</h3>
						</div>
						<div className="bg-card rounded-xl border border-primary/10 p-6 text-center">
							<div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
								<Zap className="h-8 w-8 text-primary" />
							</div>
							<h3 className="font-semibold mb-2">Open-source developers</h3>
						</div>
						<div className="bg-card rounded-xl border border-primary/10 p-6 text-center">
							<div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
								<Star className="h-8 w-8 text-primary" />
							</div>
							<h3 className="font-semibold mb-2">Creatives & community leaders</h3>
						</div>
						<div className="bg-card rounded-xl border border-primary/10 p-6 text-center">
							<div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
								<Lightbulb className="h-8 w-8 text-primary" />
							</div>
							<h3 className="font-semibold mb-2">Builders with bold ideas, even without VC access</h3>
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
								<Sparkles className="h-4 w-4 mr-2" />
								<span className="text-sm font-medium"> Ready to Launch?</span>
							</div>

							<h2 className="text-3xl md:text-4xl font-bold mb-8">
								Start your crowdfunding journey today
							</h2>

							<div className="flex flex-wrap gap-6 justify-center">
								<Button
									size="lg"
									className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 px-8 py-6 text-lg"
								>
									<Lightbulb className="mr-2 h-5 w-5" /> Submit a Crowdfunding Idea
								</Button>
								<Button
									size="lg"
									variant="outline"
									className="border-primary/20 hover:border-primary/50 px-8 py-6 text-lg"
								>
									<Globe className="mr-2 h-5 w-5" /> Explore Active Campaigns
								</Button>
								<Link href="/how-it-works">
									<Button
										size="lg"
										variant="outline"
										className="border-primary/20 hover:border-primary/50 px-8 py-6 text-lg"
									>
										<Sparkles className="mr-2 h-5 w-5" /> Learn How Boundless Works
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
