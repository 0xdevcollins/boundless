"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const milestoneFormSchema = z.object({
	title: z.string().min(1, "Title is required"),
	description: z.string().min(1, "Description is required"),
	dueDate: z.string().optional(),
	progress: z.number().min(0).max(100).optional(),
});

type MilestoneFormValues = z.infer<typeof milestoneFormSchema>;

interface MilestoneFormProps {
	projectId: string;
	onSuccess?: () => void;
}

export function MilestoneForm({ projectId, onSuccess }: MilestoneFormProps) {
	const [open, setOpen] = useState(false);

	const form = useForm<MilestoneFormValues>({
		resolver: zodResolver(milestoneFormSchema),
		defaultValues: {
			title: "",
			description: "",
			dueDate: "",
			progress: 0,
		},
	});

	async function onSubmit(data: MilestoneFormValues) {
		try {
			const response = await fetch(`/api/projects/${projectId}/milestones`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				throw new Error("Failed to create milestone");
			}

			toast.success("Milestone created successfully");

			form.reset();
			setOpen(false);
			onSuccess?.();
		} catch (error) {
			toast.error("Failed to create milestone");
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button size="sm">
					<Plus className="mr-2 h-4 w-4" /> Add Milestone
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add New Milestone</DialogTitle>
					<DialogDescription>
						Create a new milestone for your project. Fill in the details below.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input placeholder="Enter milestone title" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Enter milestone description"
											className="min-h-[100px]"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="dueDate"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Due Date</FormLabel>
									<FormControl>
										<Input type="date" {...field} />
									</FormControl>
									<FormDescription>
										Optional: Set a target completion date
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="progress"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Progress</FormLabel>
									<FormControl>
										<Input
											type="number"
											min="0"
											max="100"
											{...field}
											onChange={(e) => field.onChange(Number(e.target.value))}
										/>
									</FormControl>
									<FormDescription>
										Set the current progress (0-100%)
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button type="submit">Create Milestone</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
