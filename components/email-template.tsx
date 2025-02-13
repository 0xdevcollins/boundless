import * as React from "react";

interface EmailTemplateProps {
  name: string;
  otp?: string;
  resetUrl?: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  otp,
  resetUrl,
}) => (
  <div>
    <h1>Hello, {name || "Boundless User"}</h1>
    {otp && (
      <>
        <p>Your OTP for account verification is: <strong>{otp}</strong></p>
        <p>This OTP will expire in 10 minutes.</p>
      </>
    )}
    {resetUrl && (
      <>
        <p>Click the link below to reset your password:</p>
        <a href={resetUrl}>{resetUrl}</a>
        <p>This link will expire in 10 mintues.</p>
      </>
    )}
    <p>If you didn&apos;t request this, please ignore this email.</p>
  </div>
);

export default EmailTemplate;

