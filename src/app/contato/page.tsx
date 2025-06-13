"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendMail } from "@/lib/mail";
import { toast } from "sonner";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Por favor, insira seu nome" }),
  email: z.string().email({ message: "Por favor, insira um email válido" }),
  message: z
    .string()
    .min(10, {
      message: "Sua mensagem deve ter pelo menos 10 caracteres",
    }),
});

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof contactFormSchema>) => {
    const mailText = `Nome: ${values.name}\nEmail: ${values.email}\nMensagem: ${values.message}`;
    
    const response = await sendMail({
      email: values.email,
      subject: "Novo Formulário de Contato",
      text: mailText,
    });

    if (response?.messageId) {
      toast.success("Mensagem enviada com sucesso!");
      reset();
    } else {
      toast.error("Falha ao enviar mensagem.");
    }
  };

  return (
    <form
      className="grid grid-cols-1 gap-6 p-4 lg:p-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium lg:text-base">
          Nome:
        </label>
        <input
          id="name"
          type="text"
          placeholder="João Silva"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          {...register("name")}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium lg:text-base">
          Email:
        </label>
        <input
          id="email"
          type="email"
          placeholder="joao@exemplo.com"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          {...register("email")}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium lg:text-base">
          Mensagem:
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder="Digite sua mensagem aqui..."
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          {...register("message")}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
}