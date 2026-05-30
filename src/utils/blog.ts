import { getCollection, type CollectionEntry } from "astro:content";

export type BlogPost = CollectionEntry<"blog">;

export function postSlug(post: BlogPost) {
  return (post.data.slug || post.id)
    .replace(/\.(md|mdx)$/i, "")
    .replace(/\/index$/i, "");
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(date);
}

export async function getAllPosts() {
  const posts = await getCollection("blog");
  return posts
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

export async function getRecentPosts(limit = 3) {
  return (await getAllPosts()).slice(0, limit);
}

export async function getPostsByCategory(category: string) {
  return (await getAllPosts()).filter((post) => post.data.category === category);
}

export async function getPostsByTag(tag: string) {
  return (await getAllPosts()).filter((post) => post.data.tags.includes(tag));
}

export async function getAllCategories() {
  const counts = new Map<string, number>();
  for (const post of await getAllPosts()) {
    counts.set(post.data.category, (counts.get(post.data.category) || 0) + 1);
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, "zh-CN"));
}

export async function getAllTags() {
  const counts = new Map<string, number>();
  for (const post of await getAllPosts()) {
    for (const tag of post.data.tags) counts.set(tag, (counts.get(tag) || 0) + 1);
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, "zh-CN"));
}

export async function getArchiveGroups() {
  const groups = new Map<string, BlogPost[]>();
  for (const post of await getAllPosts()) {
    const key = `${post.data.pubDate.getFullYear()}`;
    groups.set(key, [...(groups.get(key) || []), post]);
  }
  return [...groups.entries()]
    .map(([year, posts]) => ({ year, posts }))
    .sort((a, b) => Number(b.year) - Number(a.year));
}
