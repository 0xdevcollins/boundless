"use client";

import { Button } from "@/components/ui/button";
import {
	Globe,
	Lightbulb,
	Mail,
	Rocket,
	Shield,
	Sparkles,
	Star,
	Users,
	Zap,
} from "lucide-react";
import Link from "next/link";
import React from "react";

export default function AboutPage() {
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
							<Sparkles className="h-4 w-4 mr-2" />
							<span className="text-sm font-medium">
								About Boundless
							</span>
						</div>

						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
							Decentralized. Transparent. Empowering.
						</h1>

						<div className="h-1.5 w-32 bg-gradient-to-r from-primary to-primary/50 rounded-full mb-8" />

						<p className="text-xl text-muted-foreground max-w-3xl mb-10">
							Boundless is a decentralized crowdfunding and grant platform built on the Stellar blockchain. We help innovators, builders, and open-source communities access funding in a secure, milestone-based, and community-driven environment.
						</p>
						</div>
					</div>
				</section>

			{/* Our Vision Section */}
			<section className="py-24 bg-gradient-to-b from-primary/5 to-background">
					<div className="container max-w-6xl mx-auto px-4">
					<div className="text-center max-w-3xl mx-auto mb-16">
						<div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
							<Lightbulb className="h-4 w-4 mr-2" />
							<span className="text-sm font-medium">Our Vision</span>
									</div>
						<h2 className="text-3xl md:text-4xl font-bold mb-6">We believe the future of funding lies in transparency and trustlessness.</h2>
						<div className="h-1.5 w-24 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto mb-6" />
								</div>

					<div className="bg-card rounded-2xl border border-primary/10 p-8 shadow-xl mb-12">
						<h3 className="text-xl font-bold mb-6 text-center">Boundless is built to:</h3>
						
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="flex items-start gap-4 p-4 bg-primary/5 rounded-xl">
								<Users className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
								<span className="font-medium">Empower creators in emerging markets to raise and access capital</span>
									</div>
							<div className="flex items-start gap-4 p-4 bg-primary/5 rounded-xl">
								<Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
								<span className="font-medium">Replace broken Web2 funding models with smart contract-backed trust</span>
							</div>
							<div className="flex items-start gap-4 p-4 bg-primary/5 rounded-xl">
								<Globe className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
								<span className="font-medium">Enable DAOs, nonprofits, and blockchain ecosystems to run secure, milestone-based grants</span>
											</div>
							<div className="flex items-start gap-4 p-4 bg-primary/5 rounded-xl">
								<Zap className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
								<span className="font-medium">Democratize access to capital by reducing gatekeeping</span>
							</div>
						</div>

						<div className="text-center mt-8">
							<p className="text-lg font-semibold mb-2">We&apos;re not just building a platform — we&apos;re creating an ecosystem where <strong>ideas can thrive without institutional permission</strong>.</p>
							</div>
						</div>
					</div>
				</section>

			{/* What We're Building Section */}
			<section className="py-24 bg-background">
					<div className="container max-w-6xl mx-auto px-4">
					<div className="text-center max-w-3xl mx-auto mb-16">
						<div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
							<Rocket className="h-4 w-4 mr-2" />
							<span className="text-sm font-medium"> What We&apos;re Building</span>
						</div>
						<h2 className="text-3xl md:text-4xl font-bold mb-6">A platform for:</h2>
						<div className="h-1.5 w-24 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto mb-6" />
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
						<div className="bg-card rounded-xl border border-primary/10 p-6 text-center">
							<div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
								<Rocket className="h-8 w-8 text-primary" />
							</div>
							<h3 className="font-semibold mb-2"> Crowdfunding early-stage ideas</h3>
						</div>
						<div className="bg-card rounded-xl border border-primary/10 p-6 text-center">
							<div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
								<Shield className="h-8 w-8 text-primary" />
							</div>
							<h3 className="font-semibold mb-2"> Launching secure on-chain grants</h3>
						</div>
						<div className="bg-card rounded-xl border border-primary/10 p-6 text-center">
							<div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
								<Users className="h-8 w-8 text-primary" />
									</div>
							<h3 className="font-semibold mb-2"> Supporting open-source and social impact</h3>
						</div>
						<div className="bg-card rounded-xl border border-primary/10 p-6 text-center">
							<div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
								<Zap className="h-8 w-8 text-primary" />
							</div>
							<h3 className="font-semibold mb-2"> Smart escrow milestone funding via Soroban</h3>
					</div>
						<div className="bg-card rounded-xl border border-primary/10 p-6 text-center">
							<div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
								<Lightbulb className="h-8 w-8 text-primary" />
							</div>
							<h3 className="font-semibold mb-2"> Community governance & transparent progress tracking</h3>
						</div>
										</div>

					<div className="text-center">
						<p className="text-lg font-semibold mb-2">Whether you&apos;re a creator, funder, or contributor, <strong>Boundless gives you the rails to build together — openly and transparently.</strong></p>
											</div>
										</div>
			</section>

			{/* Meet the Team Section */}
			<section className="py-24 bg-gradient-to-b from-background to-primary/5">
				<div className="container max-w-6xl mx-auto px-4">
					<div className="text-center max-w-3xl mx-auto mb-16">
						<div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
							<Users className="h-4 w-4 mr-2" />
							<span className="text-sm font-medium"> Meet the Team</span>
						</div>
						<h2 className="text-3xl md:text-4xl font-bold mb-6">We&apos;re a passionate team of developers, designers, and ecosystem builders</h2>
						<div className="h-1.5 w-24 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto mb-6" />
									</div>

					<div className="bg-card rounded-2xl border border-primary/10 p-8 shadow-xl mb-8">
						<p className="text-lg text-muted-foreground mb-6">
							We&apos;re a passionate team of developers, designers, and ecosystem builders working across Africa and the globe. With roots in both open-source and real-world execution, we&apos;re committed to solving funding friction — for good.
						</p>
						
						<div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
							<p className="text-lg font-semibold mb-4">Want to partner with us or join the team?</p>
							<Link href="/contact">
								<Button className="bg-primary text-primary-foreground hover:bg-primary/90">
									<Mail className="mr-2 h-4 w-4" /> Reach out via our contact page
								</Button>
							</Link>
						</div>
						</div>
					</div>
				</section>

			{/* Our Tech & Ecosystem Section */}
			<section className="py-24 bg-background">
					<div className="container max-w-6xl mx-auto px-4">
					<div className="text-center max-w-3xl mx-auto mb-16">
							<div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
							<Zap className="h-4 w-4 mr-2" />
							<span className="text-sm font-medium"> Our Tech & Ecosystem</span>
						</div>
						<h2 className="text-3xl md:text-4xl font-bold mb-6">Boundless is proudly built on:</h2>
						<div className="h-1.5 w-24 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto mb-6" />
							</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
						<div className="bg-card rounded-xl border border-primary/10 p-6 text-center">
							<div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
								<Star className="h-8 w-8 text-primary" />
							</div>
							<h3 className="font-semibold mb-2">Stellar</h3>
							<p className="text-sm text-muted-foreground">Low-cost, fast blockchain infrastructure</p>
						</div>
						<div className="bg-card rounded-xl border border-primary/10 p-6 text-center">
							<div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
								<Shield className="h-8 w-8 text-primary" />
										</div>
							<h3 className="font-semibold mb-2">Soroban</h3>
							<p className="text-sm text-muted-foreground">Stellar&apos;s smart contract platform</p>
												</div>
						<div className="bg-card rounded-xl border border-primary/10 p-6 text-center">
							<div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
								<Globe className="h-8 w-8 text-primary" />
											</div>
							<h3 className="font-semibold mb-2">IPFS</h3>
							<p className="text-sm text-muted-foreground">For decentralized metadata storage</p>
									</div>
						<div className="bg-card rounded-xl border border-primary/10 p-6 text-center">
							<div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
								<Lightbulb className="h-8 w-8 text-primary" />
							</div>
							<h3 className="font-semibold mb-2">Open-source tools</h3>
							<p className="text-sm text-muted-foreground">Our code and roadmap are community-first</p>
						</div>
					</div>

					<div className="text-center">
						<p className="text-lg font-semibold mb-2">We&apos;re committed to open collaboration with the broader Web3 and open-source ecosystem.</p>
						</div>
					</div>
				</section>

			{/* MVP Phase Section */}
			<section className="py-24 bg-gradient-to-b from-primary/5 to-background">
					<div className="container max-w-6xl mx-auto px-4">
					<div className="bg-card rounded-2xl border border-primary/10 p-8 shadow-xl text-center">
						<div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
							<Rocket className="h-4 w-4 mr-2" />
							<span className="text-sm font-medium"> Boundless is currently in MVP Phase</span>
									</div>
						
						<h2 className="text-2xl md:text-3xl font-bold mb-6">We&apos;re actively building and onboarding our early users.</h2>
						
						<p className="text-lg text-muted-foreground mb-8">
							If you&apos;re a creator, funder, or contributor —
										</p>
						
						<Link href="/how-it-works">
							<Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 px-8 py-6 text-lg">
								<Sparkles className="mr-2 h-5 w-5" /> Get started here
								</Button>
						</Link>
						</div>
					</div>
				</section>

			{/* Get In Touch Section */}
				<section className="py-20 bg-background">
					<div className="container max-w-6xl mx-auto px-4">
					<div className="bg-gradient-to-r from-primary/5 via-card to-primary/5 rounded-2xl border border-primary/20 p-8 md:p-12 shadow-xl relative overflow-hidden">
							{/* Background elements */}
						<div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-70" />
						<div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-70" />

						<div className="relative text-center">
									<div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
								<Mail className="h-4 w-4 mr-2" />
								<span className="text-sm font-medium"> Get In Touch</span>
									</div>

									<h2 className="text-3xl md:text-4xl font-bold mb-6">
								Have a question? Want to collaborate?
									</h2>
							
							<p className="text-lg text-muted-foreground mb-8">
								We&apos;d love to hear from you.
									</p>

							<Link href="/contact">
										<Button
											size="lg"
									className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 px-8 py-6 text-lg"
										>
									<Mail className="mr-2 h-5 w-5" /> Go to Contact Page
										</Button>
							</Link>
							</div>
						</div>
					</div>
				</section>
			</div>
	);
}
