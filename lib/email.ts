// import fetch from 'node-fetch';
// const BASE_URL = process.env.NODE_ENV === 'production'
//   ? process.env.NEXT_PUBLIC_APP_URL
//   : 'http://localhost:3000';
// export async function sendVerificationEmail(to: string, firstName: string, otp: string) {
//   console.log("Sending verification email:", { to, firstName, otp })
//   try {
//     const response = await fetch(`${BASE_URL}/api/send`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         to,
//         subject: 'Verify Your Account',
//         firstName,
//         otp,
//       }),
//     });

//     if (!response.ok) {
//       const errorData = await response.json()
//       console.error("Email API response:", errorData)
//       throw new Error('Failed to send verification email');
//     }

//     console.log("Verification email sent successfully")
//     return await response.json()
//   } catch (error) {
//     console.error('Failed to send verification email:', error);
//     throw new Error('Failed to send verification email');
//   }
// }

// export async function sendPasswordResetEmail(to: string, firstName: string, token: string) {
//   const resetUrl = `${BASE_URL}/reset-password?token=${token}`;

//   console.log("Sending password reset email:", { to, firstName, resetUrl });
//   try {
//     const response = await fetch(`${BASE_URL}/api/send`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         to,
//         subject: 'Reset Your Password',
//         firstName,
//         resetUrl,
//       }),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       console.error("Email API response:", errorData);
//       throw new Error('Failed to send password reset email');
//     }

//     console.log("Password reset email sent successfully");
//     return await response.json();
//   } catch (error) {
//     console.error('Failed to send password reset email:', error);
//     throw new Error('Failed to send password reset email');
//   }
// }

