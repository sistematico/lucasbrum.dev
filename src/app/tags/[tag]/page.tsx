import Link from 'next/link'
import { formatDate } from '@/lib/client-utils'
import { getSnippetsByTag, getAllTags } from '@/lib/server-utils'
import { site } from '@/config'
import type { Metadata } from 'next'
import { PageTransition } from '@/components/transition'
import { notFound } from 'next/navigation'
import Breadcrumb from '@/components/breadcrumb'

export async function generateMetadata({
  params
}: {
  params: Promise<{
    tag: string
  }>
}): Promise<Metadata> {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  
  return {
    title: `${site.title} - Snippets com a tag "${decodedTag}"`,
    description: `Trechos de código etiquetados com "${decodedTag}" para facilitar o desenvolvimento.`
  }
}

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map(tag => ({ tag }));
}

// Função para gerar cores de fundo baseadas no nome da categoria
function getCategoryColor(category: string): string {
  const colors = {
    'typescript': 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
    'javascript': 'bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800',
    'react': 'bg-cyan-50 text-cyan-800 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-300 dark:border-cyan-800',
    'nextjs': 'bg-black/5 text-gray-800 border-gray-200 dark:bg-white/10 dark:text-gray-300 dark:border-gray-700',
    'css': 'bg-pink-50 text-pink-800 border-pink-200 dark:bg-pink-900/30 dark:text-pink-300 dark:border-pink-800',
    'html': 'bg-orange-50 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800',
    'node': 'bg-green-50 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800',
  }
  
  return colors[category.toLowerCase() as keyof typeof colors] || 
    'bg-gray-50 text-gray-800 border-gray-200 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-700'
}

// Função para gerar cores de tags (mais suaves que as de categorias)
function getTagColor(tag: string): string {
  const colors = {
    'typescript': 'bg-blue-50/70 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
    'javascript': 'bg-yellow-50/70 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300',
    'programming': 'bg-purple-50/70 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300',
    'react': 'bg-cyan-50/70 text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-300',
    'array': 'bg-green-50/70 text-green-700 dark:bg-green-900/20 dark:text-green-300',
    'random': 'bg-orange-50/70 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300',
    'nextjs': 'bg-black/5 text-gray-700 dark:bg-white/5 dark:text-gray-300',
    'css': 'bg-pink-50/70 text-pink-700 dark:bg-pink-900/20 dark:text-pink-300',
    'html': 'bg-orange-50/70 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300',
    'node': 'bg-green-50/70 text-green-700 dark:bg-green-900/20 dark:text-green-300',
  }
  
  return colors[tag.toLowerCase() as keyof typeof colors] || 
    'bg-gray-50/70 text-gray-700 dark:bg-gray-800/30 dark:text-gray-300'
}

export default async function TagPage({
  params
}: {
  params: Promise<{ tag: string }>
}) {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  const snippets = await getSnippetsByTag(decodedTag)
 
  if (snippets.length === 0) notFound()
  
  const breadcrumbItems = [
    {
      href: "/snippets", 
      label: `Snippets`,
      isCurrentPage: false
    },
    {
      href: "/snippets", 
      label: `TAG: ${decodedTag}`,
      isCurrentPage: true
    }
  ]

  return (
    <PageTransition>
      <section>
      <Breadcrumb items={breadcrumbItems} />
      <h2 className="text-xl font-medium tracking-tight mb-6">Snippets</h2>

        {/* <div className="flex items-center gap-3 mb-6">
          <Link href="/snippets" className="text-blue-600 dark:text-blue-400 hover:underline">
            ← Todos os snippets
          </Link>
          <span className="text-neutral-400">/</span>
          <h2 className="text-xl font-medium tracking-tight">
            Tag: <span className={`inline-block text-sm px-3 py-1 rounded-full ${getTagColor(decodedTag)}`}>{decodedTag}</span>
          </h2>
        </div> */}
        
        <p className="text-neutral-600 dark:text-neutral-400 mb-8">
          {snippets.length} snippet{snippets.length !== 1 ? 's' : ''} com esta tag
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
              <Link className="scard" key={snippet.slug} href={`/snippets/${snippet.slug}`}>
                <div className="group p-4 border rounded-lg transition-all hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-black/20 hover:-translate-y-1 duration-200 border-neutral-200 dark:border-neutral-800 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className={`text-xs px-2 py-1 rounded-md border ${getCategoryColor(snippet.frontmatter.category || 'Outros')}`}>
                        {snippet.frontmatter.category || 'Outros'}
                      </div>
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">
                        {formatDate(snippet.frontmatter.publishDate, false)}
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
                    
                    {snippet.frontmatter.tags && snippet.frontmatter.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {snippet.frontmatter.tags.slice(0, 4).map(t => (
                          <span 
                            key={t} 
                            className={`inline-block text-xs px-2 py-0.5 rounded-full ${getTagColor(t)} ${t.toLowerCase() === decodedTag.toLowerCase() ? 'ring-2 ring-offset-1 ring-blue-500/50' : ''}`}
                          >
                            {t}
                          </span>
                        ))}
                        {snippet.frontmatter.tags.length > 4 && (
                          <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                            +{snippet.frontmatter.tags.length - 4}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
        </div>
        
        {snippets.length === 0 && (
          <div className="text-center py-10">
            <p className="text-neutral-600 dark:text-neutral-400">
              Nenhum snippet encontrado com a tag &quot;{decodedTag}&quot;.
            </p>
          </div>
        )}
      </section>
    </PageTransition>
  )
}