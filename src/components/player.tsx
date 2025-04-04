// src/components/audioPlayer.tsx
'use client';

import { usePlayer } from '@/contexts/audio';
import { useEffect, useState } from 'react';

export default function AudioPlayer() {
  const { isPlaying, currentStation, pause, resume, volume, setVolume } = usePlayer();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Evitar erro de hidratação
  if (!isMounted) return null;

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      pause();
    } else if (currentStation) {
      resume();
    }
  };

  if (!currentStation) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 z-50">
      <div className="container mx-auto flex items-center justify-between max-w-[720px]">
        <div className="flex items-center">
          <img 
            src={currentStation.logo || '/default-station.png'} 
            alt={currentStation.name} 
            className="w-12 h-12 rounded-lg mr-4"
          />
          <div>
            <h3 className="font-bold">{currentStation.name}</h3>
            <p className="text-sm text-gray-400">{isPlaying ? 'Reproduzindo' : 'Pausado'}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="w-24">
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              value={volume}
              onChange={handleVolumeChange}
              className="w-full"
            />
          </div>
          
          <button 
            onClick={handlePlayPause}
            className="bg-red-600 hover:bg-red-700 text-white rounded-full w-12 h-12 flex items-center justify-center"
            aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7-.75a.75.75 0 00-.75.75v13.5a.75.75 0 00.75.75H16.5a.75.75 0 00.75-.75V5.25a.75.75 0 00-.75-.75H13.75z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}