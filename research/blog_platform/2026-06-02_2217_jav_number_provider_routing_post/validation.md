# JAV number provider routing post validation

Date: 2026-06-02 22:17

## Scope

- Converted `reference_materials/inbox/jav_number_type_and_provider_routing_20260602.md` into a public-facing Astro blog article.
- Rewrote the source note as a technical media-library metadata article instead of publishing the internal research note verbatim.
- Added neutral web-sourced images about server racks and network cables.

## Added or moved files

- Blog article: `src/content/blog/jav-number-provider-routing.md`
- Public images:
  - `public/assets/blog/jav-number-provider-routing/server-racks.jpg`
  - `public/assets/blog/jav-number-provider-routing/network-cables.jpg`
  - `public/assets/blog/jav-number-provider-routing/cable-chaos.jpg`
- Image handling: downloaded originals were resized/cropped in place to reduce page weight and avoid oversized portrait images in article content.
- Processed source material:
  - `reference_materials/docs/blog_sources/jav-number-provider-routing/jav_number_type_and_provider_routing_20260602.md`

## Image sources

- Brett Sayles, Pexels: `https://www.pexels.com/photo/server-racks-on-data-center-5408005/`
- Brett Sayles, Pexels: `https://www.pexels.com/photo/white-and-blue-cables-2881229/`
- Paul Seling, Pexels: `https://www.pexels.com/photo/black-and-red-corded-headphones-12266915/`

## Editorial checks

- Kept the article focused on metadata engineering, provider routing, strict detail-page matching, and dry-run safeguards.
- Did not include explicit images or resource-seeking instructions.
- Preserved uncertainty around prefix-to-maker mappings and content ID semantics.
- Kept media-file changes out of scope: no media move, delete, rename, NFO write, or external drive operation.

## Verification

- `npm.cmd run build:search` passed after the article and image edits.
- Confirmed generated outputs:
  - `dist/index.html`
  - `dist/404.html`
  - `dist/pagefind/pagefind.js`
  - `dist/blog/jav-number-provider-routing/index.html`
- Browser preview checked at `http://localhost:4321/blog/jav-number-provider-routing/`.
- Desktop and mobile render screenshots were saved under `tmp/blog/render_check/jav-number-provider-routing/`.
