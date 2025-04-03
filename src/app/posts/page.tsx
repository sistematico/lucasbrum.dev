import Link from 'next/link'
import { formatDate } from '@/lib/client-utils'
import { getPosts } from '@/lib/server-utils'
import { site } from '@/config'
import type { Metadata } from 'next'
import { PageTransition } from '@/components/transition'

export const metadata: Metadata = {
  title: `${site.title} - Blog`,
  description:
    'Leia meus posts sobre programação, tecnologia e desenvolvimento de software.'
}

export default async function BlogPage() {
  const posts = await getPosts()
  
  // Agrupar posts por ano
  const postsByYear: Record<number, typeof posts> = {}
  
  posts.forEach(post => {
    const year = new Date(post.frontmatter.publishDate).getFullYear()
    if (!postsByYear[year]) {
      postsByYear[year] = []
    }
    postsByYear[year].push(post)
  })
  
  // Ordenar anos em ordem decrescente
  const years = Object.keys(postsByYear).map(Number).sort((a, b) => b - a)

  return (
    <PageTransition>
      <section>
        <h2 className="font-bold tracking-tight">Blog</h2>        
        {years.map(year => (
          <div key={year} className="mt-8">
            <h3 className="text-lg font-medium tracking-tight text-neutral-800 dark:text-neutral-200 mb-2">
              {year}
            </h3>
            <div>
              {postsByYear[year]
                .sort((a, b) => {
                  if (
                    new Date(a.frontmatter.publishDate) >
                    new Date(b.frontmatter.publishDate)
                  ) {
                    return -1
                  }
                  return 1
                })
                .map((post) => (
                  <Link key={post.slug} href={`/posts/${post.slug}`}>
                    <div className="flex py-2">
                      <div className="w-10 flex-none text-neutral-600 dark:text-neutral-400">
                        {formatDate(post.frontmatter.publishDate, false, true)}
                      </div>
                      <div className="ml-2 text-neutral-900 dark:text-neutral-100 tracking-tight">
                        {post.frontmatter.title}
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </section>
    </PageTransition>
  )
}