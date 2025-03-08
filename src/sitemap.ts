import { getBlogs } from '@/app/posts/utils'
import { baseUrl } from '@/config'

export const dynamic = 'force-static'

export default async function sitemap() {
  const allBlogs = await getBlogs()
  const blogs = allBlogs.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: post.frontmatter.publishDate,
  }))

  const routes = ['', '/posts'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogs]
}