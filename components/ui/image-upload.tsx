"use client";

import { Loader2, Upload, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { Button } from "./button";

interface ImageUploadProps {
	value?: string;
	onChange: (value: string) => void;
	onRemove: () => void;
	aspectRatio?: string;
}

export function ImageUpload({
	value,
	onChange,
	onRemove,
	aspectRatio = "1:1",
}: ImageUploadProps) {
	const [isUploading, setIsUploading] = useState(false);

	const onDrop = useCallback(
		async (acceptedFiles: File[]) => {
			try {
				setIsUploading(true);
				const file = acceptedFiles[0];

				if (!file) return;

				// Create a FormData instance
				const formData = new FormData();
				formData.append("file", file);

				// Upload through our API route
				const response = await fetch("/api/upload", {
					method: "POST",
					body: formData,
				});

				if (!response.ok) {
					throw new Error("Upload failed");
				}

				const data = await response.json();

				if (data.error) {
					throw new Error(data.error);
				}

				onChange(data.url);
				toast.success("Image uploaded successfully");
			} catch (error) {
				console.error("Error uploading file:", error);
				toast.error("Failed to upload image");
			} finally {
				setIsUploading(false);
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
		disabled: isUploading,
	});

	// Calculate height based on aspect ratio
	const [width, height] = aspectRatio.split(":").map(Number);
	const paddingTop = `${(height / width) * 100}%`;

	return (
		<div className="space-y-4 w-full max-w-[300px]">
			<div
				style={{ paddingTop }}
				className="relative w-full bg-muted border-2 border-dashed rounded-lg overflow-hidden"
			>
				{value ? (
					<div className="absolute inset-0">
						<Image
							src={value}
							alt="Uploaded image"
							fill
							className="object-cover"
						/>
						<div className="absolute top-2 right-2">
							<Button
								type="button"
								onClick={onRemove}
								variant="destructive"
								size="icon"
								className="h-6 w-6"
							>
								<X className="h-4 w-4" />
							</Button>
						</div>
					</div>
				) : (
					<div
						{...getRootProps()}
						className="absolute inset-0 flex items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors"
					>
						<input {...getInputProps()} />
						<div className="text-center p-4">
							{isUploading ? (
								<Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
							) : (
								<>
									<Upload className="mx-auto h-6 w-6 text-muted-foreground" />
									<p className="mt-2 text-sm text-muted-foreground">
										{isDragActive ? "Drop it here" : "Upload image"}
									</p>
								</>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
