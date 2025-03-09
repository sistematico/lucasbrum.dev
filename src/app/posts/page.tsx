import Link from 'next/link'
import { getBlogs, formatDate } from '@/app/posts/utils'

export const metadata = {
  title: 'Blog',
  description:
    'Leia meus posts sobre programação, tecnologia e desenvolvimento de software.'
}

export default async function BlogPage() {
  const blogs = await getBlogs()

  return (
    <section>
      <h1 className="font-semibold text-2xl tracking-tighter">Blog</h1>
      {blogs
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
            className="flex flex-col space-y-1 my-4"
            href={`/posts/${post.slug}`}
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
              <p className="text-neutral-600 dark:text-neutral-400 w-[150px] tabular-nums">
                {formatDate(post.frontmatter.publishDate, false)}
              </p>
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {post.frontmatter.title}
              </p>
            </div>
          </Link>
        ))} 



    </section>
  )
}
