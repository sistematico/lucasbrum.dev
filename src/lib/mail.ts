"use server";

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSWORD,
  },
});

export async function sendMail({
  email,
  sendTo,
  subject,
  text,
  html,
}: {
  email: string;
  sendTo?: string;
  subject: string;
  text: string;
  html?: string;
}) {
  try {
    const isVerified = await transporter.verify();
  } catch (error) {
    console.error(
      "Something Went Wrong",
      process.env.GMAIL_ADDRESS,
      process.env.GMAIL_PASSWORD,
      error
    );
    return;
  }

  const info = await transporter.sendMail({
    from: email,
    to: sendTo || process.env.GMAIL_ADDRESS,
    subject: subject,
    text: text,
    html: html ? html : "",
  });

  console.log("Message Sent", info.messageId);
  console.log("Mail sent to", process.env.GMAIL_ADDRESS);

  return info;
}
