export const site = {
  name: 'Yifan Zhai',
  title: 'Yifan Zhai — Software, Security, and AI Automation',
  description:
    'Yifan Zhai is a software engineer working across product security and AI automation.',
  url: 'https://yifanzhai.com',
  email: '',
  resume: '',
  social: {
    github: 'https://github.com/yfzhai-individual',
    linkedin: '',
  },
} as const;

export const navigation = [
  { href: '/work/', label: 'Work' },
  { href: '/projects/', label: 'Projects' },
  { href: '/writing/', label: 'Writing' },
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' },
] as const;
