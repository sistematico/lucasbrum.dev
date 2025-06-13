"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LoadingBar, LoadingSpinner } from "@/components/loading";

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  startLoading: () => void;
  stopLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
    setIsNavigating(loading);
  };

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  // Detectar mudanças de rota
  useEffect(() => {
    setIsNavigating(false);
    setIsLoading(false);
  }, [pathname]);

  // Auto-parar loading após timeout (fallback)
  useEffect(() => {
    if (isLoading) {
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 10000); // 10 segundos máximo

      return () => clearTimeout(timeout);
    }
  }, [isLoading]);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading, startLoading, stopLoading }}>
      <LoadingBar isLoading={isLoading} />
      {isNavigating && <LoadingSpinner />}
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}