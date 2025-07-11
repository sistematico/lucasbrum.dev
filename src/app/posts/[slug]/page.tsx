import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CustomMDX } from "@/components/mdx";
import { LoadingLink } from "@/components/link";
import { formatDate, getBlogPosts } from "@/lib/posts";
import { site } from "@/config";
import { PostTracker } from "@/components/post-tracker";
import { PostStats } from "@/components/post-stats";

export async function generateStaticParams() {
  let posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  let post = getBlogPosts().find((post) => post.slug === slug);
  if (!post) return;

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  let ogImage = image
    ? image
    : `${site.baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${site.baseUrl}/posts/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

// Componente de Loading para o conteúdo
function PostSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-8"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
      </div>
    </div>
  );
}

export default async function Blog({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let post = getBlogPosts().find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <section>
      <PostTracker slug={post.slug} />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image ? `${site.baseUrl}${post.metadata.image}` : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${site.baseUrl}/posts/${post.slug}`,
            author: {
              "@type": "Person",
              name: site.name,
            },
          }),
        }}
      />
      {/* <LoadingLink
        className="group relative inline-flex items-center overflow-hidden px-8 py-3 text-white mb-5"
        href="/posts"
      >
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> */}
        <LoadingLink
          className="mb-3 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-bold rounded-lg px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700"
          href="/posts"
        >
          <svg className="rotate-180 w-3.5 h-3.5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
          Voltar
        {/* </button> */}
        </LoadingLink>

        {/* <span className="absolute transition-all group-hover:-start-full start-1">
          <svg
            className="size-6 rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </span>
        <span className="font-medium transition-all group-hover:-ms-6 uppercase">
          {" "}
          Voltar{" "}
        </span> */}
      {/* </LoadingLink> */}
      <h1 className="title mb-1 font-medium text-2xl">
        {post.metadata.title}
      </h1>
      <h2 className="italic mb-3 text-neutral-700 dark:text-neutral-500">
        {post.metadata.summary || " "}
      </h2>
      <div className="flex justify-between items-center text-medium rounded-lg">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt)}
        </p>
        <PostStats slug={post.slug} />
      </div>
      <article className="prose prose-quoteless prose-neutral dark:prose-invert">
        <Suspense fallback={<PostSkeleton />}>
          <CustomMDX source={post.content} />
        </Suspense>
        {/* <CustomMDX source={post.content} /> */}
      </article>
    </section>
  );
}
