import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CustomMDX } from "@/components/mdx";
import { LoadingLink } from "@/components/link";
import { formatDate, getBlogPosts } from "@/lib/posts";
import { metaData } from "@/config";
import { FaArrowLeft } from "react-icons/fa6";

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
    : `${metaData.baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${metaData.baseUrl}/posts/${post.slug}`,
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
            image: post.metadata.image
              ? `${metaData.baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${metaData.baseUrl}/posts/${post.slug}`,
            author: {
              "@type": "Person",
              name: metaData.name,
            },
          }),
        }}
      />
      <LoadingLink
        className="group relative inline-flex items-center overflow-hidden rounded-sm bg-gray-600 px-8 py-3 text-white focus:outline-none mb-5"
        href="/posts"
      >
        <span className="absolute -start-full transition-all group-hover:start-4">
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
        <span className="text-sm font-medium transition-all group-hover:ms-4">
          {" "}
          Voltar{" "}
        </span>
      </LoadingLink>
      <h1 className="title mb-3 font-medium text-2xl">{post.metadata.title}</h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-medium">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt)}
        </p>
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
