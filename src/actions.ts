'use server'

import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_ADDR,
    pass: process.env.GMAIL_PASS
  }
})

type EmailResponseState = {
  message: string;
  error?: unknown;
  ok?: boolean;
}

export async function sendEmail(
  state: EmailResponseState | null,
  formData: FormData
): Promise<EmailResponseState> {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const subject = formData.get('subject') as string
  const message = formData.get('message') as string

  try {
    const mail = await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.GMAIL_ADDR,
      subject,
      text: message,
      html: message
    })

    return { message: `Message Sent ${mail.messageId}`, ok: true }
  } catch (error) {
    return { message: 'Something Went Wrong', error, ok: false }
  }
}
