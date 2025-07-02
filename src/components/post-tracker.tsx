"use client";

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface PostTrackerProps {
  slug: string;
}

export function PostTracker({ slug }: PostTrackerProps) {
  const pathname = usePathname();
  const hasTrackedView = useRef(false);
  const hasTrackedRead = useRef(false);
  const readTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Rastrear visualização apenas uma vez por sessão
    if (!hasTrackedView.current) {
      fetch('/api/stats/view', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, action: 'view' }),
      }).catch(console.error);
      
      hasTrackedView.current = true;
    }

    // Rastrear leitura após 30 segundos ou 80% de scroll
    const trackRead = () => {
      if (!hasTrackedRead.current) {
        fetch('/api/stats/view', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug, action: 'read' }),
        }).catch(console.error);
        
        hasTrackedRead.current = true;
      }
    };

    // Timer de 30 segundos
    readTimerRef.current = setTimeout(trackRead, 30000);

    // Rastrear scroll
    const handleScroll = () => {
      const scrollPercentage = 
        (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
      
      if (scrollPercentage > 0.8 && !hasTrackedRead.current) {
        trackRead();
        if (readTimerRef.current) {
          clearTimeout(readTimerRef.current);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (readTimerRef.current) {
        clearTimeout(readTimerRef.current);
      }
    };
  }, [slug, pathname]);

  return null;
}