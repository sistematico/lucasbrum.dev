import Image from "next/image";
import { socialLinks } from "@/config";

export default function Page() {
  return (
    <section>
      <a href={socialLinks.twitter} target="_blank">
        <Image
          src="/avatar.jpg"
          alt="Lucas"
          className="rounded-full bg-gray-100 block lg:mt-5 mt-0 lg:mb-5 mb-10 mx-auto sm:float-right sm:ml-5 sm:mb-5 grayscale hover:grayscale-0"
          unoptimized
          width={160}
          height={160}
          priority
        />
      </a>
      <h1 className="mb-8 text-2xl font-medium">Desenvolvedor Full-Stack com DNA Open Source</h1>
      <div className="prose prose-neutral dark:prose-invert">
          <p>
            Há mais de duas décadas, desde 1999, mergulhei no universo Linux e
            nunca mais olhei para trás. Com mais de 15 anos criando soluções
            digitais que fazem a diferença, transformo ideias complexas em
            produtos elegantes e funcionais.
          </p>

          <p>
            **Minha especialidade:** Next.js turbinado com Bun e TypeScript - a
            combinação perfeita para aplicações web ultrarrápidas e type-safe.
            Domino JavaScript em sua essência e evoluo constantemente com o
            ecossistema moderno.
          </p>

          <p>
            Sempre em busca de performance e inovação, mantenho meu código
            versionado com Git, seguindo as melhores práticas do mercado e
            garantindo entregas consistentes.
          </p>

          <p>
            **O que me define:** Sou um solucionador de problemas apaixonado por
            tecnologia, que une experiência sólida com curiosidade constante.
            Cada linha de código é uma oportunidade de criar algo
            extraordinário.
          </p>

          <p>
            **Vamos construir algo incrível juntos?**<br />Como desenvolvedor web
            freelancer, estou sempre aberto a novos desafios e parcerias. Se
            você tem um projeto em mente ou precisa de um profissional
            experiente para fortalecer sua equipe, vamos conversar! Trago não
            apenas código de qualidade, mas também compromisso, comunicação
            clara e entrega no prazo.
          </p>
      </div>
    </section>
  );
}
