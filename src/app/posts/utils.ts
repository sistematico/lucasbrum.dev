import fs from 'fs'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'
import { components } from '@/components/mdx'

const contentDir = path.join(process.cwd(), '_posts')

export async function getPost(slug: string) {
  const fileName = slug + '.mdx'
  const filePath = path.join(contentDir, fileName)
  const fileContent = fs.readFileSync(filePath, 'utf-8')

  const { frontmatter, content } = await compileMDX<{
    title: string
    author: string
    publishDate: string
    summary: string
    image: string
  }>({
    source: fileContent,
    options: { parseFrontmatter: true },
    components
  })

  return {
    frontmatter,
    content,
    slug: path.parse(fileName).name
  }
}

export async function getPosts() {
  const files = fs.readdirSync(contentDir)
  const blogs = await Promise.all(
    files.map(async (file) => await getPost(path.parse(file).name))
  )
  return blogs
}

export function getSlugs() {
  const files = fs.readdirSync(contentDir)
  const slugs = files.map((file) => ({ slug: path.parse(file).name }))
  return slugs
}

export function formatDate(date: string, includeRelative = true) {
  const currentDate = new Date()
  if (!date.includes('T')) date = `${date}T00:00:00`
  const targetDate = new Date(date)

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  const daysAgo = currentDate.getDate() - targetDate.getDate()

  let formattedDate = ''

  if (yearsAgo > 0) {
    if (yearsAgo === 1) formattedDate = 'ano passado'
    else formattedDate = `${yearsAgo} anos atrás`
  } else if (monthsAgo > 0) {
    if (monthsAgo === 1) formattedDate = `${monthsAgo} mês atrás`
    else formattedDate = `${monthsAgo} meses atrás`
  } else if (daysAgo > 0) {
    if (daysAgo === 1) formattedDate = 'ontem'
    else formattedDate = `${daysAgo} dias atrás`
  } else {
    formattedDate = 'hoje'
  }

  const fullDate = targetDate.toLocaleString('pt-br', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })

  if (!includeRelative) return fullDate

  return `${fullDate} (${formattedDate})`
}
