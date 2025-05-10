"use client";

import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Rocket } from "lucide-react";
import Link from "next/link";
import React, { useRef } from "react";
import AnimatedUnderline from "../components/AnimatedUnderline";
import PageTransition from "../components/PageTransition";

export default function BoundlessCTA() {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { margin: "-100px" });

	return (
		<PageTransition>
			<section
				className="py-16 md:py-24 bg-gradient-to-b from-background to-background/90"
				ref={ref}
			>
				<div className="container max-w-6xl mx-auto px-4 md:px-6">
					<div className="rounded-2xl border border-primary/20 bg-primary/5 overflow-hidden">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
							{/* Left side content */}
							<motion.div
								className="p-8 md:p-12"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6 }}
							>
								<div className="inline-block bg-primary/10 p-2 rounded-full mb-6">
									<Rocket className="h-6 w-6 text-primary" />
								</div>

								<div className="relative mb-6">
									<h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-8">
										Ready to Launch Your Vision?
									</h2>
									<AnimatedUnderline isInView={isInView} />
								</div>

								<p className="text-lg text-muted-foreground mb-8">
									Join Boundless today and connect with a community of backers
									eager to support innovative projects built on Stellar
									technology.
								</p>

								<div className="flex flex-col sm:flex-row gap-4">
									<Button className="group" size="lg">
										<Link href="/projects/new" className="flex items-center">
											Start a project
											<ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
										</Link>
									</Button>

									<Button variant="outline" size="lg" className="group">
										<Link href="/explore" className="flex items-center">
											Explore projects
											<ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
										</Link>
									</Button>
								</div>
							</motion.div>

							{/* Right side stats */}
							<motion.div
								className="bg-primary/10 p-8 md:p-12 flex flex-col justify-center"
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: 0.2 }}
							>
								<div className="grid grid-cols-2 gap-6">
									<div className="text-center">
										<motion.div
											className="text-4xl md:text-5xl font-bold text-primary mb-2"
											initial={{ opacity: 0, y: 10 }}
											whileInView={{ opacity: 1, y: 0 }}
											viewport={{ once: true }}
											transition={{ duration: 0.4, delay: 0.3 }}
										>
											200+
										</motion.div>
										<p className="text-sm text-muted-foreground">
											Projects funded
										</p>
									</div>

									<div className="text-center">
										<motion.div
											className="text-4xl md:text-5xl font-bold text-primary mb-2"
											initial={{ opacity: 0, y: 10 }}
											whileInView={{ opacity: 1, y: 0 }}
											viewport={{ once: true }}
											transition={{ duration: 0.4, delay: 0.4 }}
										>
											15K+
										</motion.div>
										<p className="text-sm text-muted-foreground">
											Active backers
										</p>
									</div>

									<div className="text-center">
										<motion.div
											className="text-4xl md:text-5xl font-bold text-primary mb-2"
											initial={{ opacity: 0, y: 10 }}
											whileInView={{ opacity: 1, y: 0 }}
											viewport={{ once: true }}
											transition={{ duration: 0.4, delay: 0.5 }}
										>
											$2.5M
										</motion.div>
										<p className="text-sm text-muted-foreground">
											Total funded
										</p>
									</div>

									<div className="text-center">
										<motion.div
											className="text-4xl md:text-5xl font-bold text-primary mb-2"
											initial={{ opacity: 0, y: 10 }}
											whileInView={{ opacity: 1, y: 0 }}
											viewport={{ once: true }}
											transition={{ duration: 0.4, delay: 0.6 }}
										>
											92%
										</motion.div>
										<p className="text-sm text-muted-foreground">
											Success rate
										</p>
									</div>
								</div>
							</motion.div>
						</div>
					</div>
				</div>
			</section>
		</PageTransition>
	);
}
