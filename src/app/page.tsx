import Link from "next/link";
import Image from "next/image";
import { socialLinks } from "@/config";

export default function Page() {
  return (
    <section>
      <Link 
        href={socialLinks.twitter} 
        target="_blank"
      >
        <Image
          src="/avatar.jpg"
          alt="Lucas"
          className="rounded-full ring-4 ring-gray-600 dark:ring-gray-500 bg-gray-100 block lg:mt-5 mt-0 lg:mb-5 mb-10 mx-auto sm:float-right sm:ml-5 sm:mb-5 grayscale-50 opacity-50"           
          unoptimized
          width={160}
          height={160}
          priority
        />
      </Link>
      <h1 className="mb-0 text-2xl font-medium">Desenvolvedor</h1>
      <h2 className="mb-8 text-md">FullStack & DevOps</h2>
      <div className="prose prose-neutral dark:prose-invert">
        <p>
          Há mais de duas décadas, desde 1999, mergulhei no universo Linux e
          nunca mais olhei para trás. Com mais de 15 anos criando soluções
          digitais que fazem a diferença, transformo ideias complexas em
          produtos elegantes e funcionais.
        </p>

        <h3>Minhas especialidades</h3>

        <p>
          Next.js turbinado com Bun e TypeScript - a combinação perfeita para
          aplicações web ultrarrápidas e type-safe. Domino JavaScript em sua
          essência e evoluo constantemente com o ecossistema moderno.
        </p>

        <p>
          Sempre em busca de performance e inovação, mantenho meu código
          seguindo as melhores práticas do mercado e garantindo entregas
          consistentes.
        </p>

        <h3>O que me define</h3>

        <p>
          Sou um solucionador de problemas apaixonado por tecnologia, que une
          experiência sólida com curiosidade constante. Cada linha de código é
          uma oportunidade de criar algo extraordinário.
        </p>

        <h3>Vamos construir algo incrível juntos?</h3>

        <p>
          Como desenvolvedor web freelancer, estou sempre aberto a novos
          desafios e parcerias. Se você tem um projeto em mente ou precisa de um
          profissional experiente para fortalecer sua equipe, vamos conversar!
          Trago não apenas código de qualidade, mas também compromisso,
          comunicação clara e entrega no prazo.
        </p>
      </div>
    </section>
  );
}
