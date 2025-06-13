import type { Metadata } from "next";
import ContactForm from "@/components/form";

export const metadata: Metadata = {
  title: "Contato",
  description: "Entre em contato",
};

export default function ContactPage() {
  return <ContactForm />;
}