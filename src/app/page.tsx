import Link from 'next/link'
import Image from 'next/image'
import { PageTransition } from '@/components/transition'
import { Mail } from 'lucide-react'

export default function Home() {
  return (
    <PageTransition>
      <section>
        <Link href="/">
          <Image
            src="/images/avatar.jpg"
            alt="Lucas Saliés Brum"
            className="image-logo block rounded-full border-6 border-white lg:mt-5 mt-0 lg:mb-5 mb-10 mx-auto sm:float-right sm:ml-5 sm:mb-5"
            unoptimized
            width={160}
            height={160}
            priority
          />
        </Link>
        <div className="prose prose-neutral dark:prose-invert mb-5">
          <p>
            Meu nome é Lucas, sou especialista em TypeScript, uso frameworks
            como Vue.js, Astro, React, Next.js e runtimes como Bun e Node.js
            para criar aplicações web de visual refinado e alta performance.
          </p>
          <p>
            Sou usuário de Linux desde 1999 e tenho vasta experiência em
            administração de sistemas, garantindo soluções robustas, estáveis e
            seguras.
          </p>
          <p>Vamos juntos construir soluções inovadoras e impactantes!</p>
          <p>
            {/* <Link
              className="inline-block btn text-lg font-semibold p-3 rounded-md bg-blue-500 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500"
              href="/contato"
            > */}
            <Link
              className="btn group cursor-pointer text-[#111] dark:text-white bg-gray-300 hover:bg-[#cbcbcb] dark:bg-[#222] dark:hover:bg-[#333] px-6 py-3 rounded-md font-medium transition-all duration-300 ease-in-out"
              href="/contato"
            >
              <Mail className="inline mb-1 mr-2 h-6 w-6 transition group-hover:-translate-x-2 duration-800" />
              Entre em Contato
            </Link>
          </p>
        </div>
      </section>
    </PageTransition>
  )
}
