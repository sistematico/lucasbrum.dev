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
        {/* <ul className="bg-white rounded-lg shadow divide-y divide-gray-200 w-full">
          <li className="px-6 py-4">
            <div className="flex justify-between">
              <span className="font-semibold text-lg">List Item 1</span>
              <span className="text-gray-500 text-xs">1 day ago</span>
            </div>
            <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>
          </li>
          <li className="px-6 py-4">
            <div className="flex justify-between">
              <span className="font-semibold text-lg">List Item 2</span>
              <span className="text-gray-500 text-xs">2 days ago</span>
            </div>
            <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>
          </li>
          <li className="px-6 py-4">
            <div className="flex justify-between">
              <span className="font-semibold text-lg">List Item 3</span>
              <span className="text-gray-500 text-xs">3 days ago</span>
            </div>
            <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>
          </li>
        </ul> */}

        {sortedCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="space-y-4">
            <h2 className="text-xl font-medium text-neutral-800 dark:text-neutral-200 border-b border-neutral-200 dark:border-neutral-800 pb-4">
              {category.name}
            </h2>

            <ul className="list-disc list-inside">
              {/* <ul class="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400"></ul> */}
              {category.links.map((link, linkIndex) => (
                
                <Link
                  key={linkIndex}
                  href={link.url}
                  className="block group transition-all duration-200 hover:opacity-80 p-3 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-900"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <li>
                    {link.name}
                  {/* <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
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
                  </div> */}
                  </li>
                </Link>
              ))}
            </ul>

          </div>
        ))}
      </div>
    </section>
  );
}
