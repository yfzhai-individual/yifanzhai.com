import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);

if (args.length !== 1) {
  console.error('Usage: npm run new:post -- <lowercase-kebab-case-slug>');
  process.exitCode = 1;
} else {
  const [slug] = args;
  const validSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

  if (!validSlug.test(slug)) {
    console.error(`Invalid slug "${slug}". Use lowercase letters, numbers, and single hyphens only.`);
    process.exitCode = 1;
  } else {
    const writingDirectory = new URL('../src/content/writing/', import.meta.url);
    const templateUrl = new URL('_template.mdx', writingDirectory);
    const articleUrl = new URL(`${slug}.mdx`, writingDirectory);
    const template = await readFile(templateUrl, 'utf8');

    if (!/^publishedAt:\s*.+$/m.test(template) || !/^draft:\s*true\s*$/m.test(template)) {
      throw new Error('The article template must contain publishedAt and draft: true frontmatter.');
    }

    const now = new Date();
    const publishedAt = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, '0'),
      String(now.getDate()).padStart(2, '0'),
    ].join('-');
    const article = template.replace(/^publishedAt:\s*.+$/m, `publishedAt: ${publishedAt}`);

    try {
      await writeFile(articleUrl, article, { encoding: 'utf8', flag: 'wx' });
      console.log(`Created ${fileURLToPath(articleUrl)}`);
    } catch (error) {
      if (error && typeof error === 'object' && 'code' in error && error.code === 'EEXIST') {
        console.error(`Article already exists: ${fileURLToPath(articleUrl)}`);
        process.exitCode = 1;
      } else {
        throw error;
      }
    }
  }
}
