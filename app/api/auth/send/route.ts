import EmailTemplate from "@/components/email-template";
import type * as React from "react";
import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
	console.error("RESEND_API_KEY is not set in the environment variables");
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
	try {
		const { to, subject, name, otp, resetUrl } = await req.json();

		if (!process.env.RESEND_API_KEY) {
			throw new Error("RESEND_API_KEY is not set in the environment variables");
		}

		console.log("Attempting to send email:", {
			to,
			subject,
			name,
			otp,
			resetUrl,
		});

		const { data, error } = await resend.emails.send({
			from: "Boundless Team <onboarding@resend.dev>",
			to: [to],
			subject: subject,
			react: EmailTemplate({ name, otp, resetUrl }) as React.ReactElement,
		});

		if (error) {
			console.error("Error sending email:", error);
			return Response.json({ error: error.message }, { status: 500 });
		}

		console.log("Email sent successfully:", data);

		return Response.json({ data });
	} catch (error) {
		console.error("Error in /api/auth/send:", error);
		return Response.json({ error: (error as Error).message }, { status: 500 });
	}
}
