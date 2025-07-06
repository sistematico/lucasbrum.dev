"use client";

import { usePathname } from "next/navigation";
import { ThemeSwitch } from "@/components/theme";
import { LoadingLink } from "@/components/link";
import { site } from "@/config";

const navItems = {
  "/posts": { name: "Blog" },
  "/projetos": { name: "Projetos" },
  "/links": { name: "Links" },
  "/contato": { name: "Contato" },
};

export function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  const getLinkClasses = (path: string, isLogo = false) => {
    const baseClasses = isLogo ? "text-2xl md:text-3xl font-semibold transition-all duration-200" : "text-sm md:text-base transition-all duration-200 whitespace-nowrap relative";
    const activeClasses = isActive(path) && !isLogo ? "text-blue-600 dark:text-blue-400 font-medium" : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200";
    return `${baseClasses} ${activeClasses}`;
  };

  return (
    <nav className="w-full lg:mb-16 mb-12 py-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <LoadingLink href="/" className={getLinkClasses("/", true)}>
            {site.title}
          </LoadingLink>
        </div>

        <div className="relative w-full md:w-auto">
          <div className="navbar-scroll flex gap-3 md:ml-auto items-center pb-2 md:pb-0">
            {Object.entries(navItems).map(([path, { name }]) => (
              <LoadingLink
                key={path}
                href={path}
                className={getLinkClasses(path)}
              >
                {name}
              </LoadingLink>
            ))}
            <div className="flex-shrink-0">
              <ThemeSwitch />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
