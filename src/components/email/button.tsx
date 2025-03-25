'use client'

import { ArrowRight, Loader2 } from 'lucide-react'
import { useFormStatus } from 'react-dom'

export function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="cursor-pointer bg-[#cbcbcb] dark:bg-[#111] dark:hover:bg-[#0e0e0e] hover:bg-gray-300 text-[#111] dark:text-white px-6 py-4 rounded-md font-medium inline-flex items-center justify-center gap-2 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:hover:bg-gray-200 w-full sm:w-auto"
    >
      {pending ? (
        <Loader2 className="w-6 h-6 animate-spin" />
      ) : (
        <>
          <span>Enviar</span>
          <ArrowRight className="w-6 h-6" />
        </>
      )}
    </button>
  )
}
