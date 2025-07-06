// src/app/posts/page.tsx
import { LoadingLink } from "@/components/link";
import { formatDate, getBlogPosts } from "@/lib/posts";
import { PostStats } from "@/components/post-stats";

export const metadata = {
  title: "Blog",
  description: "Nextfolio Blog",
};

export default function BlogPosts() {
  let allBlogs = getBlogPosts();

  return (
    <section>
      <h1 className="mb-8 text-2xl font-medium">Blog</h1>
      <div>
        {allBlogs
          .sort((a, b) => {
            if (
              new Date(a.metadata.publishedAt) >
              new Date(b.metadata.publishedAt)
            ) {
              return -1;
            }
            return 1;
          })
          .map((post) => (
            <LoadingLink
              key={post.slug}
              className="flex flex-col space-y-1 mb-5 transition-opacity duration-200 hover:opacity-80"
              href={`/posts/${post.slug}`}
            >
              <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                <h2 className="text-black dark:text-white">
                  {post.metadata.title}
                </h2>
                <div className="text-neutral-600 dark:text-neutral-400 tabular-nums text-sm flex items-center gap-4">
                  <span>{formatDate(post.metadata.publishedAt, false)}</span>
                  <PostStats slug={post.slug} />
                </div>
              </div>
            </LoadingLink>
          ))}
      </div>
    </section>
  );
}