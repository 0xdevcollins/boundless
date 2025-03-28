import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Clear the authentication token (assuming JWT is stored in cookies)
  const cookie = serialize('auth_token', '', {
    path: '/', // Apply to all routes
    httpOnly: true, // Prevent client-side access
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    sameSite: 'strict', // CSRF protection
    expires: new Date(0), // Expire the cookie immediately
  });

  res.setHeader('Set-Cookie', cookie);
  return res.status(200).json({ message: 'Logout successful' });
}
