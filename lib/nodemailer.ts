import nodemailer from "nodemailer";

// Create a transporter using SMTP
export const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: Number(process.env.SMTP_PORT),
	secure: process.env.SMTP_SECURE === "true",
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASSWORD,
	},
	tls: {
		rejectUnauthorized: false,
	},
});

export async function sendVerificationEmail(
	to: string,
	name: string,
	otp: string,
) {
	try {
		const mailOptions = {
			from: process.env.SMTP_FROM || "Boundless Team <noreply@boundlessfi.xyz>",
			to,
			subject: "Verify Your Account",
			html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Hello ${name},</h2>
          <p>Thank you for registering with Boundless. Please use the following OTP to verify your email address:</p>
          <div style="background-color: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0;">
            <h1 style="margin: 0; color: #333;">${otp}</h1>
          </div>
          <p>This OTP will expire in 10 minutes.</p>
          <p>If you didn't request this verification, please ignore this email.</p>
          <p>Best regards,<br>The Boundless Team</p>
        </div>
      `,
		};

		const info = await transporter.sendMail(mailOptions);
		console.log("Verification email sent:", info.messageId);
		return info;
	} catch (error) {
		console.error("Failed to send verification email:", error);
		throw new Error("Failed to send verification email");
	}
}

export async function sendPasswordResetEmail(
	to: string,
	name: string,
	token: string,
) {
	const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${token}`;

	try {
		const mailOptions = {
			from: process.env.SMTP_FROM || "Boundless Team <noreply@boundlessfi.xyz>",
			to,
			subject: "Reset Your Password",
			html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Hello ${name},</h2>
          <p>We received a request to reset your password. Please use the following OTP to reset your password:</p>
          <div style="background-color: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0;">
            <h1 style="margin: 0; color: #333;">${token}</h1>
          </div>
          <p>Or click the link below to reset your password:</p>
          <p><a href="${resetUrl}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a></p>
          <p>This link will expire in 10 minutes.</p>
          <p>If you didn't request this password reset, please ignore this email.</p>
          <p>Best regards,<br>The Boundless Team</p>
        </div>
      `,
		};

		const info = await transporter.sendMail(mailOptions);
		console.log("Password reset email sent:", info.messageId);
		return info;
	} catch (error) {
		console.error("Failed to send password reset email:", error);
		throw new Error("Failed to send password reset email");
	}
}

export async function resendOTP(to: string, name: string, otp: string) {
	try {
		const mailOptions = {
			from: process.env.SMTP_FROM || "Boundless Team <noreply@boundlessfi.xyz>",
			to,
			subject: "Your New OTP for Email Verification",
			html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Hello ${name},</h2>
          <p>Here is your new OTP for email verification:</p>
          <div style="background-color: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0;">
            <h1 style="margin: 0; color: #333;">${otp}</h1>
          </div>
          <p>This OTP will expire in 10 minutes.</p>
          <p>If you didn't request this verification, please ignore this email.</p>
          <p>Best regards,<br>The Boundless Team</p>
        </div>
      `,
		};

		const info = await transporter.sendMail(mailOptions);
		console.log("OTP email sent:", info.messageId);
		return info;
	} catch (error) {
		console.error("Failed to resend OTP:", error);
		throw new Error("Failed to resend OTP");
	}
}
