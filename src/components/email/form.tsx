'use client'

import { useActionState, useState, useEffect } from 'react'
import { SubmitButton } from '@/components/email/button'
import { CheckCircle } from 'lucide-react'
import { sendEmail } from '@/actions'

const initialState = {
  name: '',
  email: '',
  subject: '',
  message: ''
}

export function ContactForm() {
  const [state, action] = useActionState(sendEmail, initialState)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showNewMessageButton, setShowNewMessageButton] = useState(false)

  // useEffect(() => {
  //   if (state && state.ok) setIsSubmitted(true)
  // }, [state])

  useEffect(() => {
    if (state && state.ok) {
      setIsSubmitted(true)

      // Adiciona um delay de 5 segundos antes de mostrar o botão de nova mensagem
      const timer = setTimeout(() => {
        setShowNewMessageButton(true)
      }, 5000)

      // Limpeza do timer quando o componente for desmontado
      return () => clearTimeout(timer)
    }
  }, [state])

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center p-6 space-y-3 bg-[#111] rounded-xl text-center">
        <CheckCircle className="w-16 h-16 text-green-500" />
        <h3 className="text-2xl font-medium text-white py-0">
          Mensagem Enviada!
        </h3>
        <p className="text-gray-400">
          Obrigado por entrar em contato. Retornarei o mais breve possível.
        </p>

        {showNewMessageButton && (
          // <button
          //   onClick={() => {
          //     setIsSubmitted(false)
          //     setShowNewMessageButton(false)
          //   }}
          //   className="mt-4 bg-[#cbcbcb] dark:bg-[#222] dark:hover:bg-[#333] hover:bg-gray-300 text-[#111] dark:text-white px-6 py-3 rounded-md font-medium transition-all duration-300 ease-in-out"
          // >
          //   Enviar nova mensagem
          // </button>

          <button
            onClick={() => setIsSubmitted(false)}
            className="cursor-ponter mt-4 bg-[#cbcbcb] dark:bg-[#222] dark:hover:bg-[#333] hover:bg-gray-300 text-[#111] dark:text-white px-6 py-3 rounded-md font-medium transition-all duration-300 ease-in-out"
          >
            Enviar nova mensagem
          </button>
        )}
      </div>
    )
  }

  return (
    <form action={action} className="space-y-5">
      <div className="flex w-full gap-x-4">
        <div className="flex-1 space-y-2">
          <label htmlFor="name" className="block text-gray-400">
            Nome
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Seu nome"
            value="Anônimo"
            required
            className="w-full bg-[#111] rounded-xl p-4 border-0 focus:ring-1 focus:ring-gray-400 placeholder:text-gray-600"
          />
        </div>

        <div className="flex-1 space-y-2">
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
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className="block text-gray-400">
          Assunto
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          placeholder="Assunto"
          className="w-full bg-[#111] rounded-xl p-4 border-0 focus:ring-1 focus:ring-gray-400 placeholder:text-gray-600"
          required
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

      <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 cursor-ponter ">
        <SubmitButton />
      </div>
    </form>
  )
}
