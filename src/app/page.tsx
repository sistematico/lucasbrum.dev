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
      <h1 className="mb-8 text-2xl font-medium">Portfolio template!</h1>
      {/* <div className="prose prose-neutral dark:prose-invert">
        <p>
          A clean, fast, and lightweight portfolio template built with Next.js,
          Vercel, and Tailwind CSS.
        </p>
        <p>
          Nextfolio has everything you need for a portfolio: MDX blog, SEO, RSS,
          Atom & JSON feeds, analytics, Tweet & YouTube embeds, KaTeX and {""}
          <a
            target="_blank"
            href="https://github.com/1msirius/Nextfolio?tab=readme-ov-file#features"
          >
            more
          </a>
          .
        </p>
        <p>
          Nextfolio is{" "}
          <a href={socialLinks.github} target="_blank">
            open-source
          </a>{" "}
          and fully customizable, making it easy to add more features.
        </p>
        <p>
          <a
            href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2F1msirius%2FNextfolio"
            target="_blank"
          >
            Deploy
          </a>{" "}
          your Nextfolio site with Vercel in minutes and follow the set up
          instructions in the{" "}
          <a href="/blog/getting-started">Getting Started</a> post.
        </p>
        <p>
          Built and maintained by{" "}
          <a href="https://imsirius.xyz/" target="_blank">
            Sirius
          </a>
          .
        </p>
      </div> */}
      <div className="prose prose-neutral dark:prose-invert">
        <p>
          {/* Nextfolio is{" "}
          <a href={socialLinks.github} target="_blank">
            open-source
          </a>{" "}
          and fully customizable, making it easy to add more features.
           */}

          <h2>Desenvolvedor Full-Stack com DNA Open Source</h2>

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
            Minha caixa de ferramentas é completa: crio interfaces reativas com
            Vue.js, gerencio dados com SQLite e PostgreSQL usando ORMs modernos
            como Drizzle e Prisma, orquestro infraestruturas com Ansible, e
            automatizo tudo com Shell Script. Implemento pipelines de CI/CD
            robustos e integro soluções de inteligência artificial que elevam o
            potencial dos projetos.
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
            **Vamos construir algo incrível juntos?** Como desenvolvedor web
            freelancer, estou sempre aberto a novos desafios e parcerias. Se
            você tem um projeto em mente ou precisa de um profissional
            experiente para fortalecer sua equipe, vamos conversar! Trago não
            apenas código de qualidade, mas também compromisso, comunicação
            clara e entrega no prazo.
          </p>
        </p>
      </div>
    </section>
  );
}
