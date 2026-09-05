# Repository guidance for coding agents

## Purpose

This is Yifan Zhai's personal technical website. It holds technical notes, security and software engineering learning, and public knowledge-sharing. The site should also demonstrate clear professional thinking and communication.

## Engineering principles

- Favor simplicity, maintainability, static generation, portability, content-first architecture, minimal dependencies, and small focused changes.
- Keep the repository itself as the content system.
- Do not introduce a CMS, database, unnecessary server-side functionality, large framework, SaaS dependency, or abstraction without explicit approval.

## Content

- Keep technical writing in the existing Astro `writing` content collection.
- Before creating an article, inspect `src/content.config.ts`, `src/content/writing/_template.mdx`, and nearby content.
- Follow existing frontmatter and MDX conventions. Use an evergreen, lowercase kebab-case filename for the URL slug and default new work to `draft: true`.
- Reuse existing layouts and components. Avoid application-code changes unless the content requires them.
- Never publish an article or change `draft` to `false` unless explicitly requested.

## Development

- Inspect nearby implementation before editing, follow current conventions, and make the smallest coherent change. Avoid unrelated refactors and visual redesigns.
- Use `npm run dev:drafts` for local draft review. Before declaring work complete, run `npm run validate`, report the result, and note assumptions or unresolved issues.

## Publishing safety

Unless explicitly requested, do not merge pull requests, publish drafts, delete content, make destructive Git changes, or change deployment infrastructure.
