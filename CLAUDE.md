# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands are defined in `package.json`. There are no tests or linters configured.

- `npm run dev` — Start the Astro dev server at http://localhost:4321/neustella/
- `npm run build` — Build static site to `dist/`
- `npm run preview` — Preview the production build locally
- `npm run astro` — Run Astro CLI (e.g. `npm run astro -- add sitemap`)

**Note on dependency installation:** The project directory is on a filesystem that does not allow executing binaries (NTFS mount). If `npm install` fails with `EACCES` on esbuild, install dependencies in `/tmp` and copy the source files back.

## Architecture

### Astro v6 with Islands Architecture

This is a static site built with Astro v6. Pages are server-rendered to HTML at build time with **zero client-side JavaScript by default**. The only interactive component is `OrbitCanvas.tsx`, a React Canvas component that uses `client:load` to hydrate on page load. All other pages are pure static HTML.

### Content Collections (v6 API)

Articles are managed via Astro Content Collections. The config is in `src/content.config.ts` (not `src/content/config.ts` — Astro v6 moved this to the project root). It uses the `glob` loader to scan `src/content/articles/**/*.md`.

Key implications:
- Each article must have frontmatter matching the Zod schema: `title`, `description`, `date`, `category` (`"tech"` | `"observe"`), `draft`
- Access articles via `getCollection('articles')`; entries use `.id` (not `.slug`) for the URL slug
- Draft articles are filtered out in `getStaticPaths()` and page queries

### Client-Side Solar System Visualization

The homepage features a Canvas-based solar system where planets orbit the sun in real time:

- `src/utils/planet-data.ts` — Contains real astronomical data: orbital periods (Earth days), J2000.0 initial angles, colors, and radii. Jupiter (`glow: true`) links to `/neustella/articles`; all other planets link to `/neustella/building`.
- `src/utils/orbit.ts` — Computes planet positions using Keplerian approximation: `angle = initialAngle + (daysSinceJ2000 / period) * 360`. Outer planets (Saturn, Uranus, Neptune) use **visual period scaling** (`period / 20` or `/ 5`) so their motion is perceptible; inner planets use real periods.
- `src/components/OrbitCanvas.tsx` — A React component that runs a `requestAnimationFrame` loop to render the Canvas. It handles DPR scaling for retina displays, click detection via circular hit-testing, and hover cursor changes.

### Routing and Path Prefix

The site is configured for GitHub Pages deployment with a repository subdirectory. **All internal links must include the `/neustella/` prefix.**

This is configured in `astro.config.mjs`:
```js
base: '/neustella',
site: 'https://yourusername.github.io',
```

When changing to a custom domain or `username.github.io` repo, set `base: '/'` and update all hardcoded paths.

### Layout Hierarchy

- `BaseLayout.astro` — Root layout with sticky nav, Google Fonts preconnect, and footer. Imports `global.css`.
- `ArticleLayout.astro` — Wraps `BaseLayout` with article-specific chrome: category badge, date, title, and a `CommentSection` at the bottom.

### Styling System

Uses Tailwind CSS v4 with CSS variables defined in `@theme` inside `src/styles/global.css`. The color palette follows a Zen/minimalist deep-space theme:
- `--color-void: #0a0a0f` — background
- `--color-moon: #f5f5f0` — primary text
- `--color-wood: #8b7355` — accent

Markdown content is styled via the `.article-content` class (not Tailwind's prose plugin). If adding new Markdown elements, update `.article-content` selectors in `global.css`.

### Comments (Giscus)

`src/components/CommentSection.astro` embeds the Giscus script. It is **not functional until configured**: the `data-repo`, `data-repo-id`, and `data-category-id` attributes must be replaced with values from https://giscus.app/zh-CN. The repository must have GitHub Discussions enabled and be public.

### Deployment

`.github/workflows/deploy.yml` builds and deploys to GitHub Pages on every push to `main`. The Pages source must be set to "GitHub Actions" in repository settings.

### Adding a New Article

1. Create a `.md` file in `src/content/articles/`
2. Add frontmatter matching the schema in `content.config.ts`
3. Set `category` to `"tech"` or `"observe"`
4. Set `draft: false` to publish
5. Push to `main` — GitHub Actions builds and deploys automatically
