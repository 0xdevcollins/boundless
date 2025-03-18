"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../ui/button";

type CryptoCategoryType =
	| "DeFi Protocol"
	| "NFT Marketplace"
	| "Data DAOs"
	| "AI Agents"
	| "Web3 Storage";

interface HeroProps {
	className?: string;
}

const Hero: React.FC<HeroProps> = ({ className }) => {
	const particlesRef = useRef<HTMLDivElement>(null);
	const [currentCategory, setCurrentCategory] = useState<number>(0);
	const [displayText, setDisplayText] = useState<string>("");
	const [isTyping, setIsTyping] = useState<boolean>(true);

	// Categories for the rotating text
	const categories: CryptoCategoryType[] = [
		"DeFi Protocol",
		"NFT Marketplace",
		"Data DAOs",
		"AI Agents",
		"Web3 Storage",
	];

	// Animation variants for text elements
	const titleVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.8,
				ease: "easeOut",
			},
		},
	};

	const subtitleVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.8,
				delay: 0.3,
				ease: "easeOut",
			},
		},
	};

	const buttonVariants = {
		hidden: { opacity: 0, scale: 0.8 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				duration: 0.5,
				delay: 0.6,
				ease: "easeOut",
			},
		},
		hover: {
			scale: 1.05,
			transition: { duration: 0.2 },
		},
	};

	const shapeVariants = {
		initial: { opacity: 0, scale: 0 },
		animate: {
			opacity: 0.5,
			scale: 1,
			transition: { duration: 1.5, ease: "easeOut" },
		},
		float: {
			y: [0, -15, 0],
			rotate: [0, 5, 0],
			transition: {
				y: { repeat: Number.POSITIVE_INFINITY, duration: 6, ease: "easeInOut" },
				rotate: {
					repeat: Number.POSITIVE_INFINITY,
					duration: 8,
					ease: "easeInOut",
				},
			},
		},
	};

	// Typing animation effect
	useEffect(() => {
		const currentWord = categories[currentCategory];
		if (isTyping) {
			if (displayText !== currentWord) {
				const timeout = setTimeout(() => {
					setDisplayText(currentWord.substring(0, displayText.length + 1));
				}, 100);
				return () => clearTimeout(timeout);
			}
			const timeout = setTimeout(() => {
				setIsTyping(false);
			}, 1000);
			return () => clearTimeout(timeout);
		}
		if (displayText.length > 0) {
			const timeout = setTimeout(() => {
				setDisplayText(displayText.substring(0, displayText.length - 1));
			}, 50);
			return () => clearTimeout(timeout);
		}
		const timeout = setTimeout(() => {
			setCurrentCategory((prev) => (prev + 1) % categories.length);
			setIsTyping(true);
		}, 300);
		return () => clearTimeout(timeout);
	}, [displayText, isTyping, currentCategory, categories]);

	useEffect(() => {
		if (!particlesRef.current) return;

		// Create particle animation
		const createParticles = () => {
			const particles = Array.from({ length: 50 }).map(() => {
				const particle = document.createElement("div");
				particle.classList.add(
					"absolute",
					"bg-primary",
					"rounded-full",
					"opacity-30",
				);

				const size = Math.floor(Math.random() * 5) + 2;
				particle.style.width = `${size}px`;
				particle.style.height = `${size}px`;

				particle.style.left = `${Math.random() * 100}%`;
				particle.style.top = `${Math.random() * 100}%`;

				const duration = Math.random() * 20 + 10;
				particle.style.animation = `float ${duration}s infinite ease-in-out`;

				return particle;
			});

			for (const p of particles) {
				particlesRef.current?.appendChild(p);
			}

			return () => {
				for (const p of particles) {
					p.remove();
				}
			};
		};

		const cleanup = createParticles();
		return cleanup;
	}, []);

	return (
		<div
			className={`relative w-full overflow-hidden bg-background py-20 lg:py-32 ${className}`}
		>
			{/* Particle background */}
			<div
				ref={particlesRef}
				className="absolute inset-0 pointer-events-none"
				style={{ zIndex: 0 }}
			/>

			{/* Enhanced background shapes */}
			<motion.div
				className="absolute top-20 right-24 w-32 h-32 rounded-full bg-primary/10 blur-xl"
				variants={shapeVariants}
				initial="initial"
				animate={["animate", "float"]}
			/>
			<motion.div
				className="absolute bottom-24 left-16 w-40 h-40 rounded-full bg-accent/10 blur-xl"
				variants={shapeVariants}
				initial="initial"
				animate={["animate", "float"]}
				custom={1}
			/>
			<motion.div
				className="absolute top-32 left-24 w-20 h-20 rounded-lg bg-secondary/10 blur-lg"
				variants={shapeVariants}
				initial="initial"
				animate={["animate", "float"]}
				custom={2}
			/>

			{/* Additional blending shapes */}
			<motion.div
				className="absolute top-48 left-1/4 w-16 h-16 rounded-lg bg-secondary/20 blur-md"
				style={{ transform: "rotate(45deg)" }}
				variants={shapeVariants}
				initial="initial"
				animate={["animate", "float"]}
				custom={4}
			/>
			<motion.div
				className="absolute bottom-48 right-1/4 w-36 h-36 rounded-full bg-primary/15 blur-xl"
				variants={shapeVariants}
				initial="initial"
				animate={["animate", "float"]}
				custom={5}
			/>

			{/* Gradient background */}
			<div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background/5 pointer-events-none" />

			<div className="container mx-auto px-4 relative z-10">
				<div className="flex flex-col items-center text-center max-w-4xl mx-auto">
					<motion.h1
						className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6"
						initial="hidden"
						animate="visible"
						variants={titleVariants}
					>
						Community-Powered Funding for Innovative Web3 Ideas
					</motion.h1>

					<motion.div
						className="flex items-center justify-center h-12 mb-8"
						initial="hidden"
						animate="visible"
						variants={subtitleVariants}
					>
						<div className="text-xl md:text-2xl font-semibold">
							Building{" "}
							<span className="relative inline-block text-left">
								<span className="text-primary font-extrabold">
									{displayText}?
									<motion.span
										className="absolute bottom-0 left-0 w-full h-1 bg-primary"
										initial={{ scaleX: 0 }}
										animate={{ scaleX: 1 }}
										transition={{ duration: 0.5, ease: "easeOut" }}
									/>
								</span>
							</span>
						</div>
					</motion.div>

					<motion.p
						className="text-lg md:text-xl text-muted-foreground mb-10"
						initial="hidden"
						animate="visible"
						variants={subtitleVariants}
					>
						Pitch your blockchain idea to our community of backers for
						validation, funding, and smooth development—without the hassle.
					</motion.p>

					<motion.div
						className="flex flex-col sm:flex-row gap-4 w-full justify-center"
						initial="hidden"
						animate="visible"
						variants={buttonVariants}
					>
						{/* Wrap Button with motion.div to use whileHover */}
						<motion.div whileHover={{ scale: 1.05 }}>
							<Button size="lg" className="group relative overflow-hidden px-8">
								Get Started
								<ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
							</Button>
						</motion.div>

						<motion.div whileHover={{ scale: 1.05 }}>
							<Button size="lg" variant="outline" className="group">
								<Sparkles className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
								Browse Projects
							</Button>
						</motion.div>
					</motion.div>
				</div>
			</div>
			{/* CSS for particle animation */}
			<style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-40px) translateX(20px);
          }
          50% {
            transform: translateY(-20px) translateX(40px);
          }
          75% {
            transform: translateY(-40px) translateX(-20px);
          }
        }
      `}</style>
		</div>
	);
};

export default Hero;
