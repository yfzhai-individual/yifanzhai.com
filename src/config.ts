export const site = {
  name: 'Yifan Zhai',
  title: 'Yifan Zhai — Software, Security, and AI Automation',
  description:
    'Yifan Zhai is a software engineer working across product security and AI automation.',
  url: 'https://yifanzhai.com',
  social: {
    github: 'https://github.com/yfzhai-individual',
    linkedin: 'https://www.linkedin.com/in/yifanzhai/',
  },
} as const;

export const navigation = [
  { href: '/writing/', label: 'Writing' },
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' },
] as const;
