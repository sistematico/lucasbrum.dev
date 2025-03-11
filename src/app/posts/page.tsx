import Link from 'next/link'
import { getPosts, formatDate } from '@/app/posts/utils'
import { metaData } from '@/config'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `${metaData.title} - Blog`,
  description:
    'Leia meus posts sobre programação, tecnologia e desenvolvimento de software.'
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <section>
      <h2 className="text-xl font-medium tracking-tight">Blog</h2>
      <div>
      {posts
        .sort((a, b) => {
          if (
            new Date(a.frontmatter.publishDate) > new Date(b.frontmatter.publishDate)
          ) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col"
            href={`/posts/${post.slug}`}
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
              <p className="text-neutral-600 dark:text-neutral-400 w-[160px] tabular-nums">
                {formatDate(post.frontmatter.publishDate, false)}
              </p>
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {post.frontmatter.title}
              </p>
            </div>
          </Link>
        ))}
        </div> 



    </section>
  )
}
