import { getBlogs } from '@/app/posts/utils'
import { baseUrl } from '@/config'
import type { MetadataRoute } from 'next'

// export const dynamic = 'force-static'

// export default async function sitemap() {
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allBlogs = await getBlogs()

  const blogs = allBlogs.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: post.frontmatter.publishDate,
    priority: 1,
  }))

  const routes = ['', '/projetos', '/posts'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'yearly',
    priority: 0.5,
  }))

  return [...routes, ...blogs]
}