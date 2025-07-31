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
      {/* <Link
        href={link}
        className="inline-flex font-medium items-center text-blue-600 hover:underline me-2"
      >
        Demonstração
        <svg
          className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
          />
        </svg>
      </Link> */}
      {/* <Link
        href={repo}
        className="inline-flex font-medium items-center text-blue-600 hover:underline"
      >
        Repositório
        <svg
          className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
          />
        </svg>
      </Link> */}
      <Button href={repo} icon={<Globe className="w-4 h-4" />} className="me-2">
        Site
      </Button>
      <Button href={repo} icon={<GitBranch className="w-4 h-4" />}>
        Repositório
      </Button>
    </div>
  );
}
