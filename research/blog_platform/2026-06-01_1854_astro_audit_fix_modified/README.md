# Astro Audit Fix Modified

## Issue

- `npm.cmd audit --json` reported one moderate vulnerability on direct dependency `astro`.
- Advisory range: `astro < 6.1.6` and `astro < 6.1.10`.
- Existing dependency range was `astro: ^5.0.0`, so npm could not apply a normal in-range fix.

## Change

- Upgraded `astro` to `^6.4.2`.
- Kept Markdown formula support working under Astro 6 by moving math plugins to `markdown.processor: unified(...)`.

## Files

- `package.json`
- `package-lock.json`
- `astro.config.mjs`

## Verification

- Passed: `npm.cmd audit --json` reports 0 vulnerabilities.
- Passed: `npm.cmd run build:search`
- Astro built 38 pages.
- Pagefind indexed 38 pages and generated `dist/pagefind`.
- Confirmed the Astro 6 Markdown processor migration removed the previous deprecated config warning.
