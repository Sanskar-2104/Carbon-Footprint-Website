import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});


export const sendVerificationMail = async (email, token) => {
    // const verificationLink = `${process.env.FRONTEND_URL}/verify-email/${token}`;
    const verificationLink = `http://localhost:5000/api/auth/verify-email/${token}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Verify your Email",
        html: `<p>Click the link below to verify your email:</p>
        <a href="${verificationLink}">${verificationLink}</a>`
    };

    await transporter.sendMail(mailOptions);
};

