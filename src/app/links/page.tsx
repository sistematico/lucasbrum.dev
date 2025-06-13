import Link from "next/link";
import type { Metadata } from "next";
import { getSortedLinkCategories } from "./data";

export const metadata: Metadata = {
  title: "Links",
  description: "Links úteis e favoritos organizados por categoria",
};

export default function Links() {
  const sortedCategories = getSortedLinkCategories();

  return (
    <section>
      <h1 className="mb-8 text-2xl font-medium">Links</h1>

      <div className="space-y-8">
        {sortedCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="space-y-4">
            <h2 className="text-xl font-medium text-neutral-800 dark:text-neutral-200 border-b border-neutral-200 dark:border-neutral-800 pb-4">
              {category.name}
            </h2>

            <div className="space-y-3">
              {category.links.map((link, linkIndex) => (
                <Link
                  key={linkIndex}
                  href={link.url}
                  className="block group transition-all duration-200 hover:opacity-80 p-3 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                    <div className="flex-1">
                      <h3 className="font-medium text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {link.name}
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                        {link.description}
                      </p>
                    </div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-500 sm:ml-4 flex-shrink-0">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                        ↗
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
