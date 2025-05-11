import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const ids = searchParams.get("ids")?.split(",");

		if (!ids || ids.length === 0) {
			return NextResponse.json(
				{ error: "No user IDs provided" },
				{ status: 400 },
			);
		}

		if (!pool) {
			throw new Error("Database connection not initialized");
		}

		const query = `
      SELECT id, name, email, image
      FROM "User"
      WHERE id = ANY($1::text[])
    `;

		const result = await pool.query(query, [ids]);

		return NextResponse.json(result.rows);
	} catch (error) {
		console.error("[USERS_BATCH_GET]", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
