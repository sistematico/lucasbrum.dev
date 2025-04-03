import Link from 'next/link'
import {
  getSnippets,
  formatDate,
  getCategoryColor,
  getTagColor
} from '@/lib/utils'
import { site } from '@/config'
import type { Metadata } from 'next'
import { PageTransition } from '@/components/transition'
import { TagLink } from '@/components/taglink'

export const metadata: Metadata = {
  title: `${site.title} - Snippets`,
  description:
    'Trechos de código reutilizáveis para facilitar o desenvolvimento de aplicações.'
}

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
                    <Link key={snippet.slug} href={`/snippets/${snippet.slug}`}>
                      <div className="group p-4 border rounded-lg transition-all hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-black/20 hover:-translate-y-1 duration-200 border-neutral-200 dark:border-neutral-800 h-full flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <div
                              className={`text-xs px-2 py-1 rounded-md border ${getCategoryColor(
                                category
                              )}`}
                            >
                              {category}
                            </div>
                            <span className="text-xs text-neutral-500 dark:text-neutral-400">
                              {formatDate(
                                snippet.frontmatter.publishDate,
                                false
                              )}
                            </span>
                          </div>
                          <h4 className="font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {snippet.frontmatter.title}
                          </h4>
                          {snippet.frontmatter.summary && (
                            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                              {snippet.frontmatter.summary}
                            </p>
                          )}

                          {/* Exibir tags */}
                          {/* {snippet.frontmatter.tags && snippet.frontmatter.tags.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {snippet.frontmatter.tags.slice(0, 4).map(tag => (
                                <span 
                                  key={tag} 
                                  className={`inline-block text-xs px-2 py-0.5 rounded-full ${getTagColor(tag)}`}
                                >
                                  {tag}
                                </span>
                              ))}
                              {snippet.frontmatter.tags.length > 4 && (
                                <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                                  +{snippet.frontmatter.tags.length - 4}
                                </span>
                              )}
                            </div>
                          )} */}

                          {/* // Em src/app/snippets/page.tsx */}
                          {/* // Modifique a parte de exibição de tags: */}

                          {/* Exibir tags */}
                          {snippet.frontmatter.tags &&
                            snippet.frontmatter.tags.length > 0 && (
                              <div className="mt-3 flex flex-wrap gap-1.5">
                                {snippet.frontmatter.tags
                                  .slice(0, 4)
                                  .map((tag) => (
                                    // <Link
                                    //   key={tag}
                                    //   href={`/tags/${encodeURIComponent(tag)}`}
                                    //   onClick={(e) => e.stopPropagation()} // Evita que o clique na tag também navegue para o snippet
                                    //   className={`inline-block text-xs px-2 py-0.5 rounded-full ${getTagColor(
                                    //     tag
                                    //   )} hover:ring-2 hover:ring-offset-1 hover:ring-blue-500/50 transition-all`}
                                    // >
                                    //   {tag}
                                    // </Link>
                                    <TagLink 
                                    key={tag} 
                                    href={`/tags/${encodeURIComponent(tag)}`}
                                    className={`inline-block text-xs px-2 py-0.5 rounded-full ${getTagColor(tag)} hover:ring-2 hover:ring-offset-1 hover:ring-blue-500/50 transition-all`}
                                  >
                                    {tag}
                                  </TagLink>
                                  ))}
                                {snippet.frontmatter.tags.length > 4 && (
                                  <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                                    +{snippet.frontmatter.tags.length - 4}
                                  </span>
                                )}
                              </div>
                            )}
                        </div>
                        <div className="mt-3 text-xs text-blue-600 dark:text-blue-400 font-medium group-hover:underline">
                          Ver snippet →
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageTransition>
  )
}
