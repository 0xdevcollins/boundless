"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
	Mail,
	MessageSquare,
	Send,
	Twitter,
	Linkedin,
	Github,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function ContactPage() {
	const [formData, setFormData] = useState({
			name: "",
			email: "",
			subject: "",
			message: "",
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle form submission here
		console.log("Form submitted:", formData);
	};

	const handleInputChange = (field: string, value: string) => {
		setFormData(prev => ({
			...prev,
			[field]: value,
		}));
	};

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
							<MessageSquare className="h-4 w-4 mr-2" />
							<span className="text-sm font-medium">
								 Contact Us
							</span>
					</div>

						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
							Get in Touch
							</h1>

						<div className="h-1.5 w-32 bg-gradient-to-r from-primary to-primary/50 rounded-full mb-8" />

						<p className="text-xl text-muted-foreground max-w-3xl mb-10">
							We&apos;re always excited to hear from creators, grantors, contributors, and ecosystem partners.
						</p>

						<p className="text-lg text-muted-foreground max-w-2xl">
							Whether you have a question, feedback, press inquiry, or want to explore collaboration — drop us a message below.
						</p>
					</div>
					</div>
				</section>

				{/* Contact Form Section */}
			<section className="py-24 bg-gradient-to-b from-primary/5 to-background">
				<div className="container max-w-4xl mx-auto px-4">
					<div className="bg-card rounded-2xl border border-primary/10 p-8 shadow-xl">
						<div className="text-center mb-8">
							<div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
								<Send className="h-4 w-4 mr-2" />
								<span className="text-sm font-medium"> Contact Form</span>
							</div>
						</div>

						<form onSubmit={handleSubmit} className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-2">
									<Label htmlFor="name" className="text-sm font-medium">
										Name
									</Label>
									<Input
										id="name"
										type="text"
										placeholder="Your Name"
										value={formData.name}
										onChange={(e) => handleInputChange("name", e.target.value)}
										required
										className="border-primary/20 focus:border-primary/50"
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="email" className="text-sm font-medium">
										Email
									</Label>
															<Input
										id="email"
																type="email"
										placeholder="your.email@example.com"
										value={formData.email}
										onChange={(e) => handleInputChange("email", e.target.value)}
										required
										className="border-primary/20 focus:border-primary/50"
											/>
										</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="subject" className="text-sm font-medium">
									Subject
								</Label>
								<Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
									<SelectTrigger className="border-primary/20 focus:border-primary/50">
										<SelectValue placeholder="Select a subject" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="general">General Inquiry</SelectItem>
										<SelectItem value="partnerships">Partnerships</SelectItem>
										<SelectItem value="press">Press</SelectItem>
										<SelectItem value="feedback">Feedback</SelectItem>
										<SelectItem value="bug-report">Bug Report</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-2">
								<Label htmlFor="message" className="text-sm font-medium">
									Message
								</Label>
														<Textarea
									id="message"
									placeholder="Tell us more about your inquiry..."
									value={formData.message}
									onChange={(e) => handleInputChange("message", e.target.value)}
									required
									rows={6}
									className="border-primary/20 focus:border-primary/50 resize-none"
														/>
							</div>

							<div className="flex justify-center pt-4">
										<Button
											type="submit"
											size="lg"
									className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 px-8 py-6 text-lg"
										>
									<Send className="mr-2 h-5 w-5" /> Send Message
										</Button>
							</div>
									</form>
					</div>
				</div>
			</section>

			{/* Direct Contact Section */}
			<section className="py-24 bg-background">
				<div className="container max-w-6xl mx-auto px-4">
					<div className="text-center max-w-3xl mx-auto mb-16">
						<div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
							<Mail className="h-4 w-4 mr-2" />
							<span className="text-sm font-medium"> Reach us directly</span>
						</div>
						<h2 className="text-3xl md:text-4xl font-bold mb-6">Connect with us on your preferred platform</h2>
						<div className="h-1.5 w-24 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto mb-6" />
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						<div className="bg-card rounded-xl border border-primary/10 p-6 text-center hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
							<div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
								<Mail className="h-8 w-8 text-primary" />
							</div>
							<h3 className="font-semibold mb-2">Email</h3>
							<a 
								href="mailto:hello@boundless.xyz" 
								className="text-primary hover:text-primary/80 transition-colors"
							>
								hello@boundless.xyz
							</a>
						</div>

						<div className="bg-card rounded-xl border border-primary/10 p-6 text-center hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
							<div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
								<Twitter className="h-8 w-8 text-primary" />
												</div>
							<h3 className="font-semibold mb-2">Twitter</h3>
							<a 
								href="https://twitter.com/BoundlessXYZ" 
																target="_blank"
								rel="noopener noreferrer"
								className="text-primary hover:text-primary/80 transition-colors"
															>
								@BoundlessXYZ
							</a>
						</div>

						<div className="bg-card rounded-xl border border-primary/10 p-6 text-center hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
							<div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
								<Linkedin className="h-8 w-8 text-primary" />
							</div>
							<h3 className="font-semibold mb-2">LinkedIn</h3>
							<a 
								href="#" 
								className="text-primary hover:text-primary/80 transition-colors"
							>
								Boundless on LinkedIn
							</a>
						</div>

						<div className="bg-card rounded-xl border border-primary/10 p-6 text-center hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
							<div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
								<Github className="h-8 w-8 text-primary" />
							</div>
							<h3 className="font-semibold mb-2">GitHub</h3>
							<a 
								href="#" 
								className="text-primary hover:text-primary/80 transition-colors"
							>
								github.com/boundless
							</a>
						</div>
					</div>

					<div className="text-center mt-12">
						<div className="bg-primary/5 rounded-xl p-6 border border-primary/10 inline-block">
							<p className="text-lg font-semibold mb-2">We usually respond within 24–48 hours.</p>
							<p className="text-muted-foreground">Looking forward to hearing from you!</p>
														</div>
												</div>
											</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 bg-gradient-to-b from-background to-primary/5">
				<div className="container max-w-6xl mx-auto px-4">
					<div className="bg-gradient-to-r from-primary/5 via-card to-primary/5 rounded-2xl border border-primary/20 p-8 md:p-12 shadow-xl relative overflow-hidden">
						{/* Background elements */}
						<div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-70" />
						<div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-70" />

						<div className="relative text-center">
							<div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
								<MessageSquare className="h-4 w-4 mr-2" />
								<span className="text-sm font-medium">Ready to get started?</span>
								</div>

							<h2 className="text-3xl md:text-4xl font-bold mb-8">
								Join the Boundless community
							</h2>
							
							<p className="text-lg text-muted-foreground mb-8">
								Whether you&apos;re a creator, funder, or contributor, we&apos;re here to help you succeed.
							</p>

							<div className="flex flex-wrap gap-6 justify-center">
								<Link href="/how-it-works">
									<Button
										size="lg"
										className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 px-8 py-6 text-lg"
											>
										<Mail className="mr-2 h-5 w-5" /> Learn How It Works
									</Button>
											</Link>
								<Link href="/crowdfunding">
									<Button
										size="lg"
										variant="outline"
										className="border-primary/20 hover:border-primary/50 px-8 py-6 text-lg"
									>
										<MessageSquare className="mr-2 h-5 w-5" /> Start Crowdfunding
										</Button>
								</Link>
								<Link href="/grants">
									<Button
										size="lg"
										variant="outline"
										className="border-primary/20 hover:border-primary/50 px-8 py-6 text-lg"
											>
										<MessageSquare className="mr-2 h-5 w-5" /> Explore Grants
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
