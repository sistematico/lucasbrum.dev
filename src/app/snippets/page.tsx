import { getSnippets } from '@/lib/server-utils'
import { ProgressCard } from '@/components/snippetscard'
import { PageTransition } from '@/components/transition'
import Breadcrumb from '@/components/breadcrumb'
import { site } from '@/config'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `${site.title} - Snippets`,
  description:
    'Trechos de código reutilizáveis para facilitar o desenvolvimento de aplicações.'
}

const breadcrumbItems = [
  {
    href: "/snippets", 
    label: "Snippets",
    isCurrentPage: true
  }
]

export default async function SnippetsPage() {
  const snippets = await getSnippets()
  const snippetsByCategory: Record<string, typeof snippets> = {}

  snippets.forEach((snippet) => {
    const category = snippet.frontmatter.category || 'Outros'
    if (!snippetsByCategory[category]) {
      snippetsByCategory[category] = []
    }
    snippetsByCategory[category].push(snippet)
  })

  const categories = Object.keys(snippetsByCategory).sort()

  return (
    <PageTransition>
      <section>
        <Breadcrumb items={breadcrumbItems} />
        <h2 className="text-xl font-medium tracking-tight mb-6">Snippets</h2>
        <div className="grid grid-cols-1 gap-8">
          {categories.map((category) => (
            <div key={category} className="space-y-4">
              <h3 className="text-lg font-medium tracking-tight text-neutral-800 dark:text-neutral-200 border-b pb-2 border-neutral-200 dark:border-neutral-800">
                {category}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {snippetsByCategory[category]
                  .sort((a, b) => {
                    if (
                      new Date(a.frontmatter.publishDate) >
                      new Date(b.frontmatter.publishDate)
                    ) {
                      return -1
                    }
                    return 1
                  })
                  .map((snippet) => (
                    <ProgressCard
                      key={snippet.slug}
                      slug={snippet.slug}
                      title={snippet.frontmatter.title}
                      summary={snippet.frontmatter.summary}
                      publishDate={snippet.frontmatter.publishDate}
                      category={snippet.frontmatter.category}
                      tags={snippet.frontmatter.tags}
                      image={snippet.frontmatter.image}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageTransition>
  )
}