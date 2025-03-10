import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_ADDR,
    pass: process.env.GMAIL_PASS
  }
})

export async function sendMail({
  name,
  email,
  subject,
  text
}: {
  name?: string
  email: string
  subject: string
  text: string
}) {

  const message = `E-mail from ${name} (${email}) \n\n ${text}`

  try {
    const mail = await transporter.sendMail({
      from: process.env.GMAIL_ADDR,
      to: email,
      subject,
      text: message,
      html: message
    })

    return { message: `Message Sent ${mail.messageId}` } 
  } catch (error) {
    return { message: 'Something Went Wrong', error }
  }
}
