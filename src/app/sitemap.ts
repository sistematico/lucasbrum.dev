import { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/posts";
import { site } from "@/config";

const url = site.baseUrl.endsWith("/") ? site.baseUrl : `${site.baseUrl}/`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blogs = getBlogPosts().map((post) => ({
    url: `${url}blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  let routes = ["", "posts", "projetos", "photos"].map((route) => ({
    url: `${url}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
