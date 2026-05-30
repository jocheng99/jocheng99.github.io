export function taxonomySlug(name: string) {
  return encodeURIComponent(name.trim());
}

export function taxonomyPath(kind: "categories" | "tags", name: string) {
  return `/${kind}/${taxonomySlug(name)}/`;
}
