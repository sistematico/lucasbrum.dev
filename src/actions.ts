'use server'

import nodemailer from 'nodemailer'
import { EmailResponse } from '@/types'


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_ADDR,
    pass: process.env.GMAIL_PASS
  }
})

export async function sendEmail(
  state: EmailResponse | null,
  formData: FormData
): Promise<EmailResponse> {
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

    return { message: `Mensagem enviada ${mail.messageId}`, ok: true }
  } catch (error) {
    return { message: 'Houve um erro no envio da mensagem', error, ok: false }
  }
}
