import { authOptions } from "@/lib/auth.config";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadToCloudinary(file: File, folder: string) {
	const buffer = await file.arrayBuffer();
	const base64 = Buffer.from(buffer).toString("base64");
	const dataURI = `data:${file.type};base64,${base64}`;

	return new Promise<{ secure_url: string }>((resolve, reject) => {
		cloudinary.uploader.upload(
			dataURI,
			{
				resource_type: "raw",
				folder: `project_documents/${folder}`,
			},
			(error, result) => {
				if (error) reject(error);
				else resolve(result as { secure_url: string });
			},
		);
	});
}

export async function POST(
	request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user?.id) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { id } = await params;
		const projectId = id;

		// Check if project exists and user has access
		const project = await prisma.project.findUnique({
			where: {
				id: projectId,
				userId: session.user.id,
			},
		});

		if (!project) {
			return NextResponse.json({ error: "Project not found" }, { status: 404 });
		}

		const formData = await request.formData();
		const pitchDeck = formData.get("pitchDeck") as File | null;
		const whitepaper = formData.get("whitepaper") as File | null;
		const pitchDeckUrl = formData.get("pitchDeckUrl") as string | null;
		const whitepaperUrl = formData.get("whitepaperUrl") as string | null;

		const updateData: { pitchDeck?: string; whitepaper?: string } = {};

		// Handle pitch deck upload
		if (pitchDeck) {
			try {
				const result = await uploadToCloudinary(pitchDeck, "pitch_decks");
				updateData.pitchDeck = result.secure_url;
			} catch (error) {
				console.error(
					"[PROJECT_DOCUMENTS_POST] Failed to upload pitch deck:",
					error,
				);
				return NextResponse.json(
					{ error: "Failed to upload pitch deck" },
					{ status: 500 },
				);
			}
		} else if (pitchDeckUrl) {
			updateData.pitchDeck = pitchDeckUrl;
		}

		// Handle whitepaper upload
		if (whitepaper) {
			try {
				const result = await uploadToCloudinary(whitepaper, "whitepapers");
				updateData.whitepaper = result.secure_url;
			} catch (error) {
				console.error(
					"[PROJECT_DOCUMENTS_POST] Failed to upload whitepaper:",
					error,
				);
				return NextResponse.json(
					{ error: "Failed to upload whitepaper" },
					{ status: 500 },
				);
			}
		} else if (whitepaperUrl) {
			updateData.whitepaper = whitepaperUrl;
		}

		// Update project with document URLs
		if (Object.keys(updateData).length > 0) {
			try {
				await prisma.project.update({
					where: { id: projectId },
					data: updateData,
				});
			} catch (error) {
				console.error(
					"[PROJECT_DOCUMENTS_POST] Failed to update project:",
					error,
				);
				return NextResponse.json(
					{ error: "Failed to update project with document URLs" },
					{ status: 500 },
				);
			}
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("[PROJECT_DOCUMENTS_POST]", error);
		return NextResponse.json({ error: "Internal error" }, { status: 500 });
	}
}

export async function GET(
	request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user?.id) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { id } = await params;
		const projectId = id;

		// Check if project exists and user has access
		const project = await prisma.project.findUnique({
			where: {
				id: projectId,
				userId: session.user.id,
			},
		});

		if (!project) {
			return NextResponse.json({ error: "Project not found" }, { status: 404 });
		}

		// Get project documents
		const documents = {
			pitchDeck: project.pitchDeck,
			whitepaper: project.whitepaper,
		};

		return NextResponse.json({ documents });
	} catch (error) {
		console.error("[PROJECT_DOCUMENTS_GET]", error);
		return NextResponse.json({ error: "Internal error" }, { status: 500 });
	}
}
