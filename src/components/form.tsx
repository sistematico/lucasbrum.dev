"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendMail } from "@/lib/mail";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { LuRefreshCcw } from "react-icons/lu";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Por favor, insira seu nome" }),
  email: z.string().email({ message: "Por favor, insira um email válido" }),
  message: z
    .string()
    .min(10, {
      message: "Sua mensagem deve ter pelo menos 10 caracteres",
    }),
  captcha: z.string().min(1, { message: "Por favor, resolva o captcha" }),
});

export default function ContactForm() {
  const [captchaQuestion, setCaptchaQuestion] = useState({ question: "", answer: 0 });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      captcha: "",
    },
  });

  // Gerar pergunta de captcha simples
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let answer;
    let question;
    
    switch (operation) {
      case '+':
        answer = num1 + num2;
        question = `${num1} + ${num2}`;
        break;
      case '-':
        // Garantir que o resultado seja positivo
        const larger = Math.max(num1, num2);
        const smaller = Math.min(num1, num2);
        answer = larger - smaller;
        question = `${larger} - ${smaller}`;
        break;
      case '*':
        // Usar números menores para multiplicação
        const smallNum1 = Math.floor(Math.random() * 5) + 1;
        const smallNum2 = Math.floor(Math.random() * 5) + 1;
        answer = smallNum1 * smallNum2;
        question = `${smallNum1} × ${smallNum2}`;
        break;
      default:
        answer = num1 + num2;
        question = `${num1} + ${num2}`;
    }
    
    setCaptchaQuestion({ question, answer });
  };

  // Inicializar captcha quando o componente monta
  useEffect(() => {
    generateCaptcha();
  }, []);

  // Countdown do cooldown
  useEffect(() => {
    if (cooldownTime > 0) {
      const timer = setTimeout(() => {
        setCooldownTime(cooldownTime - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldownTime]);

  const onSubmit = async (values: z.infer<typeof contactFormSchema>) => {
    // Verificar captcha
    if (parseInt(values.captcha) !== captchaQuestion.answer) {
      toast.error("Resposta do captcha incorreta. Tente novamente.");
      generateCaptcha(); // Gerar novo captcha
      setValue("captcha", ""); // Limpar campo captcha
      return;
    }

    const mailText = `Nome: ${values.name}\nEmail: ${values.email}\nMensagem: ${values.message}`;
    const response = await sendMail({
      email: values.email,
      subject: "Novo Formulário de Contato",
      text: mailText,
    });

    if (response?.messageId) {
      // Toast de sucesso
      toast.success("Mensagem enviada com sucesso!");
      
      // Mostrar mensagem de sucesso na página
      setShowSuccessMessage(true);
      
      // Iniciar cooldown de 30 segundos
      setCooldownTime(30);
      
      // Resetar formulário
      reset();
      
      // Gerar novo captcha
      generateCaptcha();
      
      // Esconder mensagem de sucesso após 10 segundos
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 10000);
      
    } else {
      toast.error("Falha ao enviar mensagem.");
      generateCaptcha(); // Gerar novo captcha mesmo em caso de erro
      setValue("captcha", ""); // Limpar campo captcha
    }
  };

  const isFormDisabled = isSubmitting || cooldownTime > 0;

  if (showSuccessMessage) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="mb-6 rounded-full bg-green-100 p-3">
          <svg
            className="h-8 w-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="mb-2 text-2xl font-bold text-green-600">
          Mensagem Enviada com Sucesso!
        </h2>
        <p className="mb-4 text-gray-600">
          Obrigado pelo seu contato. Responderemos em breve.
        </p>
        <button
          onClick={() => setShowSuccessMessage(false)}
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Enviar Nova Mensagem
        </button>
      </div>
    );
  }

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
          disabled={isFormDisabled}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
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
          disabled={isFormDisabled}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
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
          disabled={isFormDisabled}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          {...register("message")}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      {/* Captcha */}
      <div className="space-y-2">
        <label htmlFor="captcha" className="block text-sm font-medium lg:text-base">
          Verificação de Segurança:
        </label>
        <div className="flex items-center gap-3">
          <span className="rounded-md px-3 py-2 text-lg font-medium">
            {captchaQuestion.question} = ?
          </span>
          <input
            id="captcha"
            placeholder="Resposta"
            disabled={isFormDisabled}
            className="w-30 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            {...register("captcha")}
          />
          <button
            type="button"
            onClick={() => {
              generateCaptcha();
              setValue("captcha", "");
            }}
            disabled={isFormDisabled}
            className="rounded-md px-1 py-2 text-xl font-bold hover:text-gray-600 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          >
            <LuRefreshCcw />
          </button>
        </div>
        {errors.captcha && (
          <p className="mt-1 text-sm text-red-600">{errors.captcha.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isFormDisabled}
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting 
          ? "Enviando..." 
          : cooldownTime > 0 
          ? `Aguarde ${cooldownTime}s para enviar novamente`
          : "Enviar"
        }
      </button>

      {cooldownTime > 0 && (
        <p className="text-center text-sm text-gray-600">
          Para evitar spam, você pode enviar uma nova mensagem em {cooldownTime} segundos.
        </p>
      )}
    </form>
  );
}