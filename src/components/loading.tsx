"use client";

import { useEffect, useState } from "react";

interface LoadingBarProps {
  isLoading: boolean;
}

export function LoadingBar({ isLoading }: LoadingBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 10;
        });
      }, 200);

      return () => clearInterval(interval);
    } else {
      setProgress(100);
      setTimeout(() => setProgress(0), 500);
    }
  }, [isLoading]);

  if (!isLoading && progress === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200 dark:bg-gray-800">
      <div
        className="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 transition-all duration-300 ease-out"
        style={{
          width: `${progress}%`,
          transition: progress === 100 ? 'width 0.3s ease-out' : 'width 0.2s ease-out'
        }}
      />
    </div>
  );
}

export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-white/80 dark:bg-black/80 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="relative">
          <div className="w-12 h-12 border-4 border-gray-200 dark:border-gray-700 rounded-full animate-spin border-t-blue-500"></div>
          <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent rounded-full animate-pulse border-t-blue-300"></div>
        </div>
        
        {/* Texto de carregamento */}
        <div className="text-center">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Carregando...
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            Aguarde um momento
          </p>
        </div>
      </div>
    </div>
  );
}