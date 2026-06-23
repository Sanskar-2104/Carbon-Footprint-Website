import { sendVerificationMail } from './config/nodemailer.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// Test send verification email
const testEmail = 'test@example.com';
const testToken = jwt.sign({ id: 'test123' }, process.env.JWT_SECRET || 'secret', {
  expiresIn: '1d',
});

console.log('Testing email send...');
console.log('Email:', testEmail);
console.log('Token:', testToken);
console.log('Mailtrap Config:', {
  host: process.env.MAILTRAP_HOST,
  user: process.env.MAILTRAP_USER,
  pass: process.env.MAILTRAP_PASS ? '***' : 'NOT SET',
  sender: process.env.MAILTRAP_SENDER_EMAIL,
});

sendVerificationMail(testEmail, testToken)
  .then(() => {
    console.log('Email sent successfully!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error:', err);
    process.exit(1);
  });
