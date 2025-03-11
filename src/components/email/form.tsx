'use client'

//import { useActionState, useEffect } from "react"
import { useFormState } from "react-dom"
import { SubmitButton } from '@/components/email/button'
import { sendEmail } from '@/actions'

const initialState = {
  name: '',
  email: '',
  subject: '',
  message: ''
}

export function ContactForm() {
  const [state, action] = useFormState(sendEmail, initialState)
  // const [state, action, pending] = useActionState(sendEmail, initialState)


  // async function handleSubmit(formData: FormData) {
  //   await sendEmail(formData)
  //   // const result = await sendEmail(formData)

  //   //   if (result.success) {
  //   //     toast({
  //   //       title: "Success",
  //   //       description: result.success,
  //   //     })
  //   //   } else {
  //   //     toast({
  //   //       variant: "destructive",
  //   //       title: "Error",
  //   //       description: result.error,
  //   //     })
  //   //   }
  // }

  return (
    <form action={action} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-gray-400">
          Nome
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Seu nome"
          required
          className="w-full bg-[#111] rounded-xl p-4 border-0 focus:ring-1 focus:ring-gray-400 placeholder:text-gray-600"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-gray-400">
          E-mail
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Seu e-mail"
          required
          className="w-full bg-[#111] rounded-xl p-4 border-0 focus:ring-1 focus:ring-gray-400 placeholder:text-gray-600"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="block text-gray-400">
          Mensagem
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Digite sua mensagem..."
          required
          rows={6}
          className="w-full bg-[#111] rounded-xl p-4 border-0 focus:ring-1 focus:ring-gray-400 placeholder:text-gray-600 resize-none"
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
        <SubmitButton />
      </div>
    </form>
  )
}
