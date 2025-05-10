"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

interface ImageUploadProps {
	value: string;
	onChange: (value: string) => void;
	onRemove: () => void;
}

export function ImageUpload({ value, onChange, onRemove }: ImageUploadProps) {
	const onDrop = useCallback(
		async (acceptedFiles: File[]) => {
			try {
				const file = acceptedFiles[0];
				const formData = new FormData();
				formData.append("file", file);

				const response = await fetch("/api/upload", {
					method: "POST",
					body: formData,
				});

				if (!response.ok) throw new Error("Upload failed");

				const data = await response.json();
				onChange(data.url);
				toast.success("Image uploaded successfully");
			} catch {
				toast.error("Failed to upload image");
			}
		},
		[onChange],
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			"image/*": [".png", ".jpg", ".jpeg", ".gif"],
		},
		maxFiles: 1,
	});

	return (
		<div className="space-y-4">
			{value ? (
				<div className="relative aspect-video w-full overflow-hidden rounded-lg">
					<Image
						src={value}
						alt="Uploaded image"
						fill
						className="object-cover"
					/>
					<Button
						type="button"
						variant="destructive"
						size="icon"
						className="absolute right-2 top-2"
						onClick={onRemove}
					>
						<X className="h-4 w-4" />
					</Button>
				</div>
			) : (
				<div
					{...getRootProps()}
					className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-8 transition-colors ${
						isDragActive
							? "border-primary bg-primary/5"
							: "border-muted-foreground/25"
					}`}
				>
					<input {...getInputProps()} />
					<div className="text-center">
						<p className="text-sm text-muted-foreground">
							{isDragActive
								? "Drop the image here"
								: "Drag & drop an image here, or click to select"}
						</p>
						<p className="mt-1 text-xs text-muted-foreground">
							PNG, JPG, JPEG or GIF (max. 5MB)
						</p>
					</div>
				</div>
			)}
		</div>
	);
}
