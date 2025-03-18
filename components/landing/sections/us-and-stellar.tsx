"use client";

import { motion, useInView } from "framer-motion";
import { Code, Globe, ShieldCheck, Zap } from "lucide-react";
import React, { useRef } from "react";
import AnimatedUnderline from "../components/AnimatedUnderline";
import PageTransition from "../components/PageTransition";

export default function UsAndStellar() {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { margin: "-100px" });

	return (
		<PageTransition>
			<section className="py-16 md:py-24 bg-background" ref={ref}>
				<div className="container max-w-6xl mx-auto px-4 md:px-6">
					<motion.div
						className="text-center max-w-3xl mx-auto mb-16"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: "easeOut" }}
					>
						<div className="relative inline-block">
							<h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6">
								Us & Stellar
							</h2>
							<AnimatedUnderline isInView={isInView} />
						</div>
						<p className="text-lg text-muted-foreground mt-6">
							Boundless leverages Stellar&apos;s blockchain technology to create a
							secure, transparent, and efficient crowdfunding platform
						</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5 }}
							className="space-y-8"
						>
							<div className="flex items-start">
								<div className="mr-4 p-2 bg-primary/10 rounded-full">
									<Zap className="h-6 w-6 text-primary" />
								</div>
								<div>
									<h3 className="text-xl font-medium mb-2">
										Fast Transactions
									</h3>
									<p className="text-muted-foreground">
										Process contributions in seconds with Stellar&apos;s high-speed
										network, ensuring your project gets funded quickly and
										efficiently.
									</p>
								</div>
							</div>

							<div className="flex items-start">
								<div className="mr-4 p-2 bg-primary/10 rounded-full">
									<Code className="h-6 w-6 text-primary" />
								</div>
								<div>
									<h3 className="text-xl font-medium mb-2">
										Soroban Smart Contracts
									</h3>
									<p className="text-muted-foreground">
										Utilize Stellar&apos;s Soroban smart contracts for secure,
										automated fund management and milestone-based releases.
									</p>
								</div>
							</div>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className="space-y-8"
						>
							<div className="flex items-start">
								<div className="mr-4 p-2 bg-primary/10 rounded-full">
									<ShieldCheck className="h-6 w-6 text-primary" />
								</div>
								<div>
									<h3 className="text-xl font-medium mb-2">
										Enhanced Security
									</h3>
									<p className="text-muted-foreground">
										Protect all transactions with Stellar&apos;s immutable ledger
										technology, providing transparency and peace of mind for
										backers.
									</p>
								</div>
							</div>

							<div className="flex items-start">
								<div className="mr-4 p-2 bg-primary/10 rounded-full">
									<Globe className="h-6 w-6 text-primary" />
								</div>
								<div>
									<h3 className="text-xl font-medium mb-2">
										Global Accessibility
									</h3>
									<p className="text-muted-foreground">
										Connect with backers worldwide through Stellar&apos;s borderless
										payment infrastructure, removing geographical limitations.
									</p>
								</div>
							</div>
						</motion.div>
					</div>

					<motion.div
						className="mt-16 p-6 bg-primary/5 rounded-lg border border-primary/10 text-center"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<p className="text-muted-foreground">
							Built on the Stellar network for maximum efficiency, security, and
							global reach
						</p>
					</motion.div>
				</div>
			</section>
		</PageTransition>
	);
}
