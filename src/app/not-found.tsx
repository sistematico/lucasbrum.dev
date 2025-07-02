import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404",
  description: "Error 404",
};

export default function NotFound() {
  return (
    <section>
      <h1 className="font-medium text-2xl mb-8">404 - Página não encontrada</h1>
      <Image
        src="/vincent.gif"
        alt="Página não encontrada"
        width={500}
        height={500}
        className="w-full mb-8"
      />
      <p className="mb-4">
        Parece a página que está tentando acessar não existe ou foi removida.<br />
        <Link href="/" className="inline-block p-3 rounded-md bg-black/50 text-white">Voltar</Link>
      </p>
    </section>
  );
}
