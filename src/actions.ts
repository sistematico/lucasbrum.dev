'use server'

import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_ADDR,
    pass: process.env.GMAIL_PASS
  }
})

export async function sendEmail(formData: FormData) {
  const email = formData.get('email') as string
  const message = formData.get('message') as string

  // const message = `E-mail from ${name} (${email}) \n\n ${text}`

  try {
    const mail = await transporter.sendMail({
      from: process.env.GMAIL_ADDR,
      to: email,
      // subject,
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
