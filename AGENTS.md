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

## Article publication checklist

When reviewing an article for publication:

- Check the title, description, date, tags, filename, grammar, readability, internal continuity, and consistency with the site's voice.
- Verify technical claims against primary sources. Replay commands or experiments when practical, and clearly scope results that may change over time.
- Check internal and external links. Avoid overstating security, privacy, reliability, or other guarantees.
- Keep the article as a draft during review. Change `draft` to `false` only after an explicit publication request, and use the intended publication date.
- Run `npm run validate` in the final publication state. Confirm the generated article route and its expected ordering on the homepage, Writing index, RSS feed, and site search without hard-coding the article.
- When presentation could be affected, inspect the homepage and article at desktop and mobile sizes for readable titles and descriptions, horizontal overflow, and console errors.
- Use temporary content or an isolated copy to test alternate content states, and do not leave test content committed.

## Publishing safety

Unless explicitly requested, do not merge pull requests, publish drafts, delete content, make destructive Git changes, or change deployment infrastructure.
