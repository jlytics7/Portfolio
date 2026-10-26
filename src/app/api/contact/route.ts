import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * Contact form API route.
 *
 * Receives { name, email, subject, message } from the portfolio contact form
 * and sends an email to jessica.lindsey728@gmail.com via Gmail SMTP.
 *
 * Required environment variables (set in Vercel → Settings → Environment
 * Variables):
 *   GMAIL_USER       - your Gmail address (e.g. jessica.lindsey728@gmail.com)
 *   GMAIL_APP_PASSWORD - Gmail App Password (16 chars, not your normal password)
 *   RECIPIENT_EMAIL  - where messages are delivered (defaults to GMAIL_USER)
 */

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
    };

    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 },
      );
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
    const recipient = process.env.RECIPIENT_EMAIL ?? gmailUser;

    if (!gmailUser || !gmailAppPassword) {
      console.error("GMAIL_USER or GMAIL_APP_PASSWORD not configured");
      return NextResponse.json(
        { error: "Contact form is not configured on the server." },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${gmailUser}>`,
      to: recipient,
      subject: `[Portfolio] ${subject}`,
      text: `
New message from your portfolio contact form:

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
Sent from jessicamiranda.dev portfolio
      `,
      html: `
        <h2>New message from your portfolio contact form</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <pre style="white-space: pre-wrap; font-family: inherit;">${message}</pre>
        <hr />
        <p style="color: #666; font-size: 0.9em;">Sent from jessicamiranda.dev portfolio</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 },
    );
  }
}