'use client'

import { useState, useEffect } from 'react';
import { 
  getCurrentVideoId, 
  loadNewVideo as loadNew, 
  subscribeToVideoChanges 
} from '@/lib/youtube-store';

export function useYoutube() {
  // Inicialize com o valor atual ou vazio se for SSR
  const [videoId, setVideoId] = useState<string>('');
  
  useEffect(() => {
    // No cliente, obtenha o ID atual
    setVideoId(getCurrentVideoId());
    
    // Assine às mudanças
    const unsubscribe = subscribeToVideoChanges((newId) => {
      setVideoId(newId);
    });
    
    return unsubscribe;
  }, []);
  
  // Função para carregar um novo vídeo
  const loadNewVideo = () => {
    loadNew();
  };
  
  return { videoId, loadNewVideo };
}