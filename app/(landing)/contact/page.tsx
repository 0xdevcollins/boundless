"use client";

import PageTransition from "@/components/landing/components/PageTransition";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
	ArrowRight,
	Mail,
	MessageCircle,
	MessageSquare,
	Twitter,
	User,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Toaster } from "sonner";
import * as z from "zod";

// Form validation schema
const formSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	email: z.string().email("Invalid email address"),
	subject: z.string().min(5, "Subject must be at least 5 characters"),
	message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactPage() {
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Initialize form
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			subject: "",
			message: "",
		},
	});

	// Handle form submission
	async function onSubmit(data: FormValues) {
		try {
			setIsSubmitting(true);
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error || "Failed to send message");
			}

			toast.success(
				"Message sent successfully! Check your email for confirmation.",
			);
			form.reset();
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : "Failed to send message",
			);
		} finally {
			setIsSubmitting(false);
		}
	}

	const supportChannels = [
		{
			id: "discord",
			icon: <MessageCircle className="w-6 h-6" />,
			title: "Discord Community",
			description:
				"Join our Discord server for real-time support and community discussions.",
			link: "https://discord.gg/juUmBmwC3s",
			linkText: "Join Discord",
		},
		{
			id: "telegram",
			icon: <MessageSquare className="w-6 h-6" />,
			title: "Telegram Support",
			description: "Get direct support from our team through Telegram.",
			links: [
				{
					name: "Benjamin",
					link: "https://t.me/kitch_the_dev",
				},
				{
					name: "Collins",
					link: "https://t.me/devcollinss",
				},
			],
		},
		{
			id: "email",
			icon: <Mail className="w-6 h-6" />,
			title: "Email Support",
			description:
				"Send us an email and we'll get back to you as soon as possible.",
			email: "support@boundlessfi.xyz",
		},
	];

	return (
		<PageTransition>
			<Toaster
				position="top-center"
				expand={true}
				richColors
				closeButton
				theme="system"
			/>
			<div className="min-h-screen bg-background">
				{/* Hero Section */}
				<section className="relative py-24 md:py-32 overflow-hidden">
					{/* Background Pattern */}
					<div className="absolute inset-0">
						<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
						<div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
						<div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
					</div>

					<div className="container max-w-6xl mx-auto px-4 md:px-6 relative">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className="text-center max-w-3xl mx-auto"
						>
							<motion.div
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.5, delay: 0.2 }}
								className="inline-block bg-primary/10 px-4 py-2 rounded-full mb-6"
							>
								<span className="text-primary font-medium">Contact Us</span>
							</motion.div>

							<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
								Get in{" "}
								<span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
									Touch
								</span>
							</h1>

							<motion.p
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.3 }}
								className="text-lg md:text-xl text-muted-foreground mb-8"
							>
								Have questions or need support? We&apos;re here to help. Choose
								your preferred way to reach out.
							</motion.p>
						</motion.div>
					</div>
				</section>

				{/* Contact Form Section */}
				<section className="py-16 md:py-24 bg-muted/30">
					<div className="container max-w-6xl mx-auto px-4 md:px-6">
						<div className="grid lg:grid-cols-2 gap-12">
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.6 }}
							>
								<h2 className="text-3xl font-bold tracking-tighter mb-6">
									Send us a Message
								</h2>
								<p className="text-muted-foreground mb-8">
									Fill out the form below and we&apos;ll get back to you as soon
									as possible.
								</p>

								<Form {...form}>
									<form
										onSubmit={form.handleSubmit(onSubmit)}
										className="space-y-6"
									>
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
											<FormField
												control={form.control}
												name="name"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Name</FormLabel>
														<FormControl>
															<Input placeholder="Your name" {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="email"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Email</FormLabel>
														<FormControl>
															<Input
																type="email"
																placeholder="Your email"
																{...field}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
										<FormField
											control={form.control}
											name="subject"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Subject</FormLabel>
													<FormControl>
														<Input
															placeholder="What's this about?"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="message"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Message</FormLabel>
													<FormControl>
														<Textarea
															placeholder="Your message"
															className="min-h-[150px]"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<Button
											type="submit"
											size="lg"
											className="w-full sm:w-auto"
											disabled={isSubmitting}
										>
											{isSubmitting ? "Sending..." : "Send Message"}
											<ArrowRight className="ml-2 h-4 w-4" />
										</Button>
									</form>
								</Form>
							</motion.div>

							<motion.div
								initial={{ opacity: 0, x: 20 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.6 }}
								className="space-y-8"
							>
								<h2 className="text-3xl font-bold tracking-tighter mb-6">
									Other Ways to Connect
								</h2>

								<div className="space-y-6">
									{supportChannels.map((channel) => (
										<motion.div
											key={channel.id}
											initial={{ opacity: 0, y: 20 }}
											whileInView={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.5, delay: 0.1 }}
											className="bg-card border border-border p-6 rounded-lg"
										>
											<div className="flex items-start space-x-4">
												<div className="mt-1 bg-primary/10 p-3 rounded-full">
													{channel.icon}
												</div>
												<div className="flex-1">
													<h3 className="text-xl font-semibold mb-2">
														{channel.title}
													</h3>
													<p className="text-muted-foreground mb-4">
														{channel.description}
													</p>
													{channel.link && (
														<Button variant="outline" asChild>
															<Link
																href={channel.link}
																target="_blank"
																className="flex items-center"
															>
																{channel.linkText}
																<ArrowRight className="ml-2 h-4 w-4" />
															</Link>
														</Button>
													)}
													{channel.links && (
														<div className="space-y-2">
															{channel.links.map((link) => (
																<Button
																	key={link.name}
																	variant="outline"
																	asChild
																	className="w-full sm:w-auto"
																>
																	<Link
																		href={link.link}
																		target="_blank"
																		className="flex items-center"
																	>
																		<User className="mr-2 h-4 w-4" />
																		{link.name}
																	</Link>
																</Button>
															))}
														</div>
													)}
													{channel.email && (
														<Button variant="outline" asChild>
															<Link
																href={`mailto:${channel.email}`}
																className="flex items-center"
															>
																{channel.email}
																<Mail className="ml-2 h-4 w-4" />
															</Link>
														</Button>
													)}
												</div>
											</div>
										</motion.div>
									))}
								</div>

								<div className="pt-8">
									<h3 className="text-xl font-semibold mb-4">Follow Us</h3>
									<div className="flex space-x-4">
										<Button variant="outline" size="icon" asChild>
											<Link
												href="https://x.com/boundless_fi"
												target="_blank"
												className="flex items-center"
											>
												<Twitter className="h-5 w-5" />
											</Link>
										</Button>
										<Button variant="outline" size="icon" asChild>
											<Link
												href="https://discord.gg/juUmBmwC3s"
												target="_blank"
												className="flex items-center"
											>
												<MessageCircle className="h-5 w-5" />
											</Link>
										</Button>
									</div>
								</div>
							</motion.div>
						</div>
					</div>
				</section>
			</div>
		</PageTransition>
	);
}
