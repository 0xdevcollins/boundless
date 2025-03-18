"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";
import React from "react";

const quickLinks = [
	{ label: "About Us", href: "/about" },
	{ label: "How It Works", href: "/how-it-works" },
	{ label: "Trending Projects", href: "/trending" },
	{ label: "Contact Us", href: "/contact" },
];

const essentialLinks = [
	{ label: "Discover Projects", href: "/projects" },
	{ label: "Start a Project", href: "/projects/new" },
	{ label: "Stellar Ecosystem", href: "/stellar" },
	{ label: "Blog", href: "/blog" },
];

const socialLinks = [
	{ icon: Facebook, href: "https://facebook.com" },
	{ icon: Twitter, href: "https://twitter.com" },
	{ icon: Instagram, href: "https://instagram.com" },
	{ icon: Linkedin, href: "https://linkedin.com" },
];

export default function Footer() {
	return (
		<footer className="bg-background border-t border-border">
			<div className="container max-w-6xl mx-auto px-4 md:px-6 py-12">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					{/* Quick Links */}
					<div>
						<h4 className="text-lg font-semibold mb-4">Quick Links</h4>
						<ul className="space-y-2">
							{quickLinks.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className="text-sm text-muted-foreground hover:text-primary transition-colors"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Essential Links */}
					<div>
						<h4 className="text-lg font-semibold mb-4">Explore</h4>
						<ul className="space-y-2">
							{essentialLinks.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className="text-sm text-muted-foreground hover:text-primary transition-colors"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Social Media */}
					<div>
						<h4 className="text-lg font-semibold mb-4">Follow Us</h4>
						<div className="flex space-x-4">
							{socialLinks.map((link) => (
								<a
									key={link.href}
									href={link.href}
									target="_blank"
									rel="noopener noreferrer"
									className="text-muted-foreground hover:text-primary transition-colors"
								>
									<link.icon className="h-5 w-5" />
								</a>
							))}
						</div>
					</div>

					{/* Newsletter Subscription */}
					<div className="md:col-span-1">
						<h4 className="text-lg font-semibold mb-4">
							Subscribe to Our Newsletter
						</h4>
						<p className="text-sm text-muted-foreground mb-4">
							Get the latest updates, exclusive offers, and insider tips
							straight to your inbox.
						</p>
						<div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
							<Input
								type="email"
								placeholder="Enter your email"
								className="flex-1 bg-background border-border"
							/>
							<Button
								type="submit"
								className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors whitespace-nowrap"
							>
								<Mail className="h-4 w-4 mr-2" />
								Subscribe
							</Button>
						</div>
					</div>
				</div>

				{/* Divider */}
				<div className="border-t border-border my-8" />

				{/* Copyright */}
				<div className="text-center text-sm text-muted-foreground">
					© {new Date().getFullYear()} Boundless. All rights reserved.
				</div>
			</div>
		</footer>
	);
}
