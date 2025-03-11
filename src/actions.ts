'use server'

import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_ADDR,
    pass: process.env.GMAIL_PASS
  }
})

// export async function sendEmail(formData: FormData) {
// Define a proper return type
type EmailResponseState = {
  message: string;
  error?: unknown;
}

// Modify the function to match the expected signature for useActionState
export async function sendEmail(
  state: EmailResponseState | null,
  formData: FormData
): Promise<EmailResponseState> {

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const subject = formData.get('subject') as string
  const message = formData.get('message') as string
  // const message = `E-mail from ${name} (${email}) \n\n ${text}`

  try {
    const mail = await transporter.sendMail({
      from: `${name} <${email}>`,
      to: process.env.GMAIL_ADDR,
      subject,
      text: message,
      html: message
    })

    return { message: `Message Sent ${mail.messageId}` }
  } catch (error) {
    return { message: 'Something Went Wrong', error }
  }

  // if (!email || !message) {
  //   return { error: "All fields are required" }
  // }

  // if (!process.env.RESEND_TO_EMAIL_ADDRESS) {
  //  return { error: "Missing environment variable: RESEND_TO_EMAIL_ADDRESS" }
  // }

  // const data = await resend.emails.send({
  //   from: "Acme <onboarding@resend.dev>",
  //   to: process.env.RESEND_TO_EMAIL_ADDRESS,
  //   subject: "New Contact Form Submission",
  //   text: `
  //     Email: ${email}
  //     Message: ${message}
  //   `,
  // })

  //   return { success: "Email sent successfully", data }
  // } catch (error) {
  //   return { error: error?.message || "Failed to send email" }
  // }
}
