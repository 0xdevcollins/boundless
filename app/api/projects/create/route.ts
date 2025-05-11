import { authOptions } from "@/lib/auth.config";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});
export async function POST(request: Request) {
	const session = await getServerSession(authOptions);

	if (!session || !session.user?.id) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}
	try {
		const formData = await request.formData();
		const projectId = formData.get("projectId") as string;
		const signedTx = formData.get("signedTx") as string;
		const title = formData.get("title") as string;
		const description = formData.get("description") as string;
		const fundingGoal = Number(formData.get("fundingGoal"));
		const category = formData.get("category") as string;
		const bannerImage = formData.get("bannerImage") as File | null;
		const bannerImageUrl = formData.get("bannerImageUrl") as string | null;
		const profileImage = formData.get("profileImage") as File | null;
		const profileImageUrl = formData.get("profileImageUrl") as string | null;

		if (!title || !description || !fundingGoal || !category) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 },
			);
		}

		let bannerUrl = bannerImageUrl;
		let profileUrl = profileImageUrl;

		if (bannerImage) {
			const bannerResult = await uploadToCloudinary(bannerImage);
			bannerUrl = bannerResult.secure_url;
		}

		if (profileImage) {
			const profileResult = await uploadToCloudinary(profileImage);
			profileUrl = profileResult.secure_url;
		}

		const project = await prisma.project.create({
			data: {
				id: projectId,
				userId: session.user.id,
				title,
				description,
				fundingGoal,
				category,
				bannerUrl,
				profileUrl,
				blockchainTx: signedTx || null,
			},
		});

		return NextResponse.json({ success: true, project }, { status: 201 });
	} catch (error) {
		console.error("Project creation error:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}

async function uploadToCloudinary(file: File) {
	const buffer = await file.arrayBuffer();
	const base64 = Buffer.from(buffer).toString("base64");
	const dataURI = `data:${file.type};base64,${base64}`;

	return new Promise<{ secure_url: string }>((resolve, reject) => {
		cloudinary.uploader.upload(
			dataURI,
			{
				resource_type: "auto",
				folder: "project_images",
			},
			(error, result) => {
				if (error) reject(error);
				else resolve(result as { secure_url: string });
			},
		);
	});
}
