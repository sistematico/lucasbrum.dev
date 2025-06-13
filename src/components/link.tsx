"use client";

import Link from "next/link";
import { useLoading } from "@/hooks/use-loading";
import { ReactNode } from "react";

interface LoadingLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  prefetch?: boolean;
}

export function LoadingLink({ href, children, className, prefetch = true }: LoadingLinkProps) {
  const { startLoading } = useLoading();

  const handleClick = () => {
    // Só ativar loading para navegação entre páginas diferentes
    if (typeof window !== 'undefined' && window.location.pathname !== href) {
      startLoading();
    }
  };

  return (
    <Link 
      href={href} 
      className={className}
      onClick={handleClick}
      prefetch={prefetch}
    >
      {children}
    </Link>
  );
}