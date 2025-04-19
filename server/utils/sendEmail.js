import nodemailer from "nodemailer";
import { configDotenv } from "dotenv";

configDotenv();

export const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: { user: process.env.SMTP_EMAIL, pass: process.env.SMTP_PASSWORD },
  });
  await transporter.sendMail({
    from: process.env.SMTP_EMAIL,
    to,
    subject,
    html,
  });
};
