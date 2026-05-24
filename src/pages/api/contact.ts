import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, email, subject, message } = req.body ?? {};

  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim())
    return res.status(400).json({ error: "All fields are required." });

  if (!EMAIL_RE.test(email))
    return res.status(400).json({ error: "Invalid email address." });

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS)
    return res.status(500).json({ error: "Email service is not configured." });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: "moatazarmash@gmail.com",
      replyTo: email,
      subject: `Portfolio: ${subject}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px">
          <h2 style="color:#007ced;margin-bottom:1rem">New message from your portfolio</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border:none;border-top:1px solid #eee;margin:1rem 0"/>
          <p style="white-space:pre-wrap">${message}</p>
        </div>
      `,
    });
    res.status(200).json({ success: true });
  } catch {
    res.status(500).json({ error: "Failed to send. Please try again." });
  }
}
