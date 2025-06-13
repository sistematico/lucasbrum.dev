import type { Metadata } from "next";
import ContactForm from "@/components/form";

export const metadata: Metadata = {
  title: "Contato",
  description: "Entre em contato",
};

export default function ContactPage() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-medium">Contato</h1>
      <ContactForm />
    </section>
  );
}