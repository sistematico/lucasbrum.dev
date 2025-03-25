import Link from 'next/link'
import { getSnippets, formatDate } from '@/lib/utils'
import { site } from '@/config'
import type { Metadata } from 'next'
import { PageTransition } from '@/components/transition'

export const metadata: Metadata = {
  title: `${site.title} - Snippets`,
  description:
    'Trechos de código reutilizáveis para facilitar o desenvolvimento de aplicações.'
}

export default async function BlogPage() {
  const snippets = await getSnippets()

  return (
    <PageTransition>
      <section>
        <h2 className="text-xl font-medium tracking-tight">Snippets</h2>
        <div>
          {snippets
            .sort((a, b) => {
              if (
                new Date(a.frontmatter.publishDate) >
                new Date(b.frontmatter.publishDate)
              ) {
                return -1
              }
              return 1
            })
            .map(snippet => (
              <Link key={snippet.slug} href={`/snippets/${snippet.slug}`}>
                <div className="flex py-2">
                  <div className="w-42 flex-none text-neutral-600 dark:text-neutral-400">
                    {snippet.frontmatter.category}
                  </div>
                  <div className="ml-2 text-neutral-900 dark:text-neutral-100 tracking-tight">
                    {snippet.frontmatter.title}
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </PageTransition>
  )
}
