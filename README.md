# yifanzhai.com

The long-term personal website for Yifan Zhai: a calm, content-first home for software engineering, product security, AI automation, projects, and technical writing.

Built with Astro, TypeScript, and MDX. The output is fully static, so it is fast, portable, inexpensive to host, and does not require a server runtime.

## Local development

Requirements: Node.js 22 or newer and npm.

```bash
npm install
npm run dev
```

Astro will print the local address, normally `http://localhost:4321`.
Use `npm run dev:drafts` when you also want local article routes and the writing index to include drafts.

Before publishing a change:

```bash
npm run validate
npm run preview
```

The production site is generated in `dist/`.

## Content workflows

- [Writing technical articles](docs/WRITING.md)
- [Publishing through pull requests and Cloudflare previews](docs/PUBLISHING.md)

`npm run validate` performs the existing Astro/type/content checks and a production build. Formatting and comprehensive broken-link checking are not currently automated.

## Project structure

```text
src/
  components/          Reusable interface pieces
  content/
    projects/          One MDX file per project
    writing/           One MDX file per article
  layouts/             Shared page and article shells
  pages/               URL routes
  styles/global.css    Design tokens and all shared styles
  config.ts            Site identity, navigation, and profile links
  content.config.ts    Typed project and writing schemas
public/                Favicon, social card, and robots.txt
```

Presentation and content are intentionally separate. Shared colors, typography, spacing, dark mode, and responsive behavior live in `src/styles/global.css`. Site-wide identity and profile URLs live in `src/config.ts`.

## Add a project

1. Copy `src/content/projects/_template.mdx` to a descriptive filename such as `secure-build-pipeline.mdx`.
2. Replace the frontmatter and body with real content.
3. Set `draft: false` to publish it.
4. Set `featured: true` to include it in the selected projects section on the homepage.

The filename becomes the URL: `secure-build-pipeline.mdx` becomes `/projects/secure-build-pipeline/`. Optional `source` and `live` URLs appear on the detailed project page.

## Add a blog post

1. Run `npm run new:post -- <slug>` with an evergreen lowercase kebab-case slug.
2. Add the title, description, tags, and article body to the generated MDX draft.
3. Preview it with `npm run dev:drafts`.
4. Set `draft: false` only when it is ready for a publishing pull request.

The post automatically appears on the Writing page, in the homepage's recent writing section, in the sitemap, and in `/rss.xml`. Level-two and level-three headings generate the table of contents. Fenced code blocks receive syntax highlighting.

## Update public profile details

Edit `src/config.ts` to update the public GitHub and LinkedIn URLs.

Email and résumé details are intentionally not stored or displayed. If either becomes public later, add it deliberately rather than placing private information in the repository.

## Deploy to Cloudflare Pages

This static build needs no Cloudflare adapter.

1. Create a GitHub repository named `yifanzhai.com` under the `yfzhai-individual` account and push this repository to its `main` branch.
2. In Cloudflare, open **Workers & Pages**, create a Pages application, and import the GitHub repository.
3. Use production branch `main`, build command `npm run build`, and output directory `dist`.
4. If the build environment does not select it automatically, set `NODE_VERSION` to `22`.
5. Save and deploy. Future pushes and pull requests receive automatic production and preview builds.

To connect `yifanzhai.com`, open the Pages project, choose **Custom domains**, and add `yifanzhai.com`. For an apex domain, the domain must be an active zone in the same Cloudflare account with its nameservers pointed to Cloudflare. Cloudflare will create the required DNS record and provision HTTPS. Add `www.yifanzhai.com` separately if desired, then redirect one hostname to the canonical one.

Cloudflare references: [Astro on Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/) and [custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/).

## Deploy to Vercel

The site also deploys to Vercel without an adapter or custom configuration.

1. Import the GitHub repository into Vercel.
2. Keep the detected Astro settings. The build command is `npm run build` and the output directory is `dist`.
3. Deploy, then open **Project settings → Domains** and add `yifanzhai.com`.
4. Follow the exact DNS records Vercel shows for the project. If DNS remains with another provider, add the displayed apex A record and `www` CNAME there. Pick one canonical hostname and redirect the other.

Vercel references: [Astro on Vercel](https://vercel.com/docs/frameworks/frontend/astro) and [custom domains](https://vercel.com/docs/domains/working-with-domains/add-a-domain).

## Long-term extension

- Add real work-history entries to `src/pages/work.astro`, or promote them into a third content collection if the timeline grows.
- Add interests as a new content collection only when multiple entries need the same structure.
- Keep client-side JavaScript limited to genuine interaction. The current site ships only theme, mobile-navigation, and command-palette behavior.
- Update `public/og.png` only when the site's visual identity changes.

## Content still needed

- Career timeline and selected work
- First public project
- First public article

## Optional domain email

If a public address is useful later, `hello@yifanzhai.com` is a clear, durable choice. Keep the current Gmail address private and forward the public address to it.

With Cloudflare DNS, enable **Email Routing**, verify the private destination address, then create a routing rule from `hello@yifanzhai.com` to that destination. Forwarding handles incoming mail only. To send and reply as `hello@yifanzhai.com`, use a mailbox or SMTP provider that supports the custom domain and configure SPF, DKIM, and DMARC before publishing the address.

Cloudflare reference: [route incoming email](https://developers.cloudflare.com/email-service/get-started/route-emails/).
