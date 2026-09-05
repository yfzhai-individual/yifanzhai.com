import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '../config';

export async function GET(context: { site: URL }) {
  const posts = (await getCollection('writing', ({ data }) => !data.draft)).sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());
  return rss({
    title: `${site.name} — Writing`,
    description: 'Technical writing on software, security, and automation.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedAt,
      link: `/writing/${post.id}/`,
      categories: post.data.tags,
    })),
  });
}
