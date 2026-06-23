import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const BACKEND_BASE_URL = (
  process.env.BACKEND_BASE_URL || `http://localhost:${process.env.PORT || 5000}`
).replace(/\/$/, '');

const FRONTEND_BASE_URL = (process.env.FRONTEND_BASE_URL || `http://localhost:3000`).replace(
  /\/$/,
  ''
);

const transporter = nodemailer.createTransport({
  host: 'smtp.mailgun.org',
  port: 587,
  auth: {
    user: process.env.MAILGUN_SMTP_LOGIN,
    pass: process.env.MAILGUN_SMTP_PASSWORD,
  },
});

const sender = {
  name: process.env.MAILGUN_SENDER_NAME || 'Carbon Footprint App',
  address: process.env.MAILGUN_SENDER_EMAIL || process.env.MAILGUN_SMTP_LOGIN,
};

export const sendVerificationMail = async (email, token) => {
  const verificationLink = `${BACKEND_BASE_URL}/api/auth/verify-email/${token}`;

  try {
    const info = await transporter.sendMail({
      from: `"${sender.name}" <${sender.address}>`,
      to: email,
      subject: 'Verify your Email',
      html: `<p>Click the link below to verify your email:</p>
          <a href="${verificationLink}">${verificationLink}</a>`,
    });
    console.log('Verification email sent to', email, 'MessageId:', info.messageId);
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
};

export const sendResetPasswordMail = async (email, token) => {
  const resetLink = `${FRONTEND_BASE_URL}/reset-password/${token}`;

  try {
    const info = await transporter.sendMail({
      from: `"${sender.name}" <${sender.address}>`,
      to: email,
      subject: 'Reset your Password',
      html: `<p>Click the link below to reset your password:</p>
          <a href="${resetLink}">${resetLink}</a>`,
    });
    console.log('Password reset email sent to', email, 'MessageId:', info.messageId);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};
