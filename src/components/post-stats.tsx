// src/components/post-stats.tsx
"use client";

import { useEffect, useState } from 'react';
import { FaEye, FaUsers, FaBookOpenReader } from 'react-icons/fa6';

interface PostStatsData {
  totalViews: number;
  uniqueViews: number;
  readCount: number;
}

interface PostStatsProps {
  slug: string;
  className?: string;
}

export function PostStats({ slug, className = "" }: PostStatsProps) {
  const [stats, setStats] = useState<PostStatsData>({
    totalViews: 0,
    uniqueViews: 0,
    readCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/stats/view?slug=${slug}`)
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <span className={`flex items-center gap-x-2 text-sm text-gray-500 animate-pulse ${className}`}>
        <span className="bg-gray-200 dark:bg-gray-700 rounded w-16 h-4"></span>
        <span className="bg-gray-200 dark:bg-gray-700 rounded w-16 h-4"></span>
        <span className="bg-gray-200 dark:bg-gray-700 rounded w-16 h-4"></span>
      </span>
    );
  }

  return (
    <div className={`flex items-center gap-x-2 text-sm text-gray-600 dark:text-gray-400 ${className}`}>
      <FaEye className="w-4 h-4" />
      {stats.totalViews}
      <FaUsers className="w-4 h-4" />
      {stats.uniqueViews}
      <FaBookOpenReader className="w-4 h-4" />
      {stats.readCount}
    </div>
  );
}