import Link from 'next/link'
import { notFound } from 'next/navigation'
import { formatDate, getSnippet, getSnippetsSlugs, getCategoryColor, getTagColor } from '@/lib/utils'
import { site } from '@/config'

export async function generateStaticParams() {
  return getSnippetsSlugs()
}

export async function generateMetadata({
  params
}: {
  params: Promise<{
    slug: string
  }>
}) {
  const { slug } = await params
  const post = await getSnippet(slug)
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
      url: `${site.url}/snippets/${post.slug}`,
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
  const post = await getSnippet(slug)

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
      {/* <div className="flex justify-between items-center -mt-2 mb-5 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.frontmatter.publishDate)}
        </p>
      </div> */}

      {/* // No componente de detalhe do snippet, após o título e a data */}
<div className="flex justify-between items-center -mt-2 mb-5 text-sm">
  <p className="text-sm text-neutral-600 dark:text-neutral-400">
    {formatDate(post.frontmatter.publishDate)}
  </p>
</div>

{/* Exibir tags */}
{/* {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
  <div className="flex flex-wrap gap-2 mb-6">
    {post.frontmatter.tags.map(tag => (
      <span 
        key={tag} 
        className={`inline-block text-sm px-3 py-1 rounded-full ${getTagColor(tag)}`}
      >
        {tag}
      </span>
    ))}
  </div>
)} */}

{/* // Em src/app/snippets/[slug]/page.tsx */}
{/* // Modifique a parte de exibição de tags: */}

{/* Exibir tags */}
{post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
  <div className="flex flex-wrap gap-2 mb-6">
    {post.frontmatter.tags.map(tag => (
      <Link 
        key={tag} 
        href={`/tags/${encodeURIComponent(tag)}`}
        className={`inline-block text-sm px-3 py-1 rounded-full ${getTagColor(tag)} hover:ring-2 hover:ring-offset-1 hover:ring-blue-500/50 transition-all`}
      >
        {tag}
      </Link>
    ))}
  </div>
)}

{/* <article className="prose">{post.content}</article> */}

      <article className="prose">{post.content}</article>
    </section>
  )
}
