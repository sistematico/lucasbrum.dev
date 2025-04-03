import { getPosts } from '@/lib/server-utils'
import { url } from '@/config'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts()

  const blogs = posts.map((post) => ({
    url: `${url}/posts/${post.slug}`,
    lastModified: post.frontmatter.publishDate,
    priority: 1,
  }))

  const routes = ['', '/projetos', '/posts'].map((route) => ({
    url: `${url}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'yearly',
    priority: 0.5,
  }))

  return [...routes, ...blogs]
}