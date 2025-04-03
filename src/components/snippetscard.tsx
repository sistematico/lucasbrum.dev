'use client'

import Link from 'next/link'
import { useState } from 'react'
import { TagLink } from '@/components/taglink'
import { formatDate, getTagColor, getCategoryColor } from '@/lib/client-utils'

interface ProgressCardProps {
  slug: string
  title: string
  summary?: string
  publishDate: string
  category?: string
  tags?: string[]
  image?: string
}

export function ProgressCard({
  slug,
  title,
  summary,
  publishDate,
  category,
  tags,
  image
}: ProgressCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link className="scard" href={`/snippets/${slug}`}>
      <div
        className="group p-4 border rounded-lg transition-all hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-black/20 hover:-translate-y-1 duration-200 border-neutral-200 dark:border-neutral-800 h-full flex flex-col justify-between relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div>
          <div className="flex items-center justify-between mb-2">
            {category && (
              <div
                className={`text-xs px-2 py-1 rounded-md border ${getCategoryColor(
                  category
                )}`}
              >
                {category}
              </div>
            )}
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              {formatDate(publishDate, false)}
            </span>
          </div>
          
          <h4 className="font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </h4>
          
          {summary && (
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
              {summary}
            </p>
          )}

          {tags && tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {tags.slice(0, 4).map((tag) => (
                <TagLink
                  key={tag}
                  href={`/tags/${encodeURIComponent(tag)}`}
                  className={`inline-block text-xs px-2 py-0.5 rounded-full ${getTagColor(tag)} hover:border-2 hover:border-blue-500/50 transition-all`}
                >
                  {tag}
                </TagLink>
              ))}
              {tags.length > 4 && (
                <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                  +{tags.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
        
        {/* <div className="mt-3 text-xs text-blue-600 dark:text-blue-400 font-medium group-hover:underline">
          Ver snippet →
        </div> */}
        
        {/* Progress bar - CSS only version */}
        <div 
          className="absolute bottom-0 left-0 h-2 bg-blue-500 transition-all duration-500 ease-in-out"
          style={{ 
            width: isHovered ? '100%' : '0%',
          }}
        />
      </div>
    </Link>
  )
}