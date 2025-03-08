import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <section>
      <Link href="/">
        <Image
          src="/images/avatar.jpg"
          alt="Lucas Saliés Brum"
          className="block rounded-full border-6 border-white lg:mt-5 mt-0 lg:mb-5 mb-10 mx-auto sm:float-right sm:ml-5 sm:mb-5 transition-all duration-500  grayscale-100 hover:grayscale-0"
          unoptimized
          width={160}
          height={160}
          priority
        />
      </Link>
      <div className="prose prose-neutral dark:prose-invert">
        <p>
          Meu nome é Lucas, sou especialista em TypeScript, uso frameworks como
          Vue.js, Astro, React, Next.js e runtimes como Bun e Node.js para criar
          aplicações web de visual refinado e alta performance.
        </p>
        <p>
          Sou usuário de Linux desde 1999 e tenho vasta experiência em
          administração de sistemas, garantindo soluções robustas, estáveis e
          seguras.
        </p>
        <p>Vamos juntos construir soluções inovadoras e impactantes!</p>
      </div>
    </section>
  )
}
