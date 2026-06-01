# Content Source

Astro Content Collections read blog posts from:

```text
src/content/blog/
```

Each post uses frontmatter matching `src/content.config.ts`. Draft posts with `draft: true` are excluded from lists, taxonomy pages, archive pages, and dynamic article routes.
