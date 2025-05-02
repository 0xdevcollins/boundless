import { sendVerificationEmail as sendVerificationEmailNodemailer } from './nodemailer';
import { sendPasswordResetEmail as sendPasswordResetEmailNodemailer } from './nodemailer';
import { resendOTP as resendOTPNodemailer } from './nodemailer';

export const sendVerificationEmail = sendVerificationEmailNodemailer;
export const sendPasswordResetEmail = sendPasswordResetEmailNodemailer;
export const resendOTP = resendOTPNodemailer;
