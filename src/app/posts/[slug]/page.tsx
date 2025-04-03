import { notFound } from 'next/navigation'
import { formatDate } from '@/lib/client-utils'
import { getPost, getPostsSlugs } from '@/lib/server-utils'
import { url, site } from '@/config'

export async function generateStaticParams() {
  return getPostsSlugs()
}

export async function generateMetadata({
  params
}: {
  params: Promise<{
    slug: string
  }>
}) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return

  const {
    title,
    publishDate: publishedTime,
    summary: description,
    image
  } = post.frontmatter
  const ogImage = image
    ? image
    : `${site.url}/images/avatar.jpg?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${site.url}/posts/${post.slug}`,
      images: [
        {
          url: ogImage
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage]
    }
  }
}

export default async function Blog({
  params
}: {
  params: Promise<{
    slug: string
  }>
}) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) notFound()

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.frontmatter.title,
            datePublished: post.frontmatter.publishDate,
            dateModified: post.frontmatter.publishDate,
            description: post.frontmatter.summary,
            image: post.frontmatter.image
              ? `${site.url}${post.frontmatter.image}`
              : `/og?title=${encodeURIComponent(post.frontmatter.title)}`,
            url: `${site.url}/posts/${post.slug}`,
            author: {
              '@type': 'Person',
              name: site.name
            }
          })
        }}
      />
      <h2 className="title font-semibold text-xl tracking-tighter">
        {post.frontmatter.title}
      </h2>
      <div className="flex justify-between items-center -mt-2 mb-5 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.frontmatter.publishDate)}
        </p>
      </div>
      <article className="prose">{post.content}</article>
    </section>
  )
}
