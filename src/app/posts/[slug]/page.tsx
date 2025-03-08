// import { getBlogBySlug, getAllBlogSlug } from '@/app/posts/utils'

// export async function generateStaticParams() {
//   return getAllBlogSlug()
// }

// export default async function BlogPage({
//   params,
// }: {
//   params: Promise<{ slug: string }>
// }) {
//   const { slug } = await params
//   const blog = await getBlogBySlug(slug)
//   return (
//     <main className="prose">
//       <article>{blog.content}</article>
//     </main>
//   )
// }

import { notFound } from 'next/navigation'
// import { CustomMDX } from '@/components/mdx'
// import { useMDXComponents } from '@/mdx-components'
import { formatDate, getBlogBySlug, getAllBlogSlug } from '../utils'
// import { baseUrl } from '../../sitemap'

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://lucasbrum.dev'
    : 'http://localhost:3000'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return getAllBlogSlug()
}

export async function generateMetadata({
  params
}: {
  params: Promise<{
    slug: string
  }>
}) {
  const { slug } = await params
  const post = await getBlogBySlug(slug)
  if (!post) return

  const {
    title,
    publishDate: publishedTime,
    summary: description,
    image
  } = post.frontmatter
  const ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/posts/${post.slug}`,
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

export default async function Blog({ params }: PageProps) {
  // const post = (await getBlogPosts()).find((post) => post.slug === params.slug)
  const { slug } = await params
  // const posts = await getBlogPosts();
  const post = await getBlogBySlug(slug)
  // const post = posts.find((post) => post.slug === slug);

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
              ? `${baseUrl}${post.frontmatter.image}`
              : `/og?title=${encodeURIComponent(post.frontmatter.title)}`,
            url: `${baseUrl}/posts/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'My Portfolio'
            }
          })
        }}
      />
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {post.frontmatter.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.frontmatter.publishDate)}
        </p>
      </div>
      <article className="prose">
        {/* <CustomMDX source={{ compiledSource: post.content }} /> */}
        {post.content}
      </article>
    </section>
  )
}
