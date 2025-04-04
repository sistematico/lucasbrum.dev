// src/contexts/audio.tsx
'use client';

import { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';

type Station = {
  id: number;
  name: string;
  genre: string;
  streamUrl: string;
  logo?: string;
};

type PlayerContextType = {
  isPlaying: boolean;
  currentStation: Station | null;
  play: (station: Station) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  setVolume: (volume: number) => void;
  volume: number;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStation, setCurrentStation] = useState<Station | null>(null);
  const [volume, setVolume] = useState(0.8);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Inicializar elemento de áudio uma vez
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.volume = volume;
    }
    
    // Carregar estado salvo
    const savedStation = localStorage.getItem('currentStation');
    const savedVolume = localStorage.getItem('playerVolume');
    
    if (savedStation) {
      try {
        const station = JSON.parse(savedStation);
        setCurrentStation(station);
        if (audioRef.current) {
          audioRef.current.src = station.streamUrl;
        }
      } catch (e) {
        console.error('Erro ao carregar estação salva');
      }
    }
    
    if (savedVolume) {
      const vol = parseFloat(savedVolume);
      setVolume(vol);
      if (audioRef.current) {
        audioRef.current.volume = vol;
      }
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Salvar estado
  useEffect(() => {
    if (currentStation) {
      localStorage.setItem('currentStation', JSON.stringify(currentStation));
    }
    localStorage.setItem('playerVolume', volume.toString());
  }, [currentStation, volume]);

  // Funções do player
  const play = (station: Station) => {
    if (!audioRef.current) return;
    
    if (currentStation?.id !== station.id) {
      setCurrentStation(station);
      audioRef.current.src = station.streamUrl;
    }
    
    audioRef.current.play()
      .then(() => setIsPlaying(true))
      .catch(error => console.error('Erro ao reproduzir áudio:', error));
  };

  const pause = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const resume = () => {
    if (!audioRef.current || !currentStation) return;
    audioRef.current.play()
      .then(() => setIsPlaying(true))
      .catch(error => console.error('Erro ao retomar áudio:', error));
  };

  const stop = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
  };

  const changeVolume = (newVolume: number) => {
    if (!audioRef.current) return;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  return (
    <PlayerContext.Provider value={{
      isPlaying,
      currentStation,
      play,
      pause,
      resume,
      stop,
      setVolume: changeVolume,
      volume
    }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}