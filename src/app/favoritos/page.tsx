import Link from 'next/link';
import { bookmarks } from './data';

export default function BookmarksPage() {
  // Organizar bookmarks por categoria
  const bookmarksByCategory: Record<string, typeof bookmarks> = bookmarks.reduce((acc, bookmark) => {
    if (!acc[bookmark.category]) acc[bookmark.category] = [];
    acc[bookmark.category].push(bookmark);
    return acc;
  }, {} as Record<string, typeof bookmarks>);

  // Ordenar categorias alfabeticamente
  const sortedCategories = Object.keys(bookmarksByCategory).sort();

  return (
    <section>
      <h2 className="text-xl font-medium tracking-tight">Favoritos</h2>
      {sortedCategories.map(category => (
        <div key={category}>
          <h3 className="font-medium tracking-tight mt-5 mb-1">{category}</h3>
          <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
            {bookmarksByCategory[category]
              .sort((a, b) => a.name.localeCompare(b.name)) // Ordenar os bookmarks dentro da categoria
              .map(bookmark => (
                <li key={bookmark.url}>
                  <Link href={bookmark.url} target="_blank" rel="noopener noreferrer">
                    {bookmark.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </section>
  );
}

