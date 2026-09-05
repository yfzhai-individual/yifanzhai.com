import type { CollectionEntry } from 'astro:content';

export const draftPreviewEnabled = import.meta.env.DEV && import.meta.env.MODE === 'drafts';

export function isVisibleWritingPost(post: CollectionEntry<'writing'>) {
  return !post.id.startsWith('_') && (!post.data.draft || draftPreviewEnabled);
}
