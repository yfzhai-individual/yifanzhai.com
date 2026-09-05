# Writing technical articles

Articles live in `src/content/writing/` as Markdown (`.md`) or MDX (`.mdx`) files. Create a draft from the shared template with:

```bash
npm run new:post -- reviewing-auth-boundaries
```

The dependency-free generator accepts one lowercase kebab-case slug, refuses to overwrite an existing file, copies `src/content/writing/_template.mdx`, replaces its publication date with the current local date, preserves `draft: true`, and prints the created file's absolute path. It rejects missing, extra, or invalid arguments. Edit the generated title, description, tags, and body in VS Code.

## Filenames and URLs

The content file's path becomes its ID and URL. For example, `src/content/writing/reviewing-auth-boundaries.mdx` is served at `/writing/reviewing-auth-boundaries/` when published. There is no separate slug field.

Use an evergreen, descriptive, lowercase kebab-case filename. Prefer `reviewing-auth-boundaries.mdx` over a date, sequence number, or title tied to a temporary event. Avoid renaming a published file because that changes its URL; redirects are not currently configured.

## Frontmatter

The schema is defined in `src/content.config.ts`. A normal draft uses:

```yaml
---
title: "Reviewing authentication boundaries"
description: "A concise summary used in article lists and the RSS feed."
publishedAt: 2026-09-05
tags: [security, software]
draft: true
---
```

Supported fields are:

- `title` (required string): the page heading and feed title.
- `description` (required string): the article introduction, listing summary, and RSS description.
- `publishedAt` (required date): displayed on the article and used to sort writing newest-first. Write it as an ISO calendar date (`YYYY-MM-DD`), not a timestamp; rendering is intentionally fixed to UTC so the displayed day is independent of the build machine's timezone.
- `updatedAt` (optional date): accepted by the schema but not currently displayed or emitted in RSS. Use the same `YYYY-MM-DD` calendar-date convention.
- `tags` (optional string array, defaults to `[]`): displayed on article and writing index pages and emitted as RSS categories.
- `draft` (optional boolean, defaults to `false`): explicitly set this to `true` for new work.

Do not add unsupported fields. If a new metadata need appears, propose a schema and rendering change separately.

## Draft behavior

Drafts are excluded from normal development, production article routes, the writing index, homepage, RSS, and sitemap-generated discovery. Use the explicit draft-preview command to include them only on the local writing index and article routes:

```bash
npm run dev:drafts
```

The writing index announces draft preview mode and marks each draft; a draft article is labeled `Writing / Draft`. Underscore-prefixed authoring files such as `_template.mdx` remain hidden. This mode requires both Astro's development environment and the explicit `drafts` mode. A production build excludes drafts even if it is invoked with `--mode drafts`.

## Writing conventions

- Lead with the problem, audience, or useful conclusion; keep the title and description concrete.
- Use `##` and `###` headings for structure. They automatically populate the article table of contents.
- Prefer short sections, descriptive link text, and durable terminology. Explain assumptions and distinguish evidence from opinion.
- Use Markdown for ordinary prose. Use MDX only when an existing Astro component materially improves the explanation; reuse components rather than embedding scripts or creating one-off UI.
- Keep raw HTML and inline styling out of articles unless the existing Markdown/MDX rendering cannot express the content.

## Images and diagrams

- Add only images that clarify the article. Prefer diagrams that remain readable in both light and dark contexts.
- A simple current convention is `public/images/writing/<slug>/...`, referenced as `/images/writing/<slug>/filename.png`. Create that directory only when needed.
- Use meaningful alt text for informative images and empty alt text for purely decorative images. Do not put essential explanation only inside an image.
- Optimize large raster images before committing them. Prefer SVG for original diagrams when it is safe and practical, and verify narrow-screen rendering.

## Code examples

- Use fenced code blocks with an accurate language identifier for syntax highlighting.
- Keep examples minimal but runnable when possible. State omitted setup, versions, privileges, and security-sensitive assumptions.
- Never include secrets, private hosts, personal data, or live credentials. Use obvious placeholders.
- For security content, label intentionally unsafe examples and pair them with the safe approach.

## References and sources

Link to primary sources—official documentation, standards, advisories, specifications, or original research—close to the claim they support. Record access dates only when the source is expected to change. Quote sparingly, attribute clearly, and verify that public links do not expose private resources.

## Local preview

From the repository root, create and preview a draft:

```bash
npm install
npm run new:post -- reviewing-auth-boundaries
npm run dev:drafts
```

Open the local URL Astro prints, normally `http://localhost:4321`, then visit `/writing/`. Use `npm run dev` when you want the normal published-only view. Before review, run:

```bash
npm run validate
npm run preview
```

`validate` performs Astro/content/type checking and a production build. `preview` serves that built output and therefore shows only publishable (`draft: false`) articles.

## Final review checklist

- [ ] Filename is an evergreen lowercase kebab-case slug.
- [ ] Frontmatter matches the current schema; title, description, date, tags, and intended draft state are correct.
- [ ] The opening and headings make the article easy to scan; `##`/`###` table of contents is useful.
- [ ] Technical claims, commands, code, and security guidance have been checked.
- [ ] Sources are primary where possible, links work, and no private information or secrets are present.
- [ ] Images load, have appropriate alt text, and remain legible on narrow screens and in dark mode.
- [ ] Code blocks have correct language labels and render without awkward overflow.
- [ ] `npm run validate` succeeds and the production preview has been reviewed.
