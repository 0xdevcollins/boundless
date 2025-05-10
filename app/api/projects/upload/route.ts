import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.config";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function POST(request: Request) {
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user?.id) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 }
			);
		}

		const formData = await request.formData();
		const projectId = formData.get("projectId") as string;
		const pitchDeck = formData.get("pitchDeck") as File | null;
		const whitepaper = formData.get("whitepaper") as File | null;

		if (!projectId) {
			return NextResponse.json(
				{ error: "Project ID is required" },
				{ status: 400 }
			);
		}

		// Verify project ownership
		const project = await prisma.project.findFirst({
			where: {
				id: projectId,
				userId: session.user.id,
			},
		});

		if (!project) {
			return NextResponse.json(
				{ error: "Project not found or unauthorized" },
				{ status: 404 }
			);
		}

		const uploadsDir = join(process.cwd(), "public", "uploads", "projects", projectId);
		const updateData: { pitchDeck?: string; whitepaper?: string } = {};

		// Handle pitch deck upload
		if (pitchDeck) {
			const pitchDeckPath = join(uploadsDir, "pitch-deck.pdf");
			const pitchDeckBuffer = Buffer.from(await pitchDeck.arrayBuffer());
			await writeFile(pitchDeckPath, pitchDeckBuffer);
			updateData.pitchDeck = `/uploads/projects/${projectId}/pitch-deck.pdf`;
		}

		// Handle whitepaper upload
		if (whitepaper) {
			const whitepaperPath = join(uploadsDir, "whitepaper.pdf");
			const whitepaperBuffer = Buffer.from(await whitepaper.arrayBuffer());
			await writeFile(whitepaperPath, whitepaperBuffer);
			updateData.whitepaper = `/uploads/projects/${projectId}/whitepaper.pdf`;
		}

		// Update project with file URLs
		if (Object.keys(updateData).length > 0) {
			await prisma.project.update({
				where: { id: projectId },
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				data: updateData as any,
			});
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Error uploading project documents:", error);
		return NextResponse.json(
			{ error: "Failed to upload project documents" },
			{ status: 500 }
		);
	}
} 
