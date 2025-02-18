// "use server"
// import Image from "next/image";
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
  <div style={{
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#dffce8',
    padding: '20px',
    borderRadius: '10px',
    maxWidth: '600px',
    margin: 'auto',
  }}>
    <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img src="https://i.postimg.cc/RZtm3Zct/project.png" alt="Boundless Logo" width={'150'} height={'100'} style={{ maxWidth: '150px' }} />
      </div>
      <h1 style={{ color: '#194247', textAlign: 'center' }}>Hello, {name || "Boundless User"}</h1>
      {otp && (
        <>
          <p style={{ textAlign: 'center', fontSize: '16px', color: '#333' }}>
            Your OTP for account verification is:
          </p>
          <p style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', color: '#194247' }}>{otp}</p>
          <p style={{ textAlign: 'center', fontSize: '14px', color: '#666' }}>
            This OTP will expire in 10 minutes.
          </p>
        </>
      )}
      {resetUrl && (
        <>
          <p style={{ textAlign: 'center', fontSize: '16px', color: '#333' }}>
            Click the button below to reset your password:
          </p>
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <a href={resetUrl} style={{
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: '#194247',
              color: '#ffffff',
              textDecoration: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              fontWeight: 'bold'
            }}>
              Reset Password
            </a>
          </div>
          <p style={{ textAlign: 'center', fontSize: '14px', color: '#666', marginTop: '10px' }}>
            This link will expire in 10 minutes.
          </p>
        </>
      )}
      <p style={{ textAlign: 'center', fontSize: '14px', color: '#666', marginTop: '20px' }}>
        If you didn&apos;t request this, please ignore this email.
      </p>
    </div>
  </div>
);

export default EmailTemplate;
