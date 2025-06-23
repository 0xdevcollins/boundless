"use client";

import { Button } from "@/components/ui/button";
import {
	Mail,
	Shield,
	FileText,
	Lock,
	Users,
	Eye,
	X,
} from "lucide-react";
import Link from "next/link";
import React from "react";

export default function LegalPage() {
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
							<FileText className="h-4 w-4 mr-2" />
							<span className="text-sm font-medium">
								Terms & Privacy Policy
							</span>
						</div>

						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
							Legal & Privacy
						</h1>

						<div className="h-1.5 w-32 bg-gradient-to-r from-primary to-primary/50 rounded-full mb-8" />

						<p className="text-xl text-muted-foreground max-w-3xl mb-10">
							At <strong>Boundless</strong>, your trust means everything to us. This page outlines the <strong>Terms of Use</strong> and our <strong>Privacy Policy</strong>, which together govern your use of our platform.
						</p>

						<div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
							<p className="text-sm text-muted-foreground">
								<strong>Last Updated:</strong> January 2025
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Terms of Use Section */}
			<section className="py-24 bg-gradient-to-b from-primary/5 to-background">
				<div className="container max-w-4xl mx-auto px-4">
					<div className="bg-card rounded-2xl border border-primary/10 p-8 shadow-xl mb-12">
						<div className="text-center mb-8">
							<div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
								<FileText className="h-4 w-4 mr-2" />
								<span className="text-sm font-medium">Terms of Use</span>
							</div>
							<h2 className="text-3xl font-bold mb-6">By accessing or using Boundless, you agree to be bound by the following terms:</h2>
						</div>

						<div className="space-y-8">
							{/* 1. Use of the Platform */}
							<div className="space-y-4">
								<h3 className="text-xl font-bold flex items-center gap-2">
									<span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">1</span>
									Use of the Platform
								</h3>
								<p className="text-muted-foreground">
									Boundless is a decentralized funding platform that allows users to:
								</p>
								<ul className="list-disc list-inside space-y-2 text-muted-foreground ml-6">
									<li>Create and back crowdfunding campaigns</li>
									<li>Launch and apply to grant programs</li>
									<li>Participate in milestone-based project reviews</li>
								</ul>
								<p className="text-muted-foreground">
									You must be at least 18 years old and legally permitted to use blockchain technology in your jurisdiction.
								</p>
							</div>

							{/* 2. User Conduct */}
							<div className="space-y-4">
								<h3 className="text-xl font-bold flex items-center gap-2">
									<span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">2</span>
									User Conduct
								</h3>
								<p className="text-muted-foreground">You agree to:</p>
								<ul className="list-disc list-inside space-y-2 text-muted-foreground ml-6">
									<li>Provide accurate and truthful information</li>
									<li>Use Boundless for lawful purposes only</li>
									<li>Respect community guidelines when commenting or voting</li>
								</ul>
								<p className="text-muted-foreground">
									We reserve the right to suspend accounts that violate these rules.
								</p>
							</div>

							{/* 3. Funding & Smart Contracts */}
							<div className="space-y-4">
								<h3 className="text-xl font-bold flex items-center gap-2">
									<span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">3</span>
									Funding & Smart Contracts
								</h3>
								<p className="text-muted-foreground">
									Boundless uses Stellar and Soroban smart contracts to manage escrow-based funding. All contributions, payouts, and refunds are handled automatically and transparently. Users are responsible for reviewing milestone conditions before participating in funding activities.
								</p>
							</div>

							{/* 4. No Financial Advice */}
							<div className="space-y-4">
								<h3 className="text-xl font-bold flex items-center gap-2">
									<span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">4</span>
									No Financial Advice
								</h3>
								<p className="text-muted-foreground">
									Boundless does not offer investment advice or guarantees any return. Backers fund projects voluntarily and understand that project outcomes carry risk.
								</p>
							</div>

							{/* 5. Limitation of Liability */}
							<div className="space-y-4">
								<h3 className="text-xl font-bold flex items-center gap-2">
									<span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">5</span>
									Limitation of Liability
								</h3>
								<p className="text-muted-foreground">
									Boundless is provided &quot;as is.&quot; We are not liable for losses resulting from:
								</p>
								<ul className="list-disc list-inside space-y-2 text-muted-foreground ml-6">
									<li>Failed projects</li>
									<li>Smart contract vulnerabilities</li>
									<li>Incorrect user submissions</li>
									<li>Network or blockchain issues</li>
								</ul>
								<p className="text-muted-foreground">
									Use of the platform is at your own risk.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Privacy Policy Section */}
			<section className="py-24 bg-background">
				<div className="container max-w-4xl mx-auto px-4">
					<div className="bg-card rounded-2xl border border-primary/10 p-8 shadow-xl mb-12">
						<div className="text-center mb-8">
							<div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
								<Lock className="h-4 w-4 mr-2" />
								<span className="text-sm font-medium">Privacy Policy</span>
							</div>
							<h2 className="text-3xl font-bold mb-6">We value your privacy. This policy explains how we handle your data.</h2>
						</div>

						<div className="space-y-8">
							{/* 1. What We Collect */}
							<div className="space-y-4">
								<h3 className="text-xl font-bold flex items-center gap-2">
									<span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">1</span>
									What We Collect
								</h3>
								<p className="text-muted-foreground">We may collect:</p>
								<ul className="list-disc list-inside space-y-2 text-muted-foreground ml-6">
									<li>Name, email (for account creation)</li>
									<li>KYC documentation (only for creators receiving funds)</li>
									<li>Wallet addresses</li>
									<li>Usage analytics (anonymized)</li>
								</ul>
								<div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
									<p className="text-sm font-semibold text-primary">
										We never sell your data. Period.
									</p>
								</div>
							</div>

							{/* 2. How We Use Your Data */}
							<div className="space-y-4">
								<h3 className="text-xl font-bold flex items-center gap-2">
									<span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">2</span>
									How We Use Your Data
								</h3>
								<ul className="list-disc list-inside space-y-2 text-muted-foreground ml-6">
									<li>To manage your account</li>
									<li>To process funding and payouts</li>
									<li>To prevent fraud and abuse</li>
									<li>To improve platform functionality</li>
								</ul>
							</div>

							{/* 3. Third-Party Services */}
							<div className="space-y-4">
								<h3 className="text-xl font-bold flex items-center gap-2">
									<span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">3</span>
									Third-Party Services
								</h3>
								<p className="text-muted-foreground">We may integrate with:</p>
								<ul className="list-disc list-inside space-y-2 text-muted-foreground ml-6">
									<li>KYC/AML providers</li>
									<li>Stellar network wallets</li>
									<li>Analytics tools (e.g. Plausible or Fathom)</li>
								</ul>
								<p className="text-muted-foreground">
									These providers adhere to strict privacy practices.
								</p>
							</div>

							{/* 4. Data Retention */}
							<div className="space-y-4">
								<h3 className="text-xl font-bold flex items-center gap-2">
									<span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">4</span>
									Data Retention
								</h3>
								<p className="text-muted-foreground">
									We retain data as long as necessary to comply with legal and operational obligations. Users can request account deletion via our contact form.
								</p>
							</div>

							{/* 5. Cookies */}
							<div className="space-y-4">
								<h3 className="text-xl font-bold flex items-center gap-2">
									<span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">5</span>
									Cookies
								</h3>
								<p className="text-muted-foreground">
									Boundless uses minimal cookies for security and basic analytics. No third-party ads or tracking pixels are used.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Your Rights Section */}
			<section className="py-24 bg-gradient-to-b from-background to-primary/5">
				<div className="container max-w-4xl mx-auto px-4">
					<div className="bg-card rounded-2xl border border-primary/10 p-8 shadow-xl mb-8">
						<div className="text-center mb-8">
							<div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
								<Users className="h-4 w-4 mr-2" />
								<span className="text-sm font-medium">Your Rights</span>
							</div>
							<h2 className="text-3xl font-bold mb-6">You may request:</h2>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
							<div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl">
								<Eye className="h-6 w-6 text-primary flex-shrink-0" />
								<span className="font-medium">To view, update, or delete your data</span>
							</div>
							<div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl">
								<X className="h-6 w-6 text-primary flex-shrink-0" />
								<span className="font-medium">To withdraw from the platform</span>
							</div>
							<div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl">
								<Shield className="h-6 w-6 text-primary flex-shrink-0" />
								<span className="font-medium">To opt out of non-essential communication</span>
							</div>
						</div>

						<div className="text-center">
							<p className="text-lg font-semibold mb-4">Email: <a href="mailto:privacy@boundless.xyz" className="text-primary hover:text-primary/80">privacy@boundless.xyz</a></p>
						</div>
					</div>

					<div className="bg-primary/5 rounded-xl p-6 border border-primary/10 text-center">
						<p className="text-lg font-semibold mb-4">
							For legal inquiries or concerns, contact: <a href="mailto:legal@boundless.xyz" className="text-primary hover:text-primary/80">legal@boundless.xyz</a>
						</p>
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
								<Shield className="h-4 w-4 mr-2" />
								<span className="text-sm font-medium">Questions about our policies?</span>
							</div>

							<h2 className="text-3xl md:text-4xl font-bold mb-8">
								We&apos;re here to help
							</h2>
							
							<p className="text-lg text-muted-foreground mb-8">
								If you have any questions about our terms or privacy policy, don&apos;t hesitate to reach out.
							</p>

							<div className="flex flex-wrap gap-6 justify-center">
								<Link href="/contact">
									<Button
										size="lg"
										className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 px-8 py-6 text-lg"
									>
										<Mail className="mr-2 h-5 w-5" /> Contact Us
									</Button>
								</Link>
								<Link href="https://docs.boundlessfi.xyz">
									<Button
										size="lg"
										variant="outline"
										className="border-primary/20 hover:border-primary/50 px-8 py-6 text-lg"
									>
										<FileText className="mr-2 h-5 w-5" /> Platform Documentation
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
