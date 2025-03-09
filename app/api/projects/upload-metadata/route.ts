import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadImage(file: File): Promise<string | null> {
	const buffer = await file.arrayBuffer();
	const base64 = Buffer.from(buffer).toString("base64");
	const dataURI = `data:${file.type};base64,${base64}`;

	return new Promise<string | null>((resolve, reject) => {
		cloudinary.uploader.upload(
			dataURI,
			{ resource_type: "auto", folder: "project_images" },
			(error, result) => {
				if (error) reject(null);
				else resolve(result?.secure_url || null);
			},
		);
	});
}

async function uploadMetadata(
	metadata: object,
): Promise<{ secure_url: string }> {
	const jsonStr = JSON.stringify(metadata);
	const buffer = Buffer.from(jsonStr);
	const base64 = buffer.toString("base64");
	const dataURI = `data:application/json;base64,${base64}`;

	return new Promise<{ secure_url: string }>((resolve, reject) => {
		cloudinary.uploader.upload(
			dataURI,
			{ resource_type: "raw", folder: "project_metadata" },
			(error, result) => {
				if (error) reject(error);
				else resolve(result as { secure_url: string });
			},
		);
	});
}

export async function POST(request: Request) {
	try {
		const formData = await request.formData();
		const title = formData.get("title") as string;
		const description = formData.get("description") as string;
		const category = formData.get("category") as string;
		const bannerImage = formData.get("bannerImage") as File | null;
		const profileImage = formData.get("profileImage") as File | null;

		if (!title || !description || !category) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 },
			);
		}

		let bannerUrl = null;
		let profileUrl = null;
		if (bannerImage) bannerUrl = await uploadImage(bannerImage);
		if (profileImage) profileUrl = await uploadImage(profileImage);

		const metadata = { title, description, category, bannerUrl, profileUrl };

		const metadataUpload = await uploadMetadata(metadata);

		return NextResponse.json(
			{ metadataUri: metadataUpload.secure_url },
			{ status: 201 },
		);
	} catch (error) {
		console.error("Metadata upload error:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
