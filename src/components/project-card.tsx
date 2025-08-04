import { Globe, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProjectCard({ title = "", description = "", link = "#", repo = "#" }) {
  return (
    <div className="p-6 border-2 border-black/80 rounded-lg shadow-md bg-white dark:bg-black/10 dark:border-black-50 mb-2">
      <Link href={link}>
        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
      </Link>
      <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
        {description}
      </p>
      <Link
        className={`
          inline-flex rounded-sm items-center gap-2 px-4 py-2 shadow-sm
          border border-black/40 border-black/30 
          text-black dark:text-white
          hover:bg-transparent hover:text-black/70 dark:hover:text-white/70
          focus:ring-3 focus:outline-hidden
          transition-all duration-200 me-2
        `}
        href={link}
        target="_blank"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">Site</span>
      </Link>
      <Link
        className={`
          inline-flex rounded-sm items-center gap-2 px-4 py-2 shadow-sm
          border border-black/40 border-black/30 
          text-black dark:text-white
          hover:bg-transparent hover:text-black/70 dark:hover:text-white/70
          focus:ring-3 focus:outline-hidden
          transition-all duration-200 me-2
        `}
        href={repo}
        target="_blank"
      >
        <GitBranch className="w-4 h-4" />
        <span className="text-sm font-medium">Repositório</span>
      </Link>
    </div>
  );
}
